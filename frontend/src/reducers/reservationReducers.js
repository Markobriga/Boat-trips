import { CREATE_RESERVATION_REQUEST, CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_FAIL, MY_RESERVATIONS_REQUEST, MY_RESERVATIONS_SUCCESS, MY_RESERVATIONS_FAIL, ALL_BOOKER_RESERVATIONS_REQUEST, ALL_BOOKER_RESERVATIONS_SUCCESS, ALL_BOOKER_RESERVATIONS_FAIL, ALL_RESERVATIONS_REQUEST, ALL_RESERVATIONS_SUCCESS, ALL_RESERVATIONS_FAIL, CLEAR_ERRORS } from '../constants/reservationConstants'

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

export const allReservationsReducer = (state = {reservations: []}, action) => {
    switch(action.type) {

        case ALL_RESERVATIONS_REQUEST:
            return {
                loading: true
            }
        case ALL_RESERVATIONS_SUCCESS:
            return {
                loading: false,
                reservations: action.payload
            }
        case ALL_RESERVATIONS_FAIL:
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

export const allBookerReservationsReducer = (state = {reservations: []}, action) => {
    switch(action.type) {

        case ALL_BOOKER_RESERVATIONS_REQUEST:
            return {
                loading: true
            }
        case ALL_BOOKER_RESERVATIONS_SUCCESS:
            return {
                loading: false,
                reservations: action.payload
            }
        case ALL_BOOKER_RESERVATIONS_FAIL:
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