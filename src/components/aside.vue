
<template>
  <div>
   <!-- <div class="menuItem">
      <div class="sideBarDiv">
        <el-button type="text" @click="collapseChage" :icon="buttonIcon">{{buttonTxt}}</el-button>
      </div>
    </div> -->
    <el-menu :style="{ height: clientHeight }" :default-active="activeIndex" class="el-menu-vertical-demo"
     :collapse="isCollapse" background-color="#E4E7EB" active-text-color="#409EFF">

      <template v-if="menuList.length > 0" v-for="(menu,index) in menuList"   >
          <template v-if="menu.children !=null && menu.children != undefined">
            <el-submenu :index="index.toString()" :key="menu.id">
                <template slot="title">
                  <i v-bind:class="menu.icon"></i>
                  <span slot="title">{{menu.name}}</span>
                </template>
                <template v-for="(subMenu,subIndex) in menu.children">
                   <template v-if="subMenu.children !=null && subMenu.children != undefined">
                      <el-submenu :index="index.toString() + '-' + subIndex.toString()" :key="menu.id">
                          <template slot="title">
                            <i v-bind:class="subMenu.icon"></i>
                            <span slot="title">{{subMenu.name}}</span>
                          </template>
                          <template v-for="(subMenu1,subIndex1) in subMenu.children">
                              <el-menu-item  @click="selectMenu(menu)" :index="index.toString() + '-' + subIndex.toString()+ '-' + subIndex1" :key="subMenu1.id">
                                <i v-bind:class="subMenu1.icon"></i>
                                <span slot="title">{{subMenu1.name}}</span>
                              </el-menu-item>
                          </template>
                       </el-submenu>
                   </template>
                   <template v-else>
                     <el-menu-item :index="index.toString() + '-' + subIndex.toString()" :key="subMenu.id" @click="selectMenu(subMenu)">
                       <i v-bind:class="subMenu.icon"></i>
                       <span slot="title">{{subMenu.name}}</span>
                     </el-menu-item>
                   </template>
                </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="index.toString()" :key="menu.id" @click="selectMenu(menu)">
              <i v-bind:class="menu.icon"></i>
              <span slot="title">{{menu.name}}</span>
            </el-menu-item>
          </template>

      </template>
      </el-menu>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        activeIndex: "0",
        clientHeight: '',
        isCollapse: false,
        buttonTxt: '收起侧边栏',
        buttonIcon: 'el-icon-d-arrow-left',
        menuList: []
      }
    },
    watch: {
     '$store.state.menu.menuList':{
        handler(newValue, oldValue) {
          this.menuList = []
          for (let item of newValue) {
            this.menuList.push(item)
          }
          this.selectMenu(this.menuList[0])
        },
        deep:true
      }

    },
    methods: {
     ...mapMutations({
        addSelectedMenuList:'addSelectedMenuList'
     }),
      selectMenu(menu){
        this.addSelectedMenuList(menu)
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
      this.menuList = this.$store.state.menu.menuList
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
