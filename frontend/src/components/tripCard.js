import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import ReactStars from "react-rating-stars-component";

const TripCard = ({trip}) => {

    return (
        <div className=''>
            <Link to={`/trip/${trip._id}`} className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover  rounded-t-lg h-auto max-h-48 md:h-auto  md:rounded-none md:rounded-l-lg" src={require('../images/Makarski-Jadran.jpg')} alt="" />
                <div className="flex flex-col text-start p-4 leading-normal sm:w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{trip.tripName}</h5>
                    <div>{trip.boat.name}</div>
                    <div className='flex'>
                        <ReactStars 
                            count={5}
                            value={trip.boat.ratings}
                            edit={false}
                        />
                        <div className='text-xs pt-1'>({trip.boat.numOfReviews})</div>
                    </div>
                    <div className=''>{format(new Date(trip.date), 'dd.MM.yyyy')}</div>
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