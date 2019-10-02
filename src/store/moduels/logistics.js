import {getAllLogistics} from "@/api/logistics";

const state = {
    data: []
}
const actions = {
// eslint-disable-next-line no-unused-vars
    getAllLogistics ({commit}, query) {
        return new Promise((resolve, reject) => {
            getAllLogistics().then(resp => {
                commit("GET_ALL_LOGISTICS", resp.data)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateAllLogistics (state, data) {
        state.data = data
    }
}
const mutations = {
    GET_ALL_LOGISTICS (state, data) {
        state.data = data
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
