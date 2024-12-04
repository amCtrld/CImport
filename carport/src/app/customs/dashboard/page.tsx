'use client'

import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/GlobalContext'
import { useState } from 'react'

type Document = {
  name: string;
  verified: boolean;
}

type ShipmentWithDocs = {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  clearance: string;
  documents: Document[];
}

export default function CustomsDashboard() {
  const { shipments, setShipments } = useGlobalContext()
  const router = useRouter()
  const [shipmentsWithDocs, setShipmentsWithDocs] = useState<ShipmentWithDocs[]>(
    shipments.map(shipment => ({
      ...shipment,
      documents: [
        { name: 'Commercial Invoice', verified: false },
        { name: 'Bill of Lading', verified: false },
        { name: 'Inspection Certificate', verified: false },
      ]
    }))
  )

  const handleDocumentVerification = (shipmentId: string, docName: string) => {
    setShipmentsWithDocs(prevShipments => 
      prevShipments.map(shipment => 
        shipment.id === shipmentId
          ? {
              ...shipment,
              documents: shipment.documents.map(doc => 
                doc.name === docName ? { ...doc, verified: !doc.verified } : doc
              )
            }
          : shipment
      )
    )
  }

  const handleClearance = (id: string) => {
    const shipment = shipmentsWithDocs.find(s => s.id === id)
    if (shipment && shipment.documents.every(doc => doc.verified)) {
      const updatedShipments = shipments.map(s => 
        s.id === id ? { ...s, clearance: 'Cleared' } : s
      )
      setShipments(updatedShipments)
      setShipmentsWithDocs(prevShipments => 
        prevShipments.map(s => 
          s.id === id ? { ...s, clearance: 'Cleared' } : s
        )
      )
    } else {
      alert('All documents must be verified before clearing the shipment.')
    }
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
            <th className="p-2 text-left">Documents</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {shipmentsWithDocs.map((shipment) => (
            <tr key={shipment.id} className="border-b">
              <td className="p-2">{shipment.vin}</td>
              <td className="p-2">{shipment.make}</td>
              <td className="p-2">{shipment.model}</td>
              <td className="p-2">{shipment.year}</td>
              <td className="p-2">{shipment.mileage} KM</td>
              <td className="p-2">{shipment.clearance}</td>
              <td className="p-2">
                {shipment.documents.map((doc, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={doc.verified}
                      onChange={() => handleDocumentVerification(shipment.id, doc.name)}
                      className="mr-2"
                    />
                    <span>{doc.name}</span>
                  </div>
                ))}
              </td>
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

