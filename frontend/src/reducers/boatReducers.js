import { ALL_BOATS_REQUEST, ALL_BOATS_SUCCESS, ALL_BOATS_FAIL, CLEAR_ERRORS} from '../constants/boatConstants'

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