import axios from 'axios'
import store from '@/store'
import {getToken} from "@/utils/cookies";
import {Message} from 'iview';
import 'iview/dist/styles/iview.css'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})
//配置iview的显示时间
Message.config({
    top: 50,
    duration: 3
});
//在发出的请求中添加token
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            let token = getToken()
            if (token !== '') {
                config.headers['token'] = getToken()
            }
        }
        return config
    },
    error => {
        // eslint-disable-next-line no-console
        console.log(error)
    }
)
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.token !== undefined) {
            return res
        }
        if (res.errno !== 200) {
            Message.error(res.errmsg);
            //删除所有token
            store.dispatch('auth/restToken').then(() => {
                //刷新路由，此时会被路由守卫拦截
                location.reload()
            })
            return Promise.reject(new Error(res))
        } else {
            return res
        }
    },
    error => {
        // eslint-disable-next-line no-console
        console.log("in error !!!!")
        return Promise.reject(error)
    }
)

export default service
