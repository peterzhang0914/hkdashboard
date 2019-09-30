import Cookies from 'js-cookie'

//操作cookie的工具
const TokenKey = 'token'

export function getToken () {
    return Cookies.get(TokenKey)
}

export function removeToken () {
    return Cookies.remove(TokenKey)
}

export function setToken (token) {
    return Cookies.set(TokenKey, token)
}
