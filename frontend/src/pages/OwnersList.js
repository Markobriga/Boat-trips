import React, {useEffect} from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAdminBoats } from "../actions/boatAction";
import Loader from "../components/Loader";


const OwnersList = () => {

    const dispatch = useDispatch()

    const { boats, loading, error } = useSelector(state=> state.boats)

    useEffect(() => {
        dispatch(getAdminBoats())

        if(error) {
            console.log(error)
            dispatch(clearErrors())
        }
    },[])

    return (
        <div className="mx-auto max-w-screen-xl w-full">
            <div className="flex">
            <Sidebar />
            {loading ? <Loader /> :
            <div className="w-full px-3">
                <div className="flex justify-between w-full py-3">
                    <div className="font-medium text-xl">
                        List of owners
                    </div>
                    <Link to="/admin/owner" className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Add new owner
                    </Link>
                </div>
                <div className="hidden md:block">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Boat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boats.map((boat, index) => (
                                <tr key={boat._id} className={index%2==0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{boat?.user?.name}</td>
                                    <td className="px-6 py-4">{boat?.user?.email}</td>
                                    <td className="px-6 py-4">{boat.name}</td>
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
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Boat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boats.map((boat, index) => (
                                <tr key={boat._id} className={index%2==0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{boat?.user?.name}</td>
                                    <td className="px-6 py-4">{boat?.user?.email}</td>
                                    <td className="px-6 py-4">{boat.name}</td>
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

export default OwnersList;