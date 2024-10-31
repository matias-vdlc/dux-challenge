import { useState } from 'react'
import { getData } from '../genericsCrud'
import { User, TableParams } from './users.interface'
import { usersTableDataDto } from '../dto'

export const useGetUsers = () => {
  const [data, setData] = useState<User[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [isSerachSuccess, setIsSerachSuccess] = useState(false)
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
      const formattedData = usersTableDataDto(responseData)
      setData(formattedData)
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

    setIsSerachSuccess(false)

    const { data: responseData, error: responseError } = await getData<
      User[],
      Partial<TableParams>
    >('/', params)

    
    if (responseError) {
      setError(responseError)
      return
    }
    
    if (!responseData) return
    const formattedData = usersTableDataDto(responseData)
      setData(formattedData)
    setIsSerachSuccess(true)
  }

  return {
    handler,
    handleSearch,
    data,
    isLoading,
    error,
    totalCount,
    isSuccess,
    isSerachSuccess,
  }
}
