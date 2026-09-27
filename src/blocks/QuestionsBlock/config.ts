import type { Block } from 'payload'

export const QuestionsBlock: Block = {
  slug: 'questions',
  interfaceName: 'QuestionsBlock',
  labels: {
    singular: 'Questions',
    plural: 'Questions',
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
      name: 'questions',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'answer',
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
