const menu = {
  state: {
    menuList: [],
    showTab: {},
    selectedMenuList:[]
  },
  mutations: {
    loadMenuList(state,menuDataList){
      state.menuList = menuDataList
    },
    addSelectedMenuList(state, data) {
      let isAdd = true
      for (let i = 0; i < state.selectedMenuList.length; i++) {
        if (state.selectedMenuList[i].name === data.name) {
          isAdd = false
          state.showTab = data
        }
      }
      if (isAdd) {
        state.selectedMenuList.push(data)
        state.showTab = data
      }
    },
    deleteSelectedMenu(state, data) {
      let index
      for (let i = 0; i < state.selectedMenuList.length; i++) {
        if (state.selectedMenuList[i].name === data.name) {
          state.selectedMenuList.splice(i, 1)
          index = i
        }
      }
      var _that = data.vm
      if (data.name === state.showTab.name) {
        if (index === 0) {
          state.showTab = state.selectedMenuList[index]
          if (_that != undefined) {
            _that.$router.push({
              path: state.selectedMenuList[index].path
            })
          }
        } else {
          state.showTab = state.selectedMenuList[index - 1];
          if (_that != undefined) {
            _that.$router.push({
              path: state.selectedMenuList[index - 1].path
            })
          }
        }
      }
    },
    resetMenu(state){
      state.menuList = []
      state.showTab = {}
      state.selectedMenuList = []
    }
  },
  actions: {
      deleteSelectedMenu(context,data){
        context.commit('deleteSelectedMenu',data)
      }
  },
  getters: {

  }
}

export default menu
