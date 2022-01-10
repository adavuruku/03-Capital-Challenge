import * as types from './actionTypes';
//create user action
export function createUer(createUserPayload) {
    return { type: types.REGISTER_SUCCESS_ACTION, payload: createUserPayload };
}

export function createUserStart(createUserPayload) {
    return { type: types.REGISTER_USER, payload: createUserPayload };
}

//logout actions
export function logOutComplete() {
    return { type: types.LOGOUT };
}
export function logOut() {
    return { type: types.LOGOUT_START };
}

export function loginSuccess(createUserPayload) {
    return { type: types.LOGIN_SUCCESS_ACTION, payload: createUserPayload };
}

export function loginFailed(errorPayload) {
    return { type: types.LOGIN_FAIL_ACTION, payload: errorPayload };
}
