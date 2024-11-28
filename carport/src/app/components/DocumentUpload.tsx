'use client'

import { useState } from 'react'

export default function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    // In a real application, this would be an API call to upload the file
    console.log('Uploading file:', file.name)
    // Reset the file input
    setFile(null)
    alert('File uploaded successfully!')
  }

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-semibold">Document Upload</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={!file}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          Upload Document
        </button>
      </form>
    </div>
  )
}

