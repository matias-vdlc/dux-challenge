import { MutableRefObject } from 'react'

export const debounce = (
  ref: MutableRefObject<NodeJS.Timeout | undefined>,
  callback: (key: string, cleanedValue: string) => void,
  timeout: number = 300,
) => {
  return (value: string, key: string) => {
    const cleanedValue = value

    if (ref.current) {
      clearTimeout(ref.current)
    }

    ref.current = setTimeout(() => {
      callback(key, cleanedValue)
    }, timeout)
  }
}
