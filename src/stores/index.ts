import { http } from '@/http'
import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useTestStore = defineStore('test', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      session: null as SessionResource
    }
  },
  actions: {
    async initSession() {
      const res = await http.get<{ resource: SessionResource }>('/me')
      this.session = res.data.resource
    }
  }
})

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menu_list: null as MenuResources,
      menu_tree: null as MenuResources
    }
  },
  actions: {
    async initMenu() {
      const list = await http.get<{ resource: MenuResources }>('/menus/list')
      this.menu_list = list.data.resource

      const tree = await http.get<{ resource: MenuResources }>('/menus/tree')
      this.menu_tree = tree.data.resource
    }
  }
})
