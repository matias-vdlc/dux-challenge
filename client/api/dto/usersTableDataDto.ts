import { User } from '../users/users.interface'
import { capitalize } from '../../helpers'

export const usersTableDataDto = (array: User[]): User[] => {
  if (!array) {
    return []
  }

  return array.map((user) => ({
    ...user,
    estado: user?.estado === 'ACTIVO' ? 'Activo' : 'Inactivo',
    usuario: capitalize(user.usuario.toString()),
  }))
}
