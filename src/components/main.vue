<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" :closable="true" @tab-remove="handleTabsEdit">
      <el-tab-pane label="菜单管理" name="first">
        <menuManage></menuManage>
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="second">
        <userManage></userManage>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="three">
        <roleManage></roleManage>
      </el-tab-pane>
      <el-tab-pane label="部门管理" name="four">
         <organManage></organManage>
      </el-tab-pane>
       

    </el-tabs>
  </div>
</template>

<script>
  import $ from 'jquery';

  export default {

    mounted() {
      $(".el-tab-pane").height(`${document.documentElement.clientHeight -160}`)
    },
    data() {
      return {
        activeName: 'four',
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      handleTabsEdit(targetName, action) {
        if (action === 'remove') {
          let tabs = this.editableTabs
          let activeName = this.editableTabsValue
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                  activeName = nextTab.name
                }
              }
            })
          }
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .el-tabs {
    width: '100%';

  }

  .el-tabs-content {
    padding: 5px !important;
  }

  /* .el-tab-pane  {
    height: 630px!important;
  } */
</style>
