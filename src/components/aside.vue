<template>
  <div>
   <!-- <div class="menuItem">
      <div class="sideBarDiv">
        <el-button type="text" @click="collapseChage" :icon="buttonIcon">{{buttonTxt}}</el-button>
      </div>
    </div> -->
    <el-menu :style="{ height: clientHeight }" :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen"
      @close="handleClose" :collapse="isCollapse" background-color="#E4E7EB" active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">
            分组一
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">
            选项4
          </template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">菜单设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: "1",
        clientHeight: '',
        isCollapse: false,
        buttonTxt: '收起侧边栏',
        buttonIcon: 'el-icon-d-arrow-left'
      }
    },
    methods: {
      addTab() {
        alert("333")
      },
      handleOpen() {

      },
      handleClose() {

      },
      collapseChage() {
        if (this.buttonTxt) {
          this.buttonTxt = ''
        } else {
          this.buttonTxt = '收起侧边栏'
        }
        if (this.buttonIcon == 'el-icon-d-arrow-left') {
          this.buttonIcon = 'el-icon-d-arrow-right'
        } else {
          this.buttonIcon = 'el-icon-d-arrow-left'
        }

        this.isCollapse = !this.isCollapse
      }

    },
    mounted() {
      this.clientHeight = `${document.documentElement.clientHeight - 94}` + 'px';
    }

  }
</script>

<style scoped="scoped">
 /* .menuItem {
    background-color: #E9EEF3;
    border-bottom: 1px solid #DCDFE6;
  }

  .sideBarDiv {
    width: 200px;
    border-right: 1px solid #DCDFE6;
  }

  .sideBarDiv .el-button {
    padding-left: 60px
  } */
</style>
