import Vue from 'vue'
import 'jquery'
import App from './App'
import router from './router/router.js'
import tabRoute from './router/tabRoute.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'
import SlideVerify from 'vue-monoplasty-slide-verify';
import {
    IPUtils
} from '@/assets/js/IPUtils.js';
import md5 from 'js-md5';
import ajax from '@/assets/js/ajax.js';
import bus from '@/assets/js/eventBus.js'


Vue.use(tabRoute)
Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small',
    zIndex: 3000
});
/* 滑动验证 */
Vue.use(SlideVerify);
Vue.prototype.$md5 = md5;
Vue.prototype.$ajax = ajax;
Vue.prototype.$bus = bus;


new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>',
    render: h => h(App)
})
