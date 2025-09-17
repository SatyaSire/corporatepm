import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  company?: string
  role?: string
  message: string
  project_type?: string
  timeline?: string
  budget?: string
  created_at?: string
  status?: 'new' | 'contacted' | 'closed'
}

// Submit contact form to Supabase
export async function submitContactForm(formData: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) {
  try {
    const { data, error } = await supabase
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