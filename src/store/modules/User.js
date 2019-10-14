const User = {
  state: {
    isLogin: false,
    user: {}
  },
  mutations: {
    login(user) {
      this.state.isLogin = !this.state.isLogin
      this.state.user = user
    },
    loginOut() {
      this.state.isLogin = !this.state.isLogin
      this.state.user = {}
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
