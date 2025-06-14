import { useCallback, useEffect, useState } from 'react'
import { CurrencyType, RatePointType } from '../types/types.ts'
import { fetchCurrencies, fetchExchangeRates } from '../api/currencyApi.ts'
import { useCurrencyActions } from '../../store/store.ts'

export const useCurrencyData = (
  paymentCurrency: string,
  purchasedCurrency: string
) => {
  const {
    setPaymentCurrencyDesc,
    setPurchasedCurrencyDesc,
  } = useCurrencyActions()

  const [currencies, setCurrencies] = useState<CurrencyType[]>([])
  const [rateHistory, setRateHistory] = useState<RatePointType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCurrencies = async () => {
    try {
      setLoading(true)
      const data = await fetchCurrencies()
      setCurrencies(data)
      setError('')
    } catch (err) {
      setError('Failed to load currencies')
    } finally {
      setLoading(false)
    }
  }

  const loadRates = async () => {
    if (!paymentCurrency || !purchasedCurrency) return

    try {
      setLoading(true)
      const data = await fetchExchangeRates(paymentCurrency, purchasedCurrency)
      setRateHistory(data)
      setError('')
    } catch (err) {
      setError('Failed to load exchange rates')
    } finally {
      setLoading(false)
    }
  }

  const updateDescriptions = useCallback(() => {
    if (!currencies.length) return

    const from = currencies.find(c => c.code === paymentCurrency)
    const to = currencies.find(c => c.code === purchasedCurrency)

    if (from) setPaymentCurrencyDesc(from.description)
    if (to) setPurchasedCurrencyDesc(to.description)
  }, [currencies, paymentCurrency, purchasedCurrency, setPaymentCurrencyDesc, setPurchasedCurrencyDesc])


  useEffect(() => {
    loadCurrencies()
  }, [])

  useEffect(() => {
    loadRates()

    const interval = setInterval(loadRates, 5000)
    updateDescriptions()

    return () => clearInterval(interval)
  }, [paymentCurrency, purchasedCurrency])

  return { currencies, rateHistory, loading, error, reload: loadRates }
}