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

// 查询订单列表 - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
export const findOrderList = ({ orderState, page, pageSize }) => {
    return request('/member/order', 'get', { orderState, page, pageSize })
}

// 取消订单
export const cancelOrder = (orderId, cancelReason) => {
    return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

// 删除订单
export const delteOrder = (ids) => {
    return request('/member/order', 'delete', { ids })
}

// 确认收货
export const confirmOrder = (orderId) => {
    return request(`/member/order/${orderId}/receipt`, 'put')
}

// 查询物流
export const logisticsOrder = (id) => {
    return request(`/member/order/${id}/logistics`, 'get')
}

// 获取再次购买的订单结算信息
export const findOrderRepurchase = (id) => {
    return request(`/member/order/repurchase/${id}`, 'get')
}