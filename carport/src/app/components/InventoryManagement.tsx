'use client'

import { useState, useEffect } from 'react'

type Vehicle = {
  id: string
  make: string
  model: string
  year: number
  status: 'In Transit' | 'At Port' | 'Delivered'
}

export default function InventoryManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    // In a real application, this would be an API call
    setVehicles([
      { id: '1', make: 'Toyota', model: 'Camry', year: 2022, status: 'In Transit' },
      { id: '2', make: 'Honda', model: 'Civic', year: 2023, status: 'At Port' },
      { id: '3', make: 'Ford', model: 'F-150', year: 2021, status: 'Delivered' },
    ])
  }, [])

  return (
    <div className="mt-6 bg-white shadow p-4">
      <h2 className="mb-4 text-xl font-semibold">Inventory Management</h2>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Make</th>
            <th className="p-2 text-left">Model</th>
            <th className="p-2 text-left">Year</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="border-b">
              <td className="p-2">{vehicle.id}</td>
              <td className="p-2">{vehicle.make}</td>
              <td className="p-2">{vehicle.model}</td>
              <td className="p-2">{vehicle.year}</td>
              <td className="p-2">{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

