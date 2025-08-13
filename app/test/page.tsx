'use client'
import { getSupabaseBrowserClient } from '@/lib/supabaseClient'

export default function TestSupabase() {
  const testConnection = async () => {
    let client
    try {
      client = getSupabaseBrowserClient()
    } catch (e) {
      console.error('Supabase not configured', e)
      return
    }
    const { data, error } = await client
      .from('your_table')
      .select('*')
      .limit(1)
    
    console.log("نتيجة الاختبار:", data || error)
  }

  return (
    <button onClick={testConnection} className="bg-blue-500 text-white p-2 rounded">
      اختبار اتصال Supabase
    </button>
  )
}
