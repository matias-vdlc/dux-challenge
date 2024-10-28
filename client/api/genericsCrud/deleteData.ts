import { ApiResponse } from './generics.interface'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '../axiosInstance'

export const deleteData = async <T>(url: string): Promise<ApiResponse<T>> => {
  const res = { data: null, error: null }
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete<T>(url)
    return { ...res, data: response.data }
  } catch (error: any) {
    return { ...res, error: error.data }
  }
}
