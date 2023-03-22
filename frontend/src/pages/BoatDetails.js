import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoatDetails, clearErrors } from "../actions/boatAction";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const BoatDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, error, boat }  = useSelector(state => state.boatDetails)

    useEffect(() => {
        
        dispatch(getBoatDetails(id))

        if(error) {
            console.log(error)
            dispatch(clearErrors())
        }

    },[dispatch, error, id])

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