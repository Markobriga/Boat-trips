import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { updateProfile, loadUser, clearErrors } from "../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";


const UpdateProfile = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const {error, isUpdated, loading} = useSelector(state => state.user)

    const navigate = useNavigate();
    useEffect(()=> {

        if(user){
            setName(user.name)
            setEmail(user.email)
        }

        if(error) {
            console.log(error)
            dispatch(clearErrors)
        }

        if(isUpdated) {
            dispatch(loadUser())

            navigate("/profile")

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    },[dispatch, error, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault()
    
        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)

        dispatch(updateProfile(formData))
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-32">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Update Profile
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#" onSubmit={submitHandler}>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Full Name</label>
                                        <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" required="" value={name || ''} onChange={(e)=> setName(e.target.value)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required="" value={email || ''} onChange={(e)=> setEmail(e.target.value)}/>
                                    </div>
                                    
                                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Profile</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
    )
}

export default UpdateProfile;