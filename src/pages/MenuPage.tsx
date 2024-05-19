import { defineComponent, ref } from 'vue'
import s from './MenuPage.module.scss'
import { useMenuStore } from '@/stores'
import { OnUpdateSelectedKeys } from 'naive-ui/es/tree/src/Tree'
import { TreeOption, FormInst, useMessage, useModal, NButton } from 'naive-ui'
import { SelfLoadingButton } from '@/components/Button/CustomButton'
import { addMenu, deleteMenuById } from '@/api/menus'
import router from '@/router'

export default defineComponent({
  displayName: 'MenuPage',
  async setup(props, context) {
    const btnRights = ref({
      addRootMenu: false,
      addChildMenu: false,
      deleteMenu: false
    })

    const message = useMessage()
    const modal = window['$modal']

    const menuStore = useMenuStore()
    await menuStore.initMenu()

    const defaultSelectMenuIds = [menuStore.menu_tree[0].id]
    const selectedMenuIds = ref<Array<number>>(defaultSelectMenuIds)

    const showModal = ref(false)

    // 菜单选中
    const selectMenu: OnUpdateSelectedKeys = (keys, _option, meta) => {
      console.log(123)

      if (meta.action === 'select') {
        selectedMenuIds.value = keys

        setBtnRights(meta.node)
      }
      return
    }

    const getMenuById = (id: number) => {
      return menuStore.menu_list.find((v) => v.id == id)
    }

    const getParentMenuById = (id: number) => {
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
      selectValue: null
    })
    const generalOptions = ['groode', 'veli good', 'emazing', 'lidiculous'].map((v) => ({
      label: v,
      value: v
    }))

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

    const deleteMenu = async () => {
      modal.create({
        title: '确定删除菜单吗？',
        preset: 'dialog',
        action: () => (
          <>
            <NButton size="small" onClick={() => modal.destroyAll()}>
              取消
            </NButton>
            <SelfLoadingButton
              size="small"
              type="error"
              onClick={async () => {
                await deleteMenuById(selectedMenuIds.value[0])
                message.success('删除成功！')
                showModal.value = false
                router.go(0)
              }}
            >
              确定
            </SelfLoadingButton>
          </>
        )
      })
    }

    // 弹窗
    const modalFormRef = ref<FormInst | null>(null)
    const modalModel = ref<Partial<MenuResource>>({
      name: null,
      parent_id: null
    })

    const modalFormRules = {
      name: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入菜单名称'
      }
    }

    const showModalForm = (isRoot: boolean) => {
      modalModel.value.name = null
      modalModel.value.parent_id = isRoot ? null : selectedMenuIds.value[0]
      showModal.value = true
      console.log('parent', selectedMenuIds.value[0])
    }

    const submitCallback = () => {
      return modalFormRef.value?.validate(async (errors) => {
        if (!errors) {
          await addMenu(modalModel.value)
          message.success('新建成功！')
          showModal.value = false
          router.go(0)
        } else {
          return false
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
                      onClick={() => showModalForm(true)}
                    >
                      添加顶级菜单
                    </n-button>
                    <n-button
                      size="small"
                      type="info"
                      icon-placement="right"
                      disabled={!btnRights.value.addChildMenu}
                      onClick={() => showModalForm(false)}
                    >
                      添加子菜单
                    </n-button>
                    <n-button
                      size="small"
                      type="error"
                      icon-placement="right"
                      disabled={!btnRights.value.deleteMenu}
                      onClick={deleteMenu}
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
                      <div style="display: flex; justify-content: flex-end">
                        <n-button round type="primary" onClick={handleValidateButtonClick}>
                          验证
                        </n-button>
                      </div>
                    </n-form>
                  </n-scrollbar>
                )
              }}
            </n-card>
          </n-gi>
        </n-grid>

        {/* 弹窗 */}
        <n-modal
          v-model:show={showModal.value}
          preset="dialog"
          title="新建菜单"
          content={() => (
            <n-form
              ref={modalFormRef}
              model={modalModel.value}
              rules={modalFormRules}
              size={size.value}
              label-placement="left"
            >
              <n-grid cols={12} x-gap={12}>
                <n-form-item-gi span={12} label="菜单名称" path="name">
                  <n-input v-model:value={modalModel.value.name} />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          )}
        >
          {{
            action: () => (
              <n-space>
                <n-button size="small" onClick={() => (showModal.value = false)}>
                  取消
                </n-button>
                <SelfLoadingButton size="small" type="info" onClick={submitCallback}>
                  新增
                </SelfLoadingButton>
              </n-space>
            )
          }}
        </n-modal>
      </div>
    )
  }
})
