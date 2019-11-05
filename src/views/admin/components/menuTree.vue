<template>
  <div>
    <div class="menuTree">
      <ul id="menuTree" class="ztree"></ul>
    </div>
  </div>

</template>

<script>
  var treeObj = null
  export default {
    data() {
      return {
        treeData: [],
        checkedNodes: [],
        setting: {
          view: {
            showLine: true,
            showIcon: true
          },
          data: {
            simpleData: {
              enable: true,
              pIdKey: "parentId",
              id: "id"
            }
          },
          check: {
            enable: true,
            chkStyle: "checkbox"
          },
          callback: {
            onCheck: function(event, treeId, treeNode){

            }
          }
        }
      }
    },
    props: {

    },
    mounted() {
      this.$ajax.sendPostRequest("ZHPT_LIST_MENU", {}, res => {
        for (let item of res.data.data) {
          item.icon = ""
        }
        this.treeData = this.$api.formatTreeSelectData(res.data.data);
        this.$nextTick(() => {
         treeObj = $.fn.zTree.init($("#menuTree"), this.setting, this.treeData);
        })
      })

    },
    methods: {
      getTreeObj(){
        return treeObj
      }
    }

  }
</script>

<style scoped="scoped">
  .menuTree {
    background-color: #E4E7EB;
    min-height: 200px;
    width: 100%;
  }
</style>
