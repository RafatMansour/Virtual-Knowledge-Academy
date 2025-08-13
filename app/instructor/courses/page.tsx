'use client'
import React, { useState } from 'react'

export default function InstructorCoursesPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [level, setLevel] = useState<'foundation' | 'advanced' | 'workshop' | ''>('')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!title || !slug || !level) { setError('أكمل الحقول المطلوبة'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, description: desc, level, isMandatory: level === 'foundation' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'فشل إنشاء الدورة')
      setSuccess('تم إنشاء الدورة')
      setTitle(''); setSlug(''); setDesc(''); setLevel('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'خطأ غير متوقع')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">إدارة الدورات</h1>
      <form onSubmit={handleCreate} className="space-y-3">
        <input className="border rounded w-full p-2" placeholder="عنوان الدورة" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="border rounded w-full p-2" placeholder="المعرف (slug)" value={slug} onChange={e => setSlug(e.target.value)} />
        <select
          className="border rounded w-full p-2"
          value={level}
          onChange={e => setLevel((e.target.value as 'foundation' | 'advanced' | 'workshop' | ''))}
        >
          <option value="">المستوى</option>
          <option value="foundation">أساسي</option>
          <option value="advanced">متقدم</option>
          <option value="workshop">ورشة</option>
        </select>
        <textarea className="border rounded w-full p-2" placeholder="الوصف" value={desc} onChange={e => setDesc(e.target.value)} />
        <button disabled={loading} className="bg-[#aa7fff] text-white px-4 py-2 rounded">{loading ? '...' : 'إنشاء دورة'}</button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
      </form>
    </div>
  )
}

