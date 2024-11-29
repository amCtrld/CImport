'use client'

import { useState, useEffect } from 'react'

type Shipment = {
  id: string
  status: 'Ordered' | 'In Transit' | 'At Customs' | 'Cleared'
  updatedAt: string
}

export default function ShipmentTracker() {
  const [shipments, setShipments] = useState<Shipment[]>([])

  useEffect(() => {
    // In a real application, this would be an API call
    setShipments([
      { id: '1', status: 'In Transit', updatedAt: new Date().toISOString() },
      { id: '2', status: 'At Customs', updatedAt: new Date().toISOString() },
      { id: '3', status: 'Cleared', updatedAt: new Date().toISOString() },
    ])
  }, [])

  return (
    <div className="mt-6 bg-white rounded-xl text-sm">
      <h2 className="mb-4 text-xl font-semibold selection:p-4">Shipment Tracker</h2>
      <ul className="space-y-2">
        {shipments.map((shipment) => (
          <li key={shipment.id} className="p-3 bg-white rounded shadow">
            <p>Shipment ID: {shipment.id}</p>
            <p>Status: {shipment.status}</p>
            <p>Last Updated: {new Date(shipment.updatedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

