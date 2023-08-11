const permission = {
  state: {
    menuIndex: 0
  },
  getters: {
    menuIndex: state => state.menuIndex // 顶部菜单的index
  },
  mutations: {
    CLICK_INNER_LEFT_MENU: (state, data) => { // titleList:arr
      state.topRouters = data.titleList
    }
  },
  actions: {
    ClickLeftInnerMenu({ commit }, data) {
      commit('CLICK_INNER_LEFT_MENU', data)
    }
  }
}

export default permission
