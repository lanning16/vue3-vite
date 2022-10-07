<template>
  <el-header>
    <!-- 左侧 -->
    <div class="header-left">
      <el-button plain circle size="small" class="button" @click="handleCollapse">
        <!-- 菜单图标 -->
        <el-icon>
          <Menu />
        </el-icon>
      </el-button>

      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 右侧 -->
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" src="../../assets/images/ln.jpg" alt="">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>其他</el-dropdown-item>
            <el-dropdown-item @click="onquit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'Header',

  setup() {
    // 通过 vuex 管理菜单栏的折叠
    const store = useStore()
    const handleCollapse = () => {
      // 提交函数
      store.commit('updateIsCollapse')
    }

    // 用计算属性返回 面包屑管理函数的返回值
    const current = computed(() => {
      return store.state.currentMenu
    })

    const router = useRouter()
    // 退出登录
    const onquit = () => {
      // 清除本地token
      localStorage.removeItem('token')
      router.push('/login')
    }

    return { handleCollapse, current, onquit }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: #778899;

  .header-left {
    display: flex;
    align-items: center;

    .button {
      margin-right: 15px;
    }
  }

  .header-right {
    .user {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
}
</style>>
