import { Layout } from '@/components/Layout/Layout'
import { defineComponent, nextTick, ref } from 'vue'
import s from './home.module.scss'
import { Table } from '@/components/Table/Table'
import { ProjectViewer } from '@/components/ProjectViewer/ProjectViewer'

export default defineComponent({
  async setup(props, ctx) {
    return () => (
      <Layout>
        {{
          content: () => (
            <div class={s.wrapper}>
              <n-layout has-sider class={s.layout}>
                <n-layout-sider class={s.layout_sider} bordered width={240}>
                  {/* <ProjectViewer></ProjectViewer> */}
                </n-layout-sider>

                <n-layout class={s.layout_right}>
                  <Table />
                </n-layout>
              </n-layout>
            </div>
          )
        }}
      </Layout>
    )
  }
})
