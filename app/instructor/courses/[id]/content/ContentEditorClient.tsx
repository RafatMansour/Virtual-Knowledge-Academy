'use client'
import React, { useEffect, useState } from 'react'
import ImageUploadButton from '@/components/ImageUploadButton'

type Content = { id: string; course_id: string; title: string; body_md: string }

export default function ContentEditorClient({ courseId }: { courseId: string }) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('Educational Content')
  const [body, setBody] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`/api/courses/${courseId}/content`)
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'Failed to load content')
        const content: Content | null = data.content
        if (mounted && content) {
          setTitle(content.title || 'Educational Content')
          setBody(content.body_md || '')
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Unexpected error')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [courseId])

  const save = async () => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(`/api/courses/${courseId}/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, bodyMd: body }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to save content')
      setSuccess('تم الحفظ بنجاح')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unexpected error')
    } finally {
      setSaving(false)
    }
  }

  const insertImage = (url: string) => {
    const toInsert = `\n![](${url})\n`
    setBody(prev => prev + toInsert)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">المحتوى التعليمي</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <input className="border rounded w-full p-2" value={title} onChange={e => setTitle(e.target.value)} placeholder="العنوان" />
            <ImageUploadButton courseId={courseId} onUploaded={insertImage} label="رفع صورة" />
          </div>
          <textarea className="border rounded w-full p-2 min-h-[300px]" value={body} onChange={e => setBody(e.target.value)} placeholder="Markdown..." />
          <div className="flex items-center gap-3">
            <button onClick={save} disabled={saving} className="bg-[#aa7fff] text-white px-4 py-2 rounded">{saving ? '...' : 'حفظ'}</button>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
          </div>
        </>
      )}
    </div>
  )
}


