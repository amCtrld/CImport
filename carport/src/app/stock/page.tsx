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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  {filteredVehicles.map((vehicle) => (
    <div 
      key={vehicle.id} 
      className="relative p-6 rounded-xl 
        bg-white/70 backdrop-blur-lg 
        border border-gray-200/50 
        shadow-2xl 
        transform transition-all duration-300 
        hover:scale-105 hover:shadow-3xl"
    >
      {/* Gradient background overlay */}
      <div 
        className="absolute inset-0 
          bg-gradient-to-br 
          from-blue-50/30 
          to-blue-100/30 
          rounded-xl 
          opacity-70 
          pointer-events-none"
      />
      
      {/* Card content */}
      <div className="relative z-10">
        {vehicle.image && (
          <div className="relative mb-4">
            <img 
              src={vehicle.image} 
              alt={`${vehicle.make} ${vehicle.model}`} 
              className="w-full h-56 object-cover rounded-lg 
                shadow-md 
                transition-transform duration-300 
                group-hover:scale-105
                border-2 border-white/50"
            />
            <div 
              className="absolute inset-0 
                bg-gradient-to-t 
                from-black/20 
                to-transparent 
                rounded-lg 
                pointer-events-none"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold 
            text-gray-800 
            bg-clip-text 
            text-transparent 
            bg-gradient-to-r 
            from-blue-600 
            to-blue-400">
            {vehicle.make} {vehicle.model}
          </h2>
          
          <div className="text-gray-600 space-y-1">
            <p className="flex items-center">
              <span className="mr-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 15a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm-2-5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </span>
              Year: {vehicle.year}
            </p>
            <p className="flex items-center">
              <span className="mr-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </span>
              Mileage: {vehicle.mileage} KM
            </p>
            <p className="flex items-center">
              <span className="mr-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.833a2.165 2.165 0 01-.567-.266C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.799c.411.128.776.316 1.022.55C12.174 11.846 12 12.085 12 12c0-.112.104-.338.477-.571a1 1 0 00.296.81c.394.395 1.027.2 1.567 0a1 1 0 00.728-.707 2.21 2.21 0 01-.695-.704c-.237-.393-.108-.788.09-1.094a1 1 0 00-.553-1.507V9H13v.382a1 1 0 00-.553.832c-.017.264.04.524.188.738.116.168.277.31.467.411V12c0 .14-.097.402-.402.601a1 1 0 00-1.16-.124c-.527.313-1.063.996-1.438 1.48V12z" />
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 4c0-1.1.9-2 2-2h6a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2V8z" clipRule="evenodd" />
                </svg>
              </span>
              Price: {vehicle.sellingPrice.toLocaleString()} KES
            </p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  )
}

