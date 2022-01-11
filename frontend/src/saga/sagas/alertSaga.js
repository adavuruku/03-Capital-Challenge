import {delay, put, takeLatest, call, take, fork, takeEvery} from 'redux-saga/effects';
import * as types from '../action/actionTypes';
import {createAlert, removeAlert} from '../action/alertAction'
import {v4 as uuidv4} from "uuid";
// import { API_BASE_URL, ENDPOINTS } from '../constants/apiEndpoints';
// import axios from '../utils/axios';

function* createAlertAsync({payload}) {
    const { msg, id, alertType} = payload
    yield put(createAlert({ msg, id, alertType}));
    yield delay(3000);
    yield put(removeAlert(id));
}

function* setAlertSaga() {
    yield takeEvery(types.SET_ALERT_ACTION, createAlertAsync)
    // const payload = yield take(types.SET_ALERT_ACTION)
    // console.log(payload, 'eere')
    // yield call(createAlertAsync, payload)
}

export const alertSaga = [
    fork(setAlertSaga),
]

