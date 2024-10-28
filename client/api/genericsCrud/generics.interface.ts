export type ApiResponse<T> = {
  data: T | null
  error: Error | null
}

export type GenericList<T> = {
  items: T[]
  count: number
}
