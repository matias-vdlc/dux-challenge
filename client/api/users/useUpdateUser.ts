import { useState } from 'react'
import { putData } from '../genericsCrud'
import { User } from './users.interface'

export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handler = async (id: string | number, updatedUser: Partial<User>) => {
    setIsLoading(true)
    const { error: responseError } = await putData<Partial<User>>(
      `/${id}?sector=2000`,
      updatedUser,
    )
    setIsLoading(false)

    if (responseError) {
      setError(responseError)
      return
    }
  }

  return { handler, isLoading, error }
}
