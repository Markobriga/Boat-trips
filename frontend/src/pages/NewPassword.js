import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../actions/userAction";
import { useParams, useNavigate } from "react-router-dom";

const NewPassword = () => {

    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const { token } = useParams();
    const {error, success} = useSelector(state => state.forgotPassword)

    useEffect(()=> {

        if(error) {
            console.log(error)
            dispatch(clearErrors)
        }

        if(success) {
            console.log(success)
            navigate("/login")
        }

    },[dispatch, error, success])

    const submitHandler = (e) => {
        e.preventDefault()
    
        const formData = new FormData();
        formData.set('password', password)
        formData.set('confirmPassword', confirmPassword)

        dispatch(resetPassword(token, formData))
    }

    return (
        <section className="dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-32">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        New Password
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Password</label>
                            <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="" value={password || ''} onChange={(e)=> setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Confrim Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="" value={confirmPassword || ''} onChange={(e)=> setConfirmPassword(e.target.value)}/>
                        </div>
                                
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Profile</button>
                                
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}

export default NewPassword;