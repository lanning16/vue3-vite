import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../components/Login/Login.vue')
  },
  {
    path: '/main',
    component: () => import('../views/Main.vue'),
    redirect: '/main/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../components/Home/Home.vue')
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/Goods/Goods.vue')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('../views/User/User.vue')
      },
      {
        path: 'other/page1',
        name: 'page1',
        component: () => import('../views/Other/Page1.vue')
      },
      {
        path: 'other/page2',
        name: 'page2',
        component: () => import('../views/Other/Page2.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫
router.beforeEach(function (to,from,next) { 
  const patArr = ['/main/home','/main/user','/main/goods']
  // indexOf 方法：找到对应的元素就返回对应的索引，没有找到就返回 -1
  if(patArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    if(token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
 })

export default router
