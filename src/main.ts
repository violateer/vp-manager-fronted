import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App'
import '@/assets/var.scss'
import { setupNaiveDiscreteApi } from './plugins'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

// 挂载 naive-ui 脱离上下文的 Api
setupNaiveDiscreteApi()

app.use(router)
app.use(naive)

app.mount('#app')
