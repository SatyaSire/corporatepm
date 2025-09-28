'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  Linkedin, 
  Github, 
  Twitter, 
  Calendar, 
  Download, 
  ExternalLink,
  Clock,
  Globe,
  MessageSquare,
  MessageCircle,
  User,
  Building,
  Briefcase
} from 'lucide-react'

interface FormData {
  name: string
  email: string
  mobile: string
  company: string
  role: string
  message: string
  projectType: string
  timeline: string
  budget: string
}

interface ContactMethod {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  description: string
}

interface SocialLink {
  icon: React.ReactNode
  label: string
  href: string
  username: string
  followers?: string
}

const contactMethods: ContactMethod[] = [
  {
    icon: <Mail className="w-6 h-6" />,
    label: 'Email',
    value: 'hello@productmanager.dev',
    href: 'mailto:hello@productmanager.dev',
    description: 'Best for detailed project discussions'
  },
  {
    icon: <Phone className="w-6 h-6" />,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    description: 'Available Mon-Fri, 9AM-6PM PST'
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    label: 'Location',
    value: 'San Francisco, CA',
    href: 'https://maps.google.com/?q=San+Francisco,+CA',
    description: 'Open to remote collaboration worldwide'
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    label: 'Schedule Call',
    value: 'Book 30min chat',
    href: 'https://calendly.com/productmanager',
    description: 'Free consultation call'
  }
]

const socialLinks: SocialLink[] = [
  {
    icon: <Linkedin className="w-6 h-6" />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/productmanager',
    username: '@productmanager',
    followers: '12.5K'
  },
  {
    icon: <Github className="w-6 h-6" />,
    label: 'GitHub',
    href: 'https://github.com/productmanager',
    username: '@productmanager',
    followers: '2.8K'
  },
  {
    icon: <Twitter className="w-6 h-6" />,
    label: 'Twitter',
    href: 'https://twitter.com/productmanager',
    username: '@productmanager',
    followers: '8.2K'
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    label: 'Medium',
    href: 'https://medium.com/@productmanager',
    username: '@productmanager',
    followers: '5.1K'
  }
]

export default function ContactDetails() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    company: '',
    role: '',
    message: '',
    projectType: '',
    timeline: '',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitError, setSubmitError] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (submitError) {
      setSubmitError('')
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required'
    else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.mobile.replace(/[\s\-\(\)]/g, ''))) newErrors.mobile = 'Invalid mobile number format'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setIsSubmitting(false)
      setShowSuccessPopup(true)
      setSubmitError('')
      
      // Reset form after showing success popup
      setFormData({
        name: '',
        email: '',
        mobile: '',
        company: '',
        role: '',
        message: '',
        projectType: '',
        timeline: '',
        budget: ''
      })
      
      // Popup will stay visible until user clicks "Awesome!" button
      
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
      setSubmitError('Failed to submit form. Please try again or contact me directly via email.')
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gray-900 dark:text-white mb-4">
            Let's Build Something Amazing Together
          </h2>
          <p className="section-subtitle text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to transform your product vision into reality? I'd love to hear about your project and explore how we can collaborate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-slate-600/60 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 transition-all duration-300"
          >
            <h3 className="card-title text-gray-900 dark:text-white mb-6">
              Start a Conversation
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block caption-text text-gray-700 dark:text-gray-300 mb-2">
                      <User className="w-4 h-4 inline-block mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full px-4 py-3 rounded-lg border bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p id="name-error" className="text-red-500 caption-text mt-1" role="alert">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block caption-text text-gray-700 dark:text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline-block mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full px-4 py-3 rounded-lg border bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="john@company.com"
                    />
                    {errors.email && <p id="email-error" className="text-red-500 caption-text mt-1" role="alert">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="mobile" className="block caption-text text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline-block mr-2" />
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    aria-invalid={errors.mobile ? 'true' : 'false'}
                    aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.mobile ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.mobile && <p id="mobile-error" className="text-red-500 caption-text mt-1" role="alert">{errors.mobile}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block caption-text text-gray-700 dark:text-gray-300 mb-2">
                      <Building className="w-4 h-4 inline-block mr-2" />
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Acme Corp"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block caption-text text-gray-700 dark:text-gray-300 mb-2">
                      <Briefcase className="w-4 h-4 inline-block mr-2" />
                      Your Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="CEO, CTO, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block caption-text text-gray-700 dark:text-gray-300 mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      id="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="new-product">New Product</option>
                      <option value="product-improvement">Product Improvement</option>
                      <option value="strategy-consulting">Strategy Consulting</option>
                      <option value="team-coaching">Team Coaching</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="timeline" className="block caption-text text-gray-700 dark:text-gray-300 mb-2">
                      <Clock className="w-4 h-4 inline-block mr-2" />
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      id="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block caption-text text-gray-700 dark:text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      id="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select budget</option>
                      <option value="under-10k">Under $10K</option>
                      <option value="10k-25k">$10K - $25K</option>
                      <option value="25k-50k">$25K - $50K</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k-plus">$100K+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block caption-text text-gray-700 dark:text-gray-300 mb-2">
                    <MessageCircle className="w-4 h-4 inline-block mr-2" />
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Tell me about your project, goals, challenges, and how I can help..."
                  />
                  {errors.message && <p id="message-error" className="text-red-500 caption-text mt-1" role="alert">{errors.message}</p>}
                </div>

                {submitError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-600 dark:text-red-400 caption-text" role="alert">{submitError}</p>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
          </motion.div>
          
          {/* Success Popup Modal */}
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowSuccessPopup(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20 dark:border-slate-600/60"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    🎉 Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Thank you for reaching out! Your message has been received and I'll get back to you within 24 hours. 
                    Looking forward to discussing your project!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSuccessPopup(false)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Awesome! 👍
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="bg-white/70 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-slate-600/60 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20 transition-all duration-300">
              <h3 className="card-title text-gray-900 dark:text-white mb-6">
                Get In Touch
              </h3>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white/50 dark:bg-slate-700/70 backdrop-blur-sm border border-white/20 dark:border-slate-600/40 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 transition-all duration-200 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="body-text font-semibold text-gray-900 dark:text-white">{method.label}</h4>
                      <p className="body-text text-blue-600 dark:text-blue-400 font-medium">{method.value}</p>
                      <p className="caption-text text-gray-600 dark:text-gray-300">{method.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/70 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-slate-600/60 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 dark:hover:shadow-green-400/20 transition-all duration-300">
              <h3 className="card-title text-gray-900 dark:text-white mb-6">
                Connect & Follow
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-4 rounded-lg bg-white/50 dark:bg-slate-700/70 backdrop-blur-sm border border-white/20 dark:border-slate-600/40 hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20 transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-200">
                      {social.icon}
                    </div>
                    <h4 className="caption-text font-semibold text-gray-900 dark:text-white">{social.label}</h4>
                    <p className="caption-text text-gray-600 dark:text-gray-300">{social.username}</p>
                    {social.followers && (
                      <p className="caption-text text-blue-600 dark:text-blue-400 font-medium">{social.followers} followers</p>
                    )}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
              <h3 className="card-title text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h3>
              <div className="space-y-4">
                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5" />
                    <span className="font-medium">Download Resume</span>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
                
                <motion.a
                  href="https://calendly.com/productmanager"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Schedule Call</span>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}