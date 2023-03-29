import axios from 'axios';
import { ALL_TRIPS_REQUEST, ALL_TRIPS_SUCCESS, ALL_TRIPS_FAIL, TRIP_DETAILS_REQUEST, TRIP_DETAILS_SUCCESS, TRIP_DETAILS_FAIL, CLEAR_ERRORS } from "../constants/tripConstansts" 

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

export const getTripsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: TRIP_DETAILS_FAIL })
        
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

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}