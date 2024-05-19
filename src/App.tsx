import { Suspense, computed, defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { zhCN, dateZhCN } from 'naive-ui'
import { lighten } from './utils'
import { useDesignSettingStore } from './stores/designSetting'

export default defineComponent({
  setup() {
    /**
     * @type import('naive-ui').GlobalThemeOverrides
     */
    const designStore = useDesignSettingStore()
    const getThemeOverrides = computed(() => {
      const lightenStr = lighten(designStore.appTheme, 6)
      return {
        common: {
          primaryColor: designStore.appTheme,
          primaryColorHover: lightenStr,
          primaryColorPressed: lightenStr,
          primaryColorSuppl: designStore.appTheme
        },
        LoadingBar: {
          colorLoading: designStore.appTheme
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
