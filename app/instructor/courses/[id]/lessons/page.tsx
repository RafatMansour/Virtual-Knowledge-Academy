import React from 'react'
import ManageLessonsClient from './ManageLessonsClient'

export default async function ManageLessonsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <ManageLessonsClient courseId={id} />
  )
}

