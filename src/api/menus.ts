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

export { addMenu }
