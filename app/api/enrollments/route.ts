import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { verifyAccessToken } from '@/lib/auth'

function getBearerOrCookieToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || ''
  if (auth.startsWith('Bearer ')) return auth.slice(7)
  const cookie = req.cookies.get('accessToken')?.value
  return cookie || null
}

export async function GET(req: NextRequest) {
  try {
    const token = getBearerOrCookieToken(req) || ''
    const payload = verifyAccessToken(token)
    const supabase = getSupabaseServerClient({ role: 'service' })
    const { data, error } = await supabase
      .from('enrollments')
      .select('id, course_id, user_id, status, progress_percent, created_at, courses(title), users(username)')
      .eq('user_id', payload.sub)
    if (error) return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 })
    return NextResponse.json({ enrollments: data })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getBearerOrCookieToken(req) || ''
    const payload = verifyAccessToken(token)
    const { courseId } = await req.json()
    const supabase = getSupabaseServerClient({ role: 'service' })

    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', payload.sub)
      .eq('course_id', courseId)
      .maybeSingle()
    if (existing) return NextResponse.json({ id: existing.id, message: 'Already enrolled' })

    const { data, error } = await supabase
      .from('enrollments')
      .insert({ user_id: payload.sub, course_id: courseId, status: 'active', progress_percent: 0 })
      .select('id')
      .single()
    if (error) return NextResponse.json({ error: 'Failed to enroll' }, { status: 500 })
    return NextResponse.json({ id: data.id })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

