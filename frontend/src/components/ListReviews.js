import React from "react";
import ReactStars from "react-rating-stars-component";

const ListReviews = ({reviews}) => {
    return (
        <div>
            {reviews && reviews.map(review=>(
                <div key={review._id} className="flex flex-col items-start bg-white px-2 rounded-md">
                    <ReactStars
                        size={24} 
                        value={review.rating}
                        edit={false}
                    />
                    <div className="text-gray-600">by {review.name}</div>
                    <div className="pt-2 pb-1">{review.comment}</div>
                    <hr className="w-full"/>
                </div>
            ))}   
        </div>
    )
}

export default ListReviews;