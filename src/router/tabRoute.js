const route = {}
route.install = function(vue) {
    vue.component('welcome', (resolve) => {
        require.ensure([], () => resolve(require('@/components/welcome.vue')), 'welcome')
    })
    vue.component('login', (resolve) => {
        require.ensure([], () => resolve(require('@/components/login.vue')), 'login')
    })
    vue.component('home', (resolve) => {
        require.ensure([], () => resolve(require('@/views/home/home.vue')), 'home')
    })
    vue.component('asideBar', (resolve) => {
        require.ensure([], () => resolve(require('@/components/aside.vue')), 'asideBar')
    })
    vue.component('headerBar', (resolve) => {
        require.ensure([], () => resolve(require('@/components/header.vue')), 'headerBar')
    }) 
    vue.component('mainBar', (resolve) => {
        require.ensure([], () => resolve(require('@/components/main.vue')), 'mainBar')
    })
        
    
}

export default route
