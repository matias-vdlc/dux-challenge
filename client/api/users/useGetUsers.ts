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
    searchInput = '',
    query = '',
  }: Partial<TableParams>) => {
    const params = {
      sector,
      _page: page,
      _limit: limit,
      searchInput,
      query,
    }

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

  const handleSearch = async ({
    searchIn,
    query,
    sector = 2000,
  }: {
    searchIn: string
    query: string
    sector?: number
  }) => {
    const params = {
      sector,
      [searchIn]: query,
    }

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

  return { handler, handleSearch, data, isLoading, error }
}
