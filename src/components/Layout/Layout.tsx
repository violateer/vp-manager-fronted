import { defineComponent } from 'vue'
import s from './Layout.module.scss'
import { ProjectSelection } from '../ProjectViewer/ProjectSelection'

export const Layout = defineComponent({
  setup(props, ctx) {
    return () => (
      <>
        <div class={s.wrapper}>
          <div class={s.icon}></div>
          <div class={s.right_bar}>
            <div class={s.menu}>
              <ProjectSelection />
            </div>
            <n-avatar
              round
              size={36}
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
          </div>
        </div>
        <div class={s.content}>{ctx.slots.content?.()}</div>
      </>
    )
  }
})
