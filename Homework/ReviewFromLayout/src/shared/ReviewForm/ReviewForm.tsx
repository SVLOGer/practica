import './ReviewForm.css'
import React, {useEffect, useRef, useState} from 'react'
import {Rating} from "../Rating/Rating.tsx"
import type {RatingType, Review} from "../../utils/Types/Types.ts"
import {defaultRatings} from "../../utils/DefaultValues/DefaultRatings.ts"

interface ReviewFormProps {
    setErrorText: (error) => void
    setIsPopupVisible: (visible: boolean) => void
    setReviews: (reviews: Review[]) => void
    reviews: Review[]
}

const ReviewForm: React.FC<ReviewFormProps> = ({setErrorText, setIsPopupVisible, setReviews, reviews}) => {
    const [ratings, setRatings] = useState<RatingType[]>(defaultRatings)
    const [comment, setComment] = useState('')
    const [name, setName] = useState('')
    const [resetStepperTrigger, setResetStepperTrigger] = useState(false)

    const textareaRef = useRef(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }, [comment])

    const handleResetComplete = () => {
        setResetStepperTrigger(false);
    }

    const handleSubmit = () => {
        const isAllRatingsSelected = ratings.every(rate => rate.rating > 0)

        if (!isAllRatingsSelected || comment === '' || name === '')
        {
            setIsPopupVisible(true)
            if(!isAllRatingsSelected) {
                setErrorText('Выберите все оценки')
            }
            else {
                if(name === '')
                {
                    setErrorText('Напишите имя')
                }
                else {
                    setErrorText('Напишите комментарий')
                }
            }
        }
        else {
            const averageRating = ratings.reduce((sum, item) => sum + item.rating, 0) / 5

            const newReview: Review = {
                author: name,
                average: averageRating,
                comment,
                date: new Date().toLocaleString()
            }

            setReviews([newReview, ...reviews])
            setComment('')
            setName('')
            setRatings(defaultRatings)
            setResetStepperTrigger(true)
        }
    }

    return (
        <div className="reviewFormBox">
            <p className="reviewFormTitle">Помогите нам сделать процесс бронирования лучше</p>

            <Rating setRatings={setRatings} ratings={ratings} onResetComplete={handleResetComplete} resetTrigger={resetStepperTrigger}/>

            <div className="inputNameWrapper">
                <input
                    className="inputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как вас зовут?"
                />
                <label htmlFor="input" className={"inputNameLabel"}>Имя*</label>
            </div>

            <textarea
                ref={textareaRef}
                className="inputComment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Напишите, что понравилось, что было непонятно"
                rows={1}
            />

            <button onClick={handleSubmit} className="submitButton">
                Отправить
            </button>
        </div>
    )
}

export {ReviewForm}