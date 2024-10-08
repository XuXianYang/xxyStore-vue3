import request from "@/utils/request"

// 获取商品详情
export const findGoods = (id) => {
    return request('/goods', 'get', { id })
}

// 获取商品同类推荐-未传入ID为猜喜欢
export const findRelGoods = (id, limit = 16) => {
    return request('/goods/relevant', 'get', { id, limit })
}

// 获取热榜商品,type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
export const findHotGoods = ({ id, type, limit = 3 }) => {
    return request('/goods/hot', 'get', { id, type, limit })
}

// 获取商品的评价统计信息
export const findCommentInfoByGoods = (id) => {
    return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

// 查询商品评价列表
export const findGoodsCommentList = (id, params) => {
    return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}

// 获取商品的specs和skus
export const getSpecsAndSkus = (skuId) => {
    return request(`/goods/sku/${skuId}`, 'get')
}