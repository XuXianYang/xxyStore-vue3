import request from "@/utils/request"

// 获取首页头部分类数据
export const getAllCategory = () => {
    return request('/home/category/head', 'get')
}

// 获取单个顶级分类信息
export const findTopCategory = (id) => {
    return request('/category', 'get', { id })
}

// 获取二级分类筛选条件数据
export const findSubCategoryFilter = (id) => {
    return request('/category/sub/filter', 'get', { id })
}

// 获取分类下的商品（带筛选条件）
export const findSubCategoryGoods = (data) => {
    return request('/category/goods/temporary', 'post', data)
}

