import type { Block } from 'payload'

export const AdvertisingBlock: Block = {
  slug: 'advertising',
  interfaceName: 'AdvertisingBlock',
  labels: {
    singular: 'Advertising',
    plural: 'Advertising',
  },
  fields: [
    {
      name: 'accordionButtonPosition',
      type: 'select',
      defaultValue: 'right',
      required: true,
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            description: 'Line breaks are preserved on the page.',
          },
        },
      ],
    },
  ],
}
