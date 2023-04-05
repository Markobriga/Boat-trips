import axios from 'axios';
import { CREATE_RESERVATION_REQUEST, CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_FAIL, CLEAR_ERRORS } from '../constants/reservationConstants'


export const createReservation = (reservation) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_RESERVATION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/reservation/new', reservation, config)

        dispatch({
            type: CREATE_RESERVATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_RESERVATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}