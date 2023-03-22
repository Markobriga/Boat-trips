import axios from 'axios';
import { ALL_BOATS_REQUEST, ALL_BOATS_SUCCESS, ALL_BOATS_FAIL, BOAT_DETAILS_REQUEST, BOAT_DETAILS_SUCCESS, BOAT_DETAILS_FAIL, CLEAR_ERRORS} from '../constants/boatConstants'

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


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}