'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/GlobalContext'

export default function AdminNotifications() {
  const { notifications, setNotifications } = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    // Mark all notifications as read when the page is loaded
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }, [setNotifications])

  const handleLogout = () => {
    sessionStorage.removeItem('userType')
    router.push('/')
  }

  return (
    <div className="p-6">
      <nav className="mb-6 flex justify-between items-center">
        <div>
          <Link href="/admin/dashboard" className="mr-4">Dashboard</Link>
          <Link href="/admin/inventory" className="mr-4">Inventory</Link>
          <Link href="/admin/import" className="mr-4">Import</Link>
          <Link href="/admin/notifications" className="mr-4">Notifications</Link>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Sign Out</button>
      </nav>
      <h1 className="mb-6 text-2xl font-bold">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className={`p-4 rounded ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
            <p className="font-bold">{notification.type === 'enquiry' ? 'New Enquiry' : 'Customs Clearance'}</p>
            <p>{notification.message}</p>
            <p className="text-sm text-gray-500">{new Date(notification.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

