import { defineComponent } from 'vue'
import { RouterView } from "vue-router";

export default defineComponent({
    setup() {
        return () =>
            <n-loading-bar-provider>
                <RouterView />
            </n-loading-bar-provider>
    }
})