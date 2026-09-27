import type { Block } from 'payload'

export const StyleServiceBlock: Block = {
  slug: 'service',
  interfaceName: 'StyleServiceBlock',
  labels: {
    singular: 'Style service',
    plural: 'Style services',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'price',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'For example: 600 €' },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Short introduction displayed above the service details.' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Use a new line for each item.' },
    },
    {
      name: 'place',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'For example: OSOBNĚ • PRAHA' },
    },
    {
      name: 'contactButtonLabel',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Contact us',
    },
    {
      name: 'contactForm',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description:
          'The form shown in the dialog. Select the same form configured in Contact form notifications to send an email.',
      },
    },
    {
      name: 'predefinedMessage',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'The text prefilled into the selected contact form message field.',
      },
    },
    {
      name: 'closeButtonLabel',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Close',
    },
  ],
}
