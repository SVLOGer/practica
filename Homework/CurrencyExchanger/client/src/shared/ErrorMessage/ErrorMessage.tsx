import React from 'react';
import styles from './ErrorMessage.module.css'

interface ErrorProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({message}) => {
  return (
    <div className={styles.container}>
      <div className={styles.error}>{message}</div>
    </div>
  )
}

export { ErrorMessage }