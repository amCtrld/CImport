import { getUser } from '../lib/auth'
import { redirect } from 'next/navigation'

const MOCK_USERS = [
  { id: '1', name: 'Admin User', role: 'admin' },
  { id: '2', name: 'Importer User', role: 'importer' },
  { id: '3', name: 'Customs User', role: 'customs' },
]

export default async function AdminPage() {
  const user = await getUser()
  
  if (!user || user.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
      <h2 className="mb-2 text-xl">User Management</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_USERS.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

