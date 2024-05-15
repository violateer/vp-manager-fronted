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
        <n-grid class={s.grid} x-gap="12" cols="3">
          <n-gi span="1">
            <n-card
              size="small"
              bordered={false}
              segmented={{
                content: true,
                footer: 'soft'
              }}
            >
              {{
                header: () => (
                  <n-space>
                    <n-button type="info" ghost icon-placement="right">
                      添加顶级菜单
                    </n-button>
                    <n-button type="info" ghost icon-placement="right">
                      添加子菜单
                    </n-button>
                  </n-space>
                ),
                default: () => <div>卡片内容</div>
              }}
            </n-card>
          </n-gi>
          <n-gi span="2">
            <n-card
              size="small"
              bordered={false}
              segmented={{
                content: true,
                footer: 'soft'
              }}
            >
              {{
                header: () => <span>编辑菜单</span>,
                default: () => <div>卡片内容</div>
              }}
            </n-card>
          </n-gi>
        </n-grid>
      </div>
    )
  }
})
