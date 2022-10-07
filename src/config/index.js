/* 
环境配置
一般在企业级别项目里面有三个环境
开发环境
测试环境
线上环境
*/

const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: 'https://fastmock.site/mock/16859b6fa5978e8522300bfc21951e7e/api' // mock 根路径
  },
  text: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://fastmock.site/mock/16859b6fa5978e8522300bfc21951e7e/api'
  },
  prod: {
    baseApi: '//future.com/api',
    mockApi: 'https://fastmock.site/mock/16859b6fa5978e8522300bfc21951e7e/api'
  }
}

export default {
  env,
  // mock的总开关
  mock: true,
  ...EnvConfig[env]
}