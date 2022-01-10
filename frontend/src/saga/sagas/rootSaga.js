import { all} from 'redux-saga/effects';
import { alertSaga } from './alertSaga';
// import { customerSaga } from 'sagas/customerSaga';
import * as types from '../action/actionTypes';
import {userSaga} from "./userSaga";
export default function* rootSaga() {
    yield all([
            ...alertSaga, ...userSaga
    ]);
}