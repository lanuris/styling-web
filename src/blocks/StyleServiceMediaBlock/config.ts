import type { Block } from 'payload'

export const StyleServiceMediaBlock: Block = {
  slug: 'serviceMedia',
  interfaceName: 'StyleServiceMediaBlock',
  labels: {
    singular: 'Style service with media',
    plural: 'Style services with media',
  },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'service', type: 'relationship', relationTo: 'services', required: true },
    {
      name: 'mediaPosition',
      type: 'select',
      defaultValue: 'left',
      required: true,
      options: [
        { label: 'Left on desktop', value: 'left' },
        { label: 'Right on desktop', value: 'right' },
      ],
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
      localized: true,
      admin: {
        description:
          'The form shown in the dialog. Select the same form configured in Contact form notifications to send an email.',
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
