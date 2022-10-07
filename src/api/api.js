/* 
管理整个项目的Api 

*/

import request from './request.js'
export default {
  // home 组件左侧表格数据
  getTableData(params) {
    return request({
      url: '/home/getTableData',
      method: 'get',
      data: params,
      mock: true
    })
  },


  // 获取用户数据
  getUserList(params) {
    return request({
      url: '/user/getUser',
      method: 'get',
      mock: false,
      data: params
    })
  },

  // 添加用户
  addUser(params) {
    return request({
      url: '/user/addUser',
      method: 'post',
      mock: false,
      data: params
    })
  },

  // 修改用户
  editUser(params) {
    return request({
      url: '/user/editUser',
      method: 'post',
      mock: false,
      data: params
    })
  },

  // 删除用户
  deleteUser(params) {
    return request({
      url: '/user/deleteUser',
      method: 'get',
      mock: false,
      data: params
    })
  }
}