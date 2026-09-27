export enum Currency {
  CZK = 'CZK',
  EUR = 'EUR',
}

export enum PaymentStatus {
  AwaitingPayment = 'awaiting_payment',
  PaymentClaimed = 'payment_claimed',
  Paid = 'paid',
  PaymentNotReceived = 'payment_not_received',
}
