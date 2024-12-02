'use client'

// This is a simple in-memory store. In a real application, this would be replaced with a database.
let shipments: any[] = []
let inventory: any[] = []
let importData: any[] = []

export const dataStore = {
  getShipments: () => shipments,
  setShipments: (newShipments: any[]) => {
    shipments = newShipments
    sessionStorage.setItem('shipments', JSON.stringify(shipments))
  },
  getInventory: () => inventory,
  setInventory: (newInventory: any[]) => {
    inventory = newInventory
    sessionStorage.setItem('inventory', JSON.stringify(inventory))
  },
  getImportData: () => importData,
  setImportData: (newImportData: any[]) => {
    importData = newImportData
    sessionStorage.setItem('importData', JSON.stringify(importData))
  },
  // Initialize data from sessionStorage
  initializeFromSession: () => {
    shipments = JSON.parse(sessionStorage.getItem('shipments') || '[]')
    inventory = JSON.parse(sessionStorage.getItem('inventory') || '[]')
    importData = JSON.parse(sessionStorage.getItem('importData') || '[]')
  }
}

