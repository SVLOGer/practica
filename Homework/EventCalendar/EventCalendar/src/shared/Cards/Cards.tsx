import React, { useState, useRef } from 'react';
import styles from './Cards.module.css';
import type { CardPlaceType, CardType, CoordsType } from "../../utils/Types/Types.ts";
import { Card } from "../Card/Card.tsx";

interface CardsProps {
    cards: CardType[];
}

const Cards: React.FC<CardsProps> = ({ cards }) => {
    const [cardsPlaces, setCardsPlaces] = useState<CardPlaceType[]>([
        { column: 1, cardsIds: [1, 2] },
        { column: 2, cardsIds: [3] },
        { column: 3, cardsIds: [] },
        { column: 4, cardsIds: [4, 5] },
    ]);

    const [draggedCardId, setDraggedCardId] = useState<number | null>(null);
    const [draggedStyle, setDraggedStyle] = useState<React.CSSProperties>({});
    const [insertPosition, setInsertPosition] = useState<{ columnIndex: number; cardIndex: number } | null>(null);
    const dragOffset = useRef<CoordsType>({ x: 0, y: 0 });

    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    const onMouseDown = (event: React.MouseEvent, cardId: number) => {
        event.preventDefault();
        setDraggedCardId(cardId);

        const rect = (event.target as HTMLElement).getBoundingClientRect();
        dragOffset.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

        setDraggedStyle({
            position: 'absolute',
            left: event.clientX - dragOffset.current.x,
            top: event.clientY - dragOffset.current.y,
            pointerEvents: 'none',
            zIndex: 1000,
            width: rect.width,
        });

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (event: MouseEvent) => {
        event.preventDefault();

        setDraggedStyle(style => ({
            ...style,
            left: event.clientX - dragOffset.current.x,
            top: event.clientY - dragOffset.current.y,
        }));

        const x = event.clientX;
        const y = event.clientY;

        let hoveredColumnIndex = -1;
        for (let i = 0; i < columnRefs.current.length; i++) {
            const col = columnRefs.current[i];
            if (!col) continue;
            const rect = col.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                hoveredColumnIndex = i;
                break;
            }
        }

        if (hoveredColumnIndex === -1) {
            setInsertPosition(null);
            return;
        }

        const cardsInColumn = cardsPlaces[hoveredColumnIndex].cardsIds;
        let insertIndex = cardsInColumn.length;

        for (let i = 0; i < cardsInColumn.length; i++) {
            const cardEl = cardRefs.current[cardsInColumn[i]];
            if (!cardEl) continue;
            const rect = cardEl.getBoundingClientRect();

            if (y < rect.top + rect.height / 2) {
                insertIndex = i;
                break;
            }
        }

        setInsertPosition({ columnIndex: hoveredColumnIndex, cardIndex: insertIndex });
    };

    const onMouseUp = (event: MouseEvent) => {
        event.preventDefault();

        setDraggedCardId(null);
        setDraggedStyle({});

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    return (
        <div className={styles.cards} style={{ position: 'relative' }}>
            {cardsPlaces.map((place, colIndex) => (
                <div
                    className={styles.column}
                    key={place.column}
                    ref={e => (columnRefs.current[colIndex] = e)}
                >
                    {place.cardsIds.map((cardId, cardIndex) => {
                        const card = cards.find(c => c.id === cardId);
                        if (!card) return null;

                        const isDragging = draggedCardId === cardId;

                        const shouldShift =
                            insertPosition !== null &&
                            insertPosition.columnIndex === colIndex &&
                            cardIndex >= insertPosition.cardIndex &&
                            draggedCardId !== null &&
                            cardId !== draggedCardId;

                        return (
                            <React.Fragment key={card.id}>
                                {isDragging && (
                                    <div style={{ opacity: 0.4, pointerEvents: 'none' }}>
                                        <Card card={card} isDragging={true} />
                                    </div>
                                )}
                                {!isDragging && (
                                    <div
                                        ref={e => (cardRefs.current[cardId] = e)}
                                        onMouseDown={e => onMouseDown(e, card.id)}
                                        style={{
                                            cursor: 'grab',
                                            transform: shouldShift ? 'translateY(60px)' : undefined,
                                            transition: 'transform 0.2s',
                                        }}
                                    >
                                        <Card card={card} isDragging={false} />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}

                    {insertPosition !== null &&
                        insertPosition.columnIndex === colIndex &&
                        insertPosition.cardIndex === place.cardsIds.length && (
                            <Card card={cards.find(card => card.id === draggedCardId)} />
                        )}
                </div>
            ))}

            {draggedCardId !== null && (() => {
                const draggedCard = cards.find(card => card.id === draggedCardId);
                if (!draggedCard) return null;
                return (
                    <div
                        style={draggedStyle}
                    >
                        <Card card={draggedCard} />
                    </div>
                );
            })()}
        </div>
    );

};

export {Cards};
