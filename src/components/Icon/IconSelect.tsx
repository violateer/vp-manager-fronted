import { NAvatar, NText, SelectRenderLabel, SelectRenderTag } from 'naive-ui'
import { PropType, defineComponent, h, ref } from 'vue'
import { icons, renderIcon } from './icons'

export const IconSelect = defineComponent({
  setup(props, context) {
    const options = Object.values(icons).map((v) => {
      return {
        label: v.name,
        value: v.name
      }
    })
    const renderSingleSelectTag: SelectRenderTag = ({ option }) => {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        },
        [
          renderIcon(option.value as string)(),
          h(
            'div',
            {
              style: {
                marginLeft: '8px',
                padding: '4px 0'
              }
            },
            h('div', null, [option.label as string])
          )
        ]
      )
    }
    const renderLabel: SelectRenderLabel = (option) => {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        },
        [
          renderIcon(option.value as string)(),
          h(
            'div',
            {
              style: {
                marginLeft: '8px',
                padding: '4px 0'
              }
            },
            h('div', null, [option.label as string])
          )
        ]
      )
    }

    return () => (
      <n-select
        filterable
        clearable
        options={options}
        renderLabel={renderLabel}
        renderTag={renderSingleSelectTag}
      />
    )
  }
})
