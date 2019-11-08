<template>
  <div>
    <el-dialog title="机构维护" :visible.sync="organDialogVisible" width="70%" :close-on-click-modal="false">
      <el-form :model="organForm" :rules="rules" ref="organForm" label-width="280px" class="demo-ruleForm">

        <el-card class="box-card">
          <el-form-item label="上级机构：" prop="parentId">
            <el-cascader placeholder="搜索：机构名称" :options="options" filterable v-model="organForm.parentIds"
              change-on-select  size="mini" class="el-input-width-400"></el-cascader>
          </el-form-item>

          <el-form-item label="机构名称：" prop="name">
            <el-input type="text" class="el-input-width-400" v-model="organForm.name"></el-input>
          </el-form-item>

          <el-form-item label="机构类别：" prop="type">
            <el-input type="text" class="el-input-width-400" v-model="organForm.type"></el-input>
          </el-form-item>
          <el-form-item label="机构编码：" prop="code">
            <el-input type="text" class="el-input-width-400" v-model="organForm.code"></el-input>
          </el-form-item>

          <el-form-item label="所属区域：" prop="areaId">
             <el-input type="text" class="el-input-width-400" v-model="organForm.areaId"></el-input>
          </el-form-item>

          <el-form-item label="排序号：" prop="sort">
               <el-input type="text" class="el-input-width-400" v-model="organForm.sort"></el-input>
          </el-form-item>

          <el-form-item label="是否启用：" prop="useable_boolean">
            <el-switch v-model="organForm.useable_boolean"></el-switch>
          </el-form-item>

        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitOrgan">确 定</el-button>
      </span>
    </el-dialog>


  </div>

</template>

<script>
  export default {
    data() {
      return {
        maintainType: "1", // 1 新增 2 修改
        organForm: {
          parentIds:"",
          parentId:"",
          name: '',
          type: '',
          code: '',
          areaId:"",
          sort: '',
          useable_boolean: false,
          useable:0,
        },
        options: [],
        rules: {
          name: [{
            required: true,
            message: '请输入机构名称',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请输入选择机构类型',
            trigger: 'blur'
          }],
          code: [{
            required: true,
            message: '请输入选择机构编码',
            trigger: 'blur'
          }]
        }

      }
    },
    props: {
      organDialogVisible: {
        type: Boolean,
        default: false
      },
      organ: {
        type: Object
      }
    },
    watch: {
      organ: {
        handler: function(newValue, oldval) {
          this.role = newValue
          this.maintainType = '2'; //修改
        },
        deep: true //深度监听
      },
      organForm: {
        handler: function(newValue, oldval) {
          if (newValue.useable) {
            this.organForm.useable = true
          }
        },
        deep: true //深度监听
      }
    },
    mounted() {
      var param = {}
      this.$ajax.sendPostRequest("ZHPT_LIST_ORGAN", param, res => {
        this.options = this.$api.formatTreeSelectData(res.data.data)
      })
    },
    methods: {
      submitOrgan() {
        this.$refs['organForm'].validate((valid) => {
          if (!valid) {
            return
          }
          if(this.organForm.useable_boolean){
            this.organForm.useable = 1
          }else{
             this.organForm.useable = 0
          }
          this.organForm.parentId = this.organForm.parentIds[0]
          if (this.maintainType == '1') {
            this.addOrgan();
          } else {
            this.editOrgan();
          }
        });

      },
      addOrgan() {
        this.$ajax.sendPostRequest("ZHPT_INSERT_ORGAN", this.organForm, (response) => {
          if (response.data.status == 'success') {
            this.$message({
              message: '新增成功',
              type: 'success'
            });
            this.close()
          } else {
            this.$message({
              message: '新增失败',
              type: 'error'
            });
          }
        })
      },
      editOrgan() {
        this.$ajax.sendPostRequest("ZHPT_UPDATE_ORGAN", this.organForm, (response) => {
          if (response.data.status == 'success') {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.close()
          } else {
            this.$message({
              message: '修改成功',
              type: 'error'
            });
          }
        })
      },
      close() {
        this.$parent.organDialogVisible = false
      }
    }
  }
</script>

<style scoped="scoped">


</style>
