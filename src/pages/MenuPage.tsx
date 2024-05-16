import { computed, defineComponent, ref } from 'vue'
import s from './MenuPage.module.scss'
import { useMenuStore } from '@/stores'
import { OnUpdateSelectedKeys } from 'naive-ui/es/tree/src/Tree'
import { FormInst, FormItemRule, TreeOption } from 'naive-ui'

export default defineComponent({
  displayName: 'MenuPage',
  async setup(props, context) {
    const btnRights = ref({
      addRootMenu: false,
      addChildMenu: false,
      deleteMenu: false
    })

    const menuStore = useMenuStore()
    await menuStore.initMenu()

    const defaultSelectMenuIds = [menuStore.menu_tree[0].id]
    const selectedMenuIds = ref<Array<string | number>>(defaultSelectMenuIds)

    // 菜单选中
    const selectMenu: OnUpdateSelectedKeys = (keys, _option, meta) => {
      console.log(123)

      if (meta.action === 'select') {
        selectedMenuIds.value = keys

        setBtnRights(meta.node)
      }
      return
    }

    const getMenuById = (id: string | number) => {
      return menuStore.menu_list.find((v) => v.id == id)
    }

    const getParentMenuById = (id: string | number) => {
      if (getMenuById(id).parent_id) {
        return menuStore.menu_list.find((v) => v.id == getMenuById(id).parent_id)
      }
      return null
    }

    const setBtnRights = (node: TreeOption | MenuResource) => {
      btnRights.value.deleteMenu = node.is_system !== 1 // 删除
      btnRights.value.addRootMenu = true
      btnRights.value.addChildMenu = node.level === 0
    }

    setBtnRights(menuStore.menu_tree[0])

    // 表单
    const formRef = ref<FormInst | null>(null)
    const size = ref('medium')
    const model = ref({
      inputValue: null,
      textareaValue: null,
      selectValue: null,
      multipleSelectValue: null,
      datetimeValue: null,
      nestedValue: {
        path1: null,
        path2: null
      },
      switchValue: false,
      checkboxGroupValue: null,
      radioGroupValue: null,
      radioButtonGroupValue: null,
      inputNumberValue: null,
      timePickerValue: null,
      sliderValue: 0,
      transferValue: null
    })
    const generalOptions = ['groode', 'veli good', 'emazing', 'lidiculous'].map((v) => ({
      label: v,
      value: v
    }))

    const cascaderOptions = [
      {
        label: 'groode',
        value: 'groode',
        children: [
          {
            label: 'veli good',
            value: 'veli good'
          }
        ]
      }
    ]

    const rules = {
      inputValue: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入 inputValue'
      },
      textareaValue: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入 textareaValue'
      },
      selectValue: {
        required: true,
        trigger: ['blur', 'change'],
        message: '请选择 selectValue'
      },
      multipleSelectValue: {
        type: 'array',
        required: true,
        trigger: ['blur', 'change'],
        message: '请选择 multipleSelectValue'
      },
      datetimeValue: {
        type: 'number',
        required: true,
        trigger: ['blur', 'change'],
        message: '请输入 datetimeValue'
      },
      nestedValue: {
        path1: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入 nestedValue.path1'
        },
        path2: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请输入 nestedValue.path2'
        }
      },
      checkboxGroupValue: {
        type: 'array',
        required: true,
        trigger: 'change',
        message: '请选择 checkboxGroupValue'
      },
      radioGroupValue: {
        required: true,
        trigger: 'change',
        message: '请选择 radioGroupValue'
      },
      radioButtonGroupValue: {
        required: true,
        trigger: 'change',
        message: '请选择 radioButtonGroupValue'
      },
      inputNumberValue: {
        type: 'number',
        required: true,
        trigger: ['blur', 'change'],
        message: '请输入 inputNumberValue'
      },
      timePickerValue: {
        type: 'number',
        required: true,
        trigger: ['blur', 'change'],
        message: '请输入 timePickerValue'
      },
      sliderValue: {
        validator(rule: FormItemRule, value: number) {
          return value > 50
        },
        trigger: ['blur', 'change'],
        message: 'sliderValue 需要大于 50'
      },
      transferValue: {
        type: 'array',
        required: true,
        trigger: 'change',
        message: '请输入 transferValue'
      }
    }
    const handleValidateButtonClick = (e: MouseEvent) => {
      e.preventDefault()
      formRef.value?.validate((errors) => {
        if (!errors) {
          console.log('验证成功')
        } else {
          console.log(errors)
        }
      })
    }

    return () => (
      <div class={s.wrapper}>
        <n-grid class={s.grid} x-gap="12" cols="3">
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
                header: () => (
                  <n-space>
                    <n-button
                      size="small"
                      type="info"
                      icon-placement="right"
                      disabled={!btnRights.value.addRootMenu}
                    >
                      添加顶级菜单
                    </n-button>
                    <n-button
                      size="small"
                      type="info"
                      icon-placement="right"
                      disabled={!btnRights.value.addChildMenu}
                    >
                      添加子菜单
                    </n-button>
                    <n-button
                      size="small"
                      type="error"
                      icon-placement="right"
                      disabled={!btnRights.value.deleteMenu}
                    >
                      删除菜单
                    </n-button>
                  </n-space>
                ),
                default: () => (
                  <n-scrollbar style="max-height: 100%" trigger="hover">
                    <n-tree
                      block-line
                      default-expand-all
                      data={menuStore.menu_tree}
                      key-field="id"
                      label-field="name"
                      children-field="children"
                      selectable
                      default-select-keys={defaultSelectMenuIds}
                      on-update:selected-keys={selectMenu}
                    />
                  </n-scrollbar>
                )
              }}
            </n-card>
          </n-gi>
          <n-gi class={s.grid_item} span="2">
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
                header: () => (
                  <n-breadcrumb separator="/">
                    {getParentMenuById(selectedMenuIds.value[0])?.name && (
                      <n-breadcrumb-item clickable={false}>
                        <n-tag bordered={false} type="info">
                          {getParentMenuById(selectedMenuIds.value[0]).name}
                        </n-tag>
                      </n-breadcrumb-item>
                    )}
                    <n-breadcrumb-item clickable={false}>
                      <n-tag bordered={false} type="success">
                        {getMenuById(selectedMenuIds.value[0]).name}
                      </n-tag>
                    </n-breadcrumb-item>
                  </n-breadcrumb>
                ),
                default: () => (
                  <n-scrollbar style="max-height: 100%" trigger="hover">
                    <n-form
                      ref={formRef}
                      model={model.value}
                      rules={rules}
                      size={size.value}
                      label-placement="top"
                    >
                      <n-grid cols={24} x-gap={24}>
                        <n-form-item-gi span={24} label="Input" path="inputValue">
                          <n-input v-model:value={model.value.inputValue} placeholder="Input" />
                        </n-form-item-gi>
                        <n-form-item-gi span={24} label="Textarea" path="textareaValue">
                          <n-input
                            v-model:value={model.value.textareaValue}
                            placeholder="Textarea"
                            type="textarea"
                            autosize={{
                              minRows: 3,
                              maxRows: 5
                            }}
                          />
                        </n-form-item-gi>
                        <n-form-item-gi span={24} label="Select" path="selectValue">
                          <n-select
                            v-model:value={model.value.selectValue}
                            placeholder="Select"
                            options={generalOptions}
                          />
                        </n-form-item-gi>
                      </n-grid>
                    </n-form>
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
