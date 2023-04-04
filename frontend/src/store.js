import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { boatsReducer, boatDetailsReducer } from './reducers/boatReducers'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers'
import { tripsReducer, tripDetailsReducer, nextTripsByBoatReducer } from './reducers/tripReducers'
import { cartReducer } from './reducers/cartReducers'


const reducer = combineReducers({
    boats: boatsReducer,
    boatDetails: boatDetailsReducer,
    trips: tripsReducer,
    tripDetails: tripDetailsReducer,
    nextTripsByBoat: nextTripsByBoatReducer,
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer
})

let initialState = {
    cart: {
        cartTrip: sessionStorage.getItem('cartTrip')
            ? JSON.parse(sessionStorage.getItem('cartTrip'))
            : {}
    }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store