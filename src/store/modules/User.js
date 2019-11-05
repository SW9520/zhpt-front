import api from '@/api.js'

const User = {
  state: {
    isLogin: false,
    sid: '',
    userInfo: {}
  },
  mutations: {
    login(state, user) {
      state.isLogin = !state.isLogin
      state.userInfo = user
      state.sid = user.sid
    },
    loginOut(state) {
      state.isLogin = !state.isLogin
      state.userInfo = {}
      state.sid = ''
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
