import request from '@/utils/request'

export function login (data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function restToken () {

}

export function logoff () {
    return request({
        url: '/logoff',
        method: 'post'
    })
}
