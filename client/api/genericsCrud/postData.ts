import { axiosInstance } from '../axiosInstance'
import { ApiResponse } from './generics.interface'
import { AxiosResponse } from 'axios'

export const postData = async <T>(
  data: T,
  url: string = '/?sector=2000',
): Promise<ApiResponse<T>> => {
  const res = { data: null, error: null }
  try {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(url, data)
    return { ...res, data: response.data }
  } catch (error: any) {
    return { ...res, error: error.data }
  }
}
