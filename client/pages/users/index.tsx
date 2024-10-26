import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { fetchUsers } from '../../api'
import { User } from '../../interface'
import { UsersTable } from '../../views'

export const getServerSideProps: GetServerSideProps = async () => {
  const users: User[] = await fetchUsers(2000, 10, 1)
  return { props: { users } }
}
interface UsersPageProps {
  users: User[]
}

const UsersPage: FC<UsersPageProps> = ({ users }) => {
  return <UsersTable users={users} />
}

export default UsersPage
