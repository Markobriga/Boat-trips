import axios from "axios";
import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAIL, REGISTER_OWNER_REQUEST, REGISTER_OWNER_SUCCESS, REGISTER_OWNER_FAIL, ALL_OWNERS_REQUEST, ALL_OWNERS_SUCCESS, ALL_OWNERS_FAIL, REGISTER_BOOKER_REQUEST, REGISTER_BOOKER_SUCCESS, REGISTER_BOOKER_FAIL, ALL_BOOKERS_REQUEST, ALL_BOOKERS_SUCCESS, ALL_BOOKERS_FAIL, DELETE_BOOKER_REQUEST, DELETE_BOOKER_SUCCESS, DELETE_BOOKER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, CLEAR_ERRORS } from "../constants/userConstants";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('api/v1/login', {email, password}, config)

        dispatch({ 
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {

    try {
        dispatch({ type:LOAD_USER_REQUEST})

        const { data } = await axios.get('/api/v1/me')

        dispatch({
            type:LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch(error) {
        dispatch({ 
            type:LOAD_USER_FAIL, 
            payload: error.response.data.message
        })
    
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/api/v1/me/update', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/password/forgot', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch(error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const registerOwner = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_OWNER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/admin/register/owner', userData, config)

        dispatch({
            type: REGISTER_OWNER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_OWNER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allOwners = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_OWNERS_REQUEST})

        const { data } = await axios.get('/api/v1/admin/owners')

        dispatch({
            type: ALL_OWNERS_SUCCESS,
            payload: data.owners
        })

    } catch (error) {
        dispatch({ 
            type: ALL_OWNERS_FAIL, 
            payload: error.response.data.message 
        })
    }
}

export const registerBooker = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_BOOKER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/owner/register/booker', userData, config)

        dispatch({
            type: REGISTER_BOOKER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_BOOKER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const allBookers = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_BOOKERS_REQUEST})

        const { data } = await axios.get(`/api/v1/owner/bookers/${id}`)

        dispatch({
            type: ALL_BOOKERS_SUCCESS,
            payload: data.bookers
        })

    } catch (error) {
        dispatch({ 
            type: ALL_BOOKERS_FAIL, 
            payload: error.response.data.message 
        })
    }
}

export const deleteBooker = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BOOKER_REQUEST})

        const { data } = await axios.delete(`/api/v1/owner/booker/${id}`)

        dispatch({
            type: DELETE_BOOKER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({ 
            type: DELETE_BOOKER_FAIL, 
            payload: error.response.data.message 
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout')

        dispatch({ 
            type:LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({ 
            type:LOGOUT_FAIL,
            payload: error.response.data.message 
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}