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

    vue.component('menuManage', (resolve) => {
        require.ensure([], () => resolve(require('@/views/admin/menu/menuManage.vue')), 'menuManage')
    })

   vue.component('treeTable', (resolve) => {
        require.ensure([], () => resolve(require('@/components/treeTable/treeTable.vue')), 'treeTable')
    })

    vue.component('userManage', (resolve) => {
        require.ensure([], () => resolve(require('@/views/admin/user/userManage.vue')), 'userManage')
    })

    vue.component('roleManage', (resolve) => {
        require.ensure([], () => resolve(require('@/views/admin/role/roleManage.vue')), 'roleManage')
    })
    vue.component('organManage', (resolve) => {
        require.ensure([], () => resolve(require('@/views/admin/organ/organManage.vue')), 'organManage')
    })


    /* 自定义 页面展示组件*/
    vue.component('tip', (resolve) => {
        require.ensure([], () => resolve(require('@/components/tip.vue')), 'tip')
    })

    vue.component('grid', (resolve) => {
        require.ensure([], () => resolve(require('@/components/grid.vue')), 'grid')
    })

    vue.component('menuTree', (resolve) => {
        require.ensure([], () => resolve(require('@/views/admin/components/menuTree.vue')), 'menuTree')
    })
}

export default route
