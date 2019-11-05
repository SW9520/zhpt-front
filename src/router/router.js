import Vue from 'vue'
import Router from 'vue-router'

import welcome from '@/components/welcome.vue'
import login from '@/components/login.vue'
import home from '@/views/home/home.vue'

Vue.use(Router)


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
    },{
       path: '/home',
      name: 'home',
      component: home
    }
  ]
})
