const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
