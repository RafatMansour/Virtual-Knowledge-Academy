import { createClient, SupabaseClient } from '@supabase/supabase-js'

type SupabaseClientRole = 'anon' | 'service'

function getSupabaseKeys(preferredRole: SupabaseClientRole = 'anon') {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) throw new Error('Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL')

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!anonKey) throw new Error('Missing SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY')

  const key = preferredRole === 'service' && serviceKey ? serviceKey : anonKey
  return { url, key, usedRole: preferredRole === 'service' && serviceKey ? 'service' : 'anon' as SupabaseClientRole }
}

export function getSupabaseServerClient(options?: { role?: SupabaseClientRole; accessToken?: string }): SupabaseClient {
  const { url, key } = getSupabaseKeys(options?.role || 'anon')
  const headers: Record<string, string> = {}
  if (options?.accessToken) headers['Authorization'] = `Bearer ${options.accessToken}`
  return createClient(url, key, { global: { headers } })
}

