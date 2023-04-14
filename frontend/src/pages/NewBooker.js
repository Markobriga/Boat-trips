import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { registerBooker } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

const NewBooker = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { user } = useSelector(state=>state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.set("name", name)
        formData.set("email", email)
        formData.set("password", password)
        formData.set("owner", user._id)

        dispatch(registerBooker(formData))
        navigate("/owner/bookers")
    }

    return (
        <div className="mx-auto max-w-screen-xl flex w-full">
            <Sidebar />
            <div className='w-full'>
                <div className="text-start py-3 px-3 font-medium text-xl">
                    New Booker
                </div>
                <form className="space-y-2 mb-5 px-3 md:space-y-4" action="#">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Name</label>
                        <input type="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required="" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Email</label>
                        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Password</label>
                        <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <button onClick={handleSubmit} type="submit" className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add booker</button>
                </form>
            </div>
        </div>
    )
}

export default NewBooker;