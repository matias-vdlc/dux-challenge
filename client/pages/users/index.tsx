import { FC, Suspense, lazy } from 'react'
import { GetServerSideProps } from 'next'
import { fetchUsers } from '../../api'
import { User } from '../../interface'
import { SpinnerComponent } from '../../components/spinnerComponent'

export const getServerSideProps: GetServerSideProps = async () => {
  const users: User[] = await fetchUsers(2000, 10, 1)
  return { props: { users } }
}

const UsersTable = lazy(() =>
  import('../../views/users/UsersTable').then((module) => ({
    default: module.UsersTable,
  })),
)
interface UsersPageProps {
  users: User[]
}

const UsersPage: FC<UsersPageProps> = ({ users }) => {
  // TODO: add skeleton component
  return (
    <Suspense fallback={<SpinnerComponent />}>
      <UsersTable users={users} />
    </Suspense>
  )
}

export default UsersPage
