import Vue from 'vue'
import Router from 'vue-router'
import { Layout, empty, fullLayout } from './../layout' // 页面整体布局
import * as utils from '@/utils/mUtils'
Vue.use(Router)

/**
 * 1、roles:后台返回的权限结构;
 *
 */
// 手动跳转的页面白名单
// const whiteList = [
//   '/'
// ]
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 *
 */
// 默认不需要权限的页面
export const constantRouterMap = [
  {
    path: '/',
    noDropdown: true,
    hidden: false,
    component: fullLayout,
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: 'icondashboard'
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '首页',
          icon: 'icondashboard'
        },
        component: () => import('@/page/dashboard/index.vue')
      }

    ]
  },
  {
    path: "/systemSet",
    noDropdown: false,
    hidden: true,
    component: fullLayout,
    meta: {
      title: "系统设置"
    },
    children: [
      {
        path: '/systemSet/timeControl',
        name: 'timeControl',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '时段控制',
          icon: 'icondashboard'
        },
        component: () => import('@/page/systemSet/timeControl/index.vue')
      },
      {
        path: '/systemSet/visibilityControl',
        name: 'visibilityControl',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '能见度控制',
          icon: 'icondashboard'
        },
        component: () => import('@/page/systemSet/visibilityControl/index.vue')
      }
    ]
  },
  { path: '/login', name: 'login', component: () => import('@/page/login'), hidden: true },
  { path: '/404', component: () => import('@/page/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/page/errorPage/401'), hidden: true }
]

// 注册路由
export default new Router({
  mode: 'hash', // 默认为'hash'模式
  // base: './', // 添加跟目录,对应服务器部署子目录
  routes: constantRouterMap
})
const layoutObj = {
  Layout: Layout,
  fullLayout: fullLayout,
  empty: empty
}

const resolveFile = file => {
  try
  {
    return require(`@/page/${file}/index.vue`).default
  } catch (err)
  {
    return require(`@/page/errorPage/404.vue`).default
  }
}

export const formatRouter = (routeArr) => {
  if (!routeArr.length) return
  routeArr.forEach(item => {
    if (Object.keys(layoutObj).includes(item.component))
    {
      item.component = layoutObj[item.component]
    } else
    {
      item.component = utils.delFirstChar(item.component, '/')
      item.component = resolveFile(item.component)
    }
    if (item.children && item.children.length)
    {
      formatRouter(item.children)
    }
  })
}
// 异步路由（需要权限的页面）
export const asyncRouterMap = [
  {
    path: '/roadManage',
    name: 'roadManage',
    component: 'Layout',
    noDropdown: false,
    hidden: false,
    meta: {
      title: '路段管理',
      icon: 'iconuser'
    },
    children: [
      {
        path: '/roadManage/addRoad',
        name: 'addRoad',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '添加路段',
          icon: 'iconuser'
        },
        component: '/roadManage/addRoad'
      },
      {
        path: '/roadManage/roadSurvey',
        name: 'roadSurvey',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '路段总况',
          icon: 'iconuser'
        },
        component: '/roadManage/roadSurvey'
      },
      {
        path: '/roadManage/roadList',
        name: 'roadList',
        noDropdown: false,
        hidden: false,
        meta: {
          title: '路段列表',
          icon: 'iconuser'
        },
        component: 'empty',
        redirect: '/roadManage/roadList/road1',
        children: [
          {
            path: '/roadManage/roadList/road1',
            name: 'roadItem',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '路段1',
              icon: 'iconuser'
            },
            component: '/roadManage/roadList/roadItem'
          },
          {
            path: '/roadManage/roadList/road2',
            name: 'roadItem',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '路段2',
              icon: 'iconuser'
            },
            component: '/roadManage/roadList/roadItem'
          },
          {
            path: '/roadManage/roadList/road3',
            name: 'roadItem',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '路段3',
              icon: 'iconuser'
            },
            component: '/roadManage/roadList/roadItem'
          },
          {
            path: '/roadManage/roadList/road4',
            name: 'roadItem',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '路段4',
              icon: 'iconuser'
            },
            component: '/roadManage/roadList/roadItem'
          }
        ]
      },
      {
        path: '/roadManage/accidentManage',
        name: 'accidentManage',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '事故管理',
          icon: 'iconuser'
        },
        component: '/roadManage/accidentManage'
      }
    ]
  },
  {
    path: '/systemSet',
    name: 'systemSet',
    component: 'Layout',
    noDropdown: false,
    hidden: false,
    meta: {
      title: '系统设置',
      icon: 'iconuser'
    },
    children: [
      {
        path: '/systemSet/tcpSet',
        name: 'tcpSet',
        noDropdown: true,
        hidden: false,
        meta: {
          title: 'TCP设置',
          icon: 'iconuser'
        },
        component: '/systemSet/tcpSet'
      },
      {
        path: '/systemSet/concentratorGroup',
        name: 'concentratorGroup',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '集中器分组',
          icon: 'iconuser'
        },
        component: '/systemSet/concentratorGroup'
      },
      {
        path: '/systemSet/concentrator',
        name: 'concentrator',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '集中器',
          icon: 'iconuser'
        },
        component: '/systemSet/concentrator'
      },
      {
        path: '/systemSet/timeControl',
        name: 'timeControl',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '时段控制',
          icon: 'iconuser'
        },
        component: '/systemSet/timeControl'
      },
      {
        path: '/systemSet/visibilityControl',
        name: 'visibilityControl',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '能见度控制',
          icon: 'iconuser'
        },
        component: '/systemSet/visibilityControl'
      }
    ]
  },
  {
    path: '/userManager',
    name: 'userManage',
    component: 'Layout',
    noDropdown: false,
    hidden: false,
    meta: {
      title: '用户管理',
      icon: 'iconuser'
    },
    children: [
      {
        path: '/userManager/userList',
        name: 'userList',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '用户列表',
          icon: 'iconuser'
        },
        component: '/userManage/userList'
      },
      {
        path: '/userManager/roleList',
        name: 'roleList',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '角色列表',
          icon: 'iconuser'
        },
        component: '/userManage/roleList'
      }
    ]
  },
  {
    path: '/reportForm',
    name: 'reportForm',
    component: 'Layout',
    noDropdown: false,
    hidden: false,
    meta: {
      title: '报表',
      icon: 'iconuser'
    },
    children: [
      {
        path: '/reportForm/visibility',
        name: 'visibility',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '能见度',
          icon: 'iconuser'
        },
        component: '/reportForm/visibility'
      },
      {
        path: '/reportForm/operationLog',
        name: 'operationLog',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '操作日志',
          icon: 'iconuser'
        },
        component: '/reportForm/operationLog'
      },
      {
        path: '/reportForm/technologyMantain',
        name: 'technologyMantain',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '技术运维',
          icon: 'iconuser'
        },
        component: '/reportForm/technologyMantain'
      }
    ]
  }
]

/**
   *  路由设置要求：
   * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
   * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
   *
   * 按需加载路由组件的2种方法：
   * 1、component: '/login')
   * 2、component:resolve => require(['@/page/fundPosition'], resolve)
   *
   *
   *
   * 什么情况下，路由会定位到404页面?
   * 路由中redirect:'',不起作用？
   * 三级子菜单要在顶部展示？
   *
   *
   *
   */

