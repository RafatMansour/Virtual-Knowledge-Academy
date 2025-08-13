import { NextRequest, NextResponse } from 'next/server'
import { verifyRefreshToken, signTokens } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { refresh } = await req.json()
    if (!refresh) return NextResponse.json({ error: 'Missing refresh token' }, { status: 400 })
    const payload = verifyRefreshToken(refresh)
    const tokens = signTokens(payload.sub, payload.role)
    return NextResponse.json({ tokens })
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}

