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
      .from('progress')
      .select('id, user_id, lesson_id, is_completed, completed_at')
      .eq('user_id', payload.sub)
    if (error) return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
    return NextResponse.json({ progress: data })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getBearerOrCookieToken(req) || ''
    const payload = verifyAccessToken(token)
    const { lessonId, isCompleted } = await req.json()
    const supabase = getSupabaseServerClient({ role: 'service' })
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        user_id: payload.sub,
        lesson_id: lessonId,
        is_completed: !!isCompleted,
        completed_at: isCompleted ? new Date().toISOString() : null,
      }, { onConflict: 'user_id,lesson_id' })
      .select('id')
      .single()
    if (error) return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
    return NextResponse.json({ id: data.id })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

