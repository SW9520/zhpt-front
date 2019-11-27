<template>
  <div style="height: 100%;overflow-y: auto;overflow-x:hidden; width: 100%;margin:0 auto">
    <el-form ref="form" :model="roleForm" label-width="80px" size="mini">
    <!--  <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="角色名称:">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="text-align: center;">
        <el-button type="primary" plain>查 询</el-button>
      </el-row> -->



    </el-form>
    <div>
      <el-row>
        <el-button type="primary" @click="addRole()">新增</el-button>
        <el-button type="warning" @click="editRole()">修改</el-button>
        <el-button type="danger" @click="delRole()">删除</el-button>
      </el-row>
      <el-row>
        <grid ref="grid" :columns="tableColmns" :check="true" :paging="false" :dataList="tableData"> </grid>
      </el-row>
    </div>
    <maintainRole :roleDialogVisible="roleDialogVisible" :role="role"></maintainRole>
  </div>

</template>

<script>
  import $ from 'jquery';
  import maintainRole from './maintainRole.vue'

  export default {
    components: {
      maintainRole
    },
    data() {
      return {
        roleForm: {
          name: ""
        },

        roleDialogVisible: false,
        role: {},
        tableColmns: [{
            label: "角色名称",
            field: "name",
            width: 200
          },
          {
            label: "角色标识",
            field: "identify"
          },
          {
            label: "备注说明",
            field: "remark"
          },
          {
            label: "是否可用",
            field: "useable",
            formatter: function(row, column, cellValue, index) {
              if (cellValue == 1) {
                return '是'
              } else {
                return '否'
              }
            }
          },
          {
            label: "排序号",
            field: "sort"
          }
        ],
        tableData: []
      }
    },
    mounted() {
      $(".main").height(`${document.documentElement.clientHeight -245}`);
      this.listRole();
    },
    methods: {
      addRole() {
        this.roleDialogVisible = true
      },
      editRole() {
        if (this.$refs.grid.selectedRow.length === 0) {
          this.$message({
            message: "请选择需要修改数据",
            type: "warning"
          })
          return
        } else if (this.$refs.grid.selectedRow.length > 1) {
          this.$message({
            message: "只能选择一条数据",
            type: "warning"
          })
          return
        }
        this.role = this.$refs.grid.selectedRow[0]
        this.roleDialogVisible = true
      },
      delRole() {
        if (this.$refs.grid.selectedRow.length === 0) {
          this.$message({
            message: "请选择需要修改数据",
            type: "warning"
          })
          return
        }
        let map = {
          getId: function(r) {
            return r.id;
          }
        }
        let ids = Array.from(this.$refs.grid.selectedRow, function(r) {
          return this.getId(r)
        }, map)
        let param = {
          ids: ids
        }
         this.$ajax.sendPostRequest("ZHPT_DELETE_ROLE_BATCH", param, res => {
           this.listRole()
          })
      },
      listRole() {
        var param = {}
        this.$ajax.sendPostRequest("ZHPT_LIST_PAGED_ROLE", param, res => {
          this.tableData = res.data.data
        })
      },


    },
  }
</script>

<style scoped="scoped">
  .main {
    overflow-y: scroll;
  }
</style>
