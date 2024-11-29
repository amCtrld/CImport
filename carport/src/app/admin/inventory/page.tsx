'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Vehicle = {
  make: string
  model: string
  year: number
  mileage: number
  buyingPrice: number
  sellingPrice: number
}

export default function AdminInventory() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    setVehicles([
      {
        make: 'Mercedes',
        model: 'GLE Coupe 450',
        year: 2022,
        mileage: 40000,
        buyingPrice: 15562254,
        sellingPrice: 20000000
      }
    ])
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('userType')
    router.push('/')
  }

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send this data to an API
    setShowAddForm(false)
  }

  return (
    <div className="p-6">
      <nav className="mb-6 flex justify-between items-center">
      <div>
          <Link href="/admin/dashboard" className="mr-4 bg-blue-950 p-4 rounded-xl">Dashboard</Link>
          <Link href="/admin/inventory" className="mr-4 bg-blue-950 p-4 rounded-xl">Inventory</Link>
          <Link href="/admin/import" className="mr-4 bg-blue-950 p-4 rounded-xl">Import</Link>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Sign Out</button>
      </nav>
      <h1 className="mb-6 text-2xl font-bold text-black">Inventory</h1>
      <button 
        onClick={() => setShowAddForm(true)} 
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add To Inventory
      </button>
      {showAddForm && (
        <form onSubmit={handleAddVehicle} className="mb-6 p-4 bg-white rounded shadow text-black">
          <h2 className="mb-4 text-xl font-bold">Add Vehicle</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Make" className="p-2 border rounded" required />
            <input type="text" placeholder="Model" className="p-2 border rounded" required />
            <input type="number" placeholder="Year" className="p-2 border rounded" required />
            <input type="number" placeholder="Mileage" className="p-2 border rounded" required />
            <input type="number" placeholder="Buying Price" className="p-2 border rounded" required />
            <input type="number" placeholder="Selling Price" className="p-2 border rounded" required />
          </div>
          <textarea placeholder="Description" className="w-full mt-4 p-2 border rounded" required></textarea>
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Add Vehicle</button>
        </form>
      )}
      <table className="w-full text-black">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-2 text-left">Make</th>
            <th className="p-2 text-left">Model</th>
            <th className="p-2 text-left">Year</th>
            <th className="p-2 text-left">Mileage</th>
            <th className="p-2 text-left">Buying Price</th>
            <th className="p-2 text-left">Selling Price</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{vehicle.make}</td>
              <td className="p-2">{vehicle.model}</td>
              <td className="p-2">{vehicle.year}</td>
              <td className="p-2">{vehicle.mileage} KM</td>
              <td className="p-2">{vehicle.buyingPrice.toLocaleString()} KES</td>
              <td className="p-2">{vehicle.sellingPrice.toLocaleString()} KES</td>
              <td className="p-2">
                <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

