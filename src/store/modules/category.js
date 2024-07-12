// 存储的分类数据
import { topCategory } from '@/api/constants'
import { getAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state () {
    return {
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setList (state, payload) {
      state.list = payload
    },
    // 显示分类子菜单
    show(state, item){
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 隐藏分类子菜单
    hide(state, item){
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  actions: {
    // 获取分类菜单
     async getList(context){
      const { result } = await getAllCategory()
      result.forEach(element => {
        element.open = false
      });
      context.commit('setList', result)
    }
  }
}
