import { cookies } from 'next/headers'

export type User = {
  id: string
  name: string
  role: 'admin' | 'importer' | 'customs'
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', role: 'admin' },
  { id: '2', name: 'Importer User', role: 'importer' },
  { id: '3', name: 'Customs User', role: 'customs' },
]

export async function getUser(): Promise<User | null> {
  const userId = cookies().get('userId')?.value
  return MOCK_USERS.find(user => user.id === userId) || null
}

export async function login(userId: string): Promise<User | null> {
  const user = MOCK_USERS.find(user => user.id === userId)
  if (user) {
    cookies().set('userId', userId)
    return user
  }
  return null
}

export async function logout() {
  cookies().delete('userId')
}

