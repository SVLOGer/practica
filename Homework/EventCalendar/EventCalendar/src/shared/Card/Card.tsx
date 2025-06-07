import React from 'react'
import styles from './Card.module.css'
import type {CardType} from "../../utils/Types/Types.ts";

interface CardProps {
    card: CardType
    style?: 'default' | 'shadow' | 'potential'
}

const Card: React.FC<CardProps> = ({card, style = 'default'}) => {
    const cardStyle = (() => {
        switch (style) {
            case 'shadow':
                return styles.shadow
            case 'potential':
                return styles.potential
            case 'default':
                return styles.normal
        }
    })()

    return (
        <div className={`${styles.text} ${cardStyle}`}>
            {card.text}
        </div>
    )
}

export {Card}