import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Chapter',
          value: 'chapter',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'High Impact with SVG overlay',
          value: 'highImpactOverlay',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'highImpactOverlay', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'overlayMedia',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpactOverlay',
        description: 'SVG shown over the hero image. Set a separate SVG for each locale.',
      },
      filterOptions: {
        mimeType: {
          equals: 'image/svg+xml',
        },
      },
      label: 'SVG overlay',
      localized: true,
      relationTo: 'media',
    },
    {
      name: 'overlayScale',
      type: 'number',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpactOverlay',
        description: '100% is the original SVG size.',
        step: 1,
      },
      defaultValue: 100,
      label: 'SVG zoom (%)',
      localized: true,
      max: 300,
      min: 10,
    },
    {
      name: 'overlayPositionX',
      type: 'number',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpactOverlay',
        description: 'Negative moves left; positive moves right.',
        step: 1,
      },
      defaultValue: 0,
      label: 'SVG horizontal position (%)',
      localized: true,
      max: 100,
      min: -100,
    },
    {
      name: 'overlayPositionY',
      type: 'number',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpactOverlay',
        description: 'Negative moves up; positive moves down.',
        step: 1,
      },
      defaultValue: 0,
      label: 'SVG vertical position (%)',
      localized: true,
      max: 100,
      min: -100,
    },
  ],
  label: false,
}
