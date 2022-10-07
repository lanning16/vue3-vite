<template>
  <el-aside :width="$store.state.isCollapse ? '200px' : '64px'">
    <el-menu background-color="#778899" active-text-color="#DA70D6" :collapse-transition="false" :collapse="!$store.state.isCollapse">
      <!-- 根据 vuex 中的管理的菜单栏折叠状态来控制文字的显示 -->
      <h3 v-show="$store.state.isCollapse">后台管理</h3>
      <h3 v-show="!$store.state.isCollapse">后台</h3>

      <!-- 没有子菜单 -->
      <el-menu-item v-for="(item,index) in noChildren()" :key="index" :index="item.path" @click="clickRouter(item)">
        <!-- 动态绑定图标 -->
        <component class="icons" :is="item.icon"></component> &nbsp;&nbsp;&nbsp;
        <span>{{item.label}}</span>
      </el-menu-item>

      <!-- 有子菜单 -->
      <el-sub-menu v-for="(item,index) in hasChildren()" :key="index" :index="item.path">
        <template #title>
          <!-- 动态绑定图标 -->
          <component class="icons" :is="item.icon"></component> &nbsp;&nbsp;&nbsp;
          <span>{{item.label}}</span>
        </template>

        <el-menu-item-group>
          <el-menu-item v-for="(subItem,subIndex) in item.children" :key="subIndex" :index="subItem.path" @click="clickRouter(subItem)">
            <!-- 动态绑定图标 -->
            <component class="icons" :is="subItem.icon"></component> &nbsp;&nbsp;&nbsp;
            <span>{{subItem.label}}</span>
          </el-menu-item>
        </el-menu-item-group>

      </el-sub-menu>

    </el-menu>
  </el-aside>

</template>

<script>
import {} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Aside',

  setup() {
    const list = [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'House',
        url: 'Home/Home'
      },
      {
        path: '/goods',
        name: 'goods',
        label: '商品管理',
        icon: 'video-play',
        url: 'MallManage/MallManage'
      },
      {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'UserManage/UserManage'
      },
      {
        label: '其他',
        icon: 'location',
        path: '/other',
        children: [
          {
            path: '/page1',
            name: 'page1',
            label: '页面1',
            icon: 'setting',
            url: 'Other/PageOne'
          },
          {
            path: '/page2',
            name: 'page2',
            label: '页面2',
            icon: 'setting',
            url: 'Other/PageTwo'
          }
        ]
      }
    ]

    // 返回有子菜单
    const hasChildren = () => {
      return list.filter(item => item.children)
    }

    // 返回没有子菜单数组
    const noChildren = () => {
      return list.filter(item => !item.children)
    }

    const store = useStore()
    const router = useRouter()
    // 点击跳转路由
    const clickRouter = item => {
      router.push({
        name: item.name
      })

      // 面包屑
      // 在点击路由跳转的时候获取到了 item ,进行 vuex 管理控制面包屑
      store.commit('selectMenu', item)
    }

    return { hasChildren, noChildren, clickRouter }
  }
}
</script>

<style lang="less" scoped>
.icons {
  width: 20px;
  height: 20px;
}

.el-aside {
  height: 100%;
  background-color: #778899;

  // 解决 aside 和 header 中间的 空白间隙
  .el-menu {
    border-right: none;

    h3 {
      line-height: 48px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>>
