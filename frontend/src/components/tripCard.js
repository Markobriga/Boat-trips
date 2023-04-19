import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import ReactStars from "react-rating-stars-component";

const TripCard = ({trip}) => {

    return (
        <div className='mb-5'>
            <Link to={`/trip/${trip._id}`} className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow sm:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full sm:w-auto sm:max-h-48 rounded-t-lg h-auto  sm:h-auto  sm:rounded-none sm:rounded-l-lg aspect-video" src={trip.boat.images[0].url} alt="" />
                <div className="flex flex-col text-start px-4 py-1 leading-snug sm:w-full">
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

export default TripCard;