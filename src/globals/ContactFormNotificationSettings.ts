import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const ContactFormNotificationSettings: GlobalConfig = {
  slug: 'contact-form-notification-settings',
  label: 'Contact form notifications',
  access: { read: adminOnly, update: adminOnly },
  admin: { group: 'Settings' },
  fields: [
    {
      name: 'contactForm',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description: 'Only submissions from this form send the notification defined below.',
      },
    },
    {
      name: 'recipientEmail',
      type: 'email',
      required: true,
      admin: { description: 'The address that receives new contact form submissions.' },
    },
    {
      name: 'subject',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'New contact form submission from {{full-name}}',
      admin: {
        description: 'You can use any submitted field, for example {{full-name}} or {{email}}.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      required: true,
      defaultValue:
        'A new contact form was submitted.\n\nName: {{full-name}}\nEmail: {{email}}\nPhone: {{phone}}\n\nMessage:\n{{message}}',
      admin: {
        description:
          'Plain-text email body. Use {{field-name}} to insert a submitted value, for example {{message}}.',
      },
    },
  ],
}
