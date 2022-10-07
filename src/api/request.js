import axios from 'axios'
import config from '../config'

// 创建一个 axios 实例对象
const service = axios.create({
  baseURL: config.baseApi
})

// 在请求之前做点什么
service.interceptors.request.use(req => {
  // 可以自定义 header
  // jwt-tokrn 认证
  return req
}) 

// 在请求之后做点什么
service.interceptors.response.use(res => {
  // 根据后端 协商 视情况而定
  const {code,data,msg} = res.data
  if(code === 200) {
    return data
  } else {
    // 网络请求错误
    console.log('网络请求错误');
  }
})

// 封装核心函数
function request(options) { 

  options.method = options.method || 'get'
  if(options.method.toLowerCase() == 'get') {
    options.params = options.data
  }

  // 对 mock 处理
  let isMock = config.mock
  if(typeof options.mock  !== 'undefined') {
    isMock = options.mock
  }

  // 对线上环境处理
  if(config.env == 'prod') {
    // 不给你用到 mock 的机会
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(options)
 }

 export default request