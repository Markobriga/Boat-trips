import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, myReservations } from '../actions/reservationAction';
import { getTripsDetails } from '../actions/tripAction';
import { getBoatDetails } from '../actions/boatAction';
import Loader from '../components/Loader';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


const MyReservations = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { loading, error, reservations } = useSelector(state=>state.myReservations)

    useEffect(()=> {

        dispatch(myReservations())

        if (error) {
            console.log(error)
            dispatch(clearErrors())
        }

    },[dispatch, error])

    return (
        <div className="mx-auto max-w-screen-xl flex w-full justify-center py-10">
            {loading ? <Loader /> : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Trip</th>
                        <th scope="col" className="px-6 py-3">Boat</th>
                        <th scope="col" className="px-6 py-3">Adults(Children)</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations && reservations.map((reservation,index) => (
                        <tr key={reservation._id} className={index%2==0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                            <td onClick={()=>navigate(`/trip/${reservation.trip._id}`)} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{reservation.trip.tripName}</td>
                            <td onClick={()=>navigate(`/boat/${reservation.trip.boat}`)}className="px-6 py-4">{reservation.trip.boatName}</td>
                            <td className="px-6 py-4">{reservation.amountAdult}({reservation.amountChild})</td>
                            <td className="px-6 py-4">{format(new Date(reservation.trip.date), 'dd.MM.yyyy')}</td>
                            <td className="px-6 py-4">{reservation.price}€</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}

export default MyReservations;