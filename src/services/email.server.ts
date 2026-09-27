import type { PayloadRequest } from 'payload'

type EmailTemplateValues = Record<string, string>

const escapeHTML = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }
    return entities[character] || character
  })

const renderTemplate = (template: string, values: EmailTemplateValues) =>
  template.replace(/{{\s*([^{}]+?)\s*}}/g, (placeholder, key: string) => values[key] ?? placeholder)

const renderPlainTextEmailHTML = (template: string, values: EmailTemplateValues) => {
  const escapedValues = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, escapeHTML(value)]),
  )

  return renderTemplate(escapeHTML(template), escapedValues).replace(/\r?\n/g, '<br>')
}

type SendEmailArgs = {
  errorMessage?: string
  htmlTemplate?: string
  plainTextTemplate?: string
  replyTo?: string
  req: PayloadRequest
  subjectTemplate: string
  to: string | string[]
  values?: EmailTemplateValues
}

export const sendEmail = async ({
  errorMessage,
  htmlTemplate,
  plainTextTemplate,
  replyTo,
  req,
  subjectTemplate,
  to,
  values = {},
}: SendEmailArgs) => {
  const subject = renderTemplate(subjectTemplate, values)
  const html = htmlTemplate
    ? renderTemplate(
        htmlTemplate,
        Object.fromEntries(Object.entries(values).map(([key, value]) => [key, escapeHTML(value)])),
      )
    : renderPlainTextEmailHTML(plainTextTemplate || '', values)

  try {
    await req.payload.sendEmail({
      html,
      replyTo,
      subject,
      to,
    })
  } catch (error) {
    req.payload.logger.error({
      err: error,
      msg: errorMessage || `Could not send email: ${subject}`,
    })
  }
}
