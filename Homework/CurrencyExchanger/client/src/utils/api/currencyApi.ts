import { CurrencyType, RatePointType } from '../types/types.ts'
import { API_GET_CURRENCIES_URL, API_GET_PRICES_URL } from '../config/config'

export const fetchCurrencies = async (): Promise<CurrencyType[]> => {
  try {
    const response = await fetch(API_GET_CURRENCIES_URL)
    if (!response.ok) throw new Error('Failed to fetch currencies')
    return await response.json()
  } catch (error) {
    console.error('Error fetching currencies:', error)
    throw error
  }
}

export const fetchExchangeRates = async (
  paymentCurrency: string,
  purchasedCurrency: string
): Promise<RatePointType[]> => {
  try {
    const fromDateTime = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const response = await fetch(
      `${API_GET_PRICES_URL}?PaymentCurrency=${paymentCurrency}&PurchasedCurrency=${purchasedCurrency}&FromDateTime=${encodeURIComponent(fromDateTime)}`
    )

    if (!response.ok) throw new Error('Failed to fetch exchange rates')

    const data = await response.json()
    return data.map((entry: any) => ({
      timestamp: new Date(entry.dateTime).getTime(),
      value: entry.price,
    }))
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    throw error
  }
}