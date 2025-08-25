import { createClient } from '@/lib/supabase/server'
import { type User } from '@supabase/supabase-js'

export async function getUser(): Promise<User | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function signOut(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
}