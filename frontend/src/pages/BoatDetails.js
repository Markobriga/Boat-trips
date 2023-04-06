import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoatDetails, clearErrors, newReview } from "../actions/boatAction";
import { getNextTripsByBoat } from "../actions/tripAction";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns'
import ReactStars from "react-rating-stars-component";
import { NEW_REVIEW_RESET } from "../constants/boatConstants";
import ListReviews from "../components/ListReviews";

const BoatDetails = () => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, error, boat }  = useSelector(state => state.boatDetails)
    const { loadingTrips, nextTripsByBoat } = useSelector(state => state.nextTripsByBoat)
    const { user } = useSelector(state => state.auth)
    const { reviewError, success } = useSelector(state => state.newReview)


    useEffect(() => {
        
        dispatch(getBoatDetails(id))
        dispatch(getNextTripsByBoat(id))

        if(error) {
            console.log(error)
            dispatch(clearErrors())
        }

        if(reviewError) {
            console.log(reviewError)
            dispatch(clearErrors())
        }

        if(success) {
            dispatch({type: NEW_REVIEW_RESET})
        }

    },[dispatch, error, reviewError, success, id])

    const reviewHandler = () => {
        const formData = new FormData()

        formData.set('rating', rating)
        formData.set('comment', comment)
        formData.set('boatId', id)

        dispatch(newReview(formData))
    }

    return (
        <div className="max-w-screen-xl mx-auto flex justify-center">
            { (loading || loadingTrips) ? 
            <div className="justify-center">
                <Loader />
            </div> : 
            <div className="py-8 w-full mx-4">
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
                            <Link to={`/trip/${trip._id}`} key={trip._id} className="flex">
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
                <div className="pt-5 w-3/4 flex flex-col">
                    <div className="font-medium text-xl ">
                        Description
                    </div>
                    <div className="text-start">
                        {boat.description}
                    </div>
                    <div className="font-medium text-xl pt-5">
                        Reviews
                    </div>
                    {user ? 
                        <div className="flex flex-col">
                            <ReactStars 
                                count={5}
                                onChange={(value)=>setRating(value)}
                                value={rating}
                                size={24}    
                            />
                            <textarea value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                                placeholder="Write your experience"
                                className="bg-hci-svijetlo-siva py-1 rounded-lg px-1 mb-1 text-black "/>
                            <div className="self-end">
                                <button onClick={reviewHandler} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Submit your review</button>
                            </div>
                            
                        </div>
                        : 
                        <div className="text-start">
                            Login to post your review
                        </div>
                        
                    }
                    <hr className="w-full mt-2"/>
                    {boat.reviews && boat.reviews.length > 0 && (
                        <ListReviews reviews={boat.reviews} />
                    )}
                    
                </div>

            </div>}
        </div>   
    )
}

export default BoatDetails