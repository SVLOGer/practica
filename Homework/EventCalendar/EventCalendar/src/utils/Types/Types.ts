type CardType = {
    text: string,
    id: number
}

type CardColumnType = {
    column: number,
    cardsIds: number[]
}

type CardPlaceType = {
    columnIndex: number,
    cardIndex: number
}

type CoordsType = {
    x: number,
    y: number
}

export {CardType, CardPlaceType, CoordsType, CardColumnType}