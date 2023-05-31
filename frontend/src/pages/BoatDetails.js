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
import ImageSlider from "../components/ImageSlider";


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
                <div className="font-bold text-2xl pb-5 lg:w-2/3">
                    {boat.name}
                </div>
                <div className="flex flex-col lg:flex-row">
                    <div className="mx-2 lg:ml-0 lg:mr-10 flex-auto lg:w-2/3">
                        { boat.images &&
                            <ImageSlider images={boat.images}/>
                        }
                    </div>
                    <div className=" flex-auto lg:w-1/3 ">
                        <div className="text-xl font-semibold pb-2 pt-8 lg:pt-0 lg:text-start lg:pl-2">
                            Next trips
                        </div>
                        <div className="border-2 rounded-md mx-2 lg:mx-0 lg:w-full text-start bg-white shadow-md">
                            <div className="bg-gray-700 text-white rounded-t-md flex text-lg py-2 px-2">
                                <div className="flex-1">Date</div>
                                <div className="flex-1">Locations</div>
                            </div>
                            {nextTripsByBoat.trips && nextTripsByBoat.trips.length > 0 ? nextTripsByBoat.trips.map(trip => (
                                <div>
                                    <Link to={`/trip/${trip._id}`} key={trip._id} className="flex py-2 px-2">
                                        <div className="flex-1">
                                            {format(new Date(trip.date), 'dd.MM.yyyy')}
                                        </div>
                                        <div className="flex-1">{trip.location.toString()}</div>
                                        
                                        
                                    </Link>
                                    <hr className="mx-2"></hr>
                                </div>
                            )):
                                <div className="px-2 py-2">There are no scheduled trips</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="pt-8 mx-2 lg:w-2/3 flex flex-col">
                    <div className="font-medium text-xl mb-2">
                        Description
                    </div>
                    <div className="text-start">
                        {boat.description && boat.description.split('\n').map((paragraph, index) => 
                            <p>
                                {paragraph.split("\n\n").reduce((total, line)=>[total, <br />, line])}
                                <br />
                            </p>)}
                    </div>
                    <div className="font-medium text-xl pt-8">
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