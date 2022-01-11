import axios from 'axios'
import { baseUrl } from './baseUrl';
import setAuthToken from "./setAuthToken";
const config = {
    headers:{
        'Content-Type':'application/json'
    }
}
setAuthToken(localStorage.token)

export const registerApi = async ({fullName, email, password}) => {
    const body = JSON.stringify({fullName, email, password})
    return await axios.post(`${baseUrl}/user`, body, config)
};

export const loginUserApi = async ({email, password}) => {
    const body = JSON.stringify({email, password})
    return await axios.post(`${baseUrl}/auth/login`, body, config)
};

export const loadContactApi = async (page) => {
    return await axios.get(`${baseUrl}/contact/list/${page}`, config)
};

export const createContactApi = async ({fullName, email, phoneNumber}) => {
    const body = JSON.stringify({fullName, email, phoneNumber})
    return await axios.post(`${baseUrl}/contact`, body, config)
};

export const deleteContactApi = async (contactId) => {
    return await axios.delete(`${baseUrl}/contact/${contactId}`, config)
};

export const verifyEmailApi = async ({email, verificationCode}) => {
    const body = JSON.stringify({email, verificationCode})
    return await axios.post(`${baseUrl}/user/verify-account`, body, config)
};
