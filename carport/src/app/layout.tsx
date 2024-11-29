import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
        <div className="min-h-screen bg-gray-200">
        <header className="bg-black shadow">
  <div className="p-2 flex justify-center items-center">
    <h1 className="text-3xl font-bold text-white">
      <span>CAR</span>
      <span className='text-blue-500'>PORT</span>
    </h1>
    <p className="text-2xl text-white p-2">|</p>
    <p className="text-sm text-white p-2">Your Trusted Car Importer</p>
  </div>
</header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}

