import { http } from '@/http'

/**
 * @description: 新增菜单
 * @param {Partial<MenuResource>} data
 * @return {*}
 */
const addMenu = async (data: Partial<MenuResource>) => {
  const res = await http.post<Resource>('/menus', data)
  return res.data.resource
}

/**
 * @description: 删除菜单
 * @param {number} id
 * @return {*}
 */
const deleteMenuById = async (id: number) => {
  const res = await http.delete<Resource>(`/menus/${id}`)
  return res.data.resource
}

export { addMenu, deleteMenuById }
