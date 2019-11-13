<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" @click="addMenu()">新增</el-button>
        <el-button type="warning" @click="editMenu()">修改</el-button>
        <el-button type="danger" @click="delMenu()">删除</el-button>
      </el-row>
    </el-card>
    <br>
    <el-card class="box-card main">
      <treeTable :data="tableData.data" ref="treeTable" :columns="tableData.columns" border></treeTable>
    </el-card>

    <!-- 新增-->
    <maintainMenu  :menuDialogVisible="maintainMenuVisible" :menu="menu"></maintainMenu>
  </div>

</template>
<script>
  import maintainMenu from './maintainMenu.vue'

  export default {
    components: {
      maintainMenu
    },
    mounted() {
      $(".main").height(`${document.documentElement.clientHeight -245}`)
      this.listQuery()
    },
    data() {
      return {
        maintainMenuVisible: false,
        menu:{},
        tableData: {
          columns: [{
              text: "名称",
              value: "name",
              width: 200
            },
            {
              text: "链接",
              value: "path"
            },
            {
              text: "显示",
              value: "show"
            },
            {
              text: "权限标识",
              value: "permissions"
            },
            {
              text: "排序",
              value: "sort"
            },
            {
              text: "备注",
              value: "remark"
            }
          ],
          data: []
        }
      }
    },
    methods: {
      addMenu() {
        this.maintainMenuVisible = true
      },
      editMenu() {
        let selectRows = this.$refs.treeTable.getCheckedRow();

        if(selectRows.length > 1){
         this.$alert('<i class="el-icon-error" style="color:#F56C6C;font-size:20px"></i> 只能选择一条数据', "提示",{
           dangerouslyUseHTMLString: true
         })
          return;
        }
        if(!selectRows || selectRows.length == 0){
          this.$alert('<i class="el-icon-error" style="color:#F56C6C;font-size:20px"></i> 请选择数据', "提示",{
          dangerouslyUseHTMLString: true
        })
          return;
        }
        this.menu = selectRows[0]
        this.maintainMenuVisible = true

      },
      delMenu() {
        let checkedRows = this.$refs.treeTable.getCheckedRow();
        for (let i = 0; i < checkedRows.length; i++) {
          let row = checkedRows[i]
          var param = {id: row.id}
          this.$ajax.sendPostRequest("ZHPT_DELETE_MENU", param, res => {
            this.listQuery()
          })
        }

      },
      listQuery() {
        var param = {}
        this.$ajax.sendPostRequest("ZHPT_LIST_MENU", param, res => {
          this.tableData.data = this.formatData(res.data.data)
        })
      },
      formatData(menuList) {
        var data = []
        for (let menu of menuList) {
          let menuId = menu.id;
          let child = menuList.filter((m) => {
            return m.parentId === menuId
          })
          menu.child = child
          data.push(menu)
        }
        return  this.delRepeatData(null,data)
      },
      delRepeatData(list,tableData){
        if(!list){
          list = tableData
        }
        for(let item of list){
            if(item.child && item.child.length > 0){
              for(let children of item.child ){
                tableData = tableData.filter((m)=>{
                  return m.id != children.id //去除数组重复的值
                })
                if(children.child){
                 this.delRepeatData(children.child,tableData)
                }
              }
            }
        }
        return tableData
      }

    },
  }
</script>

<style scoped="scoped">
</style>
