import React from 'react'
import { Card } from '../Card/Card.tsx'
import styles from './CardsColumn.module.css'
import type {CardType, CardPlaceType, CardColumnType} from '../../utils/Types/Types.ts'

interface ColumnProps {
    place: CardColumnType
    colIndex: number
    cards: CardType[]
    draggedCardId: number | null
    insertPosition: CardPlaceType | null
    cardRefs: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>
    onMouseDown: (e: React.MouseEvent, cardId: number, columnIndex: number) => void
}

const CardsColumn: React.FC<ColumnProps> = ({
                                                  place,
                                                  colIndex,
                                                  cards,
                                                  draggedCardId,
                                                  insertPosition,
                                                  cardRefs,
                                                  onMouseDown,
                                              }) => {
    return (
        <div className={styles.column}>
            {place.cardsIds.map((cardId, cardIndex) => {
                    const card = cards.find((c) => c.id === cardId)
                    if (!card) return null

                    const isInsertPosition =
                        insertPosition &&
                        insertPosition.columnIndex === colIndex &&
                        insertPosition.cardIndex === cardIndex

                    return (
                        <React.Fragment key={card.id}>
                            {isInsertPosition && draggedCardId !== null && (
                                <Card
                                    card={cards.find((c) => c.id === draggedCardId) || card}
                    style='potential'
                        />
                )}

                    {draggedCardId === cardId ? null : (
                        <div
                            ref={(e) => {
                        cardRefs.current[cardId] = e
                    }}
                        onMouseDown={(e) => onMouseDown(e, card.id, colIndex)}
                        style={{ cursor: 'grab' }}
                    >
                        <Card card={card} />
                    </div>
                    )}
                    </React.Fragment>
                )
                })}

    {insertPosition &&
    insertPosition.columnIndex === colIndex &&
    insertPosition.cardIndex === place.cardsIds.length &&
    draggedCardId !== null && (
        <Card
            card={cards.find((c) => c.id === draggedCardId) || { id: -1, text: '' }}
        style='potential'
            />
    )}
    </div>
)
}

export { CardsColumn }