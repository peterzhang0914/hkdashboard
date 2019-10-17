import axios from 'axios'
import store from '@/store'
import {getToken} from "@/utils/cookies";
import {Message} from 'iview';
import 'iview/dist/styles/iview.css'
import moment from 'moment'

//解决AXIOS post utc问题
Date.prototype.toISOString = function () {
    let date = moment(this).format("YYYY-MM-DDTHH:mm:ssZ");
    return date
};
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000,
});
//配置iview的显示时间
Message.config({
    top: 50,
    duration: 3
});
//在发出的请求中添加token
service.interceptors.request.use(
    config => {
        if (store.getters.TOKEN) {
            config.headers['token'] = getToken()
        } else {
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        // eslint-disable-next-line no-console
        console.log(error)
    }
);
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.errno === 0) {
            return res
        } else {
            Message.error(res.errmsg);
            store.dispatch('auth/restToken').then(() => {
            });
            return Promise.reject(new Error(res.errmsg))
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
