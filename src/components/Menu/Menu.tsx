import { Component, defineComponent, h, ref } from 'vue'
import s from './Menu.module.scss'
import { NIcon } from 'naive-ui'
import { useMenuStore } from '@/stores'
import * as icons from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'

export const Menu = defineComponent({
  async setup(props, context) {
    const menuStore = useMenuStore()
    const menuOptions = ref<MenuResources>([])

    await menuStore.initMenu()

    function renderIcon(icon: Component) {
      return () => h(NIcon, null, { default: () => h(icon) })
    }

    const setMenuIcon = (menus) => {
      return menus.map((menu) => {
        if (menu.icon) {
          menu.icon = renderIcon(icons[menu.icon])
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
        />
      </div>
    )
  }
})
