import * as types from './actionTypes';

export function createContact(contactPayload) {
    return { type: types.CONTACT_CREATED, contactPayload };
}

export function loadContact(contactList) {
    return { type: types.ALL_CONTACT, contactList };
}

export function deleteContact(contactId) {
    return { type: types.CONTACT_DELETED, contactId };
}
