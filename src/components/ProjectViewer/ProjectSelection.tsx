import { PropType, defineComponent, ref } from 'vue'
import s from './ProjectSelection.module.scss'
import { getProjectTree, switchProject } from '@/api/projects'
import { useUserStore } from '@/stores'
import { TreeOverrideNodeClickBehavior, treeGetClickTarget } from 'naive-ui/es/tree'

export const ProjectSelection = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  async setup(props, context) {
    const projects = await getProjectTree()
    const project_search = ref('')
    const userStore = useUserStore()

    const nodeProps = ({ option }: { option: ProjectResource }) => {
      return {
        onClick(e) {
          if (treeGetClickTarget(e) === 'node') {
            switchProject(option.id)
          }
        }
      }
    }

    const override: TreeOverrideNodeClickBehavior = ({ option }) => {
      if (option.children) {
        return 'toggleSelect'
      }
      return 'default'
    }

    const options = [
      {
        key: 'header',
        type: 'render',
        render: () => (
          <div class={s.project_tree}>
            <div class={s.action_input}>
              <n-input
                type="text"
                size="small"
                v-model:value={project_search.value}
                placeholder="请输入项目名称..."
              />
            </div>
            <n-tree
              block-line
              data={projects}
              key-field="id"
              label-field="name"
              children-field="children"
              selectable
              pattern={project_search.value}
              show-line={true}
              accordion={true}
              cancelable={false}
              expand-on-click={true}
              node-props={nodeProps}
              override-default-node-click-behavior={override}
              showIrrelevantNodes={false}
              class={s.tree_node}
            />
          </div>
        )
      }
    ]

    const handleSelect = (key: string | number) => {
      console.log(String(key))
    }

    return () => (
      <div class={s.wrapper}>
        <n-dropdown
          trigger="click"
          placement="bottom-start"
          showArrow={true}
          options={options}
          onSelect={handleSelect}
        >
          <div class={s.project_box}>
            <div class={s.project_box_bar}>当前项目：{userStore.session.active_project_name}</div>
          </div>
        </n-dropdown>
      </div>
    )
  }
})
