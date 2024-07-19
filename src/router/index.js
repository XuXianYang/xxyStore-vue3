import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      { path: '/', component: () => import('@/views/home') },
      { path: '/category/:id', component: () => import('@/views/category') },
      { path: '/category/sub/:id', component: () => import('@/views/category/sub') },
      { path: '/goods/:id', component: () => import('@/views/goods') },
    ]
  }
]

const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到顶部
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
