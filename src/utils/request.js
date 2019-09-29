import axios from 'axios'
import store from '@/store'
import {getToken} from "@/utils/cookietools";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

//在发出的请求中添加token
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error)
    }
)
service.interceptors.response.use(
    response => {
        const resp = response.data;
        return resp
    }
)

export default service
