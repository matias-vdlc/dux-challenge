export async function fetchUsers(sector: number, limit: number, page: number) {
  const res = await fetch(
    `https://staging.duxsoftware.com.ar/api/personal?sector=${sector}&_limit=${limit}&_page=${page}`,
  )
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  const data = await res.json()
  return data
}
