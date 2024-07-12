import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'

// 创建实例对象
const instance = axios.create({
  baseURL,
  timeout: 5000// 超时时间
})

// 请求拦截器
instance.interceptors.request.use(config => {
  const { profile } = store.state.user
  if (profile.token) {
    // 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => res.data, err => {
  if (err.response && err.response.status === 401) {
    // 清空用户信息
    store.commit('user/setUser', {})
    // fullPath 就是当前路由地址，currentRoute 是ref响应式数据
    // encodeURIComponent 转换uri编码，防止解析地址出问题
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // 跳转登录页
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
