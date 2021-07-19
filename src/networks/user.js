import {request} from "./requires";

export function createUser(data) {
    return request({
        url: '/api/auth/register',
        method: 'post',
        data
    })
}

export function login(data) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    })
}

export function logOut() {
    return request({
        url: '/api/auth/logout',
        method: 'post'
    })
}

export function getUserInfo() {
    return request({
        url: '/api/user',
        method: 'GET'
    })
}