import * as types from './actionTypes';

export function createContactCompleted(payload) {
    return { type: types.ADD_CONTACT, payload };
}

export function displayContactCompleted(payload) {
    return { type: types.LOAD_CONTACT , payload};
}
export function removeContactCompleted(payload) {
    return { type: types.DELETED_CONTACT, payload };
}
export function clearContact() {
    return { type: types.CLEAR_CONTACT };
}
//call saga channels
export function createContact(payload) {
    return { type: types.ADD_CONTACT_START, payload };
}
export function loadContact(pageNumber) {
    return { type: types.LOAD_CONTACT_START , payload: pageNumber};
}
export function deleteContact(contactId) {
    return { type: types.DELETED_CONTACT_START, payload: contactId };
}