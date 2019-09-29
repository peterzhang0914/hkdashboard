import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import logistic from '@/store/moduels/logistic'
import auth from '@/store/moduels/auth'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        logistic,
        auth
    },
    getters
})


export default store
