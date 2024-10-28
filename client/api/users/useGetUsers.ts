import { useState } from 'react'
import { getData } from '../genericsCrud'
import { User, TableParams } from './users.interface'

export const useGetUsers = () => {
  const [data, setData] = useState<User[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handler = async ({
    sector = 2000,
    page = 1,
    limit = 5,
  }: Partial<TableParams>) => {
    const params = { sector, _page: page, _limit: limit }

    setIsLoading(true)

    const { data: responseData, error: responseError } = await getData<
      User[],
      Partial<TableParams>
    >('/', params)

    setIsLoading(false)

    if (responseError) {
      setError(responseError)
      return
    }

    if (!responseData) return
    setData(responseData)
  }
  return { handler, data, isLoading, error }
}