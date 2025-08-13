import React from 'react'
import ContentEditorClient from './ContentEditorClient'

export default async function CourseContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ContentEditorClient courseId={id} />
}


