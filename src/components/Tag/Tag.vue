<template>
  <div class="tags">
    <el-tag :key="index" v-for="(tag, index) in tags" :closable="tag.name !== 'home'" :disable-transitions="false" :effect="$route.name === tag.name ? 'dark' : 'plain'" @click="changeMenu(tag)" @close="handleClose(tag, index)">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Tag',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    // 把 vuex 中的数据 转存到 当前组件中
    const tags = store.state.tabsList

    // 点击标签切换路由
    const changeMenu = item => {
      router.push({ name: item.name })
    }

    // 关闭 tag 标签
    const handleClose = (tag, index) => {
      let length = tags.length - 1
      // 处理 vuex 中的 tableList
      store.commit('closeTab', tag)
      // 做第一个判断
      if (tag.name !== route.name) {
        return
      }
      if (index === length) {
        router.push({ name: tags[index - 1].name })
      } else {
        router.push({ name: tags[index].name })
      }
    }

    return {
      tags,
      changeMenu,
      handleClose
    }
  }
}
</script>

<style lang="less" scoped>
.tags {
  margin: 0;
  padding: 10px;
  width: 100%;

  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
