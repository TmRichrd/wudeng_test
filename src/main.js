import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI)
import('element-ui/lib/theme-chalk/index.css')

import './components/iconSvg' // iconSvg

import '@/permission' // permission control
import '@/filters'
// import '@/mockjs' // mock数据

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, { ak: 'aX8PMRXSiNrsGAkjX1ni536oMDgcC3II' })
// i18n国际化
import i18n from '@/i18n'

// 分享功能集合
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n, // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: (h) => h(App),
}).$mount('#app')
