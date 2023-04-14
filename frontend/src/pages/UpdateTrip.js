import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBoatByOwner } from '../actions/boatAction';
import Loader from '../components/Loader';
import DatePicker from 'tailwind-datepicker-react'
import Sidebar from "../components/Sidebar";
import { clearErrors, getTripsDetails, updateTrip } from "../actions/tripAction";
import { useNavigate, useParams } from "react-router-dom";
import DateComponent from "../components/Date";
import { UPDATE_TRIP_RESET } from "../constants/tripConstansts";

const UpdateTrip = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state=>state.auth)
    const { loading, boat } = useSelector(state=>state.boatByOwner)
    const { loading:loadingTrip , error, trip } = useSelector(state => state.tripDetails)
    const { id } = useParams()


    const [name, setName] = useState()
    const [priceAdult, setPriceAdult] = useState()
    const [priceChild, setPriceChild] = useState()
    const [duration, setDuration] = useState()
    const [locations, setLocations] = useState([])
    const [date, setDate] = useState(new Date())
    const [checkedState, setCheckedState] = useState()

    const { error: updateError, isUpdated } = useSelector(state => state.trip);

    useEffect(()=> {
        if(user) {
            dispatch(getBoatByOwner(user._id))
            dispatch(getTripsDetails(id))
        }

    },[user,dispatch])

    useEffect(()=>{
        if(boat.locations && trip.location) {
            setName(trip.tripName)
            setPriceAdult(trip.priceAdult)
            setPriceChild(trip.priceChild)
            setDuration(trip.duration)
            setDate(trip.date)
            setLocations([...trip.location])

            let temp=new Array(boat.locations.length).fill(false)

            temp = boat.locations.map((item)=>
                locations.includes(item) ? true : false
            )
            setCheckedState(temp)
        }
    },[boat,trip,dispatch])

    useEffect(()=> {
        if(updateError) {
            console.log(updateError)
            dispatch(clearErrors())
        }

        if(isUpdated) {
            dispatch({type: UPDATE_TRIP_RESET})
        }
    },[dispatch, isUpdated, updateError])

    const handleOnChange = (position) => {
        let temp=[]
        const updatedCheckedState = checkedState.map((item, index) => 
            index === position ? !item : item
        )

        updatedCheckedState.map((item, index) => 
            item === true && temp.push(boat.locations[index])
        )

        setCheckedState(updatedCheckedState)
        temp = temp.sort();
        setLocations(temp)
    }

    const handleChange = (selectedDate) => {
        setDate(selectedDate)
    }

    const handleSubmit = (e) => {
        const formData = new FormData()

        formData.set('tripName', name)
        formData.set('boatName', boat.name)
        formData.set('priceAdult', priceAdult)
        formData.set('priceChild', priceChild)
        formData.set('date', date)
        formData.set('duration', duration)
        formData.set('location', locations)
        formData.set('boat', boat._id)
        formData.set('user', user._id)

        dispatch(updateTrip(trip._id, formData))
        navigate("/owner/trips")
    }

    return (
        <div className="mx-auto max-w-screen-xl flex w-full">
            <Sidebar />
            {(loading && loadingTrip) ? <Loader /> :
            <div className='w-full'>
                <div className="text-start py-3 px-3 font-medium text-xl">
                    Update Trip
                </div>
                <form className="space-y-2 mb-5 px-3 md:space-y-4" action="#">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Trip Name</label>
                        <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className='relative'>
                        <div className="block text-sm font-medium text-gray-900 dark:text-white text-start">
                            Date
                        </div>
                        <DateComponent initialDate={date} handleChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="priceAdult" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Price Adult (€)</label>
                        <input type="number" name="priceAdult" id="priceAdult" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={priceAdult || ''} onChange={(e)=>setPriceAdult(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="priceChild" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Price Child (€)</label>
                        <input type="number" name="priceChild" id="priceChild" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={priceChild || ''} onChange={(e)=>setPriceChild(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Duration (h)</label>
                        <input type="number" name="duration" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={duration || ''} onChange={(e)=>setDuration(e.target.value)}/>
                    </div>
                    <div className="block text-sm font-medium text-gray-900 dark:text-white text-start">
                        Locations
                    </div>
                    {checkedState && boat.locations && boat.locations.map((location, index) => 
                        <div key={index} className="flex items-center">
                            <input id={`checkbox-${index}`} checked={checkedState[index]} onChange={()=>handleOnChange(index)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor={`checkbox-${index}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{location}</label>
                        </div>
                    )}
                    <button onClick={handleSubmit} type="submit" className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update trip</button>
                </form>
            </div> 
            }
        </div>
    )
}

export default UpdateTrip;