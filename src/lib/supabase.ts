import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bW15LXByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NjA1NjAwMCwiZXhwIjoxOTYxNjMyMDAwfQ.dummy-anon-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Database types
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  mobile: string
  company?: string
  role?: string
  message: string
  project_type?: string
  timeline?: string
  budget?: string
  created_at?: string
  status?: 'new' | 'contacted' | 'closed'
}

// Submit contact form to Supabase (using admin client to bypass RLS)
export async function submitContactForm(formData: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert([
        {
          ...formData,
          status: 'new'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error('Failed to submit form')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Form submission error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Get all contact submissions (for admin use)
export async function getContactSubmissions() {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error('Failed to fetch submissions')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Fetch submissions error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}