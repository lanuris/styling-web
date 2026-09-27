'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { CataloguePurchaseForm } from '@/components/CataloguePurchaseForm'
import { Currency } from '@/constants/payments'
import { CataloguePaymentCreationError, createCataloguePayment } from '@/services/payments.client'
import type { CataloguePurchaseContent } from '@/types/cataloguePurchase'

type CataloguePurchasePageClientProps = {
  catalogue: { id: string; title: string; priceCzk: number; priceEur: number }
  locale: string
  content: CataloguePurchaseContent
}

export function CataloguePurchasePageClient({
  catalogue,
  locale,
  content,
}: CataloguePurchasePageClientProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(Currency.CZK)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payment = await createCataloguePayment({
        catalogueId: catalogue.id,
        name,
        email,
        locale,
        currency: selectedCurrency,
      })
      router.push(payment.checkoutUrl)
    } catch (error) {
      setError(
        error instanceof CataloguePaymentCreationError
          ? content.paymentCreationError
          : content.paymentCreationNetworkError,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <CataloguePurchaseForm
      title={catalogue.title}
      priceCzk={catalogue.priceCzk}
      priceEur={catalogue.priceEur}
      content={content}
      name={name}
      email={email}
      selectedCurrency={selectedCurrency}
      error={error}
      loading={loading}
      onSubmit={submit}
      onNameChange={setName}
      onEmailChange={setEmail}
      onCurrencyChange={setSelectedCurrency}
    />
  )
}
