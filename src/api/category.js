import request from "@/utils/request"

// 获取首页头部分类数据
export const getAllCategory = () => {
    return request('/home/category/head', 'get')
}

// 获取单个顶级分类信息
export const findTopCategory = (id) => {
    return request('/category', 'get', { id })
}