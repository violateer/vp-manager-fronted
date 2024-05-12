import { http } from '@/http'

const getProjectTree = async () => {
  const res = await http.get<Resource>('/projects/tree')
  return res.data.resource
}

const switchProject = async (id: number) => {
  const res = await http.get<Resource>('/me/switch_project?project_id=' + id)
  if (res.status == 200) {
    window.location.reload()
  }
}

export { getProjectTree, switchProject }
