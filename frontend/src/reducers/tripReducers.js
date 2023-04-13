import { ALL_TRIPS_REQUEST, ALL_TRIPS_SUCCESS, ALL_TRIPS_FAIL, TRIP_DETAILS_REQUEST, TRIP_DETAILS_SUCCESS, TRIP_DETAILS_FAIL, NEXT_TRIPS_BY_BOAT_REQUEST, NEXT_TRIPS_BY_BOAT_SUCCESS, NEXT_TRIPS_BY_BOAT_FAIL, NEXT_TRIPS_REQUEST, NEXT_TRIPS_SUCCESS, NEXT_TRIPS_FAIL, NEW_TRIP_REQUEST, NEW_TRIP_SUCCESS, NEW_TRIP_FAIL, NEW_TRIP_RESET, TRIPS_BY_BOAT_REQUEST, TRIPS_BY_BOAT_SUCCESS, TRIPS_BY_BOAT_FAIL, CLEAR_ERRORS } from "../constants/tripConstansts" 

export const tripsReducer = (state = { trips: [] }, action) => {
    switch (action.type) {
        case ALL_TRIPS_REQUEST:
        case NEXT_TRIPS_REQUEST:
            return {
                loading: true,
                trips: []
            }
        case ALL_TRIPS_SUCCESS:
        case NEXT_TRIPS_SUCCESS:
            return {
                loading: false,
                trips: action.payload.trips,
                tripsCount: action.payload.count,
                resPerPage: action.payload.resPerPage
            }
        case ALL_TRIPS_FAIL:
        case NEXT_TRIPS_FAIL:
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
            return state
    }
}

export const newTripReducer = (state = {trip: {}}, action) => {
    switch (action.type) {
        case NEW_TRIP_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_TRIP_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                trip: action.payload.trip
            }

        case NEW_TRIP_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_TRIP_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const tripDetailsReducer = (state = { tripDetails: {} }, action) => {
    switch (action.type) {

        case TRIP_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TRIP_DETAILS_SUCCESS:
            return {
                loading: false,
                trip: action.payload
            }
        case TRIP_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
} 

export const nextTripsByBoatReducer = (state = { nextTripsByBoat: []}, action) => {
    switch (action.type) {
        case NEXT_TRIPS_BY_BOAT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEXT_TRIPS_BY_BOAT_SUCCESS:
            return {
                loading: false,
                nextTripsByBoat: action.payload
            }
        case NEXT_TRIPS_BY_BOAT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default: 
            return state
    }
}

export const tripsByBoatReducer = (state = { tripsByBoat: []}, action) => {
    switch (action.type) {
        case TRIPS_BY_BOAT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case TRIPS_BY_BOAT_SUCCESS:
            return {
                loading: false,
                tripsByBoat: action.payload
            }
        case TRIPS_BY_BOAT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default: 
            return state
    }
}
