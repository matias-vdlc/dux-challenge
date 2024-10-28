export type TableParams = {
  sector: number
  limit: number
  page: number
}

export type User = {
  id: number
  usuario: string
  estado: 'ACTIVO' | 'INACTIVO'
  sector: number
}
