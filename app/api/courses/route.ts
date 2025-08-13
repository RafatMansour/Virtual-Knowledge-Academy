import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { verifyAccessToken } from '@/lib/auth'
// removed duplicate NextRequest import

function getBearerOrCookieToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || ''
  if (auth.startsWith('Bearer ')) return auth.slice(7)
  const cookie = req.cookies.get('accessToken')?.value
  return cookie || null
}

export async function GET() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('courses')
    .select('id, title, slug, description, level, is_mandatory, created_at')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  return NextResponse.json({ courses: data })
}

export async function POST(req: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Authentication disabled - local use only')
    } else {
      const token = getBearerOrCookieToken(req) || ''
      const payload = verifyAccessToken(token)
      if (payload.role !== 'admin' && payload.role !== 'instructor') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    const { title, slug, description, level, isMandatory } = await req.json()
    const supabase = getSupabaseServerClient({ role: 'service' })
    const { data, error } = await supabase
      .from('courses')
      .insert({ title, slug, description, level, is_mandatory: !!isMandatory })
      .select('id')
      .single()
    if (error) return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
    return NextResponse.json({ id: data.id })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

