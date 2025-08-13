import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { verifyAccessToken } from '@/lib/auth'

function getBearerOrCookieToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || ''
  if (auth.startsWith('Bearer ')) return auth.slice(7)
  const cookie = req.cookies.get('accessToken')?.value
  return cookie || null
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('lessons')
    .select('id, course_id, title, content_type, content_url, order_index, duration_minutes')
    .eq('course_id', courseId)
    .order('order_index', { ascending: true })
  if (error) return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 })
  return NextResponse.json({ lessons: data })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const { courseId } = await params
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Authentication disabled - local use only')
    } else {
      const token = getBearerOrCookieToken(req) || ''
      const payload = verifyAccessToken(token)
      if (payload.role !== 'admin' && payload.role !== 'instructor') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }
    const { title, contentType, contentUrl, orderIndex, durationMinutes } = await req.json()
    const supabase = getSupabaseServerClient({ role: 'service' })
    const { data, error } = await supabase
      .from('lessons')
      .insert({
        course_id: courseId,
        title,
        content_type: contentType,
        content_url: contentUrl,
        order_index: orderIndex,
        duration_minutes: durationMinutes,
      })
      .select('id')
      .single()
    if (error) return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 })
    return NextResponse.json({ id: data.id })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

