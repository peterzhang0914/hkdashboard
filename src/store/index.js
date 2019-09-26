import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import logistic from '@/store/moduels/logistic'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        logistic
    },
    getters
})


export default store
