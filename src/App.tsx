import { Suspense, computed, defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { zhCN, dateZhCN } from 'naive-ui'
import { lighten } from './utils'

export default defineComponent({
  setup() {
    /**
     * @type import('naive-ui').GlobalThemeOverrides
     */
    const getThemeOverrides = computed(() => {
      const appTheme = '#2d8cf0'
      const lightenStr = lighten('#2d8cf0', 6)
      return {
        common: {
          primaryColor: appTheme,
          primaryColorHover: lightenStr,
          primaryColorPressed: lightenStr,
          primaryColorSuppl: appTheme
        },
        LoadingBar: {
          colorLoading: appTheme
        }
      }
    })

    return () => (
      <n-config-provider
        locale={zhCN}
        date-locale={dateZhCN}
        theme-overrides={getThemeOverrides.value}
      >
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
