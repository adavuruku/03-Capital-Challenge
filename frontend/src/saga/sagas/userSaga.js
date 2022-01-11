import { call, takeEvery , put, take, takeLatest, fork, select, actionChannel } from 'redux-saga/effects';
import * as types from '../action/actionTypes';
import {createAlert, setAlert} from '../action/alertAction'
import {loginUserApi, registerApi, verifyEmailApi} from "../api/appApi";
import {
    createUer,
    emailVerificationCompleted,
    loginFail,
    loginSucceed,
    logOut,
    logOutComplete
} from "../action/userAction";
import {v4 as uuidv4} from "uuid";
import {clearContact} from "../action/contactAction";
function* createUserAsync({payload}) {
    let alert = {}
    try{
        const response = yield call(registerApi, payload)
        if(response.status === 200){
            yield put(createUer(response.data));
            const {message} = response.data.meta;
            alert = {
                msg: message,
                type: 'success',
                id: uuidv4()
            }
        }else{
            const {message} = response.meta;
            alert = {
                msg: message,
                type: 'danger',
                id: uuidv4()
            }
        }

    }catch(e){
        alert = {
            msg: 'Fail to create user, please retry',
            type: 'danger',
            id: uuidv4()
        }
    }finally {
        yield put(setAlert({ ...alert}));
    }
}

function* loginUserAsync({payload}) {
    let alert = {}
    try{
        const response = yield call(loginUserApi, payload)
        if(response.status === 200){
            yield put(loginSucceed(response.data));
            const {message} = response.data.meta;
            alert = {
                msg: message,
                type: 'success',
                id: uuidv4()
            }
        }else{
            const {message} = response.data.meta;
            alert = {
                msg: message,
                type: 'danger',
                id: uuidv4()
            }
            yield put(loginFail());
        }

    }catch(e){
        alert = {
            msg: 'Fail to login, please check your credential and retry',
            type: 'danger',
            id: uuidv4()
        }
        yield put(loginFail());
    }finally {
        yield put(setAlert({ ...alert}));
    }
}

function* emailVerificationAsync({payload}) {
    let alert = {}
    try{
        const response = yield call(verifyEmailApi, payload)
        if(response.status === 200){
            yield put(emailVerificationCompleted(true));
            const {message} = response.data.meta;
            alert = {
                msg: message,
                type: 'success',
                id: uuidv4()
            }
        }else{
            const {message} = response.data.meta;
            alert = {
                msg: message,
                type: 'danger',
                id: uuidv4()
            }
            yield put(emailVerificationCompleted(false));
        }

    }catch(e){
        alert = {
            msg: 'Fail to login, please check your credential and retry',
            type: 'danger',
            id: uuidv4()
        }
        yield put(emailVerificationCompleted(false));
    }finally {
        yield put(setAlert({ ...alert}));
    }
}


function* completeLogout(){
    yield put(logOutComplete())
    yield put (clearContact())
}

//listeners
function* loginStart(){
    yield takeLatest(types.LOGIN_START, loginUserAsync)
}
function* logoutStart(){
    yield takeLatest(types.LOGOUT_START, completeLogout)
}

function* setCreateUserSaga() {
    yield takeLatest(types.REGISTER_USER, createUserAsync)
}
function* setEmailVerificationSaga() {
    yield takeLatest(types.EMAIL_VERIFICATION_START, emailVerificationAsync)
}

export const userSaga = [
    fork(setCreateUserSaga), fork(logoutStart), fork(loginStart), fork(setEmailVerificationSaga)
]

