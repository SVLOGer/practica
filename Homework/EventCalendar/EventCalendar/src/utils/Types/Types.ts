type CardType = {
    text: string,
    id: number
}

type CardPlaceType = {
    column: number,
    cardsIds: number[]
}

type CoordsType = {
    x: number,
    y: number
}

export {CardType, CardPlaceType, CoordsType}