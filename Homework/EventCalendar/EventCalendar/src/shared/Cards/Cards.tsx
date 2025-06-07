import React from 'react'
import styles from './Cards.module.css'
import type { CardType } from '../../utils/Types/Types.ts'
import { Card } from '../Card/Card.tsx'
import { CardsColumn } from '../CardsColumn/CardsColumn.tsx'
import { useDnD } from '../../utils/Hooks/useDnD/useDnd.ts'

interface CardsProps {
    cards: CardType[]
}

const initialCardsPlaces = [
    { column: 1, cardsIds: [1, 2] },
    { column: 2, cardsIds: [3] },
    { column: 3, cardsIds: [] },
    { column: 4, cardsIds: [4, 5] },
]

const Cards: React.FC<CardsProps> = ({ cards }) => {
    const {
        cardsPlaces,
        draggedCardId,
        draggedStyle,
        insertPosition,
        columnRefs,
        cardRefs,
        onMouseDown,
    } = useDnD(initialCardsPlaces)

    return (
        <div className={styles.cards} >
            {cardsPlaces.map((place, colIndex) => (
                <div
                    className={styles.column}
                    key={place.column}
                    ref={(e) => {
                        columnRefs.current[colIndex] = e
                    }}
                >
                    <CardsColumn
                        place={place}
                        colIndex={colIndex}
                        cards={cards}
                        draggedCardId={draggedCardId}
                        insertPosition={insertPosition}
                        cardRefs={cardRefs}
                        onMouseDown={onMouseDown}
                    />
                </div>
            ))}

            {draggedCardId !== null && (() => {
                const draggedCard = cards.find((card) => card.id === draggedCardId)
                if (!draggedCard) return null
                return (
                    <div style={draggedStyle}>
                        <Card card={draggedCard} />
                    </div>
                )
            })()}
        </div>
    )
}

export { Cards }