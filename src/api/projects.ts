import { http } from '@/http'
import router from '@/router'
import { useUserStore } from '@/stores'

const getProjectTree = async () => {
  const res = await http.get<Resource>('/projects/tree')
  return res.data.resource
}

const switchProject = async (id: number) => {
  const res = await http.get<Resource>('/me/switch_project?project_id=' + id)
  if (res.status == 200) {
    const userStore = useUserStore()
    userStore.initSession()
    router.go(0)
  }
}

export { getProjectTree, switchProject }
