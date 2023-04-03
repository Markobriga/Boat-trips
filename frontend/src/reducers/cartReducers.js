import { ADD_TO_CART } from '../constants/cartConstants'

export const cartReducer = (state = {cartTrip: {}}, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const trip = action.payload

            return {
                ...state,
                cartTrip: trip
            }


        default: return state
    }
}