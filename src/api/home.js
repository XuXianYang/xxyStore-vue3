import request from "@/utils/request"

// 获取首页分类品牌数据
export const findBrand = (limit) => {
    return request('/home/brand', 'get', { limit })
}

// 获取首页广告banner
export const findBanner = () => {
    return request('/home/banner', 'get')
}

// 获取首页新鲜好物
export const findNew = () => {
    return request('home/new', 'get')
}

// 获取首页人气推荐
export const findHot = () => {
    return request('home/hot', 'get')
}

// 获取首页商品列表
export const findGoods = () => {
    return request('home/goods', 'get')
}

// 获取首页专题
export const findSpecial = () => {
    return request('home/special', 'get')
}