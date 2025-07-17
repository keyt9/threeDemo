import axios from 'axios'
import { showToast } from 'vant'
import { getCookie, clearCookie } from '@/utils/cookies.js'
import router from '@/router/index.js'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: '/api',
  timeout: 5000
})
// 2.请求拦截器
http.interceptors.request.use(config => {
  const headers = {
    'Accept-Language': 'en-CN;q=1.0',
    'source_type': 'apple-appstore',
    'version_code': '5.4.8',
    'Content-Type': 'application/json',
    'push_device_type': '4',
    'Accept': '*/*'
  }
  config.headers = { ...headers, ...config.headers }
  const token = getCookie('token') || ''
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  Promise.reject(error)
})

// 3.响应拦截器
http.interceptors.response.use(response => {
  if (response.data.code === 401) {
    clearCookie('token')
    clearCookie('refresh_token')
    router.push({ name: 'index:login' })
  }
  return response
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        // 跳转到登录页
        router.push({ name: 'index:login' })
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
    showToast(error.message)
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      showToast('服务器响应超时，请刷新当前页')
    }
    error.message = '连接服务器失败,请刷新重试'
  }

  showToast(error.message)
  return Promise.resolve(error.response)
})
// 4.导入文件
export default http
