import { defineComponent } from 'vue'
import s from './Layout.module.scss'
import { ProjectSelection } from '../ProjectViewer/ProjectSelection'
import { Menu } from '../Menu/Menu'
import { RouterView } from 'vue-router'
import VPManager from '@/assets/VPManager.png'
import { renderIcon } from '../Icon/icons'
import router from '@/router'

export const Layout = defineComponent({
  setup(props, ctx) {
    const options = [
      {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon('LogOutOutline')
      }
    ]

    const selectOption = (key) => {
      if (key === 'logout') {
        localStorage.removeItem('token')
        router.push('/auth')
      }
    }
    return () => (
      <div class={s.wrapper}>
        <div class={s.left_bar}>
          <div class={s.icon}>
            <n-image width={'100%'} src={VPManager} preview-disabled={true} />
          </div>
          <Menu />
        </div>
        <div class={s.right_bar}>
          <div class={s.right_bar_top}>
            <div class={s.menu}>
              <ProjectSelection />
            </div>
            <n-dropdown options={options} placement="bottom-start" onSelect={selectOption}>
              <n-avatar
                round
                size={36}
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              />
            </n-dropdown>
          </div>
          <div class={s.right_bar_bottom}>
            <RouterView />
          </div>
        </div>
      </div>
    )
  }
})
