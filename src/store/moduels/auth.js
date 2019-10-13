import {login} from '@/api/auth'
import {removeToken, setToken} from '@/utils/cookies'

const state = {
    data: [],
    token: ''
};
const actions = {
    // eslint-disable-next-line no-unused-vars
    login ({commit}, loginForm) {
        const {username, password} = loginForm;
        return new Promise((resolve, reject) => {
            login({username: username.trim(), password: password.trim()}).then(resp => {
                const {data} = resp;
                // eslint-disable-next-line no-console
                commit('SET_TOKEN', data.token);
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    restToken({commit}){
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            commit("SET_TOKEN", "")
            removeToken()
            resolve()
        })
    }
};

const mutations = {
    SET_TOKEN: (state, token) => {
        setToken(token);
        state.token = token
    },
};
export default {
    namespaced: true,
    state,
    actions,
    mutations
};
