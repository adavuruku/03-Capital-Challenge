import * as types from './actionTypes';
import {v4 as uuidv4} from "uuid";

export const createAlert = (alertPayload) => ({ type: types.SET_ALERT, alertPayload });
export const setAlert = (alertPayload) => ({ type: types.SET_ALERT_ACTION, payload: alertPayload});
export const removeAlert = (alertId) => ({ type: types.REMOVE_ALERT_ACTION, alertId });