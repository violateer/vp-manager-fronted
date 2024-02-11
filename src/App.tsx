import { defineComponent } from 'vue'
import { RouterView } from "vue-router";
import { zhCN, dateZhCN } from 'naive-ui'

export default defineComponent({
    setup() {
        return () =>
            <n-config-provider locale={zhCN} date-locale={dateZhCN}>
                <n-loading-bar-provider>
                    <RouterView />
                </n-loading-bar-provider>
            </n-config-provider>
    }
})