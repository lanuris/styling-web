'use client'

import { useState } from 'react'

import { CataloguePaymentClaimError, claimCataloguePayment } from '@/services/payments.client'
import type { PaymentClaimContent } from '@/types/cataloguePayment'

type PaymentClaimButtonProps = {
  content: PaymentClaimContent
  disabled: boolean
  token: string
}

export function PaymentClaimButton({ content, disabled, token }: PaymentClaimButtonProps) {
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null)
  const [loading, setLoading] = useState(false)

  const claim = async () => {
    setLoading(true)
    setMessage(null)

    try {
      await claimCataloguePayment({ token })
      setMessage({ text: content.confirmationSubmitted, type: 'success' })
    } catch (error) {
      setMessage({
        text:
          error instanceof CataloguePaymentClaimError
            ? content.confirmationError
            : content.confirmationNetworkError,
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-3">
      <button
        type="button"
        disabled={disabled || loading}
        onClick={claim}
        className="w-full rounded-full bg-[#2b211e] px-6 py-3 text-base font-semibold tracking-wide text-[#fffaf5] transition-colors hover:bg-[#503a32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64643] focus-visible:ring-offset-4 focus-visible:ring-offset-[#fffaf5] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#ead7cb] dark:text-[#2b211e] dark:hover:bg-[#f7e8de] dark:focus-visible:ring-offset-[#2b2421]"
      >
        {loading ? content.submittingConfirmation : content.submitConfirmation}
      </button>
      {message && (
        <p
          className={
            message.type === 'success'
              ? 'rounded-xl bg-emerald-100 px-4 py-3 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100'
              : 'rounded-xl bg-[#f1dfd7] px-4 py-3 text-sm text-[#5b2728] dark:bg-[#4a2c29] dark:text-[#f3c8c2]'
          }
          role="status"
        >
          {message.text}
        </p>
      )}
    </div>
  )
}
