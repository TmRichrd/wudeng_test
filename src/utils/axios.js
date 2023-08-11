import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/apis' : '/apis', // api的base_url
  timeout: 60000, // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  (config) => {
    if (getToken('Token')) {
      console.log(config)
      config.headers = {
        tooaatoken: getToken('Token'), // 携带权限参数
        // 'Content-Type': config.data.header || 'application/json; charset=utf-8'
      }
      if (config.data && config.data.pathUrl) {
        config.headers.routepage = config.data.pathUrl
        delete config.data.pathUrl
      }
    }
    console.log(config)
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code:200,接口正常返回;
     */
    const res = response.data
    if (res.code !== 1) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000,
      })

      // 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
      if (res.code === 40005) {
        MessageBox.confirm(
          this.$t('other.layoutinfo'),
          this.$t('other.confimlayout'),
          {
            confirmButtonText: this.$t('other.cxdl'),
            cancelButtonText: this.$t('common.qx'),
            type: 'warning',
          }
        ).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data.data
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
