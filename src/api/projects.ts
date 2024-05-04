import { http } from '@/http'

const getProjectTree = async () => {
  const res = await http.get<Resource>('/projects/tree')
  return res.data.resource
}

export { getProjectTree }
