import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalProvider } from './context/GlobalContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CARPORT - Your Trusted Car Importer',
  description: 'Car Import Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">CARPORT</h1>
                <p className="text-sm text-gray-600">Your Trusted Car Importer</p>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </GlobalProvider>
      </body>
    </html>
  )
}

