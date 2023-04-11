import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { registerOwner } from "../actions/userAction";
import Sidebar from "../components/Sidebar";

const NewOwner = () => {

    const [owner, setOwner] = useState({
        name: '',
        email: '',
        password: '',
    })

    const {name, email, password} = owner;

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
        formData.set('role', 'owner')

        dispatch(registerOwner(formData))
    }


    const onChange = e => {
        setOwner({...owner, [e.target.name]: e.target.value})
    }

    return (
        <div className="mx-auto max-w-screen-xl flex w-full">
            <Sidebar />
        <section className="w-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-32">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Add new owner
                        </h1>
                        <form className="space-y-4 md:space-y-6" id="form" action="#" onSubmit={submitHandler} encType='multipart/form-data'>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Name</label>
                                <input type="name" name="name" value={name} onChange={onChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Email</label>
                                <input type="email" name="email" value={email} onChange={onChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Password</label>
                                <input type="password" name="password" value={password} onChange={onChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add new owner</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default NewOwner;