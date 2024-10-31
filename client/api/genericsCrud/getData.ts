import { AxiosResponse } from 'axios'
import { axiosInstance } from '../axiosInstance'
import { ApiResponse } from './generics.interface'

export const getData = async <T, P = Record<string, never>>(
  url: string | undefined = '/',
  params?: P,
): Promise<ApiResponse<T> & { totalCount?: number }> => {
  const res = { data: null, error: null, totalCount: undefined }
  try {
    const response: AxiosResponse<T> = await axiosInstance.get<
      T,
      AxiosResponse<T>
    >(url, { ...(params ? { params } : {}) })

    return {
      ...res,
      data: response.data,
      totalCount: parseInt(response.headers['x-total-count'], 10) || 0,
    }
  } catch (error: any) {
    return { ...res, error: error.data }
  }
}
