import React, { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { getBoats } from "../actions/boatAction";
import BoatCard from "../components/boatCard";
import Loader from "../components/Loader";

const Boats = () => {

    const dispatch = useDispatch()

    const { loading, boats, error, boatsCount} = useSelector(state => state.boats)

    useEffect(()=> {
        dispatch(getBoats());
    }, [dispatch])

    return (
        <div className="mx-auto max-w-screen-xl flex w-full justify-center py-10 px-2">
            {loading ? <Loader /> : (<div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
                {boats && boats.map( boat => (
                    <BoatCard key={boat._id} boat={boat}/>
                ))}
            </div>)}
        </div>
    )
}

export default Boats;