import { AxiosResponse } from 'axios'
import { axiosInstance } from '../axiosInstance'
import { ApiResponse } from './generics.interface'

export const getData = async <T, P = Record<string, never>>(
  url: string | undefined = '/',
  params?: P,
): Promise<ApiResponse<T>> => {
  const res = { data: null, error: null }
  try {
    const response: AxiosResponse<T> = await axiosInstance.get<
      T,
      AxiosResponse<T>
    >(url, { ...(params ? { params } : {}) })

    return { ...res, data: response.data }
  } catch (error: any) {
    return { ...res, error: error.data }
  }
}
