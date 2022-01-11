import {
    REGISTER_SUCCESS_ACTION,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, EMAIL_VERIFICATION_COMPLETED
} from '../action/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';
// reducers define the content in the redux stores
// more of a table in the db(store)
const initialState = {
    loading:true,
    isEmailVerified:false
};

function emailReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case EMAIL_VERIFICATION_COMPLETED:
            return {
                ...state, loading:false, isEmailVerified:payload
            }
        default:
            return state;
    }
}


export default emailReducer;