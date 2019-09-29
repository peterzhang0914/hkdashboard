import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css"
import store from '@/store'
import router from '@/router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(iView)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
