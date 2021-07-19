import {request} from "./requires";
// 增
/*
"data": {
        "name": [
            "收货人 不能为空"
        ],
        "address": [
            "详细收货地址 不能为空"
        ],
        "phone": [
            "手机号 不能为空"
        ],
        "province": [
            "省份 不能为空"
        ],
        "city": [
            "城市 不能为空"
        ],
        "county": [
            "区县 不能为空"
        ]
    },
 */
export function createAddress(data) {
    return request({
        url: '/api/address',
        method: 'post',
        data
    })
}
// 删
/*
状态码 204 请求成功
 */
export function deleteAddress(address_id) {
    return request({
        url: `/api/address/${address_id}`,
        method: 'DELETE'
    })
}
// 改
/*
"data": {
        "name": [
            "收货人 不能为空"
        ],
        "address": [
            "详细收货地址 不能为空"
        ],
        "phone": [
            "手机号 不能为空"
        ],
        "province": [
            "省份 不能为空"
        ],
        "city": [
            "城市 不能为空"
        ],
        "county": [
            "区县 不能为空"
        ]
    }
 */
export function modifyAddress(address_id,data) {
    return request({
        url: `/api/address/${address_id}`,
        method: 'PUT',
        data
    })
}
// 查 状态码 200 请求成功
/*
"data": [
        {
            "id": 1,
            "name": "小明",
            "province": "四川省",
            "city": "阿坝藏族羌族自治州",
            "county": "茂县",
            "address": "某某小区",
            "phone": "13222222222",
            "is_default": 0,
            "created_at": "2020-12-23T06:58:50.000000Z",
            "updated_at": "2020-12-23T06:58:50.000000Z"
        }
    ]
 */
export function getAddressList() {
    return request({
        url: "/api/address",
        method: 'GET',
    })
}
// 查 地址详情
// 状态码 200 请求成功;
// 状态码 400 请求出错
/*
{
    "id": 1,
    "name": "aaa",
    "province": "aaa",
    "city": "aaa",
    "county": "aaa",
    "address": "aaa",
    "phone": "13322222222",
    "is_default": 0,
    "created_at": "2021-01-08T03:11:19.000000Z",
    "updated_at": "2021-01-08T03:11:19.000000Z"
}
 */
export function getAddressInfoById(address_id) {
    return request({
        url: `/api/address/${address_id}`,
        method: 'GET',
    })
}
//设 状态码 204 请求成功
export function setDefaultAddress(address_id) {
    return request({
        url: `/api/address/${address_id}/default`,
        method: 'PATCH',
    })
}