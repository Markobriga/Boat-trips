import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import ReactStars from "react-rating-stars-component";

const TripHomeCard = ({trip}) => {

    return (
        <div className='mb-5 px-2'>
            <Link to={`/trip/${trip._id}`} className="flex flex-col items-start bg-white rounded-md shadow-md hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-md  sm:max-h-48 h-auto  sm:h-auto aspect-video" src={trip.boat.images[0].url} alt="" />
                <div className="flex flex-col text-start py-1 leading-snug px-2 sm:w-full">
                    <div className=''>{format(new Date(trip.date), 'dd.MM.yyyy')}</div>
                    <div className=''>
                        <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{trip.tripName}</span>
                        <span className='text-2xl italic tracking-tight text-gray-900 dark:text-white pl-1.5'>by {trip.boat.name}</span>
                    </div>
                    <div className='flex '>
                        <ReactStars 
                            count={5}
                            value={trip.boat.ratings}
                            edit={false}
                        />
                        <div className='text-xs pt-1'>({trip.boat.numOfReviews})</div>
                    </div>
                    
                    <div>{trip.location.toString()}</div>
                    <div>Price Adult: {trip.priceAdult}€</div>
                    <div>Price Child: {trip.priceChild}€</div>
                    <div>Duration: {trip.duration}h</div>
                </div>
            </Link>
        </div>
    )
}

export default TripHomeCard