import './Rating.css'
import {Stepper} from "../Stepper/Stepper.tsx"
import React from "react"
import type {RatingType} from "../../utils/Types/Types.ts"

interface RatingProps {
    ratings: RatingType[],
    setRatings: (ratings: RatingType[]) => void
    resetTrigger: boolean;
    onResetComplete: () => void
}

const Rating: React.FC<RatingProps> = ({ratings, setRatings, resetTrigger, onResetComplete}) => {

    const updateRating = (index: number, newRating: number) => {
        const newRatings = ratings.map((rating, i) =>
            i === index ? { ...rating, rating: newRating + 1 } : rating
        )
        setRatings(newRatings)
    }

    return (
        <div className="">
            {ratings.map((criterion, index) => (
                <div key={index} className="criterionRow">
                    <Stepper
                        totalSteps={5}
                        setStep={(step) => updateRating(index, step)}
                        resetTrigger={resetTrigger}
                        onResetComplete={onResetComplete}
                    />
                    <label className="ratingLabel">{criterion.title}</label>
                </div>
            ))}
        </div>
    )
}

export {Rating}
