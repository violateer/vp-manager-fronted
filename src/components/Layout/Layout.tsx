import { Component, defineComponent, h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { BookOutline as BookIcon } from '@vicons/ionicons5'
import s from "./Layout.module.scss"

export const Layout = defineComponent({
    setup(props, ctx) {
        const activeKey = ref<string | null>('1');

        const renderIcon = (icon: Component) => {
            return () => h(NIcon, null, { default: () => h(icon) })
        }

        const menuOptions: MenuOption[] = [
            {
                label: '文件管理',
                key: '1',
                icon: renderIcon(BookIcon)
            },
        ]

        return () => <>
            <div class={s.wrapper}>
                <div class={s.icon}></div>
                <div class={s.right_bar}>
                    <div class={s.menu}>
                        <n-menu
                            value={activeKey.value}
                            mode="horizontal"
                            options={menuOptions}
                            responsive
                        />
                    </div>
                    <n-avatar
                        round
                        size={36}
                        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                    />
                </div>
            </div>
            <div class={s.content}>
                {ctx.slots.content?.()}
            </div>
        </>
    }
})