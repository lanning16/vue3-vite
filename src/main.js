import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/index.less'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 本地使用 mock
import './api/mock.js'
import api from './api/api'

const app = createApp(App)

// 二次封装axios
app.config.globalProperties.$api = api

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store).use(router)
app.mount('#app')
