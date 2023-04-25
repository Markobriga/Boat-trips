import { ALL_BOATS_REQUEST, ALL_BOATS_SUCCESS, ALL_BOATS_FAIL, BOAT_DETAILS_REQUEST, BOAT_DETAILS_SUCCESS, BOAT_DETAILS_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET, NEW_BOAT_REQUEST, NEW_BOAT_SUCCESS, NEW_BOAT_FAIL, NEW_BOAT_RESET, UPDATE_BOAT_REQUEST, UPDATE_BOAT_SUCCESS, UPDATE_BOAT_FAIL, UPDATE_BOAT_RESET, BOAT_BY_OWNER_REQUEST, BOAT_BY_OWNER_SUCCESS, BOAT_BY_OWNER_FAIL, ALL_ADMIN_BOATS_REQUEST, ALL_ADMIN_BOATS_SUCCESS, ALL_ADMIN_BOATS_FAIL, CLEAR_ERRORS} from '../constants/boatConstants'

export const boatsReducer = (state = { boats: [] }, action) => {
    switch(action.type) {
        case ALL_BOATS_REQUEST:
        case ALL_ADMIN_BOATS_REQUEST:
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
        case ALL_ADMIN_BOATS_SUCCESS:
            return {
                loading: false,
                boats: action.payload
            }
        case ALL_BOATS_FAIL:
        case ALL_ADMIN_BOATS_FAIL:
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

export const newBoatReducer = (state = {boat: {}}, action) => {
    switch (action.type) {
        case NEW_BOAT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_BOAT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                boat: action.payload.boat
            }

        case NEW_BOAT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_BOAT_RESET:
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

export const boatReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_BOAT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_BOAT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_BOAT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_BOAT_RESET:
            return {
                ...state,
                isUpdated: false
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

export const boatByOwnerReducer = (state = {boat : {}}, action) => {
    switch(action.type) {

        case BOAT_BY_OWNER_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case BOAT_BY_OWNER_SUCCESS:
            return {
                loading: false,
                boat: action.payload
            }

        case BOAT_BY_OWNER_FAIL:
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