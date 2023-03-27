import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { boatsReducer, boatDetailsReducer } from './reducers/boatReducers'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers'

const reducer = combineReducers({
    boats: boatsReducer,
    boatDetails: boatDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer
})

let initialState = {}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store