import Mock from 'mockjs'
import homeApi from './mockData/home.js'
import userApi from './mockData/user.js'

// 拦截请求
Mock.mock('/home/getTableData', homeApi.getTableData)
Mock.mock('/home/getCountData', homeApi.getCountData)

// 本地获取  user 数据
Mock.mock(/user\/getUser/,'get', userApi.getUserList)
// 添加用户
Mock.mock(/user\/addUser/,'post', userApi.createUser)
// 编辑用户
Mock.mock(/user\/editUser/,'post', userApi.updateUser)
// 删除用户
Mock.mock(/user\/deleteUser/,'get', userApi.deleteUser)


