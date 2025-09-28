'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, ExternalLink, Users, TrendingUp, Clock, Target, Award, Zap } from 'lucide-react'

interface CaseStudy {
  id: string
  version: string
  title: string
  company: string
  duration: string
  role: string
  challenge: string
  solution: string
  impact: string
  metrics: {
    label: string
    value: string
    icon: React.ReactNode
  }[]
  technologies: string[]
  learnings: string[]
  status: 'shipped' | 'in-progress' | 'planned'
}

const caseStudies: CaseStudy[] = [
  {
    id: 'fintech-app',
    version: 'v2.1.0',
    title: 'FinTech Mobile Banking Revolution',
    company: 'TechBank Solutions',
    duration: '18 months',
    role: 'Senior Product Manager',
    challenge: 'Traditional banking app had 2.1★ rating with 67% user churn in first month. Users complained about complex onboarding, slow transactions, and poor UX.',
    solution: 'Led complete product overhaul: implemented biometric authentication, AI-powered spending insights, one-tap payments, and gamified financial goals. Conducted 47 user interviews and A/B tested 23 features.',
    impact: 'Transformed user experience resulting in industry-leading metrics and recognition as "Best Banking App 2023" by FinTech Awards.',
    metrics: [
      { label: 'App Store Rating', value: '4.8★', icon: <Award className="w-4 h-4" /> },
      { label: 'User Retention', value: '+340%', icon: <Users className="w-4 h-4" /> },
      { label: 'Transaction Speed', value: '2.3s avg', icon: <Zap className="w-4 h-4" /> },
      { label: 'Revenue Growth', value: '+156%', icon: <TrendingUp className="w-4 h-4" /> }
    ],
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Stripe API'],
    learnings: [
      'User research is non-negotiable - 47 interviews revealed pain points analytics missed',
      'Incremental rollouts reduce risk - phased launch to 10% → 50% → 100% users',
      'Cross-functional alignment accelerates delivery - weekly stakeholder syncs cut development time by 30%'
    ],
    status: 'shipped'
  },
  {
    id: 'ecommerce-platform',
    version: 'v1.8.2',
    title: 'E-commerce Personalization Engine',
    company: 'RetailTech Inc',
    duration: '12 months',
    role: 'Product Manager',
    challenge: 'Generic product recommendations led to 1.2% conversion rate. Customers couldn\'t find relevant products, resulting in high bounce rates and low average order value.',
    solution: 'Built ML-powered personalization engine analyzing user behavior, purchase history, and browsing patterns. Implemented dynamic homepage, smart search, and personalized email campaigns.',
    impact: 'Created personalized shopping experience that significantly improved key business metrics and customer satisfaction scores.',
    metrics: [
      { label: 'Conversion Rate', value: '+285%', icon: <Target className="w-4 h-4" /> },
      { label: 'Average Order Value', value: '+67%', icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'Customer Satisfaction', value: '4.6/5', icon: <Award className="w-4 h-4" /> },
      { label: 'Page Load Time', value: '1.8s', icon: <Zap className="w-4 h-4" /> }
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'MongoDB', 'Elasticsearch', 'Docker'],
    learnings: [
      'Data quality trumps algorithm complexity - clean data improved recommendations by 40%',
      'Progressive enhancement works - started with rule-based system, evolved to ML',
      'Performance monitoring is crucial - 100ms delay = 1% conversion drop'
    ],
    status: 'shipped'
  },
  {
    id: 'saas-analytics',
    version: 'v3.0.0-beta',
    title: 'SaaS Analytics Dashboard 3.0',
    company: 'DataViz Pro',
    duration: '8 months (ongoing)',
    role: 'Lead Product Manager',
    challenge: 'Existing dashboard was slow, limited to basic charts, and couldn\'t handle real-time data. Enterprise clients demanded advanced analytics and custom visualizations.',
    solution: 'Architecting next-gen analytics platform with real-time streaming, custom chart builder, AI-powered insights, and white-label capabilities. Currently in beta with 12 enterprise clients.',
    impact: 'Revolutionary analytics platform positioning company as industry leader in data visualization and business intelligence.',
    metrics: [
      { label: 'Query Performance', value: '10x faster', icon: <Zap className="w-4 h-4" /> },
      { label: 'Beta Signups', value: '2,400+', icon: <Users className="w-4 h-4" /> },
      { label: 'Enterprise Deals', value: '$2.4M ARR', icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'Development Velocity', value: '+45%', icon: <Target className="w-4 h-4" /> }
    ],
    technologies: ['TypeScript', 'D3.js', 'WebSockets', 'Kafka', 'ClickHouse', 'Kubernetes'],
    learnings: [
      'Beta feedback loops accelerate product-market fit - weekly customer calls essential',
      'Technical debt planning prevents future bottlenecks - allocated 20% sprint capacity',
      'Enterprise sales cycles inform product roadmap - 6-month sales pipeline drives features'
    ],
    status: 'in-progress'
  }
]

const statusColors = {
  shipped: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  planned: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
}

const statusLabels = {
  shipped: 'Shipped',
  'in-progress': 'In Progress',
  planned: 'Planned'
}

export default function CaseStudies() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
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
            Product Case Studies
          </h2>
          <p className="section-subtitle text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real products, real impact. Each case study represents months of user research, 
            data-driven decisions, and cross-functional collaboration.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white/80 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl border overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 transition-all duration-300 cursor-pointer ${
                expandedCard === study.id ? 'border-blue-500 shadow-xl' : 'border-gray-200 dark:border-gray-600/80'
              }`}
              onClick={() => toggleCard(study.id)}
            >
              {/* Click Me Button - Top Left Corner */}
              <AnimatePresence>
                {expandedCard !== study.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-3 left-2 z-20 transform -rotate-12 pointer-events-auto cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCard(study.id)
                    }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-md shadow-lg animate-pulse hover:scale-110 transition-transform duration-200">
                      <span className="text-xs font-bold whitespace-nowrap">Click Me</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Card Header */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="caption-text font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                        {study.id}
                      </span>
                      <span className={`caption-text font-medium px-2 py-1 rounded-full ${statusColors[study.status]}`}>
                        {statusLabels[study.status]}
                      </span>
                    </div>
                    <h3 className="card-title text-gray-900 dark:text-white mb-2">
                      {study.title}
                    </h3>
                    <div className="flex items-center gap-4 caption-text text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {study.duration}
                      </span>
                      <span>•</span>
                      <span>{study.company}</span>
                      <span>•</span>
                      <span>{study.role}</span>
                    </div>
                  </div>
                  <div className="relative mr-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleCard(study.id)
                      }}
                      aria-label={expandedCard === study.id ? `Collapse ${study.title} details` : `Expand ${study.title} details`}
                      aria-expanded={expandedCard === study.id}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none min-w-[40px] flex items-center justify-center"
                    >
                      {expandedCard === study.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {study.metrics.map((metric, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl border border-blue-100 dark:border-blue-700/60"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-blue-600 dark:text-blue-400">
                          {metric.icon}
                        </div>
                        <span className="caption-text font-medium text-gray-600 dark:text-gray-400">
                          {metric.label}
                        </span>
                      </div>
                      <div className="metric-value text-gray-900 dark:text-white">
                        {metric.value}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Challenge Preview */}
                <p className="body-text text-gray-700 dark:text-gray-300 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedCard === study.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-8 space-y-8">
                      {/* Solution */}
                      <div>
                        <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-3">
                          Solution & Approach
                        </h4>
                        <p className="body-text text-gray-700 dark:text-gray-300 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>

                      {/* Impact */}
                      <div>
                        <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-3">
                          Business Impact
                        </h4>
                        <p className="body-text text-gray-700 dark:text-gray-300 leading-relaxed">
                          {study.impact}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-3">
                          Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {study.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 rounded-full caption-text font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Learnings */}
                      <div>
                        <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-3">
                          Key Learnings
                        </h4>
                        <ul className="space-y-2">
                          {study.learnings.map((learning, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="body-text text-gray-700 dark:text-gray-300">
                                {learning}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="body-text text-gray-600 dark:text-gray-300 mb-6">
            Want to dive deeper into any of these case studies?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl body-text font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Schedule a Deep Dive
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}