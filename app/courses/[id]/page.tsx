import React from 'react'
import Protected from '@/components/Protected'

type Lesson = {
  id: string
  course_id: string
  title: string
  content_type: 'video' | 'pdf' | 'interactive'
  content_url: string
  order_index: number
  duration_minutes: number | null
}

async function getLessons(courseId: string): Promise<{ lessons: Lesson[] }> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/courses/${courseId}/lessons`, { cache: 'no-store' })
  if (!res.ok) return { lessons: [] }
  return res.json()
}

async function markComplete(lessonId: string) {
  'use server'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  await fetch(`${baseUrl}/api/progress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lessonId, isCompleted: true }),
  })
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { lessons } = await getLessons(id)
  return (
    <Protected>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">الدروس</h1>
        <ul className="space-y-3">
          {lessons?.map((l: Lesson) => (
            <li key={l.id} className="border rounded p-3">
              <div className="font-semibold mb-2">{l.title}</div>
              <div className="text-sm text-gray-600 mb-3">{l.content_type} • {l.duration_minutes || 0} دقيقة</div>
              {l.content_type === 'video' && (
                <div className="w-full mb-3 aspect-video">
                  {/youtu(be)?/.test(l.content_url) ? (
                    <iframe className="w-full h-full" src={l.content_url.replace('watch?v=', 'embed/')} allowFullScreen />
                  ) : /vimeo/.test(l.content_url) ? (
                    <iframe className="w-full h-full" src={l.content_url.replace('vimeo.com', 'player.vimeo.com/video')} allowFullScreen />
                  ) : (
                    <video controls className="w-full h-full" src={l.content_url} />
                  )}
                </div>
              )}
              {l.content_type === 'pdf' && (
                <div className="mb-3">
                  <object data={l.content_url} type="application/pdf" className="w-full h-[600px]">
                    <a className="text-[#aa7fff] underline" href={l.content_url} target="_blank">فتح الملف</a>
                  </object>
                </div>
              )}
              {l.content_type === 'interactive' && (
                <a className="text-[#aa7fff]" href={l.content_url} target="_blank">فتح المحتوى</a>
              )}
              <form action={async () => { 'use server'; await markComplete(l.id) }}>
                <button className="mt-3 text-sm bg-[#aa7fff] text-white px-3 py-2 rounded">وضع علامة مكتمل</button>
              </form>
            </li>
          ))}
          {!lessons?.length && <li className="text-gray-500">لا يوجد دروس</li>}
        </ul>
      </div>
    </Protected>
  )
}

