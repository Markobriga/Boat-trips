import axios from 'axios';
import { ALL_BOATS_REQUEST, ALL_BOATS_SUCCESS, ALL_BOATS_FAIL, BOAT_DETAILS_REQUEST, BOAT_DETAILS_SUCCESS, BOAT_DETAILS_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_BOAT_REQUEST, NEW_BOAT_SUCCESS, NEW_BOAT_FAIL, UPDATE_BOAT_REQUEST, UPDATE_BOAT_SUCCESS, UPDATE_BOAT_FAIL, BOAT_BY_OWNER_REQUEST, BOAT_BY_OWNER_SUCCESS, BOAT_BY_OWNER_FAIL, CLEAR_ERRORS} from '../constants/boatConstants'

export const getBoats = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BOATS_REQUEST })

        const { data } = await axios.get('/api/v1/boats')

        dispatch({ 
            type: ALL_BOATS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_BOATS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newBoat = (boatData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_BOAT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/boat/new`, boatData, config)

        dispatch({
            type: NEW_BOAT_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: NEW_BOAT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateBoat = (id, boatData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BOAT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/boat/${id}`, boatData, config)

        dispatch({
            type: UPDATE_BOAT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_BOAT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBoatDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BOAT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/boat/${id}`)

        dispatch({ 
            type: BOAT_DETAILS_SUCCESS,
            payload: data.boat
        })

    } catch (error) {
        dispatch({
            type: BOAT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBoatByOwner = (id) => async (dispatch) => {
    try {
        dispatch({ type: BOAT_BY_OWNER_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/boat/${id}`)

        dispatch({ 
            type: BOAT_BY_OWNER_SUCCESS,
            payload: data.boat
        })

    } catch (error) {
        dispatch({
            type: BOAT_BY_OWNER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}