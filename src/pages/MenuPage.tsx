import { PropType, defineComponent, ref } from 'vue'
import s from './MenuPage.module.scss'

export default defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <n-layout embedded content-style="padding: 24px;">
          <n-card>只要是 看到天边云一朵 逐天拢有好心情</n-card>
        </n-layout>
      </div>
    )
  }
})
