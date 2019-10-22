<template>
  <div>
    <el-row style="width: 100%;">
      <el-col :span="22">
        <el-menu :default-active="activeIndex" class="el-menu-demo" style="width: 100%;" mode="horizontal" @select="handleSelect"
          background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="0" style="width:250px;"><b><!-- 智慧生活 智能服务 -->占位</b></el-menu-item>
          <el-menu-item index="1">系统管理</el-menu-item>
          <el-menu-item index="2">我的工作台</el-menu-item>
          <!--            <el-submenu index="2">
                    <template slot="title">
                        我的工作台
                    </template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">
                            选项4
                        </template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
        </el-menu>
      </el-col>
      <el-col :span="2">
        <el-menu class="el-menu-demo" style="width: 100%;" mode="horizontal" background-color="#409EFF" text-color="#fff"
          active-text-color="#fff">
          <el-submenu index="1">
            <template slot="title">
              <img :src="avatar" style="width: 40px;height:40px;border-radius:50%;" />
              {{user.name}}
            </template>
            <el-menu-item index="1-1">个人信息</el-menu-item>
            <el-menu-item index="1-2">更改密码</el-menu-item>
            <el-menu-item index="1-3">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>

    </el-row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '2',
        user: {},
        avatar: require('../assets/logo.png')
      }
    },
    mounted() {
      this.user = this.$store.state.User.userInfo
      if (this.user.avatar) {
        this.avatar = this.user.avatar
      }
    },
    methods: {
      handleSelect() {

      }
    }
  };
</script>

<style scoped="scoped">

</style>
