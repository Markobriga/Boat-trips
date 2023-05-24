import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { allBookerReservations, allReservations } from "../actions/reservationAction";

const TripReservations = () => {
    
    const dispatch = useDispatch()

    const { loading, reservations } = useSelector(state=>state.allReservations)
    const { loading: loadingBooker, reservations: reservationsBooker } = useSelector(state=>state.allBookerReservations)
    const { id } = useParams();


    useEffect(()=>{
        dispatch(allReservations(id))
        dispatch(allBookerReservations(id))
    },[])

    return (
        <div className="mx-auto max-w-screen-xl w-full">
            <div className="flex">
                <Sidebar />
                {loading && loadingBooker ? <Loader /> : 
                <div className="w-full">
                    <div className="text-start py-3 px-3 font-medium text-xl flex justify-between">
                        <div className="font-medium text-xl">
                            Web reservations
                        </div>
                    </div>
                    <div className="hidden md:block">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount adult
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount child
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created at
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.reservations && reservations.reservations.map((reservation, index) => (
                                    <tr className={index%2==0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {reservation.user.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.amountAdult}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.amountChild}
                                        </td>
                                        <td className="px-6 py-4">
                                            {format(new Date(reservation.createdAt), 'dd.MM.yyyy')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.price}€
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                    <div className="hidden md:block text-start py-3 px-3 font-medium text-xl ">
                        <div className="font-medium text-xl">
                            Booker reservations
                        </div>
                    </div>
                    <div className="hidden md:block mb-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Booker
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount adult
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount child
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created at
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservationsBooker && reservationsBooker.reservations && reservationsBooker.reservations.map((reservation, index) => (
                                    <tr className={index%2==0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {reservation.booker.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.amountAdult}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.amountChild}
                                        </td>
                                        <td className="px-6 py-4">
                                            {format(new Date(reservation.createdAt), 'dd.MM.yyyy')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.price}€
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                }
            </div>
            {!loading && !loadingBooker && (
                <>
                
                <div className="block md:hidden">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount adult
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount child
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created at
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.reservations && reservations.reservations.map((reservation, index) => (
                                    <tr className={index%2==0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {reservation.user.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.amountAdult}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.amountChild}
                                        </td>
                                        <td className="px-6 py-4">
                                            {format(new Date(reservation.createdAt), 'dd.MM.yyyy')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.price}€
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                    <div className=" block md:hidden text-start py-3 px-3 font-medium text-xl">
                        <div className="font-medium text-xl">
                            Booker reservations
                        </div>
                    </div>
                    <div className="block md:hidden mb-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Booker
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount adult
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount child
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created at
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservationsBooker && reservationsBooker.reservations && reservationsBooker.reservations.map((reservation, index) => (
                                    <tr className={index%2==0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {reservation.booker.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.amountAdult}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.amountChild}
                                        </td>
                                        <td className="px-6 py-4">
                                            {format(new Date(reservation.createdAt), 'dd.MM.yyyy')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {reservation.price}€
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                   
                </>
                
            )}
        </div>
    )
}

export default TripReservations;