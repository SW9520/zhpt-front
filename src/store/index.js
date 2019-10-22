import Vuex from 'vuex'
import Vue from 'vue'
import User from '@/store/modules/User.js'
import tabs from '@/store/modules/tabs.js'
import menu from '@/store/modules/menu.js'
Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    User,
    tabs,
    menu
  }
})


export default store
