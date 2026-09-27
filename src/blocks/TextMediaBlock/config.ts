import type { Block } from 'payload'

export const TextMediaBlock: Block = {
  slug: 'textMedia',
  interfaceName: 'TextMediaBlock',
  labels: {
    singular: 'Text with media',
    plural: 'Text with media',
  },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
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
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'text',
      label: 'Content',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Line breaks are preserved on the page.',
      },
    },
    {
      name: 'textFont',
      label: 'Text and title font',
      type: 'select',
      defaultValue: 'serif',
      required: true,
      options: [
        { label: 'Serif (Georgia)', value: 'serif' },
        { label: 'Sans serif (Geist)', value: 'sans' },
      ],
    },
    {
      name: 'textSize',
      label: 'Content size',
      type: 'select',
      defaultValue: 'medium',
      required: true,
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
  ],
}
