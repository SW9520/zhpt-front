import Vue from 'vue'
import 'jquery'
import App from './App'
import router from './router/router.js'
import tabRoute from './router/tabRoute.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'
import md5 from 'js-md5'
import ajax from '@/assets/js/ajax.js'
import bus from '@/assets/js/eventBus.js'
import api from './api.js'
import VueCookies from 'vue-cookies'
import store from '@/store/index.js'
import iconPicker from 'vue-fontawesome-elementui-icon-picker';

Vue.use(iconPicker)
Vue.use(VueCookies)
Vue.use(tabRoute)
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
})

Vue.prototype.$md5 = md5
Vue.prototype.$ajax = ajax
Vue.prototype.$bus = bus
Vue.prototype.$api = api
Vue.prototype.$store = store
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
})
