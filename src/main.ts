import { createApp } from 'vue'
import '@/assets/var.scss'
import router from "@/router"
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App'

const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(naive);
app.mount('#app')
