import React from 'react'
import styles from './Filters.module.css'

interface FiltersProps {
  filters: string[]
  clearFilters: () => void
  setFilter: (filter: string) => void
}

const Filters: React.FC<FiltersProps> = ({filters, clearFilters, setFilter}) => {
  return (
    <div className={styles.filters}>
      {filters.map((filter) => (
        <button className={styles.filterButton} onClick={() => setFilter(filter)}>{filter}</button>
      ))}
      <button className={styles.clearButton} onClick={() => clearFilters()}>Clear filters</button>
    </div>
  )
}

export { Filters }