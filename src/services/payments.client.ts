import type {
  CreateCataloguePaymentInput,
  CreateCataloguePaymentResponse,
} from '@/types/cataloguePurchase'
import type {
  ClaimCataloguePaymentInput,
  ClaimCataloguePaymentResponse,
} from '@/types/cataloguePayment'

export class CataloguePaymentCreationError extends Error {}
export class CataloguePaymentClaimError extends Error {}

export async function createCataloguePayment(input: CreateCataloguePaymentInput) {
  const response = await fetch('/api/payments/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  const data = (await response.json()) as CreateCataloguePaymentResponse
  if (!response.ok) throw new CataloguePaymentCreationError()

  return data
}

export async function claimCataloguePayment(input: ClaimCataloguePaymentInput) {
  const response = await fetch('/api/payments/claim', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  const data = (await response.json()) as ClaimCataloguePaymentResponse
  if (!response.ok) throw new CataloguePaymentClaimError()

  return data
}
