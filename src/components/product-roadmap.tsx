'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, DollarSign, Zap, Info, ChevronDown, ChevronUp, Clock, Target, TrendingUp, Star } from 'lucide-react'

interface RoadmapItem {
  id: string
  title: string
  description: string
  status: 'backlog' | 'in-progress' | 'testing' | 'shipped'
  priority: 'low' | 'medium' | 'high' | 'critical'
  quarter: string
  estimatedEffort: string
  rice: {
    reach: number
    impact: number
    confidence: number
    effort: number
    score: number
  }
  tags: string[]
  assignee: string
  progress?: number
}

const roadmapData: RoadmapItem[] = [
  {
    id: 'ai-recommendations',
    title: 'AI-Powered Product Recommendations',
    description: 'Implement machine learning algorithm to provide personalized product recommendations based on user behavior and purchase history.',
    status: 'in-progress',
    priority: 'high',
    quarter: 'Q1 2024',
    estimatedEffort: '8 weeks',
    rice: {
      reach: 85,
      impact: 90,
      confidence: 80,
      effort: 70,
      score: 87
    },
    tags: ['AI/ML', 'Personalization', 'Revenue'],
    assignee: 'Sarah Chen',
    progress: 65
  },
  {
    id: 'mobile-app-redesign',
    title: 'Mobile App UX Redesign',
    description: 'Complete overhaul of mobile application user interface and experience based on user research findings.',
    status: 'testing',
    priority: 'high',
    quarter: 'Q1 2024',
    estimatedEffort: '12 weeks',
    rice: {
      reach: 95,
      impact: 85,
      confidence: 90,
      effort: 80,
      score: 91
    },
    tags: ['Mobile', 'UX/UI', 'User Research'],
    assignee: 'Alex Rodriguez',
    progress: 85
  },
  {
    id: 'real-time-analytics',
    title: 'Real-time Analytics Dashboard',
    description: 'Build comprehensive analytics dashboard with real-time data visualization for business stakeholders.',
    status: 'in-progress',
    priority: 'medium',
    quarter: 'Q2 2024',
    estimatedEffort: '6 weeks',
    rice: {
      reach: 60,
      impact: 75,
      confidence: 85,
      effort: 50,
      score: 77
    },
    tags: ['Analytics', 'Dashboard', 'Data Viz'],
    assignee: 'Mike Johnson',
    progress: 40
  },
  {
    id: 'voice-interface',
    title: 'Voice User Interface',
    description: 'Integrate voice commands and speech recognition for hands-free product interaction.',
    status: 'backlog',
    priority: 'medium',
    quarter: 'Q3 2024',
    estimatedEffort: '10 weeks',
    rice: {
      reach: 70,
      impact: 60,
      confidence: 65,
      effort: 85,
      score: 32
    },
    tags: ['Voice UI', 'Accessibility', 'Innovation'],
    assignee: 'Emma Davis'
  },
  {
    id: 'api-v3',
    title: 'API v3.0 Release',
    description: 'Launch next generation API with improved performance, better documentation, and enhanced security.',
    status: 'shipped',
    priority: 'critical',
    quarter: 'Q4 2023',
    estimatedEffort: '16 weeks',
    rice: {
      reach: 80,
      impact: 95,
      confidence: 95,
      effort: 90,
      score: 80
    },
    tags: ['API', 'Performance', 'Security'],
    assignee: 'David Kim'
  },
  {
    id: 'social-features',
    title: 'Social Sharing Features',
    description: 'Add social media integration and sharing capabilities to increase user engagement and viral growth.',
    status: 'backlog',
    priority: 'low',
    quarter: 'Q4 2024',
    estimatedEffort: '4 weeks',
    rice: {
      reach: 90,
      impact: 40,
      confidence: 70,
      effort: 30,
      score: 84
    },
    tags: ['Social', 'Growth', 'Engagement'],
    assignee: 'Lisa Wang'
  },
  {
    id: 'blockchain-integration',
    title: 'Blockchain Payment Integration',
    description: 'Implement cryptocurrency payment options and blockchain-based transaction verification.',
    status: 'backlog',
    priority: 'low',
    quarter: 'Q1 2025',
    estimatedEffort: '14 weeks',
    rice: {
      reach: 30,
      impact: 70,
      confidence: 50,
      effort: 95,
      score: 11
    },
    tags: ['Blockchain', 'Payments', 'Innovation'],
    assignee: 'Tom Wilson'
  },
  {
    id: 'ar-try-on',
    title: 'AR Virtual Try-On',
    description: 'Augmented reality feature allowing customers to virtually try products before purchasing.',
    status: 'backlog',
    priority: 'medium',
    quarter: 'Q2 2024',
    estimatedEffort: '12 weeks',
    rice: {
      reach: 75,
      impact: 80,
      confidence: 60,
      effort: 90,
      score: 40
    },
    tags: ['AR', 'E-commerce', 'Innovation'],
    assignee: 'Jessica Brown'
  }
]

const statusColumns = {
  backlog: { title: 'Backlog', color: 'bg-gray-100 dark:bg-gray-800', count: 0 },
  'in-progress': { title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900/20', count: 0 },
  testing: { title: 'Testing', color: 'bg-yellow-100 dark:bg-yellow-900/20', count: 0 },
  shipped: { title: 'Shipped', color: 'bg-green-100 dark:bg-green-900/20', count: 0 }
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
}

const riceTooltips = {
  reach: 'How many people will this impact within a time period?',
  impact: 'How much will this impact each person?',
  confidence: 'How confident are we about our reach and impact estimates?',
  effort: 'How much effort will this take to build?'
}

export default function ProductRoadmap() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showRiceDetails, setShowRiceDetails] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  // Calculate status counts
  Object.keys(statusColumns).forEach(status => {
    statusColumns[status as keyof typeof statusColumns].count = roadmapData.filter(item => item.status === status).length
  })

  // Filter items
  const filteredItems = roadmapData.filter(item => {
    const statusMatch = filterStatus === 'all' || item.status === filterStatus
    const priorityMatch = filterPriority === 'all' || item.priority === filterPriority
    return statusMatch && priorityMatch
  })

  const getRiceColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-indigo-900/10 dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-gray-900 dark:text-white mb-6">
            Product Roadmap
          </h2>
          <p className="section-subtitle text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Strategic product development pipeline with RICE framework prioritization. 
            Drag and drop to reorganize, click for detailed insights.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="status-filter" className="caption-text font-medium text-gray-700 dark:text-gray-300">Status:</label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                aria-label="Filter roadmap items by status"
                className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg caption-text focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="backlog">Backlog</option>
                <option value="in-progress">In Progress</option>
                <option value="testing">Testing</option>
                <option value="shipped">Shipped</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="priority-filter" className="caption-text font-medium text-gray-700 dark:text-gray-300">Priority:</label>
              <select
                id="priority-filter"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                aria-label="Filter roadmap items by priority"
                className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg caption-text focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(statusColumns).map(([status, config]) => {
            const columnItems = filteredItems.filter(item => item.status === status)
            
            return (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: Object.keys(statusColumns).indexOf(status) * 0.1 }}
                className={`${config.color} rounded-2xl p-4 min-h-[600px]`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="card-title text-gray-900 dark:text-white">
                    {config.title}
                  </h3>
                  <span className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full caption-text font-medium">
                    {columnItems.length}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {columnItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`relative bg-white dark:bg-gray-800/95 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-600/80 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 ${
                        selectedItem === item.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    >
                      {/* Click Me Indicator */}
                      <AnimatePresence>
                        {selectedItem !== item.id && (
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
                      {/* Item Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-1">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full caption-text font-medium ${priorityColors[item.priority]}`}>
                              {item.priority}
                            </span>
                            <span className="caption-text text-gray-500 dark:text-gray-400">
                              {item.quarter}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`caption-text font-bold ${getRiceColor(item.rice.score)}`}>
                            {item.rice.score}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowRiceDetails(showRiceDetails === item.id ? null : item.id)
                            }}
                            aria-label={`${showRiceDetails === item.id ? 'Hide' : 'Show'} RICE scoring details for ${item.title}`}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            <Info className="w-3 h-3 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar (for in-progress items) */}
                      {item.progress && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between caption-text text-gray-600 dark:text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{item.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-blue-500 h-2 rounded-full"
                            />
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded caption-text"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded caption-text">
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Assignee */}
                      <div className="flex items-center justify-between caption-text text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {item.assignee}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.estimatedEffort}
                        </span>
                      </div>

                      {/* RICE Details Tooltip */}
                      <AnimatePresence>
                        {showRiceDetails === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
                          >
                            <div className="caption-text space-y-2">
                              <div className="font-medium text-gray-700 dark:text-gray-300 mb-2">RICE Framework:</div>
                              {Object.entries(item.rice).slice(0, 4).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="text-gray-600 dark:text-gray-400 capitalize" title={riceTooltips[key as keyof typeof riceTooltips]}>
                                    {key}:
                                  </span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {value}/100
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {selectedItem === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
                          >
                            <p className="caption-text text-gray-600 dark:text-gray-300 leading-relaxed">
                              {item.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* RICE Framework Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white/80 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-600/80 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20 transition-all duration-300"
        >
          <h3 className="card-title text-gray-900 dark:text-white mb-4 text-center">
            RICE Framework Scoring
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 body-text">
            {Object.entries(riceTooltips).map(([key, description]) => (
              <div key={key} className="text-center">
                <div className="font-semibold text-gray-900 dark:text-white capitalize mb-1">
                  {key}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {description}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center caption-text text-gray-500 dark:text-gray-400">
            <strong>RICE Score = (Reach × Impact × Confidence) ÷ Effort</strong>
            <br />
            <span className="text-green-600 dark:text-green-400">80+ High Priority</span> • 
            <span className="text-yellow-600 dark:text-yellow-400">60-79 Medium Priority</span> • 
            <span className="text-red-600 dark:text-red-400">&lt;60 Low Priority</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}