import { Layout } from '@/components/Layout/Layout'
import { Component, defineComponent, h, ref } from 'vue'
import { NIcon, useLoadingBar } from 'naive-ui'
import s from "./home.module.scss"
import type { MenuOption } from 'naive-ui'
import { TreeOption } from 'naive-ui'
import {
    FishOutline as FishIcon,
    PawOutline as PawIcon,
    BagOutline as BagOutlineIcon
} from '@vicons/ionicons5'
import { repeat } from 'seemly'
import { Table } from '@/components/Table/Table'


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
        const data = createData();
        const nodeProps = ({ option }: { option: TreeOption }) => {
            return {
                onClick() {
                    console.log(option)
                }
            }
        }

        return () => <Layout>
            {{
                content: () => <div class={s.wrapper}>
                    <n-layout has-sider class={s.layout}>
                        <n-layout-sider
                            class={s.layout_sider}
                            bordered
                            width={240}
                        >
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
                            />
                        </n-layout-sider>
                        <n-layout class={s.layout_right}>
                            <Table />
                        </n-layout>
                    </n-layout>
                </div>
            }}
        </Layout>
    }
})