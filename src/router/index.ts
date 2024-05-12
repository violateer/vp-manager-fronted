import { useUserStore } from '@/stores'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { generateRouter } from './generator'

// 路由配置 和以前一样
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      type: 'home'
    },
    component: () => import('@/views/home'),
    children: [
      {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/personal')
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/loginAndRegister')
  },
  {
    path: '/:pathMatch(.*)*', // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
    name: '404',
    component: () => import('@/views/404')
  }
]

// 此处由【new VueRouter】的方式修改为【createRouter】的方式 其余无变化
const router = createRouter({
  history: createWebHashHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.initSession()
  const token = localStorage.getItem('token')
  if (!token && to.name !== 'auth') {
    // 将用户重定向到登录页面
    return { name: 'auth' }
  }

  // generateRouter(router)

  // const redirectPath = (from.query.redirect || to.path) as string
  // const redirect = decodeURIComponent(redirectPath)
  // console.log(to.path, '123123', redirect)

  // const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
  // next(nextData)

  if (to.fullPath === '/') {
    const vp_manager_last_route = localStorage.getItem('vp_manager_last_route')
    if (
      !vp_manager_last_route ||
      vp_manager_last_route === '/' ||
      vp_manager_last_route === '/auth'
    ) {
      return { name: 'personal' }
    }
  }
})

// 后置守卫
router.afterEach((_, from) => {
  localStorage.setItem('vp_manager_last_route', from.fullPath)
})

export default router
