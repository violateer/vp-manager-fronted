import { PropType, defineComponent, ref } from 'vue'
import s from './personal.module.scss'

export default defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    return () => <div class={s.wrapper}>个人中心</div>
  }
})
