import { ALL_TRIPS_REQUEST, ALL_TRIPS_SUCCESS, ALL_TRIPS_FAIL, TRIP_DETAILS_REQUEST, TRIP_DETAILS_SUCCESS, TRIP_DETAILS_FAIL, CLEAR_ERRORS } from "../constants/tripConstansts" 

export const tripsReducer = (state = { trips: [] }, action) => {
    switch (action.type) {
        case ALL_TRIPS_REQUEST:
            return {
                loading: true,
                trips: []
            }
        case ALL_TRIPS_SUCCESS:
            return {
                loading: false,
                trips: action.payload.trips,
                tripsCount: action.payload.count
            }
        case ALL_TRIPS_FAIL:
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