const tabs = {
  state: {
    showTabs: [],
    activeIndex: 0,
    activeName: ''
  },
  mutations: {
    openTab(state, tab) {
      state.showTabs.push(tab)
      state.activeIndex = state.showTabs.length
      state.activeName = tab.name
    },
    closeTab(state, targetName) {
      state.showTabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          let nextTab = state.showTabs[index + 1] || state.showTabs[index - 1]
          if (nextTab) {
            state.activeName = nextTab.name
          }
        }
      })
      state.showTabs = state.showTabs.filter(tab => tab.name !== targetName)
    },
  },
  getters: {

  },

  actions: {
    openTab(context, tab) {
      context.commit('openTab', tab)
    },
    closeTab(context, targetName) {
      context.commit('closeTab', targetName)
    }
  }

}

export default tabs
