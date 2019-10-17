import request from '@/utils/request'

export function login (data) {
    return request({
        url: 'auth/login',
        method: 'post',
        data
    })
}


export function restToken () {

}

export function logoff (data) {
    return request({
        url: 'auth/logoff',
        method: 'post',
        data
    })
}
