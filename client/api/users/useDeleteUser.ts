import { useState } from 'react'
import { deleteData } from '../genericsCrud'
import { User } from './users.interface'

export const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handler = async (id: string | number) => {
    setIsLoading(true)
    const { error: responseError } = await deleteData<User>(
      `/${id}?sector=2000`,
    )
    setIsLoading(false)

    if (responseError) {
      setError(responseError)
      return
    }
  }

  return { handler, isLoading, error }
}
