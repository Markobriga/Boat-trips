import { CREATE_RESERVATION_REQUEST, CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_FAIL, MY_RESERVATIONS_REQUEST, MY_RESERVATIONS_SUCCESS, MY_RESERVATIONS_FAIL, CLEAR_ERRORS } from '../constants/reservationConstants'

export const newReservationReducer = (state = {}, action) => {
    switch (action.type) {

        case CREATE_RESERVATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_RESERVATION_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case CREATE_RESERVATION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default: return state
    }
}

export const myReservationsReducer = (state = {reservations: []}, action) => {
    switch(action.type) {

        case MY_RESERVATIONS_REQUEST:
            return {
                loading: true
            }
        case MY_RESERVATIONS_SUCCESS:
            return {
                loading: false,
                reservations: action.payload
            }
        case MY_RESERVATIONS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}