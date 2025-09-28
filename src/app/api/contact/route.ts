import { NextRequest, NextResponse } from 'next/server'
import { submitContactForm, ContactSubmission } from '@/lib/supabase'

// Email service (you can replace this with your preferred email service)
async function sendEmailNotification(formData: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) {
  // For now, we'll log the email content
  // You can integrate with services like Resend, SendGrid, or Nodemailer
  console.log('📧 New Contact Form Submission:')
  console.log('Name:', formData.name)
  console.log('Email:', formData.email)
  console.log('Mobile:', formData.mobile)
  console.log('Company:', formData.company)
  console.log('Role:', formData.role)
  console.log('Project Type:', formData.project_type)
  console.log('Timeline:', formData.timeline)
  console.log('Budget:', formData.budget)
  console.log('Message:', formData.message)
  console.log('Timestamp:', new Date().toISOString())
  
  // TODO: Implement actual email sending
  // Example with Resend:
  /*
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.EMAIL_TO!,
    subject: `New Contact Form Submission from ${formData.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
      <p><strong>Role:</strong> ${formData.role || 'Not provided'}</p>
      <p><strong>Project Type:</strong> ${formData.project_type || 'Not specified'}</p>
      <p><strong>Timeline:</strong> ${formData.timeline || 'Not specified'}</p>
      <p><strong>Budget:</strong> ${formData.budget || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `
  })
  */
}

// WhatsApp notification (optional)
async function sendWhatsAppNotification(formData: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) {
  // For now, we'll log the WhatsApp notification
  console.log('📱 WhatsApp Notification: New contact form submission from', formData.name)
  
  // TODO: Implement WhatsApp Business API integration
  // You would need to set up WhatsApp Business API and use their messaging endpoint
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.mobile || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, mobile, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Prepare form data
    const formData: Omit<ContactSubmission, 'id' | 'created_at' | 'status'> = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      mobile: body.mobile.trim(),
      company: body.company?.trim() || null,
      role: body.role?.trim() || null,
      message: body.message.trim(),
      project_type: body.projectType || null,
      timeline: body.timeline || null,
      budget: body.budget || null
    }

    // Submit to Supabase
    const result = await submitContactForm(formData)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 500 }
      )
    }

    // Send notifications
    try {
      await sendEmailNotification(formData)
      await sendWhatsAppNotification(formData)
    } catch (notificationError) {
      console.error('Notification error:', notificationError)
      // Don't fail the request if notifications fail
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully! I\'ll get back to you within 24 hours.',
        id: result.data?.[0]?.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form API error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve submissions (for admin use)
export async function GET(request: NextRequest) {
  // This would be for admin use only - you might want to add authentication
  const { searchParams } = new URL(request.url)
  const adminKey = searchParams.get('admin_key')
  
  // Simple admin key check (in production, use proper authentication)
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { getContactSubmissions } = await import('@/lib/supabase')
    const result = await getContactSubmissions()
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      )
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('Get submissions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}