import { Check, Info, Landmark, Mail, ShoppingBag, UserRound } from 'lucide-react'
import type { FormEvent } from 'react'

import { Currency } from '@/constants/payments'
import type { CataloguePurchaseContent } from '@/types/cataloguePurchase'

type CataloguePurchaseFormProps = {
  title: string
  priceCzk: number
  priceEur: number
  content: CataloguePurchaseContent
  name: string
  email: string
  selectedCurrency: Currency
  error: string
  loading: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onCurrencyChange: (currency: Currency) => void
}

export function CataloguePurchaseForm({
  title,
  priceCzk,
  priceEur,
  content,
  name,
  email,
  selectedCurrency,
  error,
  loading,
  onSubmit,
  onNameChange,
  onEmailChange,
  onCurrencyChange,
}: CataloguePurchaseFormProps) {
  const prices = { [Currency.CZK]: priceCzk, [Currency.EUR]: priceEur }
  const text = (key: keyof CataloguePurchaseContent, _fallback: string) => content[key]

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-3xl rounded-[2rem] bg-[#f7f2ed] p-6 font-[Georgia,'Times_New_Roman',serif] text-[#241c1a] shadow-sm sm:p-10 dark:bg-[#211b19] dark:text-[#f7f2ed]"
    >
      <header className="border-b border-[#c9b7aa] pb-8 dark:border-[#5b4740]">
        <p className="mb-3 text-base font-semibold uppercase tracking-[0.18em] text-[#9b3437] dark:text-[#e28c85]">
          {text('eyebrow', 'Complete your order')}
        </p>
        <h1 className="text-3xl font-semibold tracking-[0.02em] text-[#3d2923] sm:text-4xl dark:text-[#ead7cb]">
          {title}
        </h1>
      </header>

      <div className="mt-8 grid gap-8">
        <section aria-labelledby="order-summary-heading">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-[#2b211e] text-base font-semibold text-[#fffaf5] dark:bg-[#ead7cb] dark:text-[#2b211e]">
              1
            </span>
            <h2
              id="order-summary-heading"
              className="text-xl font-semibold text-[#3d2923] dark:text-[#ead7cb]"
            >
              {text('orderSummary', 'Order summary')}
            </h2>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#d7c9bf] bg-[#fffaf5] p-5 dark:border-[#5b4740] dark:bg-[#2b2421]">
            <div className="flex min-w-0 items-center gap-3">
              <ShoppingBag
                className="size-5 shrink-0 text-[#9b3437] dark:text-[#e28c85]"
                aria-hidden="true"
              />
              <span className="truncate text-lg font-semibold">{title}</span>
            </div>
            <span className="whitespace-nowrap text-lg font-semibold text-[#9b3437] dark:text-[#e28c85]">
              {prices[selectedCurrency]} {selectedCurrency}
            </span>
          </div>
        </section>

        <fieldset>
          <legend className="mb-4 flex items-center gap-3 text-xl font-semibold text-[#3d2923] dark:text-[#ead7cb]">
            <span className="grid size-8 place-items-center rounded-full bg-[#2b211e] text-base font-semibold text-[#fffaf5] dark:bg-[#ead7cb] dark:text-[#2b211e]">
              2
            </span>
            {text('chooseCurrency', 'Choose your currency')}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {([Currency.CZK, Currency.EUR] as const).map((currency) => {
              const selected = selectedCurrency === currency
              return (
                <label
                  key={currency}
                  className={`relative flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-colors ${selected ? 'border-[#9b3437] bg-[#f1dfd7] ring-1 ring-[#9b3437] dark:border-[#e28c85] dark:bg-[#4a2c29] dark:ring-[#e28c85]' : 'border-[#d7c9bf] bg-[#fffaf5] hover:border-[#a98d7c] dark:border-[#5b4740] dark:bg-[#2b2421] dark:hover:border-[#866c60]'}`}
                >
                  <input
                    type="radio"
                    name="currency"
                    value={currency}
                    checked={selected}
                    onChange={() => onCurrencyChange(currency)}
                    className="sr-only"
                  />
                  <span className="text-lg font-semibold">{currency}</span>
                  <span className="flex items-center gap-2 text-lg font-semibold text-[#9b3437] dark:text-[#e28c85]">
                    {prices[currency]} {currency}
                    {selected && <Check className="size-5" aria-hidden="true" />}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-4 flex items-center gap-3 text-xl font-semibold text-[#3d2923] dark:text-[#ead7cb]">
            <span className="grid size-8 place-items-center rounded-full bg-[#2b211e] text-base font-semibold text-[#fffaf5] dark:bg-[#ead7cb] dark:text-[#2b211e]">
              3
            </span>
            {text('paymentMethod', 'Payment method')}
          </legend>
          <label className="relative flex cursor-pointer items-center gap-4 rounded-2xl border border-[#9b3437] bg-[#f1dfd7] p-5 ring-1 ring-[#9b3437] dark:border-[#e28c85] dark:bg-[#4a2c29] dark:ring-[#e28c85]">
            <input
              type="radio"
              name="payment-method"
              value="bank-transfer"
              defaultChecked
              className="sr-only"
            />
            <span className="grid size-11 place-items-center rounded-full bg-[#2b211e] text-[#fffaf5] dark:bg-[#ead7cb] dark:text-[#2b211e]">
              <Landmark className="size-5" aria-hidden="true" />
            </span>
            <span className="grid gap-1">
              <span className="text-lg font-semibold">{text('bankTransfer', 'Bank transfer')}</span>
              <span className="text-base font-normal leading-relaxed text-[#6c554a] dark:text-[#f3c8c2]">
                {text(
                  'bankTransferHint',
                  'Transfer instructions and a QR code will be available after your order is created.',
                )}
              </span>
            </span>
            <Check
              className="ml-auto size-5 shrink-0 text-[#9b3437] dark:text-[#e28c85]"
              aria-hidden="true"
            />
          </label>
        </fieldset>

        <section aria-labelledby="details-heading">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-[#2b211e] text-base font-semibold text-[#fffaf5] dark:bg-[#ead7cb] dark:text-[#2b211e]">
              4
            </span>
            <h2
              id="details-heading"
              className="text-xl font-semibold text-[#3d2923] dark:text-[#ead7cb]"
            >
              {text('yourDetails', 'Your details')}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-base font-semibold">
              {text('nameLabel', 'Name')}
              <span className="relative">
                <UserRound
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8b7164]"
                  aria-hidden="true"
                />
                <input
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => onNameChange(event.target.value)}
                  className="w-full rounded-xl border border-[#d7c9bf] bg-[#fffaf5] py-3 pl-10 pr-4 text-base font-normal outline-none transition focus:border-[#9b3437] focus:ring-2 focus:ring-[#9b3437]/20 dark:border-[#5b4740] dark:bg-[#2b2421] dark:focus:border-[#e28c85]"
                />
              </span>
            </label>
            <label className="grid gap-2 text-base font-semibold">
              {text('emailLabel', 'Email address')}
              <span className="relative">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8b7164]"
                  aria-hidden="true"
                />
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => onEmailChange(event.target.value)}
                  className="w-full rounded-xl border border-[#d7c9bf] bg-[#fffaf5] py-3 pl-10 pr-4 text-base font-normal outline-none transition focus:border-[#9b3437] focus:ring-2 focus:ring-[#9b3437]/20 dark:border-[#5b4740] dark:bg-[#2b2421] dark:focus:border-[#e28c85]"
                />
              </span>
            </label>
          </div>
          <div
            className="mt-4 flex gap-3 rounded-xl border border-[#d7c9bf] bg-[#fffaf5] p-4 text-base leading-relaxed text-[#6c554a] dark:border-[#5b4740] dark:bg-[#2b2421] dark:text-[#c6afa3]"
            role="note"
          >
            <Info
              className="mt-0.5 size-5 shrink-0 text-[#9b3437] dark:text-[#e28c85]"
              aria-hidden="true"
            />
            <p>
              {text('emailNotice', 'We’ll use your email to send your order and access details.')}
            </p>
          </div>
        </section>
      </div>

      {error && (
        <p
          className="mt-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-base text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {error}
        </p>
      )}

      <footer className="mt-8 flex flex-col gap-4 border-t border-[#c9b7aa] pt-7 sm:flex-row sm:items-center sm:justify-between dark:border-[#5b4740]">
        <p className="text-base text-[#6c554a] dark:text-[#c6afa3]">
          {text(
            'futurePaymentMethods',
            'More payment methods will be available here in the future.',
          )}
        </p>
        <button
          disabled={loading}
          className="rounded-full bg-[#2b211e] px-8 py-3 text-base font-semibold tracking-wide text-[#fffaf5] transition-colors hover:bg-[#503a32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64643] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f2ed] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#ead7cb] dark:text-[#2b211e] dark:hover:bg-[#f7e8de] dark:focus-visible:ring-offset-[#211b19]"
        >
          {loading
            ? text('creatingPayment', 'Creating payment…')
            : `${text('continueToPayment', 'Continue to payment')} · ${prices[selectedCurrency]} ${selectedCurrency}`}
        </button>
      </footer>
    </form>
  )
}
