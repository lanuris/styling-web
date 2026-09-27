import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'instagramUrl',
      type: 'text',
      admin: {
        description: 'The full URL of the Instagram profile shown in the navigation.',
      },
      label: 'Instagram URL',
      required: true,
      validate: (value: unknown) => {
        if (typeof value !== 'string') return 'Enter a valid Instagram URL.'

        try {
          const url = new URL(value)
          return ['http:', 'https:'].includes(url.protocol) || 'Enter a valid Instagram URL.'
        } catch {
          return 'Enter a valid Instagram URL.'
        }
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
          localized: true,
        }),
      ],
      maxRows: 6,

      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
