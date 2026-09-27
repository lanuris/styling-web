import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'scale',
      type: 'number',
      label: 'Scale (%)',
      defaultValue: 100,
      min: 1,
      admin: {
        description: '100% is the original size. For example, use 50% for half size or 150% for one and a half times the original.',
      },
    },
  ],
}
