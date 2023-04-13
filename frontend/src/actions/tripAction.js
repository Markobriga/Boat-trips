import axios from 'axios';
import { ALL_TRIPS_REQUEST, ALL_TRIPS_SUCCESS, ALL_TRIPS_FAIL, TRIP_DETAILS_REQUEST, TRIP_DETAILS_SUCCESS, TRIP_DETAILS_FAIL, NEXT_TRIPS_BY_BOAT_REQUEST, NEXT_TRIPS_BY_BOAT_SUCCESS, NEXT_TRIPS_BY_BOAT_FAIL, NEXT_TRIPS_REQUEST, NEXT_TRIPS_SUCCESS, NEXT_TRIPS_FAIL, NEW_TRIP_REQUEST, NEW_TRIP_SUCCESS, NEW_TRIP_FAIL, TRIPS_BY_BOAT_REQUEST, TRIPS_BY_BOAT_SUCCESS, TRIPS_BY_BOAT_FAIL, CLEAR_ERRORS } from "../constants/tripConstansts" 

export const getTrips = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_TRIPS_REQUEST })

        const { data } = await axios.get('/api/v1/trips')

        dispatch({ 
            type: ALL_TRIPS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_TRIPS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newTrip = (tripData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_TRIP_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/trip/new`, tripData, config)

        dispatch({
            type: NEW_TRIP_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch ({
            type: NEW_TRIP_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTripsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: TRIP_DETAILS_REQUEST })
        
        const { data } = await axios.get(`/api/v1/trip/${id}`)

        dispatch({
            type: TRIP_DETAILS_SUCCESS,
            payload: data.trip
        })

    } catch (error) {
        dispatch ({
            type: TRIP_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getNextTrips = (price, location) => async (dispatch) => {
    try {

        dispatch({ type: NEXT_TRIPS_REQUEST })

         let locationQuery = ''

        location.map(location => {
            locationQuery = locationQuery + "&location=" + location;
        })
 
        let link = `/api/v1/trips/next?priceAdult[lte]=${price[1]}&priceAdult[gte]=${price[0]}${locationQuery}`

        const { data } = await axios.get(link)

        dispatch ({
            type: NEXT_TRIPS_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch ({
            type: NEXT_TRIPS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getNextTripsByBoat = (boat) => async (dispatch) => {
    try {

        dispatch({ type: NEXT_TRIPS_BY_BOAT_REQUEST })

        const { data } = await axios.get(`/api/v1/trips/next/${boat}`)

        dispatch({
            type: NEXT_TRIPS_BY_BOAT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch ({
            type: NEXT_TRIPS_BY_BOAT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTripsByBoat = (user) => async (dispatch) => {
    try {

        dispatch({ type: TRIPS_BY_BOAT_REQUEST })

        const { data } = await axios.get(`/api/v1/owner/trips/${user}`)

        dispatch({
            type: TRIPS_BY_BOAT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch ({
            type: TRIPS_BY_BOAT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}