import { axiosInstance } from '../axiosInstance'
import { AxiosResponse } from 'axios'
import { ApiResponse } from './generics.interface'

export const putData = async <T>(
  url: string,
  data: T,
): Promise<ApiResponse<T>> => {
  const res = { data: null, error: null }
  try {
    const response: AxiosResponse = await axiosInstance.put<T>(url, data)
    return { ...res, data: response.data }
  } catch (error: any) {
    return { ...res, error: error.data }
  }
}
