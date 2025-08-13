import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { LoginSchema, verifyPassword, signTokens } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = LoginSchema.safeParse({
      usernameOrEmail: body.username || body.usernameOrEmail || body.email,
      password: body.password,
    })
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }
    const { usernameOrEmail, password } = parsed.data
    const supabase = getSupabaseServerClient({ role: 'service' })
    const { data: user } = await supabase
      .from('users')
      .select('id, role, password_hash, first_name, last_name, email, mobile, username')
      .or(`email.eq.${usernameOrEmail},username.eq.${usernameOrEmail}`)
      .maybeSingle()

    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const tokens = signTokens(user.id, user.role)
    const profile = {
      id: user.id,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      mobile: user.mobile,
      username: user.username,
    }
    const res = NextResponse.json({ user: profile, tokens })
    try {
      const isProd = process.env.NODE_ENV === 'production'
      res.cookies.set('accessToken', tokens.access, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: tokens.accessTokenTtlSeconds,
      })
      res.cookies.set('refreshToken', tokens.refresh, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: tokens.refreshTokenTtlSeconds,
      })
    } catch {}
    return res
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

