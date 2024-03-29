import React, { useEffect, useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useDispatch, useSelector } from "react-redux";
import { getBoatDetails } from "../actions/boatAction";
import Loader from "../components/Loader";
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useNavigate } from "react-router-dom";

const PersonalInfo = ({formStep, nextFormStep}) => {

    const { user, loading} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [order, setOrder] = useState();

    const { cartTrip } = useSelector(state => state.cart)
    const { boat } = useSelector(state => state.boatDetails)

    useEffect(()=> {
        console.log(cartTrip)
        cartTrip && setOrder(cartTrip) && dispatch(getBoatDetails(cartTrip.boat))
    },[cartTrip])

    const processToPayment = () => {
        const personaInfo = {
            name: name,
            email: email,
            phoneNumber: phoneNumber
        }
        if (isValidPhoneNumber(phoneNumber)===true) {
            sessionStorage.setItem("personalInfo", JSON.stringify(personaInfo))
            nextFormStep();
        }
    }
    

    return (
        <div className={formStep === 0 ? "flex max-w-screen-xl w-full mx-auto" : "hidden"}>
            {loading ? <Loader /> : (
            <div className="flex w-full flex-col sm:flex-row">    
            <div className="px-4 sm:px-0 sm:w-1/2 sm:pr-5">
                <div className="text-start text-2xl py-2">
                    Main traveller's contact details
                </div>
                <div className="border flex flex-col items-start rounded-lg bg-white shadow-md">
                    <div className="flex flex-col px-2 w-full">
                        <label htmlFor="name" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white text-start">Full Name</label>
                        <input type="name" name="name" disabled={true} value={name}  id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" required="" />          
                    </div>
                    <div className="flex flex-col px-2 w-full">
                        <label htmlFor="email" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white text-start">Email</label>
                        <input type="email" name="email" disabled={true} value={email}  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                    <div className="flex flex-col px-2 w-full pb-5 text-left">
                        <div className="text-sm font-medium mt-2 text-gray-900 dark:text-white text-start">
                            Phone Number
                        </div>
                        <div className="w-60 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <PhoneInput 
                            value={phoneNumber}
                            onChange={phoneNumber => setPhoneNumber(phoneNumber)}
                        />
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex justify-end">
                    <button onClick={processToPayment} className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        Continue
                    </button>
                </div>
            </div>
            <div className="px-4 sm:px-0 sm:w-1/2 sm:pl-5">
                <div className="border flex flex-col items-start rounded-lg mt-4 px-4 bg-white shadow-md">
                    <div className="font-medium py-3">
                        Reservation summary
                    </div>
                    <hr className="w-full"></hr>
                    <div className="pt-3">
                        <div className="font-medium">{boat?.name}</div>
                    </div>
                    <div className="flex justify-between w-full text-sm pt-1">
                        <div className="flex">
                            <div>Adults x</div>
                            <div>{order?.amountAdult}</div>
                        </div>
                        <div>{(order?.amountAdult*order?.priceAdult).toFixed(2)}€</div>
                    </div>
                    {order?.amountChild > 0 && (
                        <div className="flex justify-between w-full text-sm">
                            <div className="flex">
                                <div>Children x</div>
                                <div>{order?.amountChild}</div>
                            </div>
                        <div>{(order?.amountChild*order?.priceChild).toFixed(2)}€</div>
                    </div>
                    )}
                    <hr className="w-full my-3"></hr>
                    <div className="flex justify-between w-full font-medium pb-3">
                        <div>
                            Total (EUR)
                        </div>
                        <div>
                            {(order?.amountAdult*order?.priceAdult + order?.amountChild*order?.priceChild).toFixed(2)}€
                        </div>
                    </div>
                </div>

            </div>
            <div className="sm:hidden flex justify-end px-4">
                    <button onClick={processToPayment} className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        Continue
                    </button>
                </div>
            </div>)}
        </div>
    )
}

export default PersonalInfo;