import React from 'react';
import styles from './Header.module.css'

interface HeaderProps {
  time: string
  paymentCurrency: string
  purchasedCurrency: string
  purchasedValue: number
}

const Header: React.FC<HeaderProps> = ({
                                         time,
                                         paymentCurrency,
                                         purchasedCurrency,
                                         purchasedValue
}) => {
  return (
    <div>
      <div className={styles.payment}>1 {paymentCurrency} is</div>
      <div className={styles.purchased}>{purchasedValue} {purchasedCurrency}</div>
      <div className={styles.time}>{time}</div>
    </div>
  )
}

export { Header }