import type { GlobalConfig, TextField } from 'payload'

import { adminOnly } from '@/access/adminOnly'

const defaults = {
  eyebrow: 'Complete your order',
  orderSummary: 'Order summary',
  chooseCurrency: 'Choose your currency',
  paymentMethod: 'Payment method',
  bankTransfer: 'Bank transfer',
  bankTransferHint:
    'Transfer instructions and a QR code will be available after your order is created.',
  yourDetails: 'Your details',
  nameLabel: 'Name',
  emailLabel: 'Email address',
  emailNotice: "We'll use your email to send your order and access details.",
  futurePaymentMethods: 'More payment methods will be available here in the future.',
  creatingPayment: 'Creating payment...',
  continueToPayment: 'Continue to payment',
  paymentCreationError: 'Could not create the payment.',
  paymentCreationNetworkError: 'Could not create the payment. Please try again.',
} as const

type CheckoutTranslationContentKey = keyof typeof defaults

const contentField = (name: CheckoutTranslationContentKey): TextField => ({
  name,
  type: 'text',
  localized: true,
  required: true,
  defaultValue: defaults[name],
})

export const CheckoutTranslationSettings: GlobalConfig = {
  slug: 'checkout-translation-settings',
  label: 'Checkout translations',
  access: { read: adminOnly, update: adminOnly },
  admin: { group: 'Settings' },
  fields: [
    {
      type: 'group',
      name: 'content',
      label: 'Catalogue purchase page',
      fields: (Object.keys(defaults) as CheckoutTranslationContentKey[]).map(contentField),
    },
  ],
}
