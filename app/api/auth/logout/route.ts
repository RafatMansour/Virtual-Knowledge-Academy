import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  try {
    const isProd = process.env.NODE_ENV === 'production'
    res.cookies.set('accessToken', '', { httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', maxAge: 0 })
    res.cookies.set('refreshToken', '', { httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', maxAge: 0 })
  } catch {}
  return res
}

