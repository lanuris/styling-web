export const paymentEmailTemplateVariables = [
  { name: 'paymentId', description: 'Payment ID' },
  { name: 'buyerName', description: 'Buyer name' },
  { name: 'buyerEmail', description: 'Buyer email address' },
  { name: 'amount', description: 'Payment amount' },
  { name: 'currency', description: 'Payment currency' },
  { name: 'adminUrl', description: 'Link to review the payment in the admin panel' },
  { name: 'downloadUrl', description: 'Private catalogue download link' },
  { name: 'paymentInstructionsUrl', description: 'Link to the buyer payment instructions' },
] as const

type PaymentEmailTemplateVariable = (typeof paymentEmailTemplateVariables)[number]['name']

type PaymentEmailData = {
  amount: number
  buyerEmail: string
  buyerName: string
  currency: string
  paymentId?: string | null
}

type PaymentEmailURLs = Pick<
  Record<PaymentEmailTemplateVariable, string>,
  'adminUrl' | 'downloadUrl' | 'paymentInstructionsUrl'
>

export const paymentEmailTemplateVariablesDescription = `You can use ${paymentEmailTemplateVariables
  .map(({ name }) => `{{${name}}}`)
  .join(', ')}. The message fields accept HTML.`

export const getPaymentEmailTemplateValues = (
  payment: PaymentEmailData,
  urls: PaymentEmailURLs,
): Record<PaymentEmailTemplateVariable, string> => ({
  paymentId: payment.paymentId || '',
  buyerName: payment.buyerName,
  buyerEmail: payment.buyerEmail,
  amount: String(payment.amount),
  currency: payment.currency,
  ...urls,
})
