import React from "react";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <div>
            {loading ? <Loader /> : (
                <div className="mx-auto max-w-screen-xl w-full  py-10">
                    <div className="text-start ml-10 text-2xl font-semibold">My profile</div>
                    <div className="text-start ml-10">
                        <div className="mt-5 font-medium">Full Name</div>
                        <div>{user.name}</div>
                        <div className="mt-5 font-medium">Email Address</div>
                        <div>{user.email}</div>
                        <div className="mt-5 font-medium">Joined On</div>
                        <div className="mb-5">{String(user.createdAt).substring(0,10)}</div>

                        {user.role === 'user' && (
                            <Link to="/reservations/me" className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                My reservations
                            </Link>
                        )}
                        <Link to="/profile/update" className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            Edit Profile
                        </Link>
                        <Link to="/password/update" className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            Change Password
                        </Link>
                        
                    </div>
                
                </div>
            )} 
        </div>
    )
}

export default Profile;