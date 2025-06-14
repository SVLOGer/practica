import { create } from 'zustand'
import { FilterType } from '../utils/types/types.ts'

interface CurrencyState {
  paymentCurrency: string
  purchasedCurrency: string
  paymentCurrencyDesc: string
  purchasedCurrencyDesc: string
  filters: FilterType[]
  actions: {
    setPaymentCurrency: (code: string) => void
    setPurchasedCurrency: (code: string) => void
    setPaymentCurrencyDesc: (desc: string) => void
    setPurchasedCurrencyDesc: (desc: string) => void
    addFilter: (filter: FilterType) => void
    clearFilters: () => void
  }
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  paymentCurrency: '',
  purchasedCurrency: '',
  paymentCurrencyDesc: '',
  purchasedCurrencyDesc: '',
  filters: [],
  actions: {
    setPaymentCurrency: (code) => set({ paymentCurrency: code }),
    setPurchasedCurrency: (code) => set({ purchasedCurrency: code }),
    setPaymentCurrencyDesc: (desc) => set({ paymentCurrencyDesc: desc }),
    setPurchasedCurrencyDesc: (desc) => set({ purchasedCurrencyDesc: desc }),
    addFilter: (filter) => set((state) => ({
      filters: state.filters.some(f =>
        f.paymentCurrency === filter.paymentCurrency &&
        f.purchasedCurrency === filter.purchasedCurrency
      ) ? state.filters : [...state.filters, filter]
    })),
    clearFilters: () => set({ filters: [] }),
  },
}))

export const useCurrencyActions = () => useCurrencyStore((state) => state.actions)