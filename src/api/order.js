import request from "@/utils/request"

// 获取结算信息
export const findCheckoutInfo = () => {
    return request('/member/order/pre', 'get')
}

// 添加收货地址信息
export const addAddress = (address) => {
    return request('/member/address', 'post', address)
}

// 编辑收货地址信息
export const editAddress = (address) => {
    return request('/member/address', 'put', address)
}

// 提交订单
export const createOrder = (order) => {
    return request('/member/order', 'post', order)
}

// 获取订单详情
export const findOrder = (id) => {
    return request('/member/order/' + id, 'get')
}