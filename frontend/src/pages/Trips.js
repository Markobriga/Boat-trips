import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import { getNextTrips } from '../actions/tripAction'
import TripCard from "../components/tripCard";
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;

const Trips = () => {

    const locations = [
        'Brac',
        'Hvar',
        'Korcula'
    ]

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1,200])
    const [showingPrice, setShowingPrice] = useState([1,200])
    const [location, setLocation] = useState([])
    const [checkedState, setCheckedState] = useState(new Array(locations.length).fill(false))
    const [rating, setRating] = useState(0)

    

    const dispatch = useDispatch()

    const { loading, trips, error, count, resPerPage } = useSelector(state => state.trips)

    useEffect(()=> {
        dispatch(getNextTrips(price, location))
    },[dispatch, price, location])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }


    const handleOnChange = (position) => {
        let temp=[]
        const updatedCheckedState = checkedState.map((item, index) => 
            index === position ? !item : item
        )

        updatedCheckedState.map((item, index) => 
            item === true && temp.push(locations[index])
        )

        setCheckedState(updatedCheckedState)
        temp = temp.sort();
        setLocation(temp)
    }

    return (
        <div className="mx-auto max-w-screen-xl flex w-full py-10">
            {loading ? <Loader /> : (
                <div className="flex w-full">
                    <div className="pl-5 pr-10 w-1/4">
                        <div className="text-lg font-semibold">
                            FILTERS
                        </div>
                        <div className="text-start font-semibold">
                            Price
                        </div>
                        <div className="text-start">
                            {showingPrice[0]}€-{showingPrice[1]}€
                        </div>
                        <Slider
                            range
                            min={1}
                            max={200}
                            defaultValue={[1, 200]}
                            tipFormatter={value => `${value}€`}
                            tipProps={{
                                placement: "top",
                                visible: true
                            }}
                            value={showingPrice}
                            onChange={showingPrice => setShowingPrice(showingPrice)}
                            onAfterChange={showingPrice => {
                                setPrice(showingPrice)
                                setShowingPrice(showingPrice)
                            }}
                        />
                        <hr className="my-5"/>
                        <div className="text-start font-semibold">
                            Locations
                        </div>
                        <div>
                            {locations.map((l, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id={`checkbox-${index}`} checked={checkedState[index]} onChange={()=>handleOnChange(index)} type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor={`checkbox-${index}`} className="text-gray-500 dark:text-gray-300">{l}</label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        </div>
                    <div className="flex flex-col pb-3 pl-10 sm:w-3/4">
                        {trips && trips.map((trip) => (
                            <TripCard key={trip._id} trip={trip}/>
                        ))}
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default Trips;