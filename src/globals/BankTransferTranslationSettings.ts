import type { GlobalConfig, TextField } from 'payload'

import { adminOnly } from '@/access/adminOnly'

const defaults = {
  eyebrow: 'Payment instructions',
  title: 'Bank transfer',
  description: 'Use the details below to complete your catalogue payment.',
  paidTitle: 'Payment approved',
  paidDescription:
    'Your payment has been approved. Use the private link in your email to download the catalogue.',
  transferAmount: 'Transfer amount',
  catalogueOrder: 'Catalogue order',
  bankDetails: 'Bank details',
  accountOwner: 'Account owner',
  accountNumber: 'Account number',
  iban: 'IBAN',
  bic: 'BIC / SWIFT',
  paymentReference: 'Payment reference',
  qrCodeAlt: 'QR code with the bank transfer details',
  bankDetailsNotConfigured:
    'Bank-transfer details for {currency} are not configured yet. Please contact us for payment instructions.',
  confirmTransfer: 'Confirm your transfer',
  confirmationDescription:
    "Once your transfer is sent, let us know. We'll check the payment and email your catalogue when it is approved.",
  submittingConfirmation: 'Sending confirmation...',
  submitConfirmation: 'I have sent the transfer',
  confirmationSubmitted: 'Thank you. We notified the team to check your bank transfer.',
  confirmationError: 'Could not submit confirmation.',
  confirmationNetworkError: 'Could not submit confirmation. Please try again.',
} as const

type BankTransferTranslationContentKey = keyof typeof defaults

const contentField = (name: BankTransferTranslationContentKey): TextField => ({
  name,
  type: 'text',
  localized: true,
  required: true,
  defaultValue: defaults[name],
})

export const BankTransferTranslationSettings: GlobalConfig = {
  slug: 'bank-transfer-translation-settings',
  label: 'Bank transfer translations',
  access: { read: adminOnly, update: adminOnly },
  admin: { group: 'Settings' },
  fields: [
    {
      type: 'group',
      name: 'content',
      label: 'Bank transfer payment page',
      fields: (Object.keys(defaults) as BankTransferTranslationContentKey[]).map(contentField),
    },
  ],
}
