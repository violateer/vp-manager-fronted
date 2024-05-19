import router from '@/router'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { ConfigProviderProps, createDiscreteApi, darkTheme, lightTheme, useMessage } from 'naive-ui'
import { computed, ref } from 'vue'

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
  }
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'get'
    })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  put<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'delete'
    })
  }
}

export const http = new Http('/api/v1')

http.instance.interceptors.request.use((config) => {
  window['$loading'].start()
  const token = localStorage.getItem('token')
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
})

http.instance.interceptors.response.use(
  (response) => {
    window['$loading'].finish()
    return response
  },
  (error) => {
    window['$loading'].finish()

    if (error.response.status >= 400 && error.response.status < 500) {
      if (error.response.status === 401) {
        router.push('/auth')
        return
      }

      if (error.response.data.message) {
        window['$message'].error(error.response.data.message)
      } else {
        window['$message'].error(JSON.stringify(error.response.data.errors))
      }
    }

    throw error
  }
)
