const route = Object.create(null)
route.install = function(vue) {
    vue.component('welcome', (resolve) => {
        require.ensure([], () => resolve(require('@/components/welcome.vue')), 'welcome')
    })
    vue.component('login', (resolve) => {
        require.ensure([], () => resolve(require('@/components/login.vue')), 'login')
    })
}

export default route
