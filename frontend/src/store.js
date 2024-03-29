import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { boatsReducer, boatDetailsReducer, newReviewReducer, newBoatReducer, boatByOwnerReducer, boatReducer } from './reducers/boatReducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer } from './reducers/userReducers'
import { tripsReducer, tripDetailsReducer, nextTripsByBoatReducer, newTripReducer, tripsByBoatReducer, tripReducer, lastTripsByBoatReducer } from './reducers/tripReducers'
import { cartReducer } from './reducers/cartReducers'
import { allBookerReservationsReducer, allReservationsReducer, myReservationsReducer, newReservationReducer, reservationReducer } from './reducers/reservationReducers'
import { newPostReducer, postDetailsReducer, postReducer, postsReducer } from './reducers/postReducers'

const reducer = combineReducers({
    boats: boatsReducer,
    boatDetails: boatDetailsReducer,
    newBoat: newBoatReducer,
    boat: boatReducer,
    boatByOwner: boatByOwnerReducer,
    trips: tripsReducer,
    tripsByBoat: tripsByBoatReducer,
    newTrip: newTripReducer,
    trip: tripReducer,
    tripDetails: tripDetailsReducer,
    nextTripsByBoat: nextTripsByBoatReducer,
    lastTripsByBoat: lastTripsByBoatReducer,
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    newReservation: newReservationReducer,
    myReservations: myReservationsReducer,
    allReservations: allReservationsReducer,
    allBookerReservations: allBookerReservationsReducer,
    reservation: reservationReducer,
    newReview: newReviewReducer,
    posts: postsReducer,
    newPost: newPostReducer,
    post: postReducer,
    postDetails: postDetailsReducer
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