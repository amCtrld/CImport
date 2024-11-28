import { getUser } from '../lib/auth'
import { redirect } from 'next/navigation'
import ShipmentTracker from '../components/ShipmentTracker'
import DocumentUpload from '../components/DocumentUpload'
import InventoryManagement from '../components/InventoryManagement'
import ComplianceCheck from '../components/ComplianceCheck'

export default async function DashboardPage() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="mb-4">Role: {user.role}</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ShipmentTracker />
        <DocumentUpload />
        <InventoryManagement />
        <ComplianceCheck />
      </div>
    </div>
  )
}

