<template>
  <div class="login-container">
    <div class="login-box">
      <el-form :model="info" label-width="80px" size="small" style="max-width: 350px" :rules="formRules">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model.trim="info.username" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" show-password v-model.trim="info.password" />
        </el-form-item>
        <el-row>
          <el-button type="danger" round>重置</el-button>
          <el-button type="primary" round @click="onlogin">登录</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Login',

  setup() {
    // 表单用户信息
    const info = reactive({
      username: '',
      passward: ''
    })

    // 校验规则
    const formRules = reactive({
      username: [
        { required: true, message: '用户名是必填项', trigger: 'blur' },
        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码是必填项', trigger: 'blur' },
        { min: 3, max: 16, message: '长度在 3 到 16 为字符之间', trigger: 'blur' }
      ]
    })

    const router = useRouter()

    // 点击登录处理函数
    const onlogin = () => {
      if (info.username === 'admin' && info.password === '666666') {
        // 登录成功
        // 1、 模拟存储 token
        localStorage.setItem('token', 'Bearer xxx')
        // 2、跳转到后台主页
        router.push('/main/home')
      } else {
        // 登录失败， 清除本地token
        localStorage.removeItem('token')
      }
    }

    return { info, formRules, onlogin }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #6495ed;
}

.login-box {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 250px;
  background-color: #ffe4e1;
  padding-top: 50px;
}

.el-row {
  margin-left: 220px;
}
</style>