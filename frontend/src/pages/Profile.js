import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { clearErrors, myReservations } from "../actions/reservationAction";
import { format } from 'date-fns';

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)
    const { loading:loadingReservations, error, reservations } = useSelector(state=>state.myReservations)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(()=> {

        dispatch(myReservations())

        if (error) {
            console.log(error)
            dispatch(clearErrors())
        }

    },[dispatch, error])

    return (
        <div>
            {loading ? <Loader /> : (
                <div className="mx-auto max-w-screen-xl w-full py-10 flex flex-col md:px-10">
                    <div className="bg-white p-10 w-fit rounded-md shadow-md">
                        <div className="text-start text-2xl font-semibold">My profile</div>
                        <div className="text-start ">
                            <div className="mt-5 font-medium">Full Name</div>
                            <div>{user.name}</div>
                            <div className="mt-5 font-medium">Email Address</div>
                            <div>{user.email}</div>
                            <div className="mt-5 font-medium">Joined On</div>
                            <div className="mb-5">{String(user.createdAt).substring(0,10)}</div>
                            <Link to="/profile/update" className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                Edit Profile
                            </Link>
                            <Link to="/password/update" className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                Change Password
                            </Link>
                        </div>
                    </div>
                    {user.role === 'user' && (
                    <div>
                        <div className="text-left text-xl px-10 py-6 font-medium">My Reservations</div>
                        {loading ? <Loader /> : (
                            reservations ?
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
                                            <td onClick={()=>navigate(`/trip/${reservation.trip._id}`)} className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{reservation.trip.tripName}</td>
                                            <td onClick={()=>navigate(`/boat/${reservation.trip.boat}`)}className="cursor-pointer px-6 py-4">{reservation.trip.boatName}</td>
                                            <td className="px-6 py-4">{reservation.amountAdult}({reservation.amountChild})</td>
                                            <td className="px-6 py-4">{format(new Date(reservation.trip.date), 'dd.MM.yyyy')}</td>
                                            <td className="px-6 py-4">{reservation.price}€</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table> : <div className="text-left text-lg font-medium">You currently have no reservations...</div>
                        )}
                    </div>
                    )}
                </div>
            )} 
        </div>
    )
}

export default Profile;