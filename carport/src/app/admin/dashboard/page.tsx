'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/GlobalContext'

export default function AdminDashboard() {
  const { shipments, inventory } = useGlobalContext()
  const [activeShipments, setActiveShipments] = useState(0)
  const [pendingClearances, setPendingClearances] = useState(0)
  const [inStock, setInStock] = useState(0)
  const router = useRouter()

  useEffect(() => {
    setActiveShipments(shipments.length)
    setPendingClearances(shipments.filter(s => s.clearance === 'Pending').length)
    setInStock(inventory.length)
  }, [shipments, inventory])

  const handleLogout = () => {
    localStorage.removeItem('userType')
    router.push('/')
  }

  return (
    <div className="p-6">
      <nav className="mb-6 flex justify-between items-center">
        <div>
          <Link href="/admin/dashboard" className="mr-4">Dashboard</Link>
          <Link href="/admin/inventory" className="mr-4">Inventory</Link>
          <Link href="/admin/import" className="mr-4">Import</Link>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Sign Out</button>
      </nav>
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-bold">Active Shipments</h2>
          <p className="text-2xl">{activeShipments}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-bold">Pending Clearances</h2>
          <p className="text-2xl">{pendingClearances}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-bold">In Stock</h2>
          <p className="text-2xl">{inStock}</p>
        </div>
      </div>
      <h2 className="mb-4 text-xl font-bold">Shipment Summary</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Make</th>
            <th className="p-2 text-left">Model</th>
            <th className="p-2 text-left">Year</th>
            <th className="p-2 text-left">Mileage</th>
            <th className="p-2 text-left">Shipment Date</th>
            <th className="p-2 text-left">Arrival Date</th>
            <th className="p-2 text-left">Clearance</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border-b">
              <td className="p-2">{shipment.make}</td>
              <td className="p-2">{shipment.model}</td>
              <td className="p-2">{shipment.year}</td>
              <td className="p-2">{shipment.mileage} KM</td>
              <td className="p-2">{shipment.shipmentDate}</td>
              <td className="p-2">{shipment.arrivalDate}</td>
              <td className="p-2">{shipment.clearance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

