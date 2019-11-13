<template>
  <div>
    <el-row style="width: 100%;">
      <el-col :span="4">
        <div style="width:250px;">
          <b style="color: white;">
             EASY LIFE </b>
        </div>
       </el-col>
       <el-col :span="18">
        <el-menu :default-active="activeIndex" class="el-menu-demo" style="width:100%;" mode="horizontal" @select="handleSelect"
          background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b">
           <template v-for="(menu,index) in topMenu" >
              <el-menu-item :index="index.toString()" :key="menu.id" @click="loadLeftMenu(menu.id)" >
                {{menu.name}}
              </el-menu-item>
           </template>

        </el-menu>
      </el-col>
      <el-col :span="2">
        <el-menu class="el-menu-demo" style="width: 100%;" mode="horizontal" background-color="#409EFF" text-color="#fff"
          active-text-color="#fff">
          <el-submenu index="1">
            <template slot="title">
              <img :src="imageUrl" style="width: 40px;height:40px;border-radius:50%;" />
              {{user.name}}
            </template>
            <el-menu-item index="1-1">个人信息</el-menu-item>
            <el-menu-item index="1-2">更改密码</el-menu-item>
            <el-menu-item index="1-3" @click="logout">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>

    </el-row>

  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        activeIndex: '0',
        user: {},
        avatar: 'data:image/png;base64,',
        topMenu:[]
      }
    },
    mounted() {
      this.user = this.$store.state.User.userInfo
      var param = {id: this.user.id}
      this.$ajax.sendPostRequest("ZHPT_LIST_TOP_MENU", param, res => {
        this.topMenu = res.data.data
        this.activeIndex = '0'
        this.loadLeftMenu(this.topMenu[0].id)  //默认加载左侧菜单
      })
    },
    computed: {
      imageUrl() {
        return this.avatar + this.user.avatar
      }
    },
    methods: {
      ...mapMutations({
        storeLogout: 'loginOut',
        resetMenu:'resetMenu',
        loadMenuList:'loadMenuList'
      }),
      handleSelect() {

      },
      loadLeftMenu(menuId){
        var param = {userId: this.user.id,rootId: menuId}
        this.$ajax.sendPostRequest("ZHPT_LIST_LEFT_MENU", param, res => {
          if(res.data.data){
              this.loadMenuList(res.data.data.children)
          }
        })
      },
      logout() {
        this.$ajax.sendPostRequest("ZHPT_LOGIN_OUT", {},(res) => {
          if (res.data.status == "success") {
            window.sessionStorage.clear()
            this.storeLogout()
            this.resetMenu()
            this.$router.replace({
              path: 'login',
              query: {
                redirect:  this.$router.currentRoute.fullPath
              }
            })
          }

        })
      }
    }
  };
</script>

<style scoped="scoped">

</style>
