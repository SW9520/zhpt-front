const User = {
  state: {
    isLogin: false,
    userInfo: {}
  },
  mutations: {
    login(state, user) {
      state.isLogin = !state.isLogin
      state.userInfo = user
    },
    loginOut() {
      state.isLogin = !state.isLogin
      state.userInfo = {}
    }
  },
  getters: {

  },
  actions: {
    login(context, user) {
      context.commit('login', user)
    }
  }

}

export default User
