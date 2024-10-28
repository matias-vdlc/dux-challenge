export type TableParams = {
  sector: number
  limit: number
  page: number
  searchInput: string
  query: string
}

export type User = {
  id: number
  usuario: string
  estado: 'ACTIVO' | 'INACTIVO'
  sector: number
}
