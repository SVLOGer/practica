import React, { useState, useRef, useCallback } from 'react'
import type { CardPlaceType, CardColumnType, CoordsType } from '../../Types/Types.ts'

function useDnD(initialPlaces: CardColumnType[]) {
    const [cardsPlaces, setCardsPlaces] = useState<CardColumnType[]>(initialPlaces)
    const [draggedCardId, setDraggedCardId] = useState<number | null>(null)
    const draggedCardIdRef = useRef<number | null>(null)
    const [draggedStyle, setDraggedStyle] = useState<React.CSSProperties>({})
    const [insertPosition, setInsertPosition] = useState<CardPlaceType | null>(null)
    const insertPositionRef = useRef<CardPlaceType | null>(null)
    const [startIndex, setStartIndex] = useState<number>(-1)
    const [startColumn, setStartColumn] = useState<number>(-1)
    const dragOffset = useRef<CoordsType>({ x: 0, y: 0 })

    const columnRefs = useRef<(HTMLDivElement | null)[]>([])
    const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

    const onMouseDown = useCallback(
        (event: React.MouseEvent, cardId: number, columnIndex: number) => {
            event.preventDefault()
            setDraggedCardId(cardId)
            draggedCardIdRef.current = cardId

            const startIdx = cardsPlaces[columnIndex].cardsIds.findIndex((id) => id === cardId)
            setStartIndex(startIdx)
            setStartColumn(columnIndex)

            const startPos = { columnIndex: columnIndex, cardIndex: startIdx }
            setInsertPosition(startPos)
            insertPositionRef.current = startPos

            const rect = (event.target as HTMLElement).getBoundingClientRect()
            dragOffset.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            }

            setDraggedStyle({
                position: 'absolute',
                left: event.clientX - dragOffset.current.x,
                top: event.clientY - dragOffset.current.y,
                pointerEvents: 'none',
                zIndex: 1000,
                width: rect.width,
            })

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        },
        [cardsPlaces]
    )

    const onMouseMove = useCallback(
        (event: MouseEvent) => {
            event.preventDefault()

            setDraggedStyle((style) => ({
                ...style,
                left: event.clientX - dragOffset.current.x,
                top: event.clientY - dragOffset.current.y,
            }))

            const x = event.clientX
            const y = event.clientY

            let hoveredColumnIndex = -1
            for (let i = 0; i < columnRefs.current.length; i++) {
                const col = columnRefs.current[i]
                if (!col) continue
                const rect = col.getBoundingClientRect()
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    hoveredColumnIndex = i
                    break
                }
            }

            if (hoveredColumnIndex === -1) {
                setInsertPosition(null)
                insertPositionRef.current = null
                return
            }

            const cardsInColumn = cardsPlaces[hoveredColumnIndex].cardsIds
            let insertIndex = cardsInColumn.length

            for (let i = 0; i < cardsInColumn.length; i++) {
                const cardEl = cardRefs.current[cardsInColumn[i]]
                if (!cardEl) continue
                const rect = cardEl.getBoundingClientRect()

                if (y < rect.top + rect.height / 2) {
                    insertIndex = i
                    break
                }
            }

            const newPos = { columnIndex: hoveredColumnIndex, cardIndex: insertIndex }
            setInsertPosition(newPos)
            insertPositionRef.current = newPos
        },
        [cardsPlaces]
    )

    const onMouseUp = useCallback(
        (event: MouseEvent) => {
            event.preventDefault()

            const insertPos = insertPositionRef.current
            const draggedId = draggedCardIdRef.current

            if (
                insertPos &&
                draggedId !== null &&
                (startIndex !== insertPos.cardIndex || startColumn !== insertPos.columnIndex)
            ) {
                const newPlaces = cardsPlaces.map((place, index) => {
                    if (index === insertPos.columnIndex) {
                        const filteredCards = place.cardsIds.filter((id) => id !== draggedId)
                        filteredCards.splice(insertPos.cardIndex, 0, draggedId)
                        return {
                            ...place,
                            cardsIds: filteredCards,
                        }
                    } else {
                        return {
                            ...place,
                            cardsIds: place.cardsIds.filter((id) => id !== draggedId),
                        }
                    }
                })

                setCardsPlaces(newPlaces)
            }

            setDraggedCardId(null)
            setDraggedStyle({})
            draggedCardIdRef.current = null
            setInsertPosition(null)
            insertPositionRef.current = null

            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        },
        [cardsPlaces, startIndex, startColumn, onMouseMove]
    )

    return {
        cardsPlaces,
        draggedCardId,
        draggedStyle,
        insertPosition,
        columnRefs,
        cardRefs,
        onMouseDown,
    }
}

export { useDnD }