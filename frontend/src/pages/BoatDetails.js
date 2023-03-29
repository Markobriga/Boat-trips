import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoatDetails, clearErrors } from "../actions/boatAction";
import { getNextTripsByBoat } from "../actions/tripAction";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns'

const BoatDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, error, boat }  = useSelector(state => state.boatDetails)
    const { nextTripsByBoat } = useSelector(state => state.nextTripsByBoat)

    useEffect(() => {
        
        dispatch(getBoatDetails(id))
        dispatch(getNextTripsByBoat(id))

        if(error) {
            console.log(error)
            dispatch(clearErrors())
        }

    },[dispatch, error, id])

    const changeDateFormat = (date) => {
        
    }

    return (
        <div className="max-w-screen-xl mx-auto">
            { loading ? <Loader /> : 
            <div className="py-8 max-w-screen-xl mx-4">
                <div className="font-bold text-2xl pb-5 w-3/4">
                    {boat.name}
                </div>
                <div className="flex ">
                    <div className="mr-10 flex-auto w-3/4">
                        <img className="rounded-md" src={require('../images/Makarski-Jadran.jpg')} alt="" />
                    </div>
                    <div className="border-2 rounded-md flex-auto w-1/4">
                        <div className="">
                            Next trips
                        </div>
                        {nextTripsByBoat.trips && nextTripsByBoat.trips.map(trip => (
                            <Link key={trip._id} className="flex">
                                <div className="pr-2 ml-1">
                                    {format(new Date(trip.date), 'dd.MM.yyyy')}
                                </div>
                                <div className="flex">
                                    {trip.location.map(location => (
                                        <div key={location.name} className="ml-1"> 
                                            {location}
                                        </div>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="pt-5 w-3/4">
                    <div className="font-medium text-xl ">
                        Description
                    </div>
                    <div className="text-start">
                        {boat.description}
                    </div>
                    <div className="font-medium text-xl pt-5">
                        Reviews
                    </div>
                </div>

            </div>}
        </div>   
    )
}

export default BoatDetails