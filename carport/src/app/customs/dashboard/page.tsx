'use client'

import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/GlobalContext'

export default function CustomsDashboard() {
  const { shipments, setShipments } = useGlobalContext()
  const router = useRouter()

  const handleClearance = (id: string) => {
    const updatedShipments = shipments.map(shipment => 
      shipment.id === id ? { ...shipment, clearance: 'Cleared' } : shipment
    )
    setShipments(updatedShipments)
  }

  const handleLogout = () => {
    localStorage.removeItem('userType')
    router.push('/')
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customs Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Log Out</button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">VIN</th>
            <th className="p-2 text-left">Make</th>
            <th className="p-2 text-left">Model</th>
            <th className="p-2 text-left">Year</th>
            <th className="p-2 text-left">Mileage</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border-b">
              <td className="p-2">{shipment.vin}</td>
              <td className="p-2">{shipment.make}</td>
              <td className="p-2">{shipment.model}</td>
              <td className="p-2">{shipment.year}</td>
              <td className="p-2">{shipment.mileage} KM</td>
              <td className="p-2">{shipment.clearance}</td>
              <td className="p-2">
                {shipment.clearance === 'Pending' && (
                  <button 
                    onClick={() => handleClearance(shipment.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Clear
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

