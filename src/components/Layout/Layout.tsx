import { defineComponent } from 'vue'
import s from './Layout.module.scss'
import { ProjectSelection } from '../ProjectViewer/ProjectSelection'
import { Menu } from '../Menu/Menu'
import { RouterView } from 'vue-router'
import VPManager from '@/assets/VPManager.png'

export const Layout = defineComponent({
  setup(props, ctx) {
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
            <n-avatar
              round
              size={36}
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
          </div>
          <div class={s.right_bar_bottom}>
            <RouterView />
          </div>
        </div>
      </div>
    )
  }
})
