import { http } from '@/http'
import { Router } from 'vue-router'

const modules = import.meta.glob('@/pages/*.tsx')

const generateRouter = async (router: Router) => {
  const {
    data: { resource: list }
  } = await http.get<{ resource: MenuResources }>('/menus/list')

  const homeRoute = router.getRoutes().find((v) => v.name === 'home')

  list
    .filter((v) => v.route_type)
    .forEach((v) => {
      const route = {
        path: v.route,
        name: v.route,
        component: () => modules[v.component]
      }

      console.log('home', homeRoute)

      homeRoute?.children?.push(route)
      // router.addRoute('home', route)
    })

  router.addRoute(homeRoute)

  console.log(router.getRoutes())
}

export { generateRouter }
