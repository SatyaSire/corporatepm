'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Target, 
  Heart, 
  Zap, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight, 
  Smartphone, 
  ShoppingCart, 
  CreditCard, 
  Star,
  Clock,
  TrendingUp,
  Users,
  Brain,
  Eye,
  MessageCircle
} from 'lucide-react'

interface Persona {
  id: string
  name: string
  age: number
  role: string
  avatar: string
  goals: string[]
  painPoints: string[]
  behaviors: string[]
  techSavvy: number
  motivations: string[]
  preferredChannels: string[]
}

interface JourneyStage {
  id: string
  name: string
  description: string
  touchpoints: string[]
  emotions: 'positive' | 'neutral' | 'negative'
  opportunities: string[]
  icon: React.ReactNode
}

const personas: Persona[] = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    age: 32,
    role: 'Senior Marketing Manager',
    avatar: '👩‍💼',
    goals: [
      'Increase team productivity by 40%',
      'Implement data-driven decision making',
      'Streamline campaign workflows'
    ],
    painPoints: [
      'Too many disconnected tools',
      'Difficulty tracking ROI across channels',
      'Manual reporting takes too much time'
    ],
    behaviors: [
      'Checks analytics daily',
      'Prefers visual dashboards',
      'Values automation features'
    ],
    techSavvy: 8,
    motivations: ['Efficiency', 'Career Growth', 'Team Success'],
    preferredChannels: ['Email', 'Slack', 'LinkedIn']
  },
  {
    id: 'mike',
    name: 'Mike Rodriguez',
    age: 28,
    role: 'Product Designer',
    avatar: '👨‍🎨',
    goals: [
      'Create user-centered designs',
      'Collaborate better with developers',
      'Build a strong design system'
    ],
    painPoints: [
      'Lack of user research data',
      'Design-dev handoff issues',
      'Inconsistent feedback loops'
    ],
    behaviors: [
      'Uses design tools daily',
      'Seeks user feedback actively',
      'Participates in design communities'
    ],
    techSavvy: 9,
    motivations: ['User Impact', 'Creative Expression', 'Skill Development'],
    preferredChannels: ['Figma', 'Discord', 'Dribbble']
  },
  {
    id: 'emma',
    name: 'Emma Thompson',
    age: 45,
    role: 'VP of Operations',
    avatar: '👩‍💻',
    goals: [
      'Optimize operational efficiency',
      'Reduce costs by 25%',
      'Improve cross-team collaboration'
    ],
    painPoints: [
      'Siloed departments',
      'Lack of real-time visibility',
      'Manual process bottlenecks'
    ],
    behaviors: [
      'Reviews KPIs weekly',
      'Focuses on process improvement',
      'Values proven solutions'
    ],
    techSavvy: 6,
    motivations: ['Business Results', 'Team Efficiency', 'Strategic Impact'],
    preferredChannels: ['Email', 'Phone', 'In-person meetings']
  }
]

const journeyStages: JourneyStage[] = [
  {
    id: 'awareness',
    name: 'Awareness',
    description: 'User becomes aware of a problem or need',
    touchpoints: ['Social Media', 'Search Results', 'Word of Mouth', 'Industry Reports'],
    emotions: 'neutral',
    opportunities: [
      'Create educational content',
      'Improve SEO visibility',
      'Build thought leadership'
    ],
    icon: <Eye className="w-6 h-6" />
  },
  {
    id: 'consideration',
    name: 'Consideration',
    description: 'User researches solutions and evaluates options',
    touchpoints: ['Website', 'Product Demos', 'Reviews', 'Comparison Sites'],
    emotions: 'neutral',
    opportunities: [
      'Provide detailed product info',
      'Offer free trials',
      'Share customer testimonials'
    ],
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: 'decision',
    name: 'Decision',
    description: 'User decides to purchase or sign up',
    touchpoints: ['Sales Team', 'Pricing Page', 'Checkout Flow', 'Support Chat'],
    emotions: 'positive',
    opportunities: [
      'Simplify onboarding',
      'Provide clear pricing',
      'Offer implementation support'
    ],
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    description: 'User gets started with the product',
    touchpoints: ['Welcome Email', 'Setup Wizard', 'Documentation', 'Support Team'],
    emotions: 'neutral',
    opportunities: [
      'Create guided tutorials',
      'Provide quick wins',
      'Assign success manager'
    ],
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 'usage',
    name: 'Active Usage',
    description: 'User regularly uses the product',
    touchpoints: ['Product Interface', 'Mobile App', 'Email Notifications', 'Help Center'],
    emotions: 'positive',
    opportunities: [
      'Add advanced features',
      'Provide usage analytics',
      'Create user communities'
    ],
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 'advocacy',
    name: 'Advocacy',
    description: 'User becomes a promoter and refers others',
    touchpoints: ['Referral Program', 'Case Studies', 'Reviews', 'Social Sharing'],
    emotions: 'positive',
    opportunities: [
      'Launch referral program',
      'Create shareable content',
      'Recognize power users'
    ],
    icon: <Users className="w-6 h-6" />
  }
]

export default function PersonasJourney() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'personas' | 'journey'>('personas')

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'positive': return 'text-green-500'
      case 'negative': return 'text-red-500'
      default: return 'text-yellow-500'
    }
  }

  const getEmotionBg = (emotion: string) => {
    switch (emotion) {
      case 'positive': return 'bg-green-500/10 border-green-500/20'
      case 'negative': return 'bg-red-500/10 border-red-500/20'
      default: return 'bg-yellow-500/10 border-yellow-500/20'
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gray-900 dark:text-white mb-4">
            User Research & Journey Mapping
          </h2>
          <p className="section-subtitle text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Deep user insights drive product decisions. Here's how I approach user research and journey optimization.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg p-1 border border-white/20">
            <button
              id="personas-tab"
              onClick={() => setActiveTab('personas')}
              role="tab"
              aria-selected={activeTab === 'personas'}
              aria-controls="personas-panel"
              aria-label="View user personas"
              className={`px-6 py-3 rounded-md font-nav font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === 'personas'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
              }`}
            >
              <User className="w-5 h-5 inline-block mr-2" />
              User Personas
            </button>
            <button
              id="journey-tab"
              onClick={() => setActiveTab('journey')}
              role="tab"
              aria-selected={activeTab === 'journey'}
              aria-controls="journey-panel"
              aria-label="View customer journey"
              className={`px-6 py-3 rounded-md font-nav font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === 'journey'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
              }`}
            >
              <Target className="w-5 h-5 inline-block mr-2" />
              Customer Journey
            </button>
          </div>
        </div>

        <AnimatePresence>
          {activeTab === 'personas' && (
            <motion.div
              key="personas"
              id="personas-panel"
              role="tabpanel"
              aria-labelledby="personas-tab"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.15 }}
            >
              {/* Personas Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {personas.map((persona, index) => (
                  <motion.div
                    key={persona.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-white/70 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-slate-600/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 hover:scale-105 ${
                      selectedPersona === persona.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
                    }`}
                    onClick={() => setSelectedPersona(selectedPersona === persona.id ? null : persona.id)}
                  >
                    {/* Click Me Indicator */}
                    <AnimatePresence>
                      {selectedPersona !== persona.id && (
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
                    <div className="text-center mb-4">
                      <div className="section-title mb-2">{persona.avatar}</div>
                      <h3 className="card-title text-gray-900 dark:text-white">{persona.name}</h3>
                      <p className="body-text text-gray-600 dark:text-gray-300">{persona.role}</p>
                      <p className="caption-text text-gray-500 dark:text-gray-400">Age: {persona.age}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-blue-500" />
                          Goals
                        </h4>
                        <ul className="caption-text text-gray-600 dark:text-gray-300 space-y-1">
                          {persona.goals.slice(0, 2).map((goal, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                          Pain Points
                        </h4>
                        <ul className="caption-text text-gray-600 dark:text-gray-300 space-y-1">
                          {persona.painPoints.slice(0, 2).map((pain, i) => (
                            <li key={i} className="flex items-start">
                              <AlertCircle className="w-3 h-3 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                              {pain}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span className="caption-text text-gray-500 dark:text-gray-400">Tech Savvy</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < persona.techSavvy ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedPersona === persona.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3"
                        >
                          <div>
                            <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                              <Heart className="w-4 h-4 mr-2 text-pink-500" />
                              Motivations
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {persona.motivations.map((motivation, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full caption-text"
                                >
                                  {motivation}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                              <MessageCircle className="w-4 h-4 mr-2 text-purple-500" />
                              Preferred Channels
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {persona.preferredChannels.map((channel, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full caption-text"
                                >
                                  {channel}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'journey' && (
            <motion.div
              key="journey"
              id="journey-panel"
              role="tabpanel"
              aria-labelledby="journey-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15 }}
            >
              {/* Journey Map */}
              <div className="space-y-8">
                {/* Journey Stages */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {journeyStages.map((stage, index) => (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative bg-white/70 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-slate-600/60 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20 hover:scale-105 ${
                        selectedStage === stage.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
                      } ${getEmotionBg(stage.emotions)}`}
                      onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                    >
                      {/* Click Me Indicator */}
                      <AnimatePresence>
                        {selectedStage !== stage.id && (
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
                      {/* Arrow connector */}
                      {index < journeyStages.length - 1 && (
                        <div className="hidden xl:block absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      )}

                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${getEmotionBg(stage.emotions)}`}>
                          <div className={getEmotionColor(stage.emotions)}>
                            {stage.icon}
                          </div>
                        </div>
                        <h3 className="body-text font-bold text-gray-900 dark:text-white mb-2">{stage.name}</h3>
                        <p className="caption-text text-gray-600 dark:text-gray-300 mb-3">{stage.description}</p>
                        
                        <div className="space-y-2">
                          <h4 className="caption-text font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Key Touchpoints
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {stage.touchpoints.slice(0, 2).map((touchpoint, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded caption-text"
                              >
                                {touchpoint}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {selectedStage === stage.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3"
                          >
                            <div>
                              <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-2">
                                All Touchpoints
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {stage.touchpoints.map((touchpoint, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded caption-text"
                                  >
                                    {touchpoint}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="body-text font-semibold text-gray-900 dark:text-white mb-2">
                                Opportunities
                              </h4>
                              <ul className="caption-text text-gray-600 dark:text-gray-300 space-y-1">
                                {stage.opportunities.map((opportunity, i) => (
                                  <li key={i} className="flex items-start">
                                    <Zap className="w-3 h-3 mr-1 mt-0.5 text-yellow-500 flex-shrink-0" />
                                    {opportunity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Journey Insights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/70 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-white/20 dark:border-slate-600/60 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-400/20 transition-all duration-300"
                >
                  <h3 className="card-title text-gray-900 dark:text-white mb-6 text-center">
                    Key Journey Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                        <Clock className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="body-text font-bold text-gray-900 dark:text-white mb-2">Average Journey Time</h4>
                      <p className="metric-value text-green-600 dark:text-green-400 mb-2">14 days</p>
                      <p className="caption-text text-gray-600 dark:text-gray-300">From awareness to conversion</p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                        <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="body-text font-bold text-gray-900 dark:text-white mb-2">Conversion Rate</h4>
                      <p className="metric-value text-blue-600 dark:text-blue-400 mb-2">23%</p>
                      <p className="caption-text text-gray-600 dark:text-gray-300">Consideration to decision</p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                        <Star className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h4 className="body-text font-bold text-gray-900 dark:text-white mb-2">Satisfaction Score</h4>
                      <p className="metric-value text-purple-600 dark:text-purple-400 mb-2">4.7/5</p>
                      <p className="caption-text text-gray-600 dark:text-gray-300">Post-onboarding feedback</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}