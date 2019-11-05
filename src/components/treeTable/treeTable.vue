\<template>
  <!--  @header-click="chooseall" -->
  <el-table ref="treeTable" :data="formatData" :row-style="showRow" :header-cell-style="tableHeaderColor" v-bind="$attrs"
    stripe :height="height">
    <el-table-column v-if="checkbox == true" :width="40" type="selection">
    </el-table-column>

    <!-- 未设置列的情况 -->
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <!--添加空格 -->
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
        <!--图标 -->
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-arrow-right" />
          <i v-else class="el-icon-arrow-down" />
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space">&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">

            <i v-if="!scope.row._expanded" class="el-icon-arrow-right"  />
            <i v-else class="el-icon-arrow-down" />

        </span>
        {{ scope.row[column.value] }}
      </template>
    </el-table-column>
    <slot />
  </el-table>
</template>

<script>
  import treeToArray from './eval'
  import $ from 'jquery';
  export default {
    name: 'TreeTable',
    data() {
      return {
        chooseson: true, // 全选
        key: true, // 单个点击直到全部选中
        height: 450
      }
    },
    props: {
      /* eslint-disable */
      data: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      checkbox: {
        type: Boolean,
        default: true
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      // 格式化数据源
      formatData: function() {
        let tmp;
        if (!Array.isArray(this.data)) {
          tmp = [this.data];
        } else {
          tmp = this.data;
        }
        const func = this.evalFunc || treeToArray;
        const args = this.evalArgs ? [tmp, this.expandAll].concat(this.evalArgs) : [tmp, this.expandAll];
        return func.apply(null, args);
      }
    },
    methods: {
      //设置表头行的样式
      tableHeaderColor({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        return 'background-color:lightblue;color:#fff;font-wight:200;font-size:14px;text-align:center'
      },
      showRow: function(row) {
        const show = row.row.parent ?
          row.row.parent._expanded && row.row.parent._show :
          true;
        row.row._show = show;
        return show ?
          "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;" :
          "display:none;";
      },
      // 切换下级是否展开
      toggleExpanded: function(trIndex) {
        const record = this.formatData[trIndex];
        record._expanded = !record._expanded;
      },
      // 图标显示
      iconShow(index, record) {
        return index === 0 && record.child && record.child.length > 0;
      },
      getCheckedRow(){
          return this.$refs.treeTable.selection;
      }

    },
    mounted() {

    }
  };
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>

<style scoped>
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }

  .ms-tree-space::before {
    content: "";
  }

  .processContainer {
    width: 100%;
    height: 100%;
  }

  table td {
    line-height: 26px;
  }

  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: #2196f3;
    margin-left: -18px;
  }
</style>
