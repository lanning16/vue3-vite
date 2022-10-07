<template>
  <div class="common-layout">
    <el-container class="t-container">
      <!-- 侧边栏 -->
      <Aside />
      <el-container class="l-container">
        <!-- 头部 -->
        <Header />
        <Tag />
        <!-- 内容 -->
        <el-main class="home">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '../components/Header/Header.vue'
import Aside from '../components/Aside/Aside.vue'
import Tag from '../components/Tag/Tag.vue'
export default {
  name: 'Main',
  components: {
    Header,
    Aside,
    Tag,
  },
}
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;

  .t-container {
    height: 100%;

    .l-container {
      flex-wrap: wrap;

      .home {
        height: 80%;
        padding: 5px;
        // margin: 0;
        // padding: 0;
      }
    }
  }
}
</style>
