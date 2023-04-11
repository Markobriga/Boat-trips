import React, {useEffect} from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allOwners, clearErrors } from "../actions/userAction";

const OwnersList = () => {

    const dispatch = useDispatch()

    const { loading, error, users } = useSelector(state=>state.allUsers)

    useEffect(() => {
        dispatch(allOwners())

        if(error) {
            console.log(error)
            dispatch(clearErrors())
        }
    },[])

    return (
        <div className="mx-auto max-w-screen-xl flex w-full">
            <Sidebar />
            <div className="w-full">
                <div className="flex justify-between w-full py-3 px-3">
                    <div className="font-medium text-xl">
                        List of owners
                    </div>
                    <Link to="/admin/owner" className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Add new owner
                    </Link>
                </div>
                <table className="mb-10">
                    <thead>
                        <tr>
                            <th className="px-10">Name</th>
                            <th className="px-10">Email</th>
                            <th className="px-10">Boat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="px-10">{user.name}</td>
                                <td className="px-10">{user.email}</td>
                                <td className="px-10">{user.boat?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OwnersList;