import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center   
 bg-fixed bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bg2.jpg')", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <h1 className="text-6xl font-bold text-white">
          Welcome to CAR<span className="text-blue-600">PORT</span>
        </h1>
        <p className="mt-3 text-2xl">
          Your Trusted Car Importer
        </p>
        <div className="flex mt-6">
          <Link href="/login" className="mx-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Login
          </Link>
          <Link href="/signup" className="mx-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  )
}

