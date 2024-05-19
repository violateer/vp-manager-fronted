import { http } from '@/http'

/**
 * @description: 查询菜单
 * @param {number} id
 * @return {*}
 */
const getMenuById = async (id: number) => {
  const res = await http.get<Resource>(`/menus/${id}`)
  return res.data.resource
}

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
 * @description: 更新菜单
 * @param {number} id
 * @param {Partial<MenuResource>} data
 * @return {*}
 */
const updateMenu = async (id: number, data: Partial<MenuResource>) => {
  const res = await http.put<Resource>(`/menus/${id}`, data)
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

export { getMenuById, addMenu,updateMenu, deleteMenuById }
