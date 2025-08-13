'use client'
import React, { useRef, useState } from 'react'

type Props = {
  courseId: string
  onUploaded: (url: string) => void
  label?: string
}

export default function ImageUploadButton({ courseId, onUploaded, label }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const pick = () => inputRef.current?.click()

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setLoading(true)
    try {
      const form = new FormData()
      form.set('file', file)
      form.set('courseId', courseId)
      form.set('contentType', 'image')
      const res = await fetch('/api/uploads', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to upload image')
      onUploaded(data.url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button type="button" onClick={pick} disabled={loading} className="bg-[#aa7fff] text-white px-3 py-2 rounded">
        {loading ? 'Uploading...' : (label || 'Upload image')}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  )
}


