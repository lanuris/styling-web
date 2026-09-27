import type { Block } from 'payload'

export const MediaCarousel: Block = {
  slug: 'mediaCarousel',
  interfaceName: 'MediaCarouselBlock',
  labels: {
    singular: 'Media carousel',
    plural: 'Media carousels',
  },
  fields: [
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: 'portrait',
      required: true,
      options: [
        { label: 'Square (1:1)', value: 'square' },
        { label: 'Portrait (4:5)', value: 'portrait' },
        { label: 'Tall portrait (2:3)', value: 'tallPortrait' },
        { label: 'Landscape (4:3)', value: 'landscape' },
        { label: 'Widescreen (16:9)', value: 'widescreen' },
      ],
    },
    {
      name: 'mobileImagesPerRow',
      type: 'number',
      label: 'Visible images on mobile',
      defaultValue: 1,
      required: true,
      min: 1,
      max: 3,
    },
    {
      name: 'desktopImagesPerRow',
      type: 'number',
      label: 'Visible images on desktop',
      defaultValue: 3,
      required: true,
      min: 1,
      max: 6,
    },
    {
      name: 'media',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'infiniteScrolling',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'When enabled, the carousel continues from the first image after the last image.',
      },
    },
  ],
}
