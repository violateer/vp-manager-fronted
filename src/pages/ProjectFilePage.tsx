import { defineComponent, nextTick, ref } from 'vue'
import s from './MenuPage.module.scss'

export default defineComponent({
  displayName: 'ProjectFilePage',
  async setup(props, context) {
    const showDropdownRef = ref(false)
    const xRef = ref(0)
    const yRef = ref(0)
    const options = [
      {
        label: '杰·盖茨比',
        key: 'jay gatsby'
      },
      {
        label: '黛西·布坎南',
        key: 'daisy buchanan'
      },
      {
        type: 'divider',
        key: 'd1'
      },
      {
        label: '尼克·卡拉威',
        key: 'nick carraway'
      },
      {
        label: '其他',
        key: 'others1',
        children: [
          {
            label: '乔丹·贝克',
            key: 'jordan baker'
          },
          {
            label: '汤姆·布坎南',
            key: 'tom buchanan'
          },
          {
            label: '其他',
            key: 'others2',
            children: [
              {
                label: '鸡肉',
                key: 'chicken'
              },
              {
                label: '牛肉',
                key: 'beef'
              }
            ]
          }
        ]
      }
    ]

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      showDropdownRef.value = false
      nextTick().then(() => {
        showDropdownRef.value = true
        xRef.value = e.clientX
        yRef.value = e.clientY
      })
    }

    const selectContext = () => {}

    return () => (
      <div class={s.wrapper}>
        <n-grid class={s.grid} x-gap="12" cols="4">
          <n-gi class={s.grid_item} span="1">
            <n-card
              class={s.card}
              size="small"
              bordered={false}
              content-style={{ height: 'calc(100% - 52px)' }}
              segmented={{
                content: true,
                footer: 'soft'
              }}
            >
              {{
                default: () => (
                  <>
                    <n-scrollbar
                      style="max-height: 100%"
                      trigger="hover"
                      onContextmenu={handleContextMenu}
                    >
                      12312312
                    </n-scrollbar>
                    <n-dropdown
                      placement="bottom-start"
                      options={options}
                      x={xRef.value}
                      y={yRef.value}
                      show={showDropdownRef.value}
                      onClickoutside={() => {
                        showDropdownRef.value = false
                      }}
                      onSelect={selectContext}
                    />
                  </>
                )
              }}
            </n-card>
          </n-gi>
          <n-gi class={s.grid_item} span="3">
            <n-card
              class={s.card}
              size="small"
              bordered={false}
              content-style={{ height: 'calc(100% - 52px)' }}
              segmented={{
                content: true,
                footer: 'soft'
              }}
            >
              {{
                default: () => (
                  <n-scrollbar style="max-height: 100%" trigger="hover">
                    456
                  </n-scrollbar>
                )
              }}
            </n-card>
          </n-gi>
        </n-grid>
      </div>
    )
  }
})
