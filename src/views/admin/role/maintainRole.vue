<template>
  <div>
    <el-dialog title="角色维护" :visible.sync="roleDialogVisible" width="70%" :close-on-click-modal="false" @close="close()">
      <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="280px" class="demo-ruleForm">

        <el-card class="box-card">

          <el-form-item label="角色名称：" prop="name">
            <el-input type="text" v-model="roleForm.name" class="el-input-width-400" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="角色标识：" prop="identify">
            <el-input type="text" class="el-input-width-400" v-model="roleForm.identify"></el-input>
          </el-form-item>

          <el-form-item label="数据范围：" prop="dataScope">
            <el-input type="text" class="el-input-width-400" v-model="roleForm.dataScope"></el-input>
          </el-form-item>
          <el-form-item label="排序：" prop="sort">
            <el-input type="text" class="el-input-width-400" v-model="roleForm.sort"></el-input>
          </el-form-item>

          <el-form-item label="是否启用：" prop="useable_boolean">
            <el-switch v-model="roleForm.useable_boolean"></el-switch>
          </el-form-item>

          <el-form-item label="角色授权：">
            <menuTree class="el-input-width-400" ref="menuTreeObj" ></menuTree>
          </el-form-item>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submitRole()">确 定</el-button>
      </span>
    </el-dialog>


  </div>

</template>

<script>
  export default {
    data() {
      return {
        maintainType: "1", // 1 新增 2 修改
        roleForm: {
          id:'',
          name: '',
          identify: '',
          dataScope: '',
          sort: '',
          useable_boolean: false,
          useable:0,
          menuIds: [],
        },

        rules: {
          name: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }],
          identify: [{
            required: true,
            message: '请输入角色标识',
            trigger: 'blur'
          }]
        }

      }
    },
    props: {
      roleDialogVisible: {
        type: Boolean
      },
      role: {
        type: Object
      }
    },
    watch: {
      role: {
        handler: function(newValue, oldval) {
          let _this = this
          _this.role = newValue
          if(this.role.useable == 0){
            this.roleForm.useable_boolean = false
          }else{
               this.roleForm.useable_boolean = true
          }
          _this.maintainType = '2'; //修改
          $.extend(_this.roleForm,_this.role)
          _this.$ajax.sendPostRequest('ZHPT_LIST_TREEMENU_BY_ROLE_ID',{roleId:_this.roleForm.id},(res)=>{
            window.setTimeout(function(){
              let menus=res.data.data
              let ztreeObj = _this.$refs['menuTreeObj'].getTreeObj()
              for (let menu of menus) {
                let node = ztreeObj.getNodeByParam("id",menu.id)
                 ztreeObj.checkNode(node, true, true);
                 ztreeObj.expandNode(node, true, true, true);
              }
            },500)

          })
        },
        deep: true //深度监听
      },
      roleForm: {
        handler: function(newValue, oldval) {
          if (newValue.useable) {
            this.roleForm.useable = true
          }
        },
        deep: true //深度监听
      }
    },
    mounted() {

    },
    methods: {
      getCheckedNodes() {

      },
      submitRole() {
        let ztreeObj = this.$refs['menuTreeObj'].getTreeObj()
        let nodes = ztreeObj.getCheckedNodes(true);
        if(!nodes){
          this.$message({
            message: '请授权后再提交',
            type: 'error'
          });
          return
        }
       this.roleForm.menuIds = []
        for (let node of nodes) {
           console.log(node)
           this.roleForm.menuIds.push(node.id)
        }

        this.$refs['roleForm'].validate((valid) => {
          if (!valid) {
            return
          }
          if(this.roleForm.useable_boolean){
            this.roleForm.useable = 1
          }else{
             this.roleForm.useable = 0
          }

          if (this.maintainType == '1') {
            this.addRole();
          } else {
            this.editRole();
          }
        });

      },
      addRole() {
        this.$ajax.sendPostRequest("ZHPT_INSERT_ROLE", this.roleForm, (response) => {
          if (response.data.status == 'success') {
            this.close()
          }
        })
      },
      editRole() {
        this.$ajax.sendPostRequest("ZHPT_UPDATE_ROLE", this.roleForm, (response) => {
          if (response.data.status == 'success') {
            this.close()
          } 
        })
      },
      close() {
        this.$refs['roleForm'].resetFields()
        this.$parent.roleDialogVisible = false
      }
    }
  }
</script>

<style scoped="scoped">


</style>
