import * as icons from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

function renderIcon(iconName: string) {
  return () => h(NIcon, null, { default: () => h(icons[iconName]) })
}

export { renderIcon, icons }
