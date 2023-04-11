import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, myReservations } from '../actions/reservationAction';
import { getTripsDetails } from '../actions/tripAction';
import { getBoatDetails } from '../actions/boatAction';
import Loader from '../components/Loader';
import { format } from 'date-fns';


const MyReservations = () => {

    const dispatch = useDispatch();

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
            <table className='table-fixed'>
                <thead>
                    <tr>
                        <th className='px-2'>Trip</th>
                        <th className='px-2'>Boat</th>
                        <th className='px-2'>Adults(Children)</th>
                        <th className='px-2'>Date</th>
                        <th className='px-2'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation._id}>
                            <td className='px-2'>Trip name</td>
                            <td className='px-2'>Boat name</td>
                            <td className='px-2'>{reservation.amountAdult}({reservation.amountChild})</td>
                            <td className='px-2'>{format(new Date(reservation.trip.date), 'dd.MM.yyyy')}</td>
                            <td className='px-2'>{reservation.price}€</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}

export default MyReservations;