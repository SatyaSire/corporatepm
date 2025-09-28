'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Award, Code, Users, Lightbulb, Target, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

interface TimelineEvent {
  id: string
  year: string
  title: string
  company: string
  location: string
  type: 'work' | 'education' | 'achievement'
  description: string
  highlights: string[]
  skills: string[]
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'current',
    year: '2023 - Present',
    title: 'Senior Product Manager',
    company: 'TechVision AI',
    location: 'San Francisco, CA',
    type: 'work',
    description: 'Leading AI-powered product initiatives for enterprise clients, managing $12M+ product portfolio with focus on machine learning integration and user experience optimization.',
    highlights: [
      'Launched 3 AI-powered features resulting in 45% increase in user engagement',
      'Led cross-functional team of 15+ engineers, designers, and data scientists',
      'Established product analytics framework reducing decision-making time by 60%',
      'Mentored 4 junior PMs and established PM best practices across organization'
    ],
    skills: ['AI/ML Product Strategy', 'Team Leadership', 'Data Analytics', 'Stakeholder Management']
  },
  {
    id: 'techbank',
    year: '2021 - 2023',
    title: 'Product Manager',
    company: 'TechBank Solutions',
    location: 'New York, NY',
    type: 'work',
    description: 'Drove digital transformation of traditional banking products, focusing on mobile-first experiences and fintech innovation.',
    highlights: [
      'Redesigned mobile banking app from 2.1★ to 4.8★ rating',
      'Increased user retention by 340% through UX improvements',
      'Managed $8M product budget and delivered 12 major features on time',
      'Established agile processes reducing development cycles by 40%'
    ],
    skills: ['Mobile Product Development', 'FinTech', 'User Research', 'Agile Methodology']
  },
  {
    id: 'retailtech',
    year: '2019 - 2021',
    title: 'Associate Product Manager',
    company: 'RetailTech Inc',
    location: 'Austin, TX',
    type: 'work',
    description: 'Built personalization engine for e-commerce platform serving 2M+ monthly active users.',
    highlights: [
      'Developed ML-powered recommendation system increasing conversion by 285%',
      'Collaborated with data science team to implement A/B testing framework',
      'Launched personalized email campaigns improving click-through rates by 67%',
      'Conducted 50+ user interviews to validate product-market fit'
    ],
    skills: ['E-commerce', 'Machine Learning', 'A/B Testing', 'Customer Analytics']
  },
  {
    id: 'mba',
    year: '2017 - 2019',
    title: 'MBA in Technology Management',
    company: 'Stanford Graduate School of Business',
    location: 'Stanford, CA',
    type: 'education',
    description: 'Focused on technology strategy, product management, and entrepreneurship. Led student consulting projects for Fortune 500 companies.',
    highlights: [
      'Graduated Magna Cum Laude with 3.8 GPA',
      'Led consulting project for Tesla on supply chain optimization',
      'Founded Stanford PM Club with 200+ members',
      'Completed summer internship at Google Product Management'
    ],
    skills: ['Strategic Planning', 'Business Development', 'Leadership', 'Consulting']
  },
  {
    id: 'startup',
    year: '2015 - 2017',
    title: 'Co-Founder & CTO',
    company: 'EduTech Startup',
    location: 'Boston, MA',
    type: 'work',
    description: 'Co-founded EdTech startup focused on personalized learning platforms for K-12 students.',
    highlights: [
      'Built MVP serving 5,000+ students across 12 school districts',
      'Raised $500K seed funding from angel investors',
      'Led technical team of 6 developers and designers',
      'Achieved 89% student engagement rate and 34% learning improvement'
    ],
    skills: ['Entrepreneurship', 'Full-Stack Development', 'Fundraising', 'Team Building']
  },
  {
    id: 'engineering',
    year: '2013 - 2015',
    title: 'Software Engineer',
    company: 'Microsoft',
    location: 'Seattle, WA',
    type: 'work',
    description: 'Developed cloud infrastructure solutions for Azure platform, focusing on scalability and performance optimization.',
    highlights: [
      'Contributed to Azure Storage service handling 100M+ requests daily',
      'Optimized database queries reducing response time by 45%',
      'Mentored 3 junior engineers and led code review processes',
      'Received "Outstanding Contributor" award for performance improvements'
    ],
    skills: ['Cloud Computing', 'Distributed Systems', 'Performance Optimization', 'Mentoring']
  },
  {
    id: 'degree',
    year: '2009 - 2013',
    title: 'BS Computer Science',
    company: 'MIT',
    location: 'Cambridge, MA',
    type: 'education',
    description: 'Specialized in artificial intelligence and human-computer interaction. Active in robotics club and hackathons.',
    highlights: [
      'Graduated Summa Cum Laude with 3.9 GPA',
      'Published 2 research papers on machine learning algorithms',
      'Won 1st place in MIT Hackathon for AI-powered study assistant',
      'Teaching Assistant for Introduction to Algorithms course'
    ],
    skills: ['Computer Science', 'Artificial Intelligence', 'Research', 'Teaching']
  }
]

const skillsData = [
  { skill: 'Product Strategy', current: 95, target: 100 },
  { skill: 'User Research', current: 90, target: 95 },
  { skill: 'Data Analysis', current: 85, target: 90 },
  { skill: 'Technical Leadership', current: 88, target: 92 },
  { skill: 'Stakeholder Management', current: 92, target: 95 },
  { skill: 'AI/ML Understanding', current: 80, target: 90 },
  { skill: 'Design Thinking', current: 85, target: 88 },
  { skill: 'Agile Methodology', current: 90, target: 93 }
]

const typeIcons = {
  work: Target,
  education: Award,
  achievement: TrendingUp
}

const typeColors = {
  work: 'bg-blue-500',
  education: 'bg-green-500',
  achievement: 'bg-purple-500'
}

export default function AboutTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-indigo-900/10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gray-900 dark:text-white mb-6">
            My Journey
          </h2>
          <p className="section-subtitle text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From engineering to product leadership - a decade of building products that matter, 
            leading teams, and driving innovation across multiple industries.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Timeline */}
          <div className="w-full">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700">
                <motion.div
                  className="w-full bg-gradient-to-b from-blue-500 to-indigo-500 origin-top"
                  style={{ scaleY: timelineProgress.get() / 100 }}
                />
              </div>

              {/* Timeline Events */}
              <div className="space-y-12">
                {timelineEvents.map((event, index) => {
                  const Icon = typeIcons[event.type]
                  const isInView = useInView(useRef(null), { once: true, margin: '-100px' })
                  
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative flex items-start gap-6"
                    >
                      {/* Timeline Dot */}
                      <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${typeColors[event.type]} shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content Card */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        role="button"
                        tabIndex={0}
                        aria-expanded={selectedEvent === event.id}
                        aria-label={`View details for ${event.title} at ${event.company}`}
                        className={`relative flex-1 bg-white/80 dark:bg-gray-800/80 md:backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          selectedEvent === event.id ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-xl'
                        }`}
                        onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setSelectedEvent(selectedEvent === event.id ? null : event.id)
                          }
                        }}
                      >
                        {/* Click Me Indicator */}
                        <AnimatePresence>
                          {selectedEvent !== event.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                              className="absolute -top-3 -left-2 z-10 transform -rotate-12"
                            >
                              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-md shadow-lg animate-pulse">
                                <span className="text-xs font-bold whitespace-nowrap">Click Me</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              <span className="caption-text font-medium text-blue-600 dark:text-blue-400">
                                {event.year}
                              </span>
                            </div>
                            <h3 className="card-title text-gray-900 dark:text-white mb-1">
                              {event.title}
                            </h3>
                            <p className="body-text text-gray-700 dark:text-gray-300 mb-2">
                              {event.company}
                            </p>
                            <div className="flex items-center gap-1 caption-text text-gray-500 dark:text-gray-400">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedEvent(selectedEvent === event.id ? null : event.id)
                            }}
                            aria-label={selectedEvent === event.id ? `Collapse ${event.title} details` : `Expand ${event.title} details`}
                            aria-expanded={selectedEvent === event.id}
                            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none"
                          >
                            {selectedEvent === event.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            )}
                          </button>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full caption-text font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {event.skills.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full caption-text">
                              +{event.skills.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Expandable Highlights */}
                        {selectedEvent === event.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
                          >
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                              Key Achievements:
                            </h4>
                            <ul className="space-y-2">
                              {event.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    {highlight}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Skills Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="card-title text-gray-900 dark:text-white mb-8 text-center">
                Core Skills
              </h3>
              
              <div className="space-y-8">
                {/* Legend and Chart Container */}
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="w-full lg:w-2/3">
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={skillsData}>
                          <PolarGrid className="stroke-gray-300 dark:stroke-gray-600" />
                          <PolarAngleAxis 
                            dataKey="skill" 
                            className="caption-text fill-gray-600 dark:fill-gray-400"
                            tick={{ fontSize: 12 }}
                          />
                          <PolarRadiusAxis 
                            angle={90} 
                            domain={[0, 100]} 
                            className="caption-text fill-gray-500 dark:fill-gray-500"
                            tick={{ fontSize: 10 }}
                          />
                          <Radar
                            name="Current"
                            dataKey="current"
                            stroke="#3B82F6"
                            fill="#3B82F6"
                            fillOpacity={0.2}
                            strokeWidth={2}
                          />
                          <Radar
                            name="Target"
                            dataKey="target"
                            stroke="#10B981"
                            fill="#10B981"
                            fillOpacity={0.1}
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-1/3 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                        <span className="body-text text-gray-600 dark:text-gray-400">Current Level</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-green-500 border-dashed rounded-full" />
                        <span className="body-text text-gray-600 dark:text-gray-400">Growth Target</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full-width Quick Stats */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="metric-value text-blue-600 dark:text-blue-400">10+</div>
                      <div className="caption-text text-gray-500 dark:text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="metric-value text-green-600 dark:text-green-400">50+</div>
                      <div className="caption-text text-gray-500 dark:text-gray-400">Products Shipped</div>
                    </div>
                    <div className="text-center">
                      <div className="metric-value text-purple-600 dark:text-purple-400">15+</div>
                      <div className="caption-text text-gray-500 dark:text-gray-400">Teams Led</div>
                    </div>
                    <div className="text-center">
                      <div className="metric-value text-orange-600 dark:text-orange-400">$25M+</div>
                      <div className="caption-text text-gray-500 dark:text-gray-400">Revenue Impact</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}