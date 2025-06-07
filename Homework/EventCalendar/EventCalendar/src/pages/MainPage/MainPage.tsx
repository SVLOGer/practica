import React from 'react'
import styles from './MainPage.module.css'
import {Cards} from '../../shared/Cards/Cards.tsx'
import type {CardType} from '../../utils/Types/Types.ts'

const cards: CardType[] = [
    {
        text: 'Wash shirts',
        id: 1
    },
    {
        text: 'Read a book',
        id: 2
    },
    {
        text: 'Go play football',
        id: 3
    },
    {
        text: 'Do home assignment',
        id: 4
    },
    {
        text: 'Go on a date',
        id: 5
    }
]

const MainPage: React.FC = () => {
    return (
        <div className={styles.page}>
            <Cards cards={cards}/>
        </div>
    )
}

export {MainPage}