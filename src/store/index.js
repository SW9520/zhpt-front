import Vuex from 'vuex'
import Vue from 'vue'
import User from '@/store/modules/User.js'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    User
  }
})


export default store
