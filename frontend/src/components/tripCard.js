import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, getBoatDetails } from '../actions/boatAction';
import { format } from 'date-fns'

const TripCard = ({trip}) => {

    const dispatch = useDispatch()

    const { loading, error, boat} = useSelector(state => state.boatDetails);

    useEffect(()=> {

        dispatch(getBoatDetails(trip.boat))
        if (error) {
            console.log(error)
            dispatch(clearErrors)
        }

    },[dispatch, error])

    return (
        <div className=''>
            <Link to={`/trip/${trip._id}`} className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow sm:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover  rounded-t-lg h-auto max-h-48 md:h-auto  md:rounded-none md:rounded-l-lg" src={require('../images/Makarski-Jadran.jpg')} alt="" />
                <div className="flex flex-col text-start p-4 leading-normal sm:w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{boat.name}</h5>
                    <div className=''>{format(new Date(trip.date), 'dd.MM.yyyy')}</div>
                    <div className="flex">
                        {trip.location.map(location => (
                            <div key={location.name} className="ml-1"> 
                                {location}
                            </div>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default TripCard;