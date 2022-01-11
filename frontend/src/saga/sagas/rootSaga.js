import { all} from 'redux-saga/effects';
import { alertSaga } from './alertSaga';
import {userSaga} from "./userSaga";
import {contactSaga} from "./contactSaga";
export default function* rootSaga() {
    yield all([
            ...alertSaga, ...userSaga, ...contactSaga
    ]);
}