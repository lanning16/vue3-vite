import { createStore } from 'vuex'

export default createStore({
  state: {
    isCollapse: true, // 控制菜单栏折叠
    currentMenu: null, // 管理面包屑的显示
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]

  },
  getters: {
  },
  mutations: {

    // 菜单栏折叠
    updateIsCollapse(state) {
      state.isCollapse = !state.isCollapse
    },

    // 面包屑
    selectMenu(state,val) {
      // 判断是否等于 首页路由，
      if(val.name === 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val

      // tag 标签
        let result = state.tabsList.findIndex(item => item.nanme === val.name)
        result == -1 ? state.tabsList.push(val) : ''
      }
    },

    closeTab(state,val) {
      let res = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(res, 1)
    }

  },
  actions: {
  },
  modules: {
  }
})
