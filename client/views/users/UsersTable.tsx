import { TableComponent } from '../../components/table'
import { User } from '../../interface'

export const UsersTable = ({ users }: { users: User[] }) => {
  return <TableComponent data={users} />
}
