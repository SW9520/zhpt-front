const menu = {
  state: {
    menuList: [],
    showTab: {},
    tabList:[]
  },
  mutations: {
    loadMenuList(state,menuDataList){
      state.menuList = menuDataList
      state.tabList = []
      state.showTab = {}
    },
    addTab(state, data) {
      let isAdd = true
      for (let i = 0; i < state.tabList.length; i++) {
        if (state.tabList[i].name === data.name) {
          isAdd = false
          state.showTab = data
        }
      }
      if (isAdd) {
        state.tabList.push(data)
        state.showTab = data
      }
    },
    deleteTab(state, data) {
      let index
      for (let i = 0; i < state.tabList.length; i++) {
        if (state.tabList[i].name === data.name) {
          state.tabList.splice(i, 1)
          index = i
        }
      }
      var _that = data.vm
      if (data.name === state.showTab.name) {
        if (index === 0) {
          state.showTab = state.tabList[index]
          if (_that != undefined) {
            _that.$router.push({
              path: state.tabList[index].path
            })
          }
        } else {
          state.showTab = state.tabList[index - 1];
          if (_that != undefined) {
            _that.$router.push({
              path: state.tabList[index - 1].path
            })
          }
        }
      }
    },
    resetMenu(state,resolve){
      state.menuList = []
      state.showTab = {}
      state.tabList = []
    }
  },
  actions: {
      removeTab(context,data){
        context.commit('deleteTab',data)
      }
  },
  getters: {

  }
}

export default menu
