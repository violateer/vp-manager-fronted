import { http } from '@/http'
import { Router } from 'vue-router'

const modules = import.meta.glob('@/pages/*.tsx')

const generateRouter = async (router: Router) => {
  const {
    data: { resource: list }
  } = await http.get<{ resource: MenuResources }>('/menus/list')
  list
    .filter((v) => v.route_type)
    .forEach((v) => {
      const route = {
        path: v.route,
        name: v.name,
        component: () => modules[v.component]
      }

      router.addRoute('home', route)
    })
}

export { generateRouter }
