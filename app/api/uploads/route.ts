import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { verifyAccessToken } from '@/lib/auth'
import { randomUUID } from 'crypto'

function getBearerOrCookieToken(req: NextRequest): string | null {
	const auth = req.headers.get('authorization') || ''
	if (auth.startsWith('Bearer ')) return auth.slice(7)
	const cookie = req.cookies.get('accessToken')?.value
	return cookie || null
}

export async function POST(req: NextRequest) {
    try {
		if (process.env.NODE_ENV !== 'development') {
			const token = getBearerOrCookieToken(req) || ''
			const payload = verifyAccessToken(token)
			if (!(payload.role === 'admin' || payload.role === 'instructor')) {
				return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
			}
		}

		const form = await req.formData()
		const file = form.get('file') as File | null
		const courseId = String(form.get('courseId') || '')
		const contentType = String(form.get('contentType') || '') // 'video' | 'pdf' | 'interactive'
		const isPrivateParam = String(form.get('isPrivate') || '')
		const isPrivate = isPrivateParam ? isPrivateParam === 'true' : process.env.SUPABASE_STORAGE_PUBLIC !== 'true'
		if (!file || !courseId) {
			return NextResponse.json({ error: 'Missing file or courseId' }, { status: 400 })
		}

		const supabase = getSupabaseServerClient({ role: 'service' })
		const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'lesson-content'

		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		const sanitizedName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')
		const ext = sanitizedName.includes('.') ? sanitizedName.split('.').pop() : undefined
		const uid = randomUUID()
		const path = `courses/${courseId}/${contentType || 'file'}/${uid}.${ext || 'bin'}`

		const { error: uploadError } = await supabase
			.storage
			.from(bucket)
			.upload(path, buffer, { contentType: file.type || undefined, upsert: false })

		if (uploadError) {
			return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
		}

		if (isPrivate) {
			const { data: signed, error: signError } = await supabase
				.storage
				.from(bucket)
				.createSignedUrl(path, 60 * 60 * 24 * 7) // 7 days
			if (signError || !signed) return NextResponse.json({ error: 'Failed to sign URL' }, { status: 500 })
			return NextResponse.json({ url: signed.signedUrl, path, isPrivate: true })
		} else {
			const { data: publicData } = supabase
				.storage
				.from(bucket)
				.getPublicUrl(path)
			return NextResponse.json({ url: publicData.publicUrl, path, isPrivate: false })
		}
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}


