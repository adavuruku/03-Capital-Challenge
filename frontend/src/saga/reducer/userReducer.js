import { REGISTER_SUCCESS_ACTION,
    LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT } from '../action/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';
// reducers define the content in the redux stores
// more of a table in the db(store)
const initialState = {
    meta:null,
    isRegister:false,
    isAuthenticated:false,
    loading:true,
    data:null
};

function userReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_SUCCESS_ACTION:
            return {
                ...state, ...payload, isAuthenticated:false, isRegister:true, loading:false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.meta.token)
            return {
                ...state, data: payload.data, isAuthenticated:true, isRegister:false, loading:false
            }
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state, token:null, data:null, isAuthenticated:false, isRegister:false, loading:false
            }
        case REHYDRATE:
            if(payload?.user){
                return { ...state, ...payload.user, persistedState: payload };
            }
            return state;
            break;
        default:
            return state;
    }
}


export default userReducer;