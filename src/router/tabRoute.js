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

    /* admin  module*/
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


    /* helper module */
    vue.component('mailList', (resolve) => {
        require.ensure([], () => resolve(require('@/views/helper/mail/mailList.vue')), 'mailList')
    })

    vue.component('sendMail', (resolve) => {
        require.ensure([], () => resolve(require('@/views/helper/mail/sendMail.vue')), 'sendMail')
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

    vue.component('editor', (resolve) => {
        require.ensure([], () => resolve(require('@/components/ue-editor/editor.vue')), 'editor')
    })
}

export default route
