<template>
  <div>
    <el-tabs  type="border-card" closable  v-model="activeName" :closable="true"  @tab-remove="removeTab">
      <el-tab-pane label="首页" name="home" :closable="false" class="el-tab-custom">
        <index></index>
      </el-tab-pane>

      <el-tab-pane v-if=" tabs.length> 0" v-for="(tab,index) in tabs" :key="tab.id"  :name="'tab_'+ tab.id" class="el-tab-custom"> <span slot="label"><i v-bind:class="tab.icon"></i> {{tab.name}}</span>
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
    },
    mounted() {
      $(".el-tab-custom").height(`${document.documentElement.clientHeight -160}`)
      this.tabs = this.$store.state.menu.tabList
    },
    filters: {

    },
    data() {
      return {
        activeName: 'home',
        tabs: [],
        value: new Date()
      }
    },
    watch: {
      '$store.state.menu.showTab': {
        handler(newValue, oldValue) {
          if(newValue && newValue.id){
             this.activeName = 'tab_' + newValue.id
          }else{
            this.activeName = 'home'
          }
        },
        deep: true
      },
      '$store.state.menu.tabList': {
        handler(newValue, oldValue) {
          this.tabs = newValue;
        },
        deep: true
      }
    },
    methods: {
      removeTab(targetName) {
        var tab = this.tabs.filter((item)=>{
          return 'tab_' + item.id == targetName
        })
        if(this.tabs.length === 1){
          this.activeName = 'home'
        }
        store.dispatch('removeTab',tab[0])

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
