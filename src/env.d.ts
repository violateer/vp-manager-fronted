declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Resources<T = any> = {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}

type Resource<T = any> = {
  resource: T
}

type ResourceError = {
  errors: Record<string, string[]>
}

type SessionResource = {
  active_project_id: number
  active_project_name: string
  email: string
  id: number
  name: string
  avatar?: string
  phone?: string
}

type ProjectResource = {
  id: number
  name: string
  manager_user_id: number
  created_at: string
  updated_at: string
  parent_id?: number
  children?: ProjectResource[]
}

type MenuResource = {
  id: number
  name: string
  level: number
  created_at: string
  updated_at: string
  sequ: number
  is_system: number
  parent_id?: number
  icon?: string
  component?: string
  route?: string
  route_type?: string
  children?: MenuResource[]
}

type MenuResources = MenuResource[]
