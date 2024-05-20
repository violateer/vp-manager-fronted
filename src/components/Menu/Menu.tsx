import { defineComponent, h, ref, watch } from 'vue'
import s from './Menu.module.scss'
import { useMenuStore } from '@/stores'
import { RouterLink } from 'vue-router'
import router from '@/router'
import { renderIcon } from '../Icon/icons'

export const Menu = defineComponent({
  async setup(props, context) {
    const menuStore = useMenuStore()
    const menuOptions = ref<MenuResources>([])

    await menuStore.initMenu()

    const currMenu = ref(
      menuStore.menu_list.find((v) => v.route === router.currentRoute.value.name)
    )

    watch(router.currentRoute, (currRoute) => {
      currMenu.value = menuStore.menu_list.find((v) => v.route === currRoute.name)
      console.log(router.getRoutes())
    })

    const setMenuIcon = (menus) => {
      return menus.map((menu) => {
        if (menu.icon) {
          menu.icon = renderIcon(menu.icon)
        }

        if (menu.route) {
          menu.label = menu.name
          menu.name = () =>
            h(
              RouterLink,
              {
                to: {
                  name: menu.route
                }
              },
              { default: () => menu.label }
            )
        }

        if (menu.children?.length) {
          setMenuIcon(menu.children)
        }

        return menu
      })
    }

    menuOptions.value = setMenuIcon(menuStore.menu_tree)

    return () => (
      <div class={s.wrapper}>
        <n-menu
          root-indent={12}
          indent={24}
          key-field="id"
          label-field="name"
          options={menuOptions.value}
          accordion
          inverted={'inverted'}
          value={currMenu.value?.id}
        />
      </div>
    )
  }
})
