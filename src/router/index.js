import Vue from 'vue'
import Router from 'vue-router'
import tabRoute from './tabRoute'
import welcome from '@/components/welcome.vue'
import login from '@/components/login.vue'
Vue.use(Router)
Vue.use(tabRoute)




export default new Router({
 routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
