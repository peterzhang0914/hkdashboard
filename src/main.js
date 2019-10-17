import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import iView from 'iview';
import {Message} from 'iview'
import global_ from '@/utils/global'
import 'iview/dist/styles/iview.css';
import '@/router/guard'

Vue.config.productionTip = false

Vue.prototype.GLOBAL = global_
Vue.prototype.$Message = Message


Vue.use(iView)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
