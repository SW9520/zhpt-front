<template>
  <div>
    <el-dialog title="新增菜单" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
      <el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="120px" class="demo-ruleForm">
        <el-row>
           <el-col :span="24">
              <el-form-item label="上级目录" prop="parentId">
                <el-cascader placeholder="搜索：菜单名称" style="width: 100%;" :options="options" filterable v-model="menuForm.parentId"
                  change-on-select></el-cascader>
              </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="name">
              <el-input type="text" v-model="menuForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="PATH" prop="path">
              <el-input type="text" v-model="menuForm.path"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="排序号" prop="sort">
              <el-input type="text" v-model="menuForm.sort"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标" prop="target">
              <el-input v-model="menuForm.target"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标" prop="icon">
              <icon-picker v-model="menuForm.icon"></icon-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否显示" prop="isShow">
              <el-input v-model="menuForm.isShow"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限标识" prop="permissions">
              <el-input v-model="menuForm.permissions"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="shiro权限标识" prop="shiroPermissions_arr">
              <tags-input element-id="tags" v-model="menuForm.shiroPermissions_arr"></tags-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注" prop="remark">
            <el-input type="textArea" v-model="menuForm.remark"></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        menuForm: {
          parentId: '',
          name: '',
          path: '',
          target: '',
          icon: '',
          sort: '',
          isShow: '',
          permissions: '',
          shiroPermissions_arr: [],
          remark: '',
          shiroPermissions: ''

        },
        options: [],
        rules: {
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          isShow: [{
            required: true,
            message: '是否显示必填',
            trigger: 'blur'
          }],
          sort: [{
            required: true,
            message: '排序号必填',
            trigger: 'blur'
          }],
        }
      }
    },
    props: {
      dialogVisible: {
        type: Boolean
      }
    },
    mounted() {
      var param = {}
      this.$ajax.sendPostRequest("ZHPT_LIST_MENU", param, res => {
        this.options = this.$api.formatTreeSelectData(res.data.data)
        console.log(this.options)
      })
    },
    methods: {
      submitMenu() {
        this.$refs['menuForm'].validate((valid) => {
          if (!valid) {
            return
          }
          var shiroPermissions = "";
          if (this.menuForm.shiroPermissions_arr) {
            for (let perm of this.menuForm.shiroPermissions_arr.values()) {
              shiroPermissions += perm.value
              shiroPermissions += ";"
            }
            shiroPermissions = shiroPermissions.substring(0, shiroPermissions.lastIndexOf(";"))
            this.menuForm.shiroPermissions = shiroPermissions
          }
           this.menuForm.parentId = this.menuForm.parentId[0];

         this.$ajax.sendPostRequest("ZHPT_INSERT_MENU", this.menuForm, (response) => {
            if (response.data.status == 'success') {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.$parent.listQuery()
            } else {
              this.$message({
                message: '新增失败',
                type: 'error'
              });
            }
          })
          this.$parent.addMenuVisible = false

        });

      },
      close() {
        this.$parent.listQuery()
        this.$parent.addMenuVisible = false

      }
    }
  }
</script>

<style>
</style>
