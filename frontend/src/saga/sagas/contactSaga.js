import { call,  takeEvery , put, take, takeLatest, fork, select, actionChannel } from 'redux-saga/effects';
import * as types from '../action/actionTypes';
import {createAlert, setAlert} from '../action/alertAction'
import {loadContactApi, createContactApi, deleteContactApi} from "../api/appApi";
import {v4 as uuidv4} from "uuid";
import {createContactCompleted, displayContactCompleted, removeContactCompleted} from "../action/contactAction";

function* conpleteLoadContact({payload}) {
    let alert = {}
    let response = null
    try{
        response = yield call(loadContactApi, payload)

        if(response.status === 200){
            yield put(displayContactCompleted(response.data.data));
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
        console.log(response)
        alert = {
            msg: `Fail to load contact, please retry ${response}`,
            type: 'danger',
            id: uuidv4()
        }
    }finally {
        yield put(setAlert({ ...alert}));
    }
}

function* createContactAsync({payload}) {
    let alert = {}
    try{
        const response = yield call(createContactApi, payload)
        if(response.status === 200){
            yield put(createContactCompleted(response.data.data));
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
            msg: 'Fail to add contact, please retry ',
            type: 'danger',
            id: uuidv4()
        }
    }finally {
        yield put(setAlert({ ...alert}));
    }
}
function* deleteContactAsync({payload}) {
    let alert = {}
    try{
        const response = yield call(deleteContactApi, payload)
        if(response.status === 200){
            yield put(removeContactCompleted(payload));
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
            msg: 'Fail to delete contact, please retry ',
            type: 'danger',
            id: uuidv4()
        }
    }finally {
        yield put(setAlert({ ...alert}));
    }
}
//listeners
function* setDeleteContactStart(){
    yield takeLatest(types.DELETED_CONTACT_START, deleteContactAsync)
}
function* setloadContactStart(){
    yield takeLatest(types.LOAD_CONTACT_START, conpleteLoadContact)
}

function* setCreateContactStart() {
    yield takeLatest(types.ADD_CONTACT_START, createContactAsync)
}

export const contactSaga = [
     fork(setDeleteContactStart),
    fork(setloadContactStart), fork(setCreateContactStart)
]

