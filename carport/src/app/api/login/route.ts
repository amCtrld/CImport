import { login } from '@/app/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userId } = await request.json()
  const user = await login(userId)
  if (user) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}

