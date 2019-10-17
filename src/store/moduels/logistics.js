import {apiGetAllLogistics, apiAddLogistics, deleteLogistics, apiSearchLogistics} from "@/api/logistics";
import qs from "qs"

const state = {
    dat: []
}
const actions = {
// eslint-disable-next-line no-unused-vars
    getAllLogistics ({commit}, query) {
        return new Promise((resolve, reject) => {
            apiGetAllLogistics().then(resp => {
                commit("SET_ALL_LOGISTICS", resp.data)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })

        })

    },
    searchLogistics ({commit}, form) {
        return new Promise((resolve, reject) => {
            apiSearchLogistics(form).then(resp => {
                commit("SET_ALL_LOGISTICS", resp.data)
                resolve(resp)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    updateAllLogistics (state, data) {
        state.dat = data
    },
    addLogistics ({commit}, form) {
        return new Promise((resolve, reject) => {
            apiAddLogistics(form).then(resp => {
                resolve(resp)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteLogistics ({commit}, removeList) {
        return new Promise((resolve, reject) => {
            deleteLogistics(removeList).then((resp) => {
                resolve(resp)
            }).catch((err) => {
                reject(err)
            })
        })
    }
};
const mutations = {
    SET_ALL_LOGISTICS (state, data) {
        state.dat = data
    },

};
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
