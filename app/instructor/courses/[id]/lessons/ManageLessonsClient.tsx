'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ManageLessonsClient({ courseId }: { courseId: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  type FormValues = { title: string; type: 'video' | 'pdf' | 'interactive' | ''; url: string; orderIndex: number; duration: number | '' ; file?: FileList }
  const { register, handleSubmit, reset, watch } = useForm<FormValues>()
  const selectedType = watch('type')

  const onSubmit = async (values: FormValues) => {
    setError('')
    setSuccess('')
    if (!values.title || !values.type) { setError('أكمل الحقول المطلوبة'); return }
    setLoading(true)
    try {
      let contentUrl = values.url?.trim()
      const file = values.file && values.file[0]
      if (file) {
        const form = new FormData()
        form.set('file', file)
        form.set('courseId', courseId)
        form.set('contentType', values.type)
        const uploadRes = await fetch('/api/uploads', { method: 'POST', body: form })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData?.error || 'فشل رفع الملف')
        contentUrl = uploadData.url
      }
      if (!contentUrl) { setError('الرجاء إدخال رابط صالح أو اختيار ملف'); return }

      const res = await fetch(`/api/courses/${courseId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: values.title, contentType: values.type, contentUrl, orderIndex: Number(values.orderIndex || 0), durationMinutes: Number(values.duration || 0) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'فشل إنشاء الدرس')
      setSuccess('تم إنشاء الدرس')
      reset({ title: '', type: '', url: '', orderIndex: 0, duration: '' as unknown as number, file: undefined })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'خطأ غير متوقع')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">إدارة الدروس</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="border rounded w-full p-2" placeholder="عنوان الدرس" {...register('title')} />
        <select className="border rounded w-full p-2" {...register('type')}>
          <option value="">النوع</option>
          <option value="video">فيديو</option>
          <option value="pdf">PDF</option>
          <option value="interactive">تفاعلي</option>
        </select>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">رابط خارجي</label>
            <input className="border rounded w-full p-2" placeholder="https://..." {...register('url')} />
          </div>
          <div>
            <label className="block text-sm mb-1">أو اختر ملف للرفع</label>
            <input className="border rounded w-full p-2" type="file" accept={selectedType === 'video' ? 'video/*' : selectedType === 'pdf' ? 'application/pdf' : '*/*'} {...register('file')} />
          </div>
        </div>
        <input className="border rounded w-full p-2" type="number" placeholder="ترتيب العرض" {...register('orderIndex', { valueAsNumber: true })} />
        <input className="border rounded w-full p-2" type="number" placeholder="المدة بالدقائق" {...register('duration', { valueAsNumber: true })} />
        <button disabled={loading} className="bg-[#aa7fff] text-white px-4 py-2 rounded">{loading ? '...' : 'إضافة الدرس'}</button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
      </form>
    </div>
  )
}

