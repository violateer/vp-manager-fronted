import { omit } from 'naive-ui/es/_utils'
import { ButtonProps, buttonProps } from 'naive-ui/es/button'
import { defineComponent, ref } from 'vue'

type exceptOption<T> = (keyof T)[]

export const SelfLoadingButton = defineComponent({
  props: buttonProps,
  setup(props, { slots }) {
    const loading = ref(false)
    // 要自定义的属性，在props中去掉，避免重复传递
    const exceptOptions: exceptOption<ButtonProps> = ['onClick']

    const loadingClick = async (e: MouseEvent) => {
      if (loading.value) return

      e.preventDefault()

      loading.value = true

      // 添加至少250毫秒加载，否则加载时间太短，看不到加载条，但是会突出来一块空白的
      setTimeout(async () => {
        try {
          if (Array.isArray(props.onClick)) {
            await Promise.all(props.onClick.map((fn) => fn(e)))
          } else {
            await props.onClick?.(e)
          }
        } finally {
          loading.value = false
        }
      }, 250)
    }

    return () => (
      <n-button
        // 去除props.onClick属性，避免onClick触发两次
        {...omit(props, exceptOptions)}
        loading={loading.value}
        disabled={loading.value}
        onClick={loadingClick}
      >
        {slots.default?.()}
      </n-button>
    )
  }
})
