import { Layout } from '@/components/Layout/Layout'
import { defineComponent, nextTick, ref } from 'vue'
import s from './home.module.scss'
import { Table } from '@/components/Table/Table'
import { Menu } from '@/components/Menu/Menu'
import { RouterView } from 'vue-router'

export default defineComponent({
  async setup(props, ctx) {
    return () => (
      <Layout>
        {{
          content: () => (
            <div class={s.wrapper}>
              <n-layout has-sider class={s.layout}>
                <n-layout-sider class={s.layout_sider} bordered width={240}>
                  <Menu />
                </n-layout-sider>

                <n-layout class={s.layout_right}>
                  {/* <Table /> */}
                  <RouterView />
                </n-layout>
              </n-layout>
            </div>
          )
        }}
      </Layout>
    )
  }
})
