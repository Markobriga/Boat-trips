import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { boatsReducer, boatDetailsReducer, newReviewReducer } from './reducers/boatReducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer } from './reducers/userReducers'
import { tripsReducer, tripDetailsReducer, nextTripsByBoatReducer } from './reducers/tripReducers'
import { cartReducer } from './reducers/cartReducers'
import { myReservationsReducer, newReservationReducer } from './reducers/reservationReducers'

const reducer = combineReducers({
    boats: boatsReducer,
    boatDetails: boatDetailsReducer,
    trips: tripsReducer,
    tripDetails: tripDetailsReducer,
    nextTripsByBoat: nextTripsByBoatReducer,
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    newReservation: newReservationReducer,
    myReservations: myReservationsReducer,
    newReview: newReviewReducer
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