import {ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS, ALL_POSTS_FAIL, POST_DETAILS_REQUEST, POST_DETAILS_SUCCESS, POST_DETAILS_FAIL, NEW_POST_REQUEST, NEW_POST_SUCCESS, NEW_POST_RESET, NEW_POST_FAIL , UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, UPDATE_POST_RESET, UPDATE_POST_FAIL , DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_RESET, DELETE_POST_FAIL, CLEAR_ERRORS} from "../constants/postConstants"

export const postsReducer = (state = { posts: [] }, action) => {
    switch(action.type) {
        case ALL_POSTS_REQUEST:
            return {
                loading: true,
                posts: []
            }
        case ALL_POSTS_SUCCESS:
            return {
                loading: false,
                posts: action.payload.posts,
            }
        case ALL_POSTS_FAIL:
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

export const newPostReducer = (state = {post: {}}, action) => {
    switch (action.type) {
        case NEW_POST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_POST_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                post: action.payload.post
            }

        case NEW_POST_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_POST_RESET:
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

export const postReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_POST_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_POST_RESET:
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

export const postDetailsReducer = (state = {post : {}}, action) => {
    switch(action.type) {

        case POST_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case POST_DETAILS_SUCCESS:
            return {
                loading: false,
                post: action.payload
            }

        case POST_DETAILS_FAIL:
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