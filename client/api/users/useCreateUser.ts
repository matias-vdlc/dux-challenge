import { useState } from 'react'
import { postData } from '../genericsCrud'
import { User } from './users.interface'

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handler = async (user: User) => {
    setIsLoading(true)
    const { error: responseError } = await postData<User>(user)
    setIsLoading(false)

    if (responseError) {
      setError(responseError)
      return
    }
  }

  return { handler, isLoading, error }
}
