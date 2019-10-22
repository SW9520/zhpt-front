const menu = {
  state: {
    menuList: [],
    showTab: {}
  },
  mutations: {
    addMenuList(state, data) {
      let isAdd = true
      for (let i = 0; i < state.menuList.length; i++) {
        if (state.menuList[i].name === data.name) {
          isAdd = false
          state.showTab = data
        }
      }
      if (isAdd) {
        state.menuList.push(data)
        state.showTab = data
      }
    },
    deleteMenu(state, data) {
      let index
      for (let i = 0; i < state.menuList.length; i++) {
        if (state.menuList[i].name === data.name) {
          state.menuList.splice(i, 1)
          index = i
        }
      }
      var _that = data.vm
      if (data.name === state.showTab.name) {
        if (index === 0) {
          state.showTab = state.menuList[index]
          if (_that != undefined) {
            _that.$router.push({
              path: state.menuList[index].path
            })
          }
        } else {
          state.showTab = state.menuList[index - 1];
          if (_that != undefined) {
            _that.$router.push({
              path: state.menuList[index - 1].path
            })
          }
        }
      }


    }
  },
  actions: {

  },
  getters: {

  }
}

export default menu
