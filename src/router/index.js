import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      { path: '/', component: () => import('@/views/home') },
      { path: '/category/:id', component: () => import('@/views/category') },
      { path: '/category/sub/:id', component: () => import('@/views/category/sub') }
    ]
  }
]

const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  routes
})

export default router
