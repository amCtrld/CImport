import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/bg.jpg" 
          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-50 filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[500px] w-full max-w-md mx-auto px-6 py-10">
  {/* Glassy background container */}
  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl"></div>
  
  {/* Content */}
  <div className="relative z-20 w-full text-center">
    <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
      Welcome to <span className="text-blue-300">CARPORT</span>
    </h1>
    <p className="text-xl text-white/90 drop-shadow-md mb-8">
      Your Trusted Car Importer
    </p>
    
    <div className="space-y-4 w-full">
      <Link href="/login" className="block w-full px-6 py-4 bg-blue-600/80 text-white text-lg font-semibold rounded-xl hover:bg-blue-700/90 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 backdrop-blur-sm">
        Login
      </Link>
      <Link href="/signup" className="block w-full px-6 py-4 bg-green-600/80 text-white text-lg font-semibold rounded-xl hover:bg-green-700/90 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 backdrop-blur-sm">
        Sign Up
      </Link>
      <Link href="/stock" className="block w-full px-6 py-4 bg-purple-600/80 text-white text-lg font-semibold rounded-xl hover:bg-purple-700/90 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 backdrop-blur-sm">
        View Stock
      </Link>
    </div>
  </div>
</main>
    </div>
  )
}