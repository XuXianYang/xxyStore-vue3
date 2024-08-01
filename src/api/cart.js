import request from "@/utils/request"

// 获取新的商品信息
export const getNewCartGoods = (skuId) => {
    return request(`/goods/stock/${skuId}`, 'get')
}

// 合并本地购物车[{skuId,selected,count}]
export const mergeLocalCart = (cartList) => {
    return request('/member/cart/merge', 'post', cartList)
}

// 获取登录后的购物车列表
export const findCartList = () => {
    return request('/member/cart', 'get')
}

// 加入购物车
export const insertCart = ({ skuId, count }) => {
    return request('/member/cart', 'post', { skuId, count })
}

// 删除商品（支持批量删除）
export const deleteCart = (ids) => {
    return request('/member/cart', 'delete', { ids })
}

// 修改购物车商品的状态和数量
export const updateCart = (goods) => {
    return request('/member/cart/' + goods.skuId, 'put', goods)
}

// 全选反选
export const checkAllCart = ({ selected, ids }) => {
    return request('/member/cart/selected', 'put', { selected, ids })
}