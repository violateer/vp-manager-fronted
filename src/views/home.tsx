import { Layout } from '@/components/Layout/Layout'
import { defineComponent } from 'vue'
import s from './home.module.scss'
import { Menu } from '@/components/Menu/Menu'
import { RouterView } from 'vue-router'

export default defineComponent({
  async setup(props, ctx) {
    return () => <Layout></Layout>
  }
})
