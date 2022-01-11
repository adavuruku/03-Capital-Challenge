import * as types from './actionTypes';
//create user action
export function createUer(createUserPayload) {
    return { type: types.REGISTER_SUCCESS_ACTION, payload: createUserPayload };
}

export function createUserStart(createUserPayload) {
    return { type: types.REGISTER_USER, payload: createUserPayload };
}

export function loginStart(loginPayload) {
    return { type: types.LOGIN_START, payload: loginPayload };
}
export function loginSucceed(loginPayload) {
    return { type: types.LOGIN_SUCCESS, payload: loginPayload };
}
export function loginFail() {
    return { type: types.LOGIN_FAIL };
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

export function emailVerificationCompleted(payload) {
    return { type: types.EMAIL_VERIFICATION_COMPLETED, payload: payload };
}
export function startEmailVerification(payload) {
    return { type: types.EMAIL_VERIFICATION_START, payload: payload };
}
