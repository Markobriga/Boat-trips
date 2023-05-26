import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import { getNextTrips } from '../actions/tripAction'
import TripCard from "../components/tripCard";
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';
import DateComponent from "../components/Date";

const Trips = () => {

    const locations = [
        'Brač',
        'Hvar',
        'Korčula',
        'Šolta'
    ]

    const [currentPage, setCurrentPage] = useState(1)
    const [priceAdult, setPriceAdult] = useState([1,200])
    const [showingPriceAdult, setShowingPriceAdult] = useState([1,200])
    const [priceChild, setPriceChild] = useState([1,200])
    const [showingPriceChild, setShowingPriceChild] = useState([1,200])
    const [location, setLocation] = useState([])
    const [checkedState, setCheckedState] = useState(new Array(locations.length).fill(false))
    const [date, setDate] = useState(new Date())
    const [showDate, setShowDate] = useState(false)

    const dispatch = useDispatch()

    const { loading, trips, error, count, resPerPage } = useSelector(state => state.trips)

    useEffect(()=> {
        dispatch(getNextTrips(priceAdult, priceChild, location, date, showDate))
    },[dispatch, priceAdult, priceChild, location, date, showDate])

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

    const handleChange = (selectedDate) => {
        setDate(selectedDate)
        setShowDate(true)
    }

    return (
        <div className="mx-auto max-w-screen-xl flex w-full py-10">
            {loading ? <Loader /> : (
                <div className="flex flex-col lg:flex-row w-full">
                    <div className="pl-5 pr-10 pb-5 lg:w-1/4 ">
                        <div className="bg-white p-5 rounded-md shadow-md">
                        <div className="text-lg font-semibold">
                            FILTERS
                        </div>
                        <div className="relative">
                            <div className="text-start font-semibold">
                                Date
                            </div>
                            <DateComponent initialDate={date} handleChange={handleChange}/>
                        </div>
                        <hr className="my-5"/>
                        <div className="text-start font-semibold">
                            Price Adult
                        </div>
                        <div className="text-start">
                            {showingPriceAdult[0]}€-{showingPriceAdult[1]}€
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
                            value={showingPriceAdult}
                            onChange={showingPriceAdult => setShowingPriceAdult(showingPriceAdult)}
                            onAfterChange={showingPriceAdult => {
                                setPriceAdult(showingPriceAdult)
                                setShowingPriceAdult(showingPriceAdult)
                            }}
                        />
                        <hr className="my-5"/>
                        <div className="text-start font-semibold">
                            Price Child
                        </div>
                        <div className="text-start">
                            {showingPriceChild[0]}€-{showingPriceChild[1]}€
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
                            value={showingPriceChild}
                            onChange={showingPriceChild => setShowingPriceChild(showingPriceChild)}
                            onAfterChange={showingPriceChild => {
                                setPriceChild(showingPriceChild)
                                setShowingPriceChild(showingPriceChild)
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
                    </div>
                    <div className="flex flex-col pb-3 px-5 lg:pl-10 lg:w-3/4">
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