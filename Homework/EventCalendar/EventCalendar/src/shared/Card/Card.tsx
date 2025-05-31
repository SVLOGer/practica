import React from 'react'
import styles from './Card.module.css'
import type {CardType} from "../../utils/Types/Types.ts";

interface CardProps {
    card: CardType
    isDragging?: boolean | false
}

const Card: React.FC<CardProps> = ({card, isDragging}) => {
    return (
        <div className={`${styles.text} ${isDragging ? styles.dragging : styles.normal}`}>
            {card.text}
        </div>
    )
}

export {Card}