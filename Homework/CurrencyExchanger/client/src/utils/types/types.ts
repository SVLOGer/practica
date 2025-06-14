type CurrencyType = {
  code: string
  description: string
  name: string
  symbol: string
}

type RatePointType = {
  timestamp: number
  value: number
}

type FilterType = {
  paymentCurrency: string
  purchasedCurrency: string
}

export type { CurrencyType, RatePointType, FilterType }