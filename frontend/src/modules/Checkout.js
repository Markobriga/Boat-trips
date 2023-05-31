import React, {useEffect, useState} from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import axios from "axios";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { getBoatDetails } from "../actions/boatAction";
import Loader from "../components/Loader";
import { createReservation, clearErrors } from "../actions/reservationAction";
import { useNavigate } from "react-router-dom";

const options = {
    style: {
        invalid: {
            color: '#9e2146'
        }
    }
}

const Checkout = ({ formStep, nextFormStep, prevFormStep}) => {

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, user} = useSelector(state => state.auth)

    const { cartTrip } = useSelector(state => state.cart)
    const { boat } = useSelector(state => state.boatDetails)
    const { error } = useSelector(state => state.newReservation)

    const [order, setOrder] = useState();
    const [personalInfo, setPersonalInfo] = useState()


    useEffect(()=> {
        cartTrip && setOrder(cartTrip) && dispatch(getBoatDetails(cartTrip.boat))
        const userInfo = JSON.parse(sessionStorage.getItem("personalInfo"))
        userInfo && setPersonalInfo(userInfo)

        if(error) {
            console.log(error)
            dispatch(clearErrors())
        }
    },[dispatch, error])

    const reservation = {
        user: user._id,
        trip: cartTrip.trip,
        amountAdult: cartTrip.amountAdult,
        amountChild: cartTrip.amountChild,
        price: cartTrip.amountAdult*cartTrip.priceAdult + cartTrip.amountChild*cartTrip.priceChild
    }

    const paymentData = {
        amount: Math.round((order?.amountAdult*order?.priceAdult + order?.amountChild*order?.priceChild)*100)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        
        document.querySelector('#pay_btn').disabled = true;

        let res;

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret

            if(!stripe && !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: personalInfo.name,
                        email: personalInfo.email
                    }
                }
            })

            if(result.error) {
                console.log(result.error.message)
                document.querySelector('#pay_btn').disabled = false
            } else {
                if(result.paymentIntent.status === 'succeeded') {

                    // New reservation and navigate
                    reservation.phoneNumber = personalInfo.phoneNumber
                    reservation.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createReservation(reservation))
                    nextFormStep()
            
                } else {
                    console.log('Issue with payment')
                }
            }


        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            console.log(error)
        }
    }

    return (
        <div className={formStep === 1 ? "flex max-w-screen-xl w-full mx-auto" : "hidden"}>
            {loading ? <Loader /> : (
            <div className="flex w-full flex-col sm:flex-row">    
            <div className="px-4 sm:px-0 sm:w-1/2 sm:pr-5">
                <div className="text-start text-2xl py-2">
                    Payment details
                </div>
                <div className="border flex flex-col items-start rounded-lg bg-white shadow-md">
                    <div className="flex flex-col pl-2 w-44">
                        <label htmlFor="card_num_element" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white text-start">Card Number</label>
                        <CardNumberElement type="text" id="card_num_element" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" options={options}/>          
                    </div>
                    <div className="flex flex-col pl-2 w-44">
                        <label htmlFor="card_exp_field" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white text-start">Card Expiry</label>
                        <CardExpiryElement type="text" id="card_exp_field" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" options={options} />
                    </div>
                    <div className="flex flex-col pl-2 w-44 pb-4">
                        <label htmlFor="card_cvc_field" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white text-start">Card CVC</label>
                        <CardCvcElement type="text" id="card_cvc_field" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  options={options}/>
                    </div>
                
                </div>
                <div className="hidden sm:flex justify-between">
                    <button onClick={prevFormStep} className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        Back
                    </button> 
                    <button id="pay_btn" onClick={submitHandler} className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        PAY
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
            <div className="sm:hidden flex justify-between px-4">
                    <button onClick={prevFormStep} className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        Back
                    </button> 
                    <button id="pay_btn" onClick={submitHandler} className="mt-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        PAY
                    </button>
                </div>
            </div>)}
        </div>
    )
}

export default Checkout;