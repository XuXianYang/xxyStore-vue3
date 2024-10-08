import Mock from 'mockjs'
import qs from "qs"
// mock的配置
Mock.setup({
    // 随机延时500-1000毫秒
    timeout: '500-1000'
})

// 拦截接口  /my/test
// 1. 接口地址路径规则，需要匹配到它
// 2. 请求方式
// 3. 返回数据（函数返回数据）
Mock.mock(/\/my\/test/, 'get', () => {
    // 随机数据逻辑 目标：5条数据  [{id:'',name:''},...]
    const arr = []
    for (let i = 0; i < 5; i++) {
        // arr.push(Mock.mock('@id'))
        arr.push(Mock.mock({
            id: '@id',
            name: '@cname'
        }))
    }
    return { msg: '获取数据成功', result: arr }
})

// 模拟 我的收藏
Mock.mock(/\/member\/collect/, 'get', config => {
    console.log("模拟数据：",config);

    const queryString = config.url.split('?')[1]
    const queryObject = qs.parse(queryString)
    const items = []
    for (let i = 0; i < +queryObject.pageSize; i++) {
        items.push(Mock.mock({
            id: '@id',
            name: '@ctitle(10,20)',
            desc: '@ctitle(4,10)',
            price: '@float(100,200,2,2)',
            // http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
            picture: `https://yanxuan-item.nosdn.127.net/66090c5de391e43e4516601e14870842.jpg`
        }))
    }
    return {
        msg: '获取收藏商品成功',
        result: {
            counts: 35,
            pageSize: +queryObject.pageSize,
            page: +queryObject.page,
            items
        }
    }
})
