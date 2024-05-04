import { Layout } from '@/components/Layout/Layout'
import { defineComponent } from 'vue'
import s from './home.module.scss'
import { TreeOption } from 'naive-ui'
import { repeat } from 'seemly'
import { Table } from '@/components/Table/Table'
import { http } from '@/http'

function createData(level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      whateverLabel: createLabel(level),
      whateverKey: key,
      whateverChildren: createData(level - 1, key)
    }
  })
}

function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

export default defineComponent({
  setup(props, ctx) {
    const data = createData()
    const nodeProps = ({ option }: { option: TreeOption }) => {
      return {
        onClick() {
          console.log(option)
        }
      }
    }

    console.log(JSON.parse(localStorage.getItem('user')))

    http.get<{ resource: SessionResource }>('/me')

    return () => (
      <Layout>
        {{
          content: () => (
            <div class={s.wrapper}>
              <n-layout has-sider class={s.layout}>
                <n-layout-sider class={s.layout_sider} bordered width={240}>
                  <div class={s.action}>
                    <div class={s.action_input}>
                      <n-input type="text" placeholder="请输入项目名称..." />
                    </div>
                    <div class={s.action_button}>
                      <n-button text style="font-size: 24px">
                        <n-icon size="24">
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 512 512"
                            enable-background="new 0 0 512 512"
                            xml:space="preserve"
                          >
                            <path
                              d="M443.5,420.2L336.7,312.4c20.9-26.2,33.5-59.4,33.5-95.5c0-84.5-68.5-153-153.1-153S64,132.5,64,217s68.5,153,153.1,153
                                c36.6,0,70.1-12.8,96.5-34.2l106.1,107.1c3.2,3.4,7.6,5.1,11.9,5.1c4.1,0,8.2-1.5,11.3-4.5C449.5,437.2,449.7,426.8,443.5,420.2z
                                M217.1,337.1c-32.1,0-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-84.9c0-32.1,12.5-62.3,35.2-84.9c22.7-22.7,52.9-35.2,85-35.2
                                c32.1,0,62.3,12.5,85,35.2c22.7,22.7,35.2,52.9,35.2,84.9c0,32.1-12.5,62.3-35.2,84.9C279.4,324.6,249.2,337.1,217.1,337.1z"
                            ></path>
                          </svg>
                        </n-icon>
                      </n-button>
                      <n-button text style="font-size: 24px">
                        <n-icon size="24">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="32"
                              d="M256 112v288"
                            ></path>
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="32"
                              d="M400 256H112"
                            ></path>
                          </svg>
                        </n-icon>
                      </n-button>
                    </div>
                  </div>
                  <n-tree
                    block-line
                    data={data}
                    key-field="whateverKey"
                    label-field="whateverLabel"
                    children-field="whateverChildren"
                    selectable
                    show-line={true}
                    accordion={true}
                    expand-on-click={true}
                    node-props={nodeProps}
                    class={s.tree_node}
                  />
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
