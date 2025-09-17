# Supabase Backend Setup Guide

This guide will help you set up Supabase for your contact form submissions with email and WhatsApp notifications.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be set up (usually takes 2-3 minutes)

## 2. Create Database Table

In your Supabase dashboard, go to the SQL Editor and run this query to create the contact submissions table:

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  message TEXT NOT NULL,
  project_type TEXT,
  timeline TEXT,
  budget TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for the contact form)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users only (for admin)
CREATE POLICY "Allow authenticated reads" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);
```

## 3. Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon (public) key
   - Service role key (keep this secret!)

## 4. Update Environment Variables

Update your `.env.local` file with your actual Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Email Configuration
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your-email@example.com

# Admin key for viewing submissions (set any secure random string)
ADMIN_KEY=your-secure-admin-key-here

# WhatsApp Configuration (optional)
WHATSAPP_PHONE_NUMBER=your_whatsapp_number
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
```

## 5. Set Up Email Notifications (Optional)

To receive email notifications when someone submits the contact form:

### Option A: Using Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Install Resend: `npm install resend`
4. Add to `.env.local`: `RESEND_API_KEY=your-resend-api-key`
5. Uncomment the Resend code in `/src/app/api/contact/route.ts`

### Option B: Using SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Install SendGrid: `npm install @sendgrid/mail`
4. Update the email function in the API route

### Option C: Using Nodemailer (SMTP)

1. Install Nodemailer: `npm install nodemailer`
2. Configure with your SMTP settings
3. Update the email function in the API route

## 6. Set Up WhatsApp Notifications (Optional)

To receive WhatsApp notifications:

1. Set up WhatsApp Business API account
2. Get your access token and phone number ID
3. Update the WhatsApp function in `/src/app/api/contact/route.ts`

## 7. Test Your Setup

1. Start your development server: `npm run dev`
2. Go to the contact section of your website
3. Fill out and submit the form
4. Check your Supabase dashboard to see if the submission was recorded
5. Check your email/WhatsApp for notifications

## 8. View Submissions (Admin)

To view all form submissions, you can:

1. **Via Supabase Dashboard**: Go to your Supabase project > Table Editor > contact_submissions
2. **Via API**: Make a GET request to `/api/contact?admin_key=your-admin-key`
3. **Create an Admin Panel**: Build a simple admin interface to view and manage submissions

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your service role key secret
- Use Row Level Security (RLS) policies in Supabase
- Consider adding rate limiting to prevent spam
- Validate and sanitize all form inputs

## Troubleshooting

### Common Issues:

1. **"Failed to submit form"**: Check your Supabase URL and keys
2. **CORS errors**: Make sure your domain is added to Supabase allowed origins
3. **RLS errors**: Ensure your policies are set up correctly
4. **Email not sending**: Check your email service configuration and API keys

### Debug Steps:

1. Check browser console for errors
2. Check Supabase logs in the dashboard
3. Check your server logs for API errors
4. Test the API endpoint directly with a tool like Postman

## Next Steps

- Set up email templates for better formatting
- Add spam protection (reCAPTCHA)
- Create an admin dashboard for managing submissions
- Set up automated follow-up emails
- Add analytics to track form conversion rates

Need help? Check the [Supabase documentation](https://supabase.com/docs) or reach out for support!