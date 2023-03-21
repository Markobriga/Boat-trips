import axios from 'axios';
import { ALL_BOATS_REQUEST, ALL_BOATS_SUCCESS, ALL_BOATS_FAIL, CLEAR_ERRORS} from '../constants/boatConstants'

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

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}