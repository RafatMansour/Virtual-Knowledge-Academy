import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { SignupSchema, hashPassword, signTokens } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = SignupSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 })
    }

    const { firstName, lastName, email, mobile, username, password } = parsed.data

    const supabase = getSupabaseServerClient({ role: 'service' })

    const { data: existingByEmail } = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${email},username.eq.${username}`)
      .maybeSingle()

    if (existingByEmail) {
      return NextResponse.json({ error: 'Email or username already exists' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)

    const { data: inserted, error: insertError } = await supabase
      .from('users')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        mobile,
        username,
        password_hash: passwordHash,
        role: 'student',
      })
      .select('id, role')
      .single()

    if (insertError || !inserted) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    const tokens = signTokens(inserted.id, inserted.role as 'student')
    const res = NextResponse.json({
      user: { id: inserted.id, role: inserted.role, firstName, lastName, email, mobile, username },
      tokens,
    })
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

