import axios from 'axios'
import { baseUrl } from './baseUrl';
export const registerApi = async ({fullName, email, password}) => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({fullName, email, password})
    return await axios.post(`${baseUrl}/user`, body, config)
};