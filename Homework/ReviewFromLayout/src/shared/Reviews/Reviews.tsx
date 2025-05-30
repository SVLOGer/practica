import './Reviews.css'
import React from 'react'
import type {Review} from "../../utils/Types/Types.ts"

interface ReviewsProps {
    reviews: Review[]
}

const Reviews: React.FC<ReviewsProps> = ({reviews}) => {
    return (
        <div className="reviewList">
            {reviews.map((review, i) => (
                <div key={i} className="reviewItem">
                    <div className="reviewHeader">
                        <p className="reviewAuthor">{review.author}</p>
                        <p className="reviewRate">{review.average} / 5</p>
                    </div>
                    <p className="reviewText">{review.comment}</p>
                </div>
            ))}
        </div>
    )
}

export {Reviews}