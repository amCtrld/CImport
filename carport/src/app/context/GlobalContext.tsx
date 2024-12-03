'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Shipment = {
  id: string
  vin: string
  make: string
  model: string
  year: number
  mileage: number
  shipmentDate: string
  arrivalDate: string
  clearance: string
  delivered: boolean
  image?: string
  buyingPrice: number
  sellingPrice: number
}

type Vehicle = {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  buyingPrice: number
  sellingPrice: number
  image?: string
}

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
}

type Notification = {
  id: string
  type: 'enquiry' | 'clearance'
  message: string
  date: string
  read: boolean
}

type GlobalContextType = {
  shipments: Shipment[]
  setShipments: React.Dispatch<React.SetStateAction<Shipment[]>>
  inventory: Vehicle[]
  setInventory: React.Dispatch<React.SetStateAction<Vehicle[]>>
  importData: ImportData[]
  setImportData: React.Dispatch<React.SetStateAction<ImportData[]>>
  notifications: Notification[]
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [inventory, setInventory] = useState<Vehicle[]>([])
  const [importData, setImportData] = useState<ImportData[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Load data from localStorage on initial render
    const storedShipments = JSON.parse(localStorage.getItem('shipments') || '[]')
    const storedInventory = JSON.parse(localStorage.getItem('inventory') || '[]')
    const storedImportData = JSON.parse(localStorage.getItem('importData') || '[]')
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')

    setShipments(storedShipments)
    setInventory(storedInventory)
    setImportData(storedImportData)
    setNotifications(storedNotifications)
  }, [])

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem('shipments', JSON.stringify(shipments))
    localStorage.setItem('inventory', JSON.stringify(inventory))
    localStorage.setItem('importData', JSON.stringify(importData))
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [shipments, inventory, importData, notifications])

  return (
    <GlobalContext.Provider value={{ shipments, setShipments, inventory, setInventory, importData, setImportData, notifications, setNotifications }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return context
}

