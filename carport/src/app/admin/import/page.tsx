'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/GlobalContext'

type ImportData = {
  vin: string
  make: string
  model: string
  year: string
  type: string
  countryOfOrigin: string
  portOfEntry: string
  shipperName: string
  shipperAddress: string
  importerKRA: string
  importerName: string
  importerLicense: string
  importerAddress: string
  customsValue: string
  dutiesAndTaxes: string
}

export default function AdminImport() {
  const { shipments, setShipments, importData, setImportData } = useGlobalContext()
  const [formData, setFormData] = useState<ImportData>({
    vin: '',
    make: '',
    model: '',
    year: '',
    type: '',
    countryOfOrigin: '',
    portOfEntry: '',
    shipperName: '',
    shipperAddress: '',
    importerKRA: '',
    importerName: '',
    importerLicense: '',
    importerAddress: '',
    customsValue: '',
    dutiesAndTaxes: ''
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newShipment = {
      id: Date.now().toString(),
      vin: formData.vin,
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      mileage: 0,
      shipmentDate: new Date().toISOString().split('T')[0],
      arrivalDate: '',
      clearance: 'Pending'
    }
    setShipments([...shipments, newShipment])
    setImportData([...importData, formData])
    
    alert('Import data submitted successfully!')
    router.push('/admin/dashboard')
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
          <Link href="/admin/inventory" className="mr-4">Inventory</Link>
          <Link href="/admin/import" className="mr-4">Import</Link>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Sign Out</button>
      </nav>
      <h1 className="mb-6 text-2xl font-bold">Import Vehicle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">Vehicle Information</h2>
        <input type="text" name="vin" placeholder="VIN" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="make" placeholder="Make" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="model" placeholder="Model" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="year" placeholder="Year" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="type" placeholder="Type" onChange={handleChange} className="w-full p-2 border rounded" required />

        <h2 className="text-xl font-bold">Import Information</h2>
        <input type="text" name="countryOfOrigin" placeholder="Country of Origin" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="portOfEntry" placeholder="Port of Entry" onChange={handleChange} className="w-full p-2 border rounded" required />

        <h2 className="text-xl font-bold">Shipper's Information</h2>
        <input type="text" name="shipperName" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="shipperAddress" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded" required />

        <h2 className="text-xl font-bold">Importer's Information</h2>
        <input type="text" name="importerKRA" placeholder="KRA Pin" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="importerName" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="importerLicense" placeholder="Import License" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="importerAddress" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded" required />

        <h2 className="text-xl font-bold">Documents Upload</h2>
        <input type="file" name="commercialInvoice" className="w-full p-2 border rounded" required />
        <input type="file" name="billOfLading" className="w-full p-2 border rounded" required />
        <input type="file" name="inspectionCertificate" className="w-full p-2 border rounded" required />

        <h2 className="text-xl font-bold">Customs Clearance</h2>
        <input type="number" name="customsValue" placeholder="Customs Value" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="dutiesAndTaxes" placeholder="Duties and Taxes" onChange={handleChange} className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">SUBMIT</button>
      </form>
    </div>
  )
}

