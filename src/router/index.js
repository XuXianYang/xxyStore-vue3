import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      { path: '/', component: () => import('@/views/home') },
      { path: '/category/:id', component: () => import('@/views/category') },
      { path: '/category/sub/:id', component: () => import('@/views/category/sub') },
      { path: '/goods/:id', component: () => import('@/views/goods') },
      { path: '/cart', component: () => import('@/views/cart') },
      { path: '/checkout', component: () => import('@/views/pay/checkout') },
      { path: '/pay', component: () => import('@/views/pay') },
      { path: '/pay/callback', component: () => import('@/views/pay/result') },
    ]
  },
  { path: '/login', component: () => import('@/views/login') },
  { path: '/login/callback', component: () => import('@/views/login/callback') },
]

const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

// 路由全局守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const { token } = store.state.user.profile
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router
