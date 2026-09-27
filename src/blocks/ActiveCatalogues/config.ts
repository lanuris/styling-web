import type { Block } from 'payload'

export const ActiveCatalogues: Block = {
  slug: 'activeCatalogues',
  interfaceName: 'ActiveCataloguesBlock',
  labels: {
    singular: 'Active Catalogues',
    plural: 'Active Catalogues',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Catalogues',
      admin: { description: 'Optional heading displayed above the active catalogues.' },
    },
    {
      name: 'emptyMessage',
      type: 'text',
      localized: true,
      defaultValue: 'No catalogues are currently available.',
      admin: { description: 'Shown when there are no active catalogues.' },
    },
    {
      name: 'buyButtonLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Buy catalogue',
      admin: { description: 'Label of the button that opens the catalogue checkout.' },
    },
  ],
}
