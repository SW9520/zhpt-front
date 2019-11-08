<template>
  <div>
    <el-tabs  type="border-card" closable  v-model="activeName" @tab-click="handleClick" :closable="true"  @tab-remove="removeTab">
      <el-tab-pane label="首页" name="home" :closable="false" class="el-tab-custom">
          <h4>我是首页</h4>
      </el-tab-pane>
      <el-tab-pane v-for="(tab,index) in tabs" :key="tab.id"  :name="'tab_'+ tab.id" class="el-tab-custom">
       
         <span slot="label"><i v-bind:class="tab.icon"></i> {{tab.name}}</span>
        <component v-if="tab.href != null" :is='tab.href'></component>
        <div v-else>
          <h2>功能正在开发中</h2>
        </div>
      </el-tab-pane>


    </el-tabs>
  </div>
</template>

<script>
  import store from '@/store'
  export default {
    created() {

      this.tabs = this.$store.state.menu.selectedMenuList
    },
    mounted() {
      $(".el-tab-custom").height(`${document.documentElement.clientHeight -160}`)
    },
    filters: {

    },
    data() {
      return {
        activeName: '',
        tabs: []
      }
    },
    watch: {
      '$store.state.menu.showTab': {
        handler(newValue, oldValue) {
          this.activeName = 'tab_' + newValue.id
        },
        deep: true
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      removeTab(targetName) {
        var tab = this.tabs.filter((item)=>{
          return 'tab_' + item.id == targetName
        })
        if(this.tabs.length === 1){
          this.activeName = 'home'
        }
        store.dispatch('deleteSelectedMenu',tab[0])

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
  .el-tab-custom {
    overflow-y: auto;
  }
 /* .el-tab-pane  {
    height: 630px!important;
  } */
</style>
