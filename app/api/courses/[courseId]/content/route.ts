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
	const supabase = getSupabaseServerClient({ role: 'service' })
	const { data, error } = await supabase
		.from('educational_contents')
		.select('id, course_id, title, body_md, updated_at, created_at')
		.eq('course_id', courseId)
		.maybeSingle()
	if (error) return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
	return NextResponse.json({ content: data || null })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
	try {
		const { courseId } = await params
		if (process.env.NODE_ENV !== 'development') {
			const token = getBearerOrCookieToken(req) || ''
			const payload = verifyAccessToken(token)
			if (payload.role !== 'admin' && payload.role !== 'instructor') {
				return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
			}
		}

		const { title, bodyMd } = await req.json()
		const supabase = getSupabaseServerClient({ role: 'service' })
		const { data, error } = await supabase
			.from('educational_contents')
			.upsert({ course_id: courseId, title: title || 'Educational Content', body_md: bodyMd || '', updated_at: new Date().toISOString() }, { onConflict: 'course_id' })
			.select('id')
			.single()
		if (error) return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
		return NextResponse.json({ id: data.id })
	} catch {
		return NextResponse.json({ error: 'Bad request' }, { status: 400 })
	}
}


