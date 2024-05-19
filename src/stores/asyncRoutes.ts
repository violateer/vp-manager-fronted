import { http } from '@/http'
import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { RouteRecordRaw, Router } from 'vue-router'
import { useMenuStore } from '.'

export interface IAsyncRouteState {
  routersAdded: any[]
  keepAliveComponents: string[]
  isDynamicRouteAdded: boolean
}

export const useAsyncRouteStore = defineStore('asyncRoute', {
  state: (): IAsyncRouteState => ({
    routersAdded: [],
    keepAliveComponents: [],
    isDynamicRouteAdded: false
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus
    },
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    }
  },
  actions: {
    getRouters() {
      return toRaw(this.routersAdded)
    },
    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
    },
    // 设置动态路由
    setRouters(routers: RouteRecordRaw[]) {
      this.routersAdded = routers
    },
    setKeepAliveComponents(compNames: string[]) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames
    },
    async generateRouter(router: Router) {
      // const {
      //   data: { resource: list }
      // } = await http.get<{ resource: MenuResources }>('/menus/list')
      const menuStore = useMenuStore()
      await menuStore.initMenu()

      const modules = await import.meta.glob('../pages/**.tsx', { eager: true })

      const homeRoute = router.getRoutes().find((v) => v.name === 'home')

      menuStore.menu_list
        .filter((v) => v.route_type)
        .forEach((v) => {
          const route = {
            path: v.route,
            name: v.route,
            component: () => Promise.resolve(modules[`../pages/${v.component}.tsx`])
          }

          homeRoute?.children?.push(route)
        })

      router.addRoute(homeRoute)
    }
  }
})
