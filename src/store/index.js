import { createStore } from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  modules: {
    user, cart, category
  },
  plugins: [
    // 借助插件，持久化存储，存储在localStorage
    createPersistedstate({
      key: 'erabbit-client-pc-store',// 存储的key
      paths: ['user', 'cart']//存储的对象
    })
  ]
})
