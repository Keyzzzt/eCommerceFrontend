import {API} from "../config";

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const authenticateUser = (data, callback) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        callback()
    }
}

export const signout = (callback) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        callback()
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => console.log('signout', response))
            .catch(err => console.log('err', err))
    }
}

export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false
    }
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else return false
}