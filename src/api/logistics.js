import request from '@/utils/request'

export function getAllLogistics () {
    return request({
        url:"/api/v1/logistics",
        method:"get"
    })
}
export function updateLogistics () {

}
export function deleteLogistics () {

}
