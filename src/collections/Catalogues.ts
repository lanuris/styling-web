import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

import { adminOnly } from '@/access/adminOnly'
import { catalogueStorageDir } from '@/utilities/catalogueStorage'
import { locales } from '@/locales'

export const Catalogues: CollectionConfig = {
  slug: 'catalogues',
  labels: { singular: 'Catalogue', plural: 'Catalogues' },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive', 'priceCzk', 'priceEur', 'updatedAt'],
  },
  upload: {
    staticDir: catalogueStorageDir,
    mimeTypes: ['application/pdf'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
      admin: {
        description: 'Catalogue title for administration and catalogue views.',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'The existing catalogue title is migrated here. Displayed below the Active Catalogue block title.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'Catalogue details. Line breaks are preserved, so this works well for feature lists.',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      required: true,
      admin: {
        description: 'Only one catalogue can be active. Enabling this one automatically deactivates the current active catalogue.',
      },
    },
    {
      name: 'priceCzk',
      type: 'number',
      required: true,
      defaultValue: 250,
      min: 1,
      admin: { description: 'Catalogue price in Czech koruna (CZK).' },
    },
    {
      name: 'priceEur',
      type: 'number',
      required: true,
      defaultValue: 10,
      min: 0.01,
      admin: {
        description:
          'Catalogue price in euro (EUR). Customers can pay this amount using a SEPA transfer.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ context, data, originalDoc, req }) => {
        if (context.skipActiveCatalogueRule || data.isActive !== true) return data

        const activeCatalogues = await req.payload.find({
          collection: 'catalogues',
          depth: 0,
          limit: 100,
          overrideAccess: true,
          req,
          where: {
            and: [
              { isActive: { equals: true } },
              ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
            ],
          },
        })

        for (const catalogue of activeCatalogues.docs) {
          await req.payload.update({
            collection: 'catalogues',
            id: catalogue.id,
            data: { isActive: false },
            overrideAccess: true,
            req,
            context: { ...context, skipActiveCatalogueRule: true },
          })
        }

        if (activeCatalogues.docs.length) {
          req.payload.logger.info(
            `Activated catalogue and deactivated ${activeCatalogues.docs.length} previous active catalogue${activeCatalogues.docs.length === 1 ? '' : 's'}.`,
          )
        }

        return data
      },
    ],
    afterChange: [
      ({ doc }) => {
        locales.forEach((locale) => revalidatePath(`/${locale}`, 'layout'))
        return doc
      },
    ],
  },
}
