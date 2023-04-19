import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns'
import { clearErrors, getTripsDetails } from "../actions/tripAction";
import { getBoatDetails } from "../actions/boatAction";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { addTripToCart } from "../actions/cartAction";
import ImageSlider from "../components/ImageSlider";

const TripDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams()
    const { loading, error, trip } = useSelector(state => state.tripDetails)

    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {

        dispatch(getTripsDetails(id))

        if (error) {
            console.log(error)
            dispatch(clearErrors())
        }
    },[dispatch, error, id])

    const checkoutHandler = () => {
        dispatch(addTripToCart(id, adult, child))
        navigate("/login?redirect=reservation")
    }

    return (
        <div className="max-w-screen-xl mx-auto flex justify-center">
            { (loading) ?
            <div className="justify-center">
                <Loader />
            </div> : 
            trip &&
            <div className="py-8 w-full mx-4">
                <div className="pb-5 md:w-2/3">
                    <span className="font-bold text-2xl ">
                        {trip.tripName}
                    </span>
                    <span className="text-2xl italic pl-1.5">
                        <Link to={`/boat/${trip.boat._id}`}>
                            by {trip.boatName}
                        </Link>
                    </span>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="mx-4 md:mx-0 md:mr-10 flex-auto w-auto md:w-2/3 ">
                        { trip.boat.images &&
                            <ImageSlider images={trip.boat.images}/>
                        }
                    </div>
                    <div className="md:w-1/3 pt-5 mx-4 md:mx-0 md:pt-0">
                        <div className="font-semibold text-xl pb-2">
                                Reservation
                            </div>
                        <div className="border rounded-md text-start">
                            <div className="bg-gray-100 rounded-md  text-lg py-2">
                                <div className="pl-4">
                                    Participants
                                </div>
                            </div>
                            <hr></hr>
                            <div className="flex py-2 pl-4 justify-between align-middle">
                                <div className="text-sm ">
                                    Adults (13-80)
                                </div>
                                <div className="flex pr-4 ">
                                    <button type="button" disabled={!adult} onClick={()=> {setAdult(adult-1)}} className="bg-gray-100 rounded-md ">
                                        <MinusIcon className="h-6 w-6" /> 
                                    </button>
                                    <div className="w-7 text-center">{adult}</div>
                                    <button type="button" disabled={adult+child+trip.numberOfReservations>trip.boat.maxNumberOfReservations} onClick={()=>{setAdult(adult+1)}} className="bg-gray-100 rounded-md ">
                                        <PlusIcon className="h-6 w-6" /> 
                                    </button>
                                </div>
                            </div>
                            <hr className="mx-4"></hr>
                            <div className="flex py-2 pl-4 justify-between align-middle">
                                <div className="text-sm ">
                                    Children (3-12)
                                </div>
                                <div className="flex pr-4 ">
                                    <button type="button" disabled={!child} onClick={()=> {setChild(child-1)}} className="bg-gray-100 rounded-md ">
                                        <MinusIcon className="h-6 w-6" /> 
                                    </button>
                                    <div className="w-7 text-center">{child}</div>
                                    <button type="button" disabled={adult+child+trip.numberOfReservations>trip.boat.maxNumberOfReservations} onClick={()=>{setChild(child+1)}} className="bg-gray-100 rounded-md ">
                                        <PlusIcon className="h-6 w-6" /> 
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-md bg-gray-100 text-start mt-5">
                            <div className="bg-gray-700 rounded-t-md  text-lg py-2">
                                <div className="pl-4 text-white">
                                    Booking summary
                                </div>
                            </div>
                            <hr></hr>
                            <div className="py-2 pl-4 text-sm">
                                <div className="font-medium">
                                    Tickets
                                </div>
                                <div className="">
                                    Adults: {adult}x{trip.priceAdult.toFixed(2)}€ 
                                </div>
                                {child>0 && (<div className="">
                                    Childrens: {child}x{trip.priceChild.toFixed(2)}€ 
                                </div>
                                )}
                            </div>
                            <hr className="mx-4"></hr>
                            <div className="py-2 pl-4 text-sm">
                                <div className="font-medium">
                                    Date 
                                </div>
                                <div className="">
                                    {format(new Date(trip.date), 'dd.MM.yyyy')}
                                </div>
                            </div>
                            <hr className="mx-4"></hr>
                            <div className="py-2 pl-4 text-lg">
                                {(adult*trip.priceAdult+child*trip.priceChild).toFixed(2)}€
                            </div>
                        </div>

                        <button type="button" onClick={checkoutHandler} disabled={(adult+child+trip.numberOfReservations>trip.boat.maxNumberOfReservations) || adult+child === 0} className="mt-4 py-2 bg-primary-700 text-white w-full font-medium rounded-lg">
                            Checkout
                        </button>
                    </div>

                </div>
                
                
            </div>
            }
        </div>
    )
}

export default TripDetails;