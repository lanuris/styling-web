import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const StyleServices: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Style service', plural: 'Style services' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'updatedAt'],
  },
  typescript: {
    interface: 'StyleService',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
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
      admin: { description: 'For example: IN PERSON • PRAGUE' },
    },
    {
      name: 'predefinedMessage',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'The text prefilled into the selected contact form message field.' },
    },
  ],
}
