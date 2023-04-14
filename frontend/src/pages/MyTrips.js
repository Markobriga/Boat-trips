import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTripsByBoat } from "../actions/tripAction";
import { format } from "date-fns";
import Loader from "../components/Loader";

const MyTrips = () => {

    const dispatch = useDispatch()

    const { loading, error, tripsByBoat } = useSelector(state=>state.tripsByBoat)
    const { user } = useSelector(state=>state.auth)
    
    useEffect(() => {
        if(user) {
            dispatch(getTripsByBoat(user._id))
        }
    },[user])

    return(
        <div className="mx-auto max-w-screen-xl flex w-full">
            <Sidebar />
            {loading ? <Loader /> :
            <div className="w-full">
                <div className="text-start py-3 px-3 font-medium text-xl flex justify-between">
                    <div className="font-medium text-xl">
                        My Trips
                    </div>
                    <Link to="/owner/trip/new" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Add new trip
                    </Link>
                </div>
                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Trip name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Locations
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Number of reservations
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tripsByBoat.trips && tripsByBoat.trips.map((trip, index) => (
                                <tr className={index%2==0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {trip.tripName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {format(new Date(trip.date), 'dd.MM.yyyy')}
                                    </td>
                                    <td className="px-6 py-4">
                                        {trip.location.toString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {trip.numberOfReservations}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            }
        </div>
    )
}

export default MyTrips;