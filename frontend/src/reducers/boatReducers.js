import { ALL_BOATS_REQUEST, ALL_BOATS_SUCCESS, ALL_BOATS_FAIL, BOAT_DETAILS_REQUEST, BOAT_DETAILS_SUCCESS, BOAT_DETAILS_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET, CLEAR_ERRORS} from '../constants/boatConstants'

export const boatsReducer = (state = { boats: [] }, action) => {
    switch(action.type) {
        case ALL_BOATS_REQUEST:
            return {
                loading: true,
                boats: []
            }
        case ALL_BOATS_SUCCESS:
            return {
                loading: false,
                boats: action.payload.boats,
                boatsCount: action.payload.count
            }
        case ALL_BOATS_FAIL:
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

export const boatDetailsReducer = (state = {boat : {}}, action) => {
    switch(action.type) {

        case BOAT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case BOAT_DETAILS_SUCCESS:
            return {
                loading: false,
                boat: action.payload
            }

        case BOAT_DETAILS_FAIL:
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
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