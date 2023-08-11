import * as mUtils from '@/utils/mUtils'
import { logout, login, getRouter, getUserInfo } from '@/api' // 导入用户信息相关接口
import { getToken, setToken, removeToken } from '@/utils/auth'
import { asyncRouterMap, constantRouterMap } from '@/router'

const user = {
  state: {
    name: '',
    avatar: '',
    token: getToken('Token'),
    roles: [],
    browserHeaderTitle: mUtils.getStore('browserHeaderTitle') || '发光标志2.0',
    isAddMenu: false,
    routers: constantRouterMap,
    addRouters: [],
  },
  getters: {
    token: (state) => state.token,
    roles: (state) => state.roles,
    avatar: (state) => state.avatar,
    name: (state) => state.name,
    isAddMenu: (state) => state.isAddMenu,
    browserHeaderTitle: (state) => state.browserHeaderTitle,
    addRouters: (state) => state.addRouters, // 权限过滤路由
    permission_routers: (state) => state.routers, // 所有路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers // 权限路由
      state.routers = constantRouterMap.concat(routers) // 总路由
    },
    SET_BROWSERHEADERTITLE: (state, action) => {
      state.browserHeaderTitle = action.browserHeaderTitle
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    UPDATE_ISADDMENU: (state, isAddMenu) => {
      state.isAddMenu = isAddMenu
    },
  },
  actions: {
    GetRouter({ commit, state }) {
      return new Promise((resolve, reject) => {
        const addrouters = state.addRouters.length
          ? state.addRouters
          : JSON.parse(sessionStorage.getItem('routeInfo'))
        commit('SET_ROUTERS', addrouters)
        resolve()
      })
    },
    resetRouter({ commit, state }) {
      return new Promise((resolve, reject) => {
        // const addrouters = state.addRouters.length ? state.addRouters : JSON.parse(sessionStorage.getItem('routeInfo'))
        getRouter().then(
          (res) => {
            console.log(res)
            commit('SET_ROUTERS', res)
            commit('UPDATE_ISADDMENU', false)
            sessionStorage.setItem('routeInfo', JSON.stringify(res))
            resolve()
          },
          () => {
            reject(this.$t('other.hqlycw'))
          }
        )
      })
    },
    // 登出
    LogOut({ commit, reqData }) {
      return new Promise((resolve, reject) => {
        removeToken('Token')
        sessionStorage.clear()
        resolve()
      })
    },
    // 动态修改权限;本实例中,role和token是相同的;
    Login({ commit }, param) {
      return new Promise((resolve) => {
        login(param).then((res) => {
          setToken('Token', res.token)
          sessionStorage.setItem('userinfo', JSON.stringify(res.userinfo))
          commit('SET_ROUTERS', res.menus)
          sessionStorage.setItem('routeInfo', JSON.stringify(res.menus))
          // commit('SET_ROUTERS', asyncRouterMap)
          // sessionStorage.setItem('routeInfo', JSON.stringify(asyncRouterMap))
          resolve()
        })
      })
    },
  },
}

export default user

/**
 * 1、用户退出,需要调取后台接口吗？后台具体的业务逻辑是什么？
 *
 *
 */
