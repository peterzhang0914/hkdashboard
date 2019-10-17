import request from '@/utils/request'

export function apiGetAllLogistics () {
    return request({
        url: "/v1/logistics",
        method: "get"
    })
}

export function apiSearchLogistics (formData) {
    return request({
            url: "/v1/logistics",
            method: "post",
            data: formData
        }
    )
}

export function apiAddLogistics (formData) {
    return request({
            url: "/v1/logistic",
            method: "post",
            data: formData
        }
    )
}

export function deleteLogistics (removeList) {
    return request({
            url: "/v1/logistic",
            method: "delete",
            data: {removelist: removeList}
        }
    )
}
