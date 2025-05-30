import React, {useEffect, useState} from 'react'
import './MainPage.css'
import {Popup} from "../../shared/Popup/Popup.tsx"
import {ReviewForm} from "../../shared/ReviewForm/ReviewForm.tsx"
import type {Review} from "../../utils/Types/Types.ts"
import {Reviews} from "../../shared/Reviews/Reviews.tsx"

const MainPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        try {
            const stored = localStorage.getItem('reviews')
            if (stored) {
                const parsed = JSON.parse(stored)
                if (Array.isArray(parsed)) {
                    setReviews(parsed)
                }
            }
        } catch (e) {
            console.error("Ошибка чтения из localStorage", e)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('reviews', JSON.stringify(reviews))
    }, [reviews])

    return (
        <div>
            <Popup isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} errorText={errorText} />
            <ReviewForm setErrorText={setErrorText} setIsPopupVisible={setIsPopupVisible} setReviews={setReviews} reviews={reviews} />
            <Reviews reviews={reviews}/>
        </div>
    )
}

export {MainPage}