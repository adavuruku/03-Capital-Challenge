import { call,  takeEvery , put, take, takeLatest, fork, select, actionChannel } from 'redux-saga/effects';
import * as types from '../action/actionTypes';
import {createAlert} from '../action/alertAction'
import {registerApi} from "../api/userApi";
import {createUer, logOut, logOutComplete} from "../action/userAction";
import {v4 as uuidv4} from "uuid";

function* createUserAsync({payload}) {
    let alert = {}
    try{
        const response = yield call(registerApi, payload)
        console.log('after response : ', response)
        if(response.status === 200){
            yield put(createUer(response.data));
            const {message} = response.meta;
            alert = {
                msg: message,
                type: 'success',
                id: uuidv4()
            }
        }else{
            const {message} = response.meta;
            alert = {
                msg: message,
                type: 'error',
                id: uuidv4()
            }
        }

    }catch(e){
        alert = {
            msg: 'Fail to create user, please retry',
            type: 'error',
            id: uuidv4()
        }
    }finally {
        yield put(createAlert({ ...alert}));
    }
}

function* completeLogout(){
    yield put(logOutComplete())
}
function* logoutStart(){
    yield takeLatest(types.LOGOUT_START, completeLogout)
}

function* setCreateUserSaga() {
    yield takeLatest(types.REGISTER_USER, createUserAsync)
}

export const userSaga = [
    fork(setCreateUserSaga), fork(logoutStart)
]

