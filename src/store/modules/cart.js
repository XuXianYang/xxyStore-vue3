import { getNewCartGoods, mergeLocalCart, findCartList, insertCart, deleteCart, updateCart, checkAllCart } from "@/api/cart"
export default {
  namespaced: true,
  state() {
    return {
      list: []
    }
  },
  mutations: {

    setList(state, payload) {
      state.list = payload
    },

    // 加入购物车
    insertCart(state, goods) {
      const index = state.list.findIndex(item => item.skuId === goods.skuId)
      if (index >= 0) {
        goods.count = state.list[index].count + goods.count
        state.list.splice(index, 1)
      }
      state.list.unshift(goods)
    },

    // 更新购物车商品信息
    updateCart(state, goods) {
      // 查找本地购物车商品信息
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      // 遍历key,非空一一赋值更新
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },

    // 删除购物车商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      if (index >= 0) {
        state.list.splice(index, 1)
      }
    }
  },
  actions: {

    // 商品加入购物车
    insertCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录 TODO
          insertCart(goods).then((res) => {
            console.log("登录后插入购物车", res);
            return findCartList()
          }).then(res => {
            console.log("获取购物车", res);
            ctx.commit('setList', res.result)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('insertCart', goods)
          resolve()
        }
      })
    },

    // 获取购物车列表
    findCartList(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          findCartList().then(res => {
            console.log("登录后获取购物车列表：", res);
            ctx.commit('setList', res.result)
            resolve()
          })
        } else {
          // Promise.all() 可以并列发送多个请求，等所有请求成功，调用then
          // Promise.race() 可以并列发送多个请求，等最快的请求成功，调用then
          const promiseArr = ctx.state.list.map(item => {
            // 返回接口函数的调用
            return getNewCartGoods(item.skuId)
          })
          Promise.all(promiseArr).then(dataArr => {
            dataArr.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            resolve()
          }).catch(e => {
            reject(e)
          })
        }
      })
    },

    // 删除购物车商品
    deleteCart(ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          deleteCart([skuId]).then(res => {
            console.log("登录后删除购物车单个商品：", res);
            return findCartList()
          }).then(res => {
            console.log("获取购物车", res);
            ctx.commit('setList', res.result)
            resolve()
          })
        } else {
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    },

    // 批量删除或者清除无效商品
    batchDeleteCart(ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          const ids = ctx.getters[isClear ? "invalidList" : "selectedList"].map(item => item.skuId);
          deleteCart(ids).then(res => {
            console.log("登录后批量删除购物车或清除无效商品：", res);
            return findCartList()
          }).then(res => {
            ctx.commit('setList', res.result)
            resolve()
          })
        } else {
          ctx.getters[isClear ? "invalidList" : "selectedList"].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          });
          resolve()
        }
      })
    },

    // 更新购物车商品
    updateCart(ctx, goods) {
      // goods 中：必须有skuId，其他想修改的属性 selected  count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          updateCart(goods).then(res => {
            console.log("登录后更新购物车状态或者数量：", res);
            return findCartList()
          }).then(res => {
            ctx.commit('setList', res.result)
            resolve()
          })
        } else {
          // 本地
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },

    // 购物车商品全选操作
    checkAllCart(ctx, selected) {
      console.log('checkAllCart:', selected);
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO

          const ids = ctx.getters["validList"].map(item => item.skuId);
          checkAllCart({ selected, ids }).then(res => {
            console.log("登录后购物车商品全选操作：", res);
            return findCartList()
          }).then(res => {
            ctx.commit('setList', res.result)
            resolve()
          })

        } else {
          ctx.getters.validList.forEach(item => {
            ctx.commit('updateCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },

    // 更新商品规格信息
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          // 1. 获取旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 登录 TODO
          deleteCart([oldSkuId]).then(res => {
            console.log("登录后更新商品规格先删除商品：", res);
            return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
          }).then(res => {
            console.log("登录后更新商品规格后插入商品：", res);
            return findCartList()
          }).then(res => {
            ctx.commit('setList', res.result)
            resolve()
          })
        } else {

          // 1. 获取旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2. 删除旧的商品
          ctx.commit('deleteCart', oldSkuId)

          // 3. 合并一条新的商品信息
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          // 4. 去插入即可
          ctx.commit('insertCart', newGoods)
        }
      })
    },

    // 合并本地购物车，上传本地购车车商品列表数据
    async mergeLocalCart(ctx) {
      const cartList = ctx.getters.validList.map(({ skuId, selected, count }) => {
        return { skuId, selected, count }
      })
      await mergeLocalCart(cartList)
      // 合并成功将本地购物车删除
      ctx.commit('setList', [])
    }
  },

  getters: {
    // 有效商品列表
    validList(state) {
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    // 有效商品件数
    validTotal(state, getters) {
      return getters.validList.reduce((sum, item) => sum + item.count, 0)
    },
    // 有效商品总额
    validAmount(state, getters) {
      return getters.validList.reduce((sum, item) => sum + item.count * 100 * item.nowPrice, 0) / 100
    },

    // 无效商品列表
    invalidList(state) {
      return state.list.filter(item => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList(state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((sum, item) => sum + item.count, 0)
    },
    // 选中商品总金额
    selectedAmount(state, getters) {
      return getters.selectedList.reduce((sum, item) => sum + item.count * 100 * item.nowPrice, 0) / 100
    },
    // 是否全选
    isCheckAll(state, getters) {
      return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
    }
  }
}
