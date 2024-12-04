'use client'

import { useState } from 'react'
import { useGlobalContext } from '@/app/context/GlobalContext'

export default function StockPage() {
  const { inventory } = useGlobalContext()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const filteredVehicles = inventory.filter(vehicle => 
    vehicle.make.toLowerCase().includes(searchTerm) || 
    vehicle.model.toLowerCase().includes(searchTerm)
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Stock</h1>
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
          </div>
        ))}
      </div>
    </div>
  )
}

