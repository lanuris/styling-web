import { CheckCircle2, ReceiptText } from 'lucide-react'

import { PaymentClaimButton } from '@/components/PaymentClaimButton'
import { Currency, PaymentStatus } from '@/constants/payments'
import type { CataloguePaymentContent } from '@/types/cataloguePayment'

type BankTransferPaymentFlowProps = {
  accountNumber?: string
  accountOwner?: string
  amount: number
  bic?: string
  content: CataloguePaymentContent
  currency: Currency
  iban?: string
  isConfigured: boolean
  paymentId: string
  qrCode: string | null
  status: PaymentStatus
  token: string
}

export function BankTransferPaymentFlow({
  accountNumber,
  accountOwner,
  amount,
  bic,
  content,
  currency,
  iban,
  isConfigured,
  paymentId,
  qrCode,
  status,
  token,
}: BankTransferPaymentFlowProps) {
  const canClaim =
    status === PaymentStatus.AwaitingPayment || status === PaymentStatus.PaymentNotReceived
  const isPaid = status === PaymentStatus.Paid
  const paymentReference = currency === Currency.EUR ? `Catalogue ${paymentId}` : paymentId

  return (
    <main className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#f7f2ed] p-6 font-[Georgia,'Times_New_Roman',serif] text-[#241c1a] shadow-sm sm:p-10 dark:bg-[#211b19] dark:text-[#f7f2ed]">
        <header className="border-b border-[#c9b7aa] pb-8 dark:border-[#5b4740]">
          <p className="mb-3 text-base font-semibold uppercase tracking-[0.18em] text-[#9b3437] dark:text-[#e28c85]">
            {content.eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-[0.02em] text-[#3d2923] sm:text-4xl dark:text-[#ead7cb]">
            {content.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#6c554a] dark:text-[#c6afa3]">
            {content.description}
          </p>
        </header>

        {isPaid ? (
          <section
            className="mt-8 rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
            aria-labelledby="payment-approved-heading"
          >
            <CheckCircle2
              className="size-8 text-emerald-700 dark:text-emerald-300"
              aria-hidden="true"
            />
            <h2 id="payment-approved-heading" className="mt-3 text-xl font-semibold">
              {content.paidTitle}
            </h2>
            <p className="mt-2 text-base leading-relaxed">{content.paidDescription}</p>
          </section>
        ) : (
          <>
            <section className="mt-8" aria-labelledby="amount-heading">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-[#2b211e] text-base font-semibold text-[#fffaf5] dark:bg-[#ead7cb] dark:text-[#2b211e]">
                  1
                </span>
                <h2
                  id="amount-heading"
                  className="text-xl font-semibold text-[#3d2923] dark:text-[#ead7cb]"
                >
                  {content.transferAmount}
                </h2>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-[#d7c9bf] bg-[#fffaf5] p-5 dark:border-[#5b4740] dark:bg-[#2b2421]">
                <div className="flex items-center gap-3">
                  <ReceiptText
                    className="size-5 text-[#9b3437] dark:text-[#e28c85]"
                    aria-hidden="true"
                  />
                  <span className="text-lg font-semibold">{content.catalogueOrder}</span>
                </div>
                <strong className="text-2xl text-[#9b3437] dark:text-[#e28c85]">
                  {amount} {currency}
                </strong>
              </div>
            </section>

            <section className="mt-8" aria-labelledby="bank-details-heading">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-[#2b211e] text-base font-semibold text-[#fffaf5] dark:bg-[#ead7cb] dark:text-[#2b211e]">
                  2
                </span>
                <h2
                  id="bank-details-heading"
                  className="text-xl font-semibold text-[#3d2923] dark:text-[#ead7cb]"
                >
                  {content.bankDetails}
                </h2>
              </div>
              {isConfigured ? (
                <div className="grid gap-4 rounded-2xl border border-[#d7c9bf] bg-[#fffaf5] p-5 dark:border-[#5b4740] dark:bg-[#2b2421] sm:grid-cols-[1fr_auto]">
                  <dl className="grid gap-4 text-base">
                    {accountOwner && (
                      <div>
                        <dt className="mb-1 font-semibold text-[#6c554a] dark:text-[#c6afa3]">
                          {content.accountOwner}
                        </dt>
                        <dd className="text-base font-semibold">{accountOwner}</dd>
                      </div>
                    )}
                    {accountNumber && (
                      <div>
                        <dt className="mb-1 font-semibold text-[#6c554a] dark:text-[#c6afa3]">
                          {content.accountNumber}
                        </dt>
                        <dd className="text-base font-semibold">{accountNumber}</dd>
                      </div>
                    )}
                    {iban && (
                      <div>
                        <dt className="mb-1 font-semibold text-[#6c554a] dark:text-[#c6afa3]">
                          {content.iban}
                        </dt>
                        <dd className="break-all text-base font-semibold">{iban}</dd>
                      </div>
                    )}
                    {bic && (
                      <div>
                        <dt className="mb-1 font-semibold text-[#6c554a] dark:text-[#c6afa3]">
                          {content.bic}
                        </dt>
                        <dd className="text-base font-semibold">{bic}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="mb-1 font-semibold text-[#6c554a] dark:text-[#c6afa3]">
                        {content.paymentReference}
                      </dt>
                      <dd className="text-base font-semibold">{paymentReference}</dd>
                    </div>
                  </dl>
                  {qrCode && (
                    <div className="justify-self-center rounded-xl bg-white p-2 shadow-sm">
                      <img src={qrCode} width="180" height="180" alt={content.qrCodeAlt} />
                    </div>
                  )}
                </div>
              ) : (
                <p className="rounded-2xl border border-red-300 bg-red-50 p-5 text-base text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                  {content.bankDetailsNotConfigured.replace('{currency}', currency)}
                </p>
              )}
            </section>

            <section className="mt-8" aria-labelledby="confirmation-heading">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-[#2b211e] text-base font-semibold text-[#fffaf5] dark:bg-[#ead7cb] dark:text-[#2b211e]">
                  3
                </span>
                <h2
                  id="confirmation-heading"
                  className="text-xl font-semibold text-[#3d2923] dark:text-[#ead7cb]"
                >
                  {content.confirmTransfer}
                </h2>
              </div>
              <div className="rounded-2xl border border-[#d7c9bf] bg-[#fffaf5] p-5 dark:border-[#5b4740] dark:bg-[#2b2421]">
                <p className="mb-5 text-base leading-relaxed text-[#6c554a] dark:text-[#c6afa3]">
                  {content.confirmationDescription}
                </p>
                <PaymentClaimButton content={content} token={token} disabled={!canClaim} />
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
