'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/GlobalContext'

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  buyingPrice: number
  sellingPrice: number
  image?: string
}

export default function AdminInventory() {
  const { inventory, setInventory } = useGlobalContext()
  const [newVehicle, setNewVehicle] = useState<Omit<Vehicle, 'id'>>({
    make: '',
    model: '',
    year: 0,
    mileage: 0,
    buyingPrice: 0,
    sellingPrice: 0
  })
  const [image, setImage] = useState<File | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewVehicle({ ...newVehicle, [name]: name === 'year' || name === 'mileage' || name.includes('Price') ? parseInt(value) : value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault()
    let imageData = ''
    if (image) {
      imageData = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(image)
      })
    }
    const updatedVehicles = [
      ...inventory,
      { ...newVehicle, id: Date.now().toString(), image: imageData }
    ]
    setInventory(updatedVehicles)
    setShowAddForm(false)
    setNewVehicle({
      make: '',
      model: '',
      year: 0,
      mileage: 0,
      buyingPrice: 0,
      sellingPrice: 0
    })
    setImage(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('userType')
    router.push('/')
  }

  return (
    <div className="p-6">
      <nav className="mb-6 flex justify-between items-center">
        <div>
          <Link href="/admin/dashboard" className="mr-4">Dashboard</Link>
          <Link href="/admin/inventory" className="mr-4 bg-blue-600 p-2 text-white rounded-lg">Inventory</Link>
          <Link href="/admin/import" className="mr-4">Import</Link>
          <Link href="/admin/notifications" className="mr-4">Notifications</Link>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Sign Out</button>
      </nav>
      <h1 className="mb-6 text-2xl font-bold">Inventory</h1>
      <button 
        onClick={() => setShowAddForm(true)} 
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add To Inventory
      </button>
      {showAddForm && (
        <form onSubmit={handleAddVehicle} className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="mb-4 text-xl font-bold">Add Vehicle</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="make" placeholder="Make" value={newVehicle.make} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="text" name="model" placeholder="Model" value={newVehicle.model} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="number" name="year" placeholder="Year" value={newVehicle.year || ''} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="number" name="mileage" placeholder="Mileage" value={newVehicle.mileage || ''} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="number" name="buyingPrice" placeholder="Buying Price" value={newVehicle.buyingPrice || ''} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="number" name="sellingPrice" placeholder="Selling Price" value={newVehicle.sellingPrice || ''} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="file" name="vehicleImage" onChange={handleImageChange} accept="image/*" className="p-2 border rounded" />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Add Vehicle</button>
        </form>
      )}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Make</th>
            <th className="p-2 text-left">Model</th>
            <th className="p-2 text-left">Year</th>
            <th className="p-2 text-left">Mileage</th>
            <th className="p-2 text-left">Buying Price</th>
            <th className="p-2 text-left">Selling Price</th>
            <th className="p-2 text-left">Image</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((vehicle) => (
            <tr key={vehicle.id} className="border-b">
              <td className="p-2">{vehicle.make}</td>
              <td className="p-2">{vehicle.model}</td>
              <td className="p-2">{vehicle.year}</td>
              <td className="p-2">{vehicle.mileage} KM</td>
              <td className="p-2">{vehicle.buyingPrice.toLocaleString()} KES</td>
              <td className="p-2">{vehicle.sellingPrice.toLocaleString()} KES</td>
              <td className="p-2">
                {vehicle.image && (
                  <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="w-16 h-16 object-cover" />
                )}
              </td>
              <td className="p-2">
                <button className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

