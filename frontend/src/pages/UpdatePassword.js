import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { updatePassword, loadUser, clearErrors } from "../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const {error, isUpdated, loading} = useSelector(state => state.user)

    const navigate = useNavigate();
    useEffect(()=> {

        if(error) {
            console.log(error)
            dispatch(clearErrors)
        }

        if(isUpdated) {

            navigate("/profile")

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    },[dispatch, error, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault()
    
        const formData = new FormData();
        formData.set('oldPassword', oldPassword)
        formData.set('password', password)

        dispatch(updatePassword(formData))
    }

    return (
        <section className="dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-32">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Update Password
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={submitHandler}>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Old Password</label>
                                <input type="password" name="oldPassword" id="oldPassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="" value={oldPassword || ''} onChange={(e)=> setOldPassword(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">New Password</label>
                                <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="" value={password || ''} onChange={(e)=> setPassword(e.target.value)}/>
                            </div>
                                    
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Profile</button>
                                    
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdatePassword