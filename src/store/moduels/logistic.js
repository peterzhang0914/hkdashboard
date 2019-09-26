import {Api_get_Logistic} from "@/api/logistics";

const state = {
    data: []
}
const actions = {
    // eslint-disable-next-line no-unused-vars
    getLogistic ({commit}, query) {
        let queryParams = Object.assign({}, query)
        return new Promise((resolve, reject) => {
            Api_get_Logistic(queryParams).then(resp => {
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
const mutations = {}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
