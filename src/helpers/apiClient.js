import axios from 'axios';


export let instance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-type': 'application/json; charset=utf-8'
    }
});

export function setAuthHeader(token) {

    try {
        localStorage.setItem('UserToken', token);
    } catch (error) {
        throw(error);
    }
    instance.defaults.headers.common['x-access-token'] = token;
}

export function removeToken() {
    localStorage.removeItem('UserToken');
}

