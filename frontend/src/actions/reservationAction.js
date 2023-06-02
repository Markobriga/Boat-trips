import axios from 'axios';
import { CREATE_RESERVATION_REQUEST, CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_FAIL, MY_RESERVATIONS_REQUEST, MY_RESERVATIONS_SUCCESS, MY_RESERVATIONS_FAIL, ALL_BOOKER_RESERVATIONS_REQUEST, ALL_BOOKER_RESERVATIONS_SUCCESS, ALL_BOOKER_RESERVATIONS_FAIL, ALL_RESERVATIONS_REQUEST, ALL_RESERVATIONS_SUCCESS, ALL_RESERVATIONS_FAIL, CLEAR_ERRORS, DELETE_RESERVATION_REQUEST, DELETE_RESERVATION_SUCCESS, DELETE_RESERVATION_FAIL } from '../constants/reservationConstants'


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

export const myReservations = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_RESERVATIONS_REQUEST });

        const { data } = await axios.get('/api/v1/reservations/me')

        dispatch({
            type: MY_RESERVATIONS_SUCCESS,
            payload: data.reservations
        })

    } catch (error) {
        dispatch({
            type: MY_RESERVATIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allReservations = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ALL_RESERVATIONS_REQUEST });

        const { data } = await axios.get(`/api/v1/owner/trip/reservations/${id}`)

        dispatch({
            type: ALL_RESERVATIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_RESERVATIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allBookerReservations = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ALL_BOOKER_RESERVATIONS_REQUEST });

        const { data } = await axios.get(`/api/v1/owner/reservations/${id}`)

        dispatch({
            type: ALL_BOOKER_RESERVATIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_BOOKER_RESERVATIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteReservation = (id) => async ( dispatch ) => {
    try {

        dispatch({ type: DELETE_RESERVATION_REQUEST})

        const { data } = await axios.delete(`/api/v1/admin/reservation/${id}`)

        dispatch({
            type: DELETE_RESERVATION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({ 
            type: DELETE_RESERVATION_FAIL, 
            payload: error.response.data.message 
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}