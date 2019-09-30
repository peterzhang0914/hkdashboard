import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import websocket from '@/utils/wstools'
import '@/router/guard'
Vue.config.productionTip = false
Vue.prototype.$websocket=websocket
Vue.use(iView)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
