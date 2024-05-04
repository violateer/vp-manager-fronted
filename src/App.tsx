import { Suspense, defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { zhCN, dateZhCN } from 'naive-ui'

export default defineComponent({
  setup() {
    return () => (
      <n-config-provider locale={zhCN} date-locale={dateZhCN}>
        <n-message-provider>
          <n-loading-bar-provider>
            <Suspense>
              <RouterView />
            </Suspense>
          </n-loading-bar-provider>
        </n-message-provider>
      </n-config-provider>
    )
  }
})
