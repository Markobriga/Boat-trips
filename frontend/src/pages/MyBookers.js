import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allBookers, deleteBooker } from "../actions/userAction";
import { clearErrors } from "../actions/boatAction";
import Loader from "../components/Loader";
import { format } from "date-fns";
import { DELETE_BOOKER_RESET } from "../constants/userConstants";

const MyBookers = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state=>state.auth)
    const { loading, error, users } = useSelector(state=>state.allUsers)
    const { isDeleted } = useSelector(state=>state.user)

    useEffect(() => {
        if(user) {
            dispatch(allBookers(user._id))
        }

        if(error) {
            console.log(error)
            dispatch(clearErrors())
        }

        if(isDeleted) {
            dispatch({type: DELETE_BOOKER_RESET})
        }
    },[user, isDeleted])

    const deleteBookerHandler = (id) => {
        dispatch(deleteBooker(id))
    }

    return (
        <div className="mx-auto max-w-screen-xl w-full">
            <div className="flex">
            <Sidebar />
            {loading ?  
                <div className="flex justify-center w-full">
                    <Loader />
                </div> :
            <div className='w-full px-3'>
                <div className="text-start py-3 font-medium text-xl flex justify-between">
                    <div className="font-medium text-xl">
                        My Bookers
                    </div>
                    <Link to="/owner/booker/new" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Add new booker
                    </Link>
                </div>
                <div className="hidden md:block">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Added on
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className={index%2==0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {format(new Date(user.createdAt), 'dd.MM.yyyy')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={()=>deleteBookerHandler(user._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
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
            {!loading && (
                <div className="md:hidden block">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Added on
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className={index%2==0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {format(new Date(user.createdAt), 'dd.MM.yyyy')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={()=>deleteBookerHandler(user._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            )}
        </div>
    )
}

export default MyBookers;