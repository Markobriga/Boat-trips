import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getLastTripsByBoat } from "../actions/tripAction";
import VerticalBar from "../components/VerticalBar";
import Loader from "../components/Loader";


const Dashboard = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state=>state.auth)
    const { loading, lastTrips } = useSelector(state=>state.lastTripsByBoat)

    useEffect(()=> {

        if(user) {
            dispatch(getLastTripsByBoat(user._id))
        }
    },[dispatch, user])

    return (
        <div className="mx-auto max-w-screen-xl w-full">
            <div className="flex">
                <Sidebar />
                {loading ? 
                <div className="flex justify-center w-full">
                    <Loader />
                </div> :
                <div className="w-full">
                    <div className="text-start py-3 px-3 font-medium text-xl">
                        Dashboard
                    </div>
                    <div className="pl-3 h-80  hidden md:block">
                        {lastTrips.trips && <VerticalBar trips={lastTrips.trips}/>}
                    </div>
                </div>
                }
            </div>
            {!loading && (
                <div className="md:hidden block">
                    <div className="h-60">
                        {lastTrips.trips && <VerticalBar trips={lastTrips.trips}/>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;