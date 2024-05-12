import { PropType, defineComponent, ref } from 'vue'
import s from './MenuPage.module.scss'

export default defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    return () => <div class={s.wrapper}>菜单管理</div>
  }
})
