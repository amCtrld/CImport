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
  mileage: number
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
  shipmentDate: string
  arrivalDate: string
  image?: string
  buyingPrice: number
  sellingPrice: number
  commercialInvoice?: File
  billOfLading?: File
  inspectionCertificate?: File
}

export default function AdminImport() {
  const { shipments, setShipments, importData, setImportData } = useGlobalContext()
  const [formData, setFormData] = useState<ImportData>({
    vin: '',
    make: '',
    model: '',
    year: '',
    type: '',
    mileage: 0,
    countryOfOrigin: '',
    portOfEntry: '',
    shipperName: '',
    shipperAddress: '',
    importerKRA: '',
    importerName: '',
    importerLicense: '',
    importerAddress: '',
    customsValue: '',
    dutiesAndTaxes: '',
    shipmentDate: '',
    arrivalDate: '',
    buyingPrice: 0,
    sellingPrice: 0
  })
  const [image, setImage] = useState<File | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData({ 
      ...formData, 
      [name]: type === 'number' ? parseFloat(value) : value 
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let imageData = ''
    if (image) {
      imageData = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(image)
      })
    }
    const newShipment = {
      id: Date.now().toString(),
      vin: formData.vin,
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      mileage: formData.mileage,
      shipmentDate: formData.shipmentDate,
      arrivalDate: formData.arrivalDate,
      clearance: 'Pending',
      delivered: false,
      image: imageData,
      buyingPrice: formData.buyingPrice,
      sellingPrice: formData.sellingPrice
    }
    setShipments([...shipments, newShipment])
    setImportData([...importData, { ...formData, image: imageData }])
    
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
          <Link href="/admin/import" className="mr-4 bg-blue-600 p-2 text-white rounded-lg">Import</Link>
          <Link href="/admin/notifications" className="mr-4">Notifications</Link>
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
        <input type="number" name="mileage" placeholder="Mileage" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="buyingPrice" placeholder="Buying Price" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="sellingPrice" placeholder="Selling Price" onChange={handleChange} className="w-full p-2 border rounded" required />

        <h2 className="text-xl font-bold">Import Information</h2>
        <input type="text" name="countryOfOrigin" placeholder="Country of Origin" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="portOfEntry" placeholder="Port of Entry" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="shipmentDate" placeholder="Shipment Date" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="arrivalDate" placeholder="Arrival Date" onChange={handleChange} className="w-full p-2 border rounded" required />

        <h2 className="text-xl font-bold">Shipper's Information</h2>
        <input type="text" name="shipperName" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="shipperAddress" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded" required />

        <h2 className="text-xl font-bold">Importer's Information</h2>
        <input type="text" name="importerKRA" placeholder="KRA Pin" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="importerName" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="importerLicense" placeholder="Import License" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="importerAddress" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded" required />

        <h2 className="text-xl font-bold">Documents Upload</h2>
        <input type="file" name="commercialInvoice" onChange={handleDocumentChange} className="w-full p-2 border rounded" required />
        <input type="file" name="billOfLading" onChange={handleDocumentChange} className="w-full p-2 border rounded" required />
        <input type="file" name="inspectionCertificate" onChange={handleDocumentChange} className="w-full p-2 border rounded" required />

        <h2 className="text-xl font-bold">Vehicle Image</h2>
        <input type="file" name="vehicleImage" onChange={handleImageChange} accept="image/*" className="w-full p-2 border rounded" />

        <h2 className="text-xl font-bold">Customs Clearance</h2>
        <input type="number" name="customsValue" placeholder="Customs Value" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="dutiesAndTaxes" placeholder="Duties and Taxes" onChange={handleChange} className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">SUBMIT</button>
      </form>
    </div>
  )
}

