import React, { useCallback, useMemo } from 'react'
import styles from './MainPage.module.css'
import { useCurrencyStore, useCurrencyActions } from '../../store/store'
import { Description } from '../../shared/Description/Description.tsx'
import { Graph } from '../../shared/Graph/Graph.tsx'
import { DropDown } from '../../shared/DropDown/DropDown.tsx'
import { Header } from '../../shared/Header/Header.tsx'
import { Filters } from '../../shared/Filters/Filters.tsx'
import { ErrorMessage } from '../../shared/ErrorMessage/ErrorMessage.tsx'
import { Loader } from '../../shared/Loader/Loader.tsx'
import { useCurrencyData } from '../../utils/hooks/useCurrencyData.ts'

const MainPage: React.FC = () => {
  const paymentCurrency = useCurrencyStore(state => state.paymentCurrency)
  const purchasedCurrency = useCurrencyStore(state => state.purchasedCurrency)
  const paymentCurrencyDesc = useCurrencyStore(state => state.paymentCurrencyDesc)
  const purchasedCurrencyDesc = useCurrencyStore(state => state.purchasedCurrencyDesc)
  const filters = useCurrencyStore(state => state.filters)

  const {
    setPaymentCurrency,
    setPurchasedCurrency,
    addFilter,
    clearFilters
  } = useCurrencyActions()

  const {
    currencies,
    rateHistory,
    loading,
    error
  } = useCurrencyData(paymentCurrency, purchasedCurrency)


  const currentRate = useMemo(() =>
      rateHistory[rateHistory.length - 1]?.value ?? 1,
    [rateHistory]
  )

  const formatDateToUTCStringShort = useCallback((timestamp: number) => {
    const date = new Date(timestamp)
    return date.toUTCString().replace(/(\d{2}:\d{2}):\d{2}/, '$1')
  }, [])

  const findCurrency = useCallback((currency: string) => {
    return currencies.find(c => c.code === currency)
  }, [currencies])

  const getTitleForDescription = useCallback((currency: string) => {
    const found = findCurrency(currency)
    return found ? `${found.name} - ${found.code} - ${found.symbol}` : ''
  }, [findCurrency])

  const filterStrings = useMemo(() =>
      filters.map(filter => `${filter.paymentCurrency} / ${filter.purchasedCurrency}`),
    [filters]
  )

  const handleAddFilter = useCallback(() => {
    addFilter({ paymentCurrency, purchasedCurrency })
  }, [addFilter, paymentCurrency, purchasedCurrency])

  const applyFilter = useCallback((filter: string) => {
    const [payment, purchased] = filter.split(' / ')
    setPaymentCurrency(payment)
    setPurchasedCurrency(purchased)
  }, [setPaymentCurrency, setPurchasedCurrency])

  if (loading && currencies.length === 0) {
    return <Loader />
  }

  if (error && currencies.length === 0) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className={styles.pageBackground}>
      <div className={styles.filterContainer}>
        <Filters
          filters={filterStrings}
          setFilter={applyFilter}
          clearFilters={clearFilters}
        />
      </div>

      <div className={styles.container}>
        {paymentCurrency && purchasedCurrency && (
          <div className={styles.header}>
            <Header
              time={formatDateToUTCStringShort(Date.now())}
              paymentCurrency={findCurrency(paymentCurrency)?.name ?? paymentCurrency}
              purchasedCurrency={findCurrency(purchasedCurrency)?.name ?? purchasedCurrency}
              purchasedValue={currentRate}
            />
            <button
              className={styles.saveButton}
              onClick={handleAddFilter}
            >
              + Save filter
            </button>
          </div>
        )}

        {error && <p>{error}</p>}

        <div className={styles.valueChanges}>
          <div>
            <DropDown
              defaultValue={'Выберите валюту'}
              items={currencies}
              firstValue={paymentCurrency}
              secondValue={purchasedCurrency}
              setFirst={setPaymentCurrency}
              setSecond={setPurchasedCurrency}
              secondAmount={currentRate}
            />
          </div>

          {rateHistory.length > 0 && (
            <Graph data={rateHistory} />
          )}
        </div>

        {paymentCurrency && purchasedCurrency && (
          <Description items={[
            {
              title: getTitleForDescription(paymentCurrency),
              description: paymentCurrencyDesc
            },
            {
              title: getTitleForDescription(purchasedCurrency),
              description: purchasedCurrencyDesc
            }
          ]} />
        )}
      </div>
    </div>
  )
}

export { MainPage }