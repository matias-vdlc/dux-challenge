import { GetServerSideProps } from 'next'
import { FC } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://staging.duxsoftware.com.ar/api/personal?sector=2000&_limit=10&_page=1',
  )
  const users = await res.json()

  return { props: { users } }
}

interface UsersPageProps {
  users: any[]
}

const UsersPage: FC<UsersPageProps> = ({ users }) => {
  console.log(users)
  return <div>{/* <UsersTable users={users} /> */}users</div>
}

export default UsersPage
