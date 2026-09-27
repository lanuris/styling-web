import type { CollectionAfterChangeHook } from 'payload'

import type { ContactFormNotificationSetting, FormSubmission } from '@/payload-types'
import { sendEmail } from '@/services/email.server'

type SubmissionData = {
  field?: string
  value?: unknown
}

const toText = (value: unknown) => {
  if (typeof value === 'string') return value
  if (value === null || typeof value === 'undefined') return ''
  return JSON.stringify(value)
}

export const sendContactFormNotification: CollectionAfterChangeHook<FormSubmission> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return doc

  const settings = (await req.payload.findGlobal({
    slug: 'contact-form-notification-settings',
    locale: req.locale,
    overrideAccess: true,
    req,
  })) as ContactFormNotificationSetting

  const contactFormID =
    typeof settings.contactForm === 'object' ? settings.contactForm.id : settings.contactForm
  const submittedFormID = typeof doc.form === 'object' ? doc.form.id : doc.form

  if (
    !contactFormID ||
    String(submittedFormID) !== String(contactFormID) ||
    !settings.recipientEmail ||
    !settings.subject ||
    !settings.body
  ) {
    return doc
  }

  const values = Object.fromEntries(
    ((doc.submissionData || []) as SubmissionData[])
      .filter((item): item is Required<SubmissionData> => Boolean(item.field))
      .map(({ field, value }) => [field, toText(value)]),
  )
  values.formSubmissionID = String(doc.id)

  await sendEmail({
    errorMessage: 'Could not send contact form notification email.',
    plainTextTemplate: settings.body,
    replyTo: values.email || req.payload.email.defaultFromAddress,
    req,
    subjectTemplate: settings.subject,
    to: settings.recipientEmail,
    values,
  })

  return doc
}
