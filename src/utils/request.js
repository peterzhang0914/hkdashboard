import axios from 'axios'


const service = axios.create({
    baseURL: "http://localhost:9000",
    timeout: 5000
})
service.interceptors.response.use(
    response => {
        const resp = response.data;
        return resp
    }
)

export default service
