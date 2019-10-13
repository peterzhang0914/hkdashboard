import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import iView from 'iview';
import {Message} from "iview";
import 'iview/dist/styles/iview.css';


import '@/router/guard'

Vue.config.productionTip = false
Vue.prototype.$Message=Message


Vue.use(iView)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
