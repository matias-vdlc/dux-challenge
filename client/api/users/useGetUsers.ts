import { useState } from 'react'
import { getData } from '../genericsCrud'
import { User, TableParams } from './users.interface'

export const useGetUsers = () => {
  const [data, setData] = useState<User[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [isSerachLoading, setIsSerachLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handler = async ({
    sector = 2000,
    page = 1,
    limit = 5,
  }: Partial<TableParams>) => {
    const params = {
      sector,
      _page: page,
      _limit: limit,
    }

    setIsLoading(true)
    setIsSuccess(false)

    const {
      data: responseData,
      error: responseError,
      totalCount,
    } = await getData<User[], Partial<TableParams>>('/', params)

    setIsLoading(false)

    if (responseError) {
      setError(responseError)
      return
    }

    if (responseData) {
      setData(responseData)
      setTotalCount(totalCount!)
      setIsSuccess(true)
    }
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

    setIsSerachLoading(true)

    const { data: responseData, error: responseError } = await getData<
      User[],
      Partial<TableParams>
    >('/', params)

    setIsSerachLoading(false)

    if (responseError) {
      setError(responseError)
      return
    }

    if (!responseData) return
    setData(responseData)
  }

  return {
    handler,
    handleSearch,
    data,
    isLoading,
    error,
    totalCount,
    isSuccess,
  }
}
