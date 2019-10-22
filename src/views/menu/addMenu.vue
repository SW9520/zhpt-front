<template>
  <div>
    <el-dialog title="新增菜单" :visible.sync="dialogVisible" width="50%">
      <el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="上级目录" prop="parentId">
          <el-cascader placeholder="搜索：菜单名称" :options="options" filterable v-model="menuForm.parentId" change-on-select></el-cascader>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input type="text" v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="PATH" prop="path">
          <el-input type="text" v-model="menuForm.path"></el-input>
        </el-form-item>
        <el-form-item label="目标" prop="target">
          <el-input v-model="menuForm.target"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <icon-picker v-model="menuForm.icon"></icon-picker>
        </el-form-item>
        <el-form-item label="是否显示" prop="show">
            <el-input v-model="menuForm.show"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="permissions">
            <el-input v-model="menuForm.permissions"></el-input>
        </el-form-item>
        <el-form-item label="shiro权限标识" prop="shiroPermissions">
           <!-- <tags-input element-id="tags"
                v-model="menuForm.shiroPermissions"
                :existing-tags="[
                    { key: 'web-development', value: 'Web Development' },
                    { key: 'php', value: 'PHP' },
                    { key: 'javascript', value: 'JavaScript' },
                ]"
                :typeahead="true"></tags-input> -->
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input type="textArea" v-model="menuForm.remark"></el-input>
        </el-form-item>
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
  data () {
    return {
      menuForm: {
        parentId: '',
        name: '',
        path: '',
        target: '',
        icon: '',
        sort: '',
        show: '',
        permissions: '',
        shiroPermissions: '',
        remark: ''

      },
      options: [],
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        } ]
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  mounted () {

  },
  methods: {
    submitMenu () {
      this.$parent.addMenuVisible = false
    },
    close () {
      this.$parent.addMenuVisible = false
    }
  }
}
</script>

<style>
</style>
