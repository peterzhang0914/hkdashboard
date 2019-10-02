import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import logistics from '@/store/moduels/logistics'
import auth from '@/store/moduels/auth'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        logistics,
        auth
    },
    getters
})


export default store
