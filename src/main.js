import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css"
import store from '@/store'
import router from '@/router'

Vue.config.productionTip = false
Vue.use(Antd)

// const socketIO = new VueSocketIO({
//     debug: false,
//     connection: 'ws://localhost:9000',
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
//     options: {path: "/api/v1/ws"}
// })

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
