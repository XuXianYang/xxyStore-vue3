export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    setList (state, payload) {
      state.list = payload
    }
  },
  actions: {},
  getters: {}
}
