import { delay, put, takeLatest, fork } from 'redux-saga/effects';
import * as types from '../action/actionTypes';
import {createAlert, removeAlert} from '../action/alertAction'
import {v4 as uuidv4} from "uuid";
// import { API_BASE_URL, ENDPOINTS } from '../constants/apiEndpoints';
// import axios from '../utils/axios';

function* createAlertAsync(payload) {
    const { msg, id, alertType} = payload
    const idnew = id ? uuidv4() : id
    // console.log('idnew',idnew, uuidv4(),id, payload)
    // yield put(createAlert({ msg, id:idnew, alertType}));
    // yield delay(5000);
    // yield put(removeAlert(idnew));
}

function* setAlertSaga() {
    yield takeLatest(types.SET_ALERT_ACTION, createAlertAsync)
}
export const alertSaga = [
    fork(setAlertSaga),
]

