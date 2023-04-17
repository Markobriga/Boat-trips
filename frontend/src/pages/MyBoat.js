import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getBoatByOwner, getBoatDetails, newBoat, updateBoat } from "../actions/boatAction";
import Loader from "../components/Loader"
import { NEW_BOAT_RESET, UPDATE_BOAT_RESET } from "../constants/boatConstants";

const MyBoat = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state=>state.auth)
    const { loading, boat } = useSelector(state=>state.boatByOwner)

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [start, setStart] = useState()
    const [locations, setLocations] = useState([])
    const [maxNumberOfReservations, setMaxNumberOfReservations] = useState()
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);

    const { error, success } = useSelector(state => state.newBoat);
    const { error: updateError, isUpdated } = useSelector(state => state.boat);

    useEffect(()=>{
        
        if(user) {
            dispatch(getBoatByOwner(user._id))
        }

    },[user])

    useEffect(()=>{
        if(boat?.name ) {
            setName(boat.name)
            setDescription(boat.description)
            setStart(boat.start)
            setLocations([...boat.locations])
            setMaxNumberOfReservations(boat.maxNumberOfReservations)
            setOldImages(boat.images)
        }
    },[boat])

    useEffect(()=>{

        if (error) {
            console.log(error)
            dispatch(clearErrors())
        }

        if (success) {
            dispatch({ type: NEW_BOAT_RESET })
        }

        if(updateError) {
            console.log(updateError)
            dispatch(clearErrors())
        }

        if(isUpdated) {
            dispatch({type: UPDATE_BOAT_RESET})
        }

    },[dispatch, error, success, isUpdated, updateError])

    const handleChange = (index, e) => {
        e.preventDefault()
        setLocations(existingLocations => {
            return [
                ...existingLocations.slice(0,index),
                e.target.value,
                ...existingLocations.slice(index+1)
            ]
        })

    }

    const handleDelete = (index,e) => {
        e.preventDefault()
        setLocations(existingLocations => {
            return [
                ...existingLocations.slice(0,index),
                ...existingLocations.slice(index+1)
            ]
        })
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setLocations([...locations, ''])
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        //setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.set('name', name)
        formData.set('description', description)
        formData.set('start', start)
        formData.set('maxNumberOfReservations', maxNumberOfReservations)
        formData.set('owner', user.name)
        formData.set('user', user._id)
        formData.set('locations', locations)

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newBoat(formData))
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.set('name', name)
        formData.set('description', description)
        formData.set('start', start)
        formData.set('maxNumberOfReservations', maxNumberOfReservations)
        formData.set('owner', user.name)
        formData.set('user', user._id)
        formData.set('locations', locations)

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateBoat(boat._id, formData))
    }


    return (
        <div className="mx-auto max-w-screen-xl flex w-full">
            <Sidebar />
            {loading ? <Loader /> : 
            <div className="w-full">
                <div className="text-start py-3 px-3 font-medium text-xl">
                    My Boat
                </div>
                <form className="space-y-4 mb-5 px-3 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Name</label>
                        <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Description</label>
                        <textarea type="description" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-48 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Start location</label>
                        <input type="start" name="start" id="start" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={start} onChange={(e)=>setStart(e.target.value)}/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="locations" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Visiting locations</label>
                        {locations?.map((location,index) => 
                            <div key={index} className="flex items-baseline">
                                <input type="locations" name="locations" id="locations" className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={ location || ''} onChange={(e)=>handleChange(index, e)}/>
                                <button onClick={(e)=>handleDelete(index,e)} className="text-red-500">
                                    Delete
                                </button>
                            </div>
                        )}
                        <button onClick={handleAdd} className="px-2.5">Add new</button>
                    </div>
                    <div>
                        <label htmlFor="maxNumberOfReservations" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Max number of reservations</label>
                        <input type="number" name="maxNumberOfReservations" id="maxNumberOfReservations" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={maxNumberOfReservations || ''} onChange={(e)=>setMaxNumberOfReservations(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start" htmlFor="file_input">Upload images</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" multiple onChange={onChange}/>
                        <div className="flex mr-1">
                            {oldImages && oldImages.map(img => (
                                <img src={img.url} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52"/>
                            ))}
                            {images.map(img => (
                                <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52"/>
                            ))}
                        </div>
                    </div>
                    
                    {boat ? 
                        <button onClick={handleUpdate} type="submit" className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                        :
                        <button onClick={handleSubmit} type="submit" className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add boat</button>
                    }
                    
                </form>
            </div>
            }
        </div>
    )
}

export default MyBoat;