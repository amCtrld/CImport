'use client'

import { useState } from 'react'

export default function ComplianceCheck() {
  const [vin, setVin] = useState('')
  const [complianceStatus, setComplianceStatus] = useState<'Compliant' | 'Non-Compliant' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would be an API call to check compliance
    const status = Math.random() > 0.5 ? 'Compliant' : 'Non-Compliant'
    setComplianceStatus(status as 'Compliant' | 'Non-Compliant')
  }

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-semibold">Compliance Check</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="Enter Vehicle VIN"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Check Compliance
        </button>
      </form>
      {complianceStatus && (
        <div className={`mt-4 p-2 rounded ${complianceStatus === 'Compliant' ? 'bg-green-100' : 'bg-red-100'}`}>
          Status: {complianceStatus}
        </div>
      )}
    </div>
  )
}

