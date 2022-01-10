import { REGISTER_SUCCESS_ACTION,
    USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT } from '../action/actionTypes';

// reducers define the content in the redux stores
// more of a table in the db(store)
const initialState = {
    token:null,
    isAuthenticated:false,
    loading:true,
    user:null
};

function userReducer(state = initialState, action) {
    const { type, payload } = action;
    console.log('USER ', payload)
    switch (type) {
        case REGISTER_SUCCESS_ACTION:
        case LOGIN_SUCCESS:
            // localStorage.setItem('token',payload.token)
            console.log('after reg : ',...payload)
            return {
                ...state, ...payload, isAuthenticated:true, loading:false
            }
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state, token:null, user:null, isAuthenticated:false, loading:false
            }
        case USER_LOADED:
            return {
                ...state, isAuthenticated:true, loading:false, user:payload
            }
        default:
            return state;
    }
}


export default userReducer;