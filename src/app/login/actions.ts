'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Validações básicas
  if (!data.email || !data.password) {
    redirect('/login?error=email_password_required')
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error)
    redirect('/login?error=invalid_credentials')
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  if (!data.email || !data.password) {
    redirect('/login?error=email_password_required')
  }

  if (data.password.length < 6) {
    redirect('/login?error=password_too_short')
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Signup error:', error)
    redirect('/login?error=signup_failed')
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error)
  }

  revalidatePath('/admin', 'layout')
  redirect('/login')
}

export async function generateExampleData(user_uid: string) {
  const supabase = createClient()
}