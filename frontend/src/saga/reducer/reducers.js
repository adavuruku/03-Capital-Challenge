import { combineReducers } from 'redux';
import alert from './alertReducer';
import user from './userReducer';
// import storage from 'redux-persist/lib/storage'
// import {persistReducer} from "redux-persist";
// const persistConfig = {
//     key:'root',
//     storage,
//     whitelist:['user'], //list of states you want to persist
// }
const rootReducer = combineReducers({
    alert, user
})
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export default persistedReducer
export default rootReducer