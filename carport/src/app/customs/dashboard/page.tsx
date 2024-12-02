'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/GlobalContext'

type Vehicle = {
  id: string
  vin: string
  make: string
  model: string
  year: number
  status: string
}

export default function CustomsDashboard() {
  const { shipments, setShipments, importData } = useGlobalContext()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const router = useRouter()

  useEffect(() => {
    const combinedData = shipments.map(shipment => {
      const importInfo = importData.find(data => data.vin === shipment.vin)
      return {
        id: shipment.id,
        vin: shipment.vin,
        make: shipment.make,
        model: shipment.model,
        year: shipment.year,
        status: shipment.clearance
      }
    })
    setVehicles(combinedData)
  }, [shipments, importData])

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
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="border-b">
              <td className="p-2">{vehicle.vin}</td>
              <td className="p-2">{vehicle.make}</td>
              <td className="p-2">{vehicle.model}</td>
              <td className="p-2">{vehicle.year}</td>
              <td className="p-2">{vehicle.status}</td>
              <td className="p-2">
                {vehicle.status === 'Pending' && (
                  <button 
                    onClick={() => handleClearance(vehicle.id)}
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

