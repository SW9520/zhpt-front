<template>
  <div>
    <el-table ref="table" :data="tableData" border fit stripe :highlight-current-row="true" :header-cell-style="headerStyle">
      <el-table-column v-if="check == true" :width="40" type="selection">
      </el-table-column>

      <template v-for="(column, index) in tableColumns">
        <el-table-column :prop="column.field" :key='column.label' :formatter="column.formatter" :label="column.label" :align="column.align" :width="column.width">
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页-->
    <div style="padding: 5px 0 ;" v-if="paging == true">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
      </el-pagination>
    </div>
  </div>


</template>

<script>
  export default {
    data() {
      return {
        totalSize: 0,
        currentPage: 0,
        pageSize: 0
      }
    },
    props: {
      columns: {
        type: Array
      },
      pageInfo: {
        type: Object
      },
      dataList: {
        type: Array,
         default: () => []
      },
      check: {
        type: Boolean,
        default: false
      },
      paging: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      headerStyle(row, rowIndex) {

        return "background-color:#409EFF;color:#fff"
      },

      handleSizeChange(val) {
        this.pageSize = val
        this.$emit('pageSizeChange', val)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.$emit('pageChange', val)
      }
    },
    watch: {
      pageInfo: {
        handler: function(newValue, oldval) {
          this.totalSize = newValue.total
          this.currentPage = newValue.pageNum
          this.pageSize = newValue.pageSize
        },
        deep: true //深度监听
      }

    },
    computed: {
      tableData() {
        if (this.paging) { //分页
          return this.pageInfo.list;
        } else {
          return this.dataList
        }

      },
      tableColumns() {
        let c = this.columns
        for (let item of c) {
          if (!item.align) {
            item.align = "center"
          }
        }
        return c;
      }
    },


  }
</script>

<style scoped="">

</style>
