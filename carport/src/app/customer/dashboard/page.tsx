'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/GlobalContext'

export default function CustomerDashboard() {
  const { inventory, notifications, setNotifications } = useGlobalContext()
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const filteredVehicles = inventory.filter(vehicle => 
    vehicle.make.toLowerCase().includes(searchTerm) || 
    vehicle.model.toLowerCase().includes(searchTerm)
  )

  const handleEnquiry = (id: string) => {
    const vehicle = inventory.find(v => v.id === id)
    if (vehicle) {
      const newNotification = {
        id: Date.now().toString(),
        type: 'enquiry' as const,
        message: `Hello, I am interested in ${vehicle.make} ${vehicle.model}, I would like more details.`,
        date: new Date().toISOString(),
        read: false
      }
      setNotifications(prev => [...prev, newNotification])
      alert('Enquiry submitted successfully!')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userType')
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Log Out</button>
      </div>
      <input 
        type="text" 
        placeholder="Search by make or model" 
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="p-4 bg-white rounded shadow">
            {vehicle.image && (
              <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-48 object-cover mb-4" />
            )}
            <h2 className="text-xl font-bold">{vehicle.make} {vehicle.model}</h2>
            <p>Year: {vehicle.year}</p>
            <p>Mileage: {vehicle.mileage} KM</p>
            <p>Price: {vehicle.sellingPrice.toLocaleString()} KES</p>
            <button 
              onClick={() => handleEnquiry(vehicle.id)}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Submit Enquiry
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

