import React, { useState } from 'react';
import styles from './Description.module.css'

type ItemDescType = {title: string, description: string}

interface DescriptionProps {
  items: ItemDescType[]
}

const Description: React.FC<DescriptionProps> = ({items}) => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <div className={styles.lineContainer}>
        <div className={styles.line} />
        <button
          className={styles.toggleButton}
          onClick={() => setVisible(v => !v)}
        >
          {visible ? 'Скрыть описание' : 'Показать описание'}
        </button>
      </div>
      {visible && items.map((i, index) => (
        <div key={index}>
          <strong>{i.title}:</strong> {i.description}
        </div>
      ))}
    </div>
  )
}

export { Description }
