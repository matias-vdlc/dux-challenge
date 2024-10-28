export async function fetchUsers() {
  const res = await fetch(
    'https://staging.duxsoftware.com.ar/api/personal?sector=2000',
  )
  if (!res.ok) {
    console.log('Error pre-fetching')
    // TODO: handle pre-fetch error
  }
  const data = await res.json()
  return data
}
