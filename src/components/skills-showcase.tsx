'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Code, 
  Brain, 
  Users, 
  Target, 
  TrendingUp, 
  Zap, 
  Database, 
  Smartphone, 
  Globe, 
  BarChart3,
  Lightbulb,
  Settings,
  PieChart,
  GitBranch,
  Layers,
  Search,
  MessageSquare,
  Award,
  Rocket,
  Shield,
  Clock
} from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  level: number
  experience: string
  description: string
  icon: React.ComponentType<any>
  color: string
  projects?: string[]
}

const skillsData: Skill[] = [
  // Product Management Core
  {
    id: 'product-strategy',
    name: 'Product Strategy',
    category: 'Product Management',
    level: 95,
    experience: '6+ years',
    description: 'End-to-end product strategy development, market analysis, and competitive positioning',
    icon: Target,
    color: 'from-blue-500 to-blue-600',
    projects: ['FinTech Mobile App', 'E-commerce Platform', 'SaaS Dashboard']
  },
  {
    id: 'user-research',
    name: 'User Research',
    category: 'Product Management',
    level: 90,
    experience: '5+ years',
    description: 'User interviews, surveys, usability testing, and behavioral analysis',
    icon: Search,
    color: 'from-purple-500 to-purple-600',
    projects: ['User Journey Mapping', 'Persona Development', 'A/B Testing']
  },
  {
    id: 'roadmap-planning',
    name: 'Roadmap Planning',
    category: 'Product Management',
    level: 92,
    experience: '6+ years',
    description: 'Strategic roadmap development, prioritization frameworks, and stakeholder alignment',
    icon: Rocket,
    color: 'from-green-500 to-green-600',
    projects: ['Q1-Q4 Product Roadmaps', 'Feature Prioritization', 'OKR Planning']
  },
  {
    id: 'stakeholder-management',
    name: 'Stakeholder Management',
    category: 'Leadership',
    level: 88,
    experience: '5+ years',
    description: 'Cross-functional collaboration, executive communication, and team alignment',
    icon: Users,
    color: 'from-orange-500 to-orange-600',
    projects: ['Executive Presentations', 'Cross-team Coordination', 'Client Relations']
  },
  
  // Data & Analytics
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'Analytics',
    level: 85,
    experience: '4+ years',
    description: 'SQL, Python, statistical analysis, and data-driven decision making',
    icon: BarChart3,
    color: 'from-teal-500 to-teal-600',
    projects: ['User Behavior Analysis', 'Revenue Attribution', 'Cohort Analysis']
  },
  {
    id: 'metrics-kpis',
    name: 'Metrics & KPIs',
    category: 'Analytics',
    level: 90,
    experience: '5+ years',
    description: 'KPI definition, dashboard creation, and performance tracking',
    icon: PieChart,
    color: 'from-indigo-500 to-indigo-600',
    projects: ['Product Analytics Dashboard', 'Growth Metrics', 'Business Intelligence']
  },
  
  // Technical Skills
  {
    id: 'technical-leadership',
    name: 'Technical Leadership',
    category: 'Technical',
    level: 88,
    experience: '6+ years',
    description: 'API design, system architecture, and technical requirement gathering',
    icon: Code,
    color: 'from-red-500 to-red-600',
    projects: ['API v3.0 Design', 'Microservices Architecture', 'Technical Specs']
  },
  {
    id: 'ai-ml',
    name: 'AI/ML Understanding',
    category: 'Technical',
    level: 80,
    experience: '3+ years',
    description: 'Machine learning concepts, AI product development, and algorithm evaluation',
    icon: Brain,
    color: 'from-pink-500 to-pink-600',
    projects: ['Recommendation Engine', 'Predictive Analytics', 'NLP Features']
  },
  {
    id: 'mobile-product',
    name: 'Mobile Product Development',
    category: 'Technical',
    level: 85,
    experience: '4+ years',
    description: 'iOS/Android product development, mobile UX, and app store optimization',
    icon: Smartphone,
    color: 'from-cyan-500 to-cyan-600',
    projects: ['FinTech Mobile App', 'Cross-platform Features', 'Mobile Analytics']
  },
  
  // Design & UX
  {
    id: 'design-thinking',
    name: 'Design Thinking',
    category: 'Design',
    level: 85,
    experience: '4+ years',
    description: 'User-centered design, prototyping, and design system development',
    icon: Lightbulb,
    color: 'from-yellow-500 to-yellow-600',
    projects: ['Design System', 'User Journey Maps', 'Wireframing']
  },
  {
    id: 'ux-ui',
    name: 'UX/UI Collaboration',
    category: 'Design',
    level: 82,
    experience: '4+ years',
    description: 'Design collaboration, user experience optimization, and interface design',
    icon: Layers,
    color: 'from-violet-500 to-violet-600',
    projects: ['Mobile App Redesign', 'Dashboard UX', 'Accessibility Improvements']
  },
  
  // Business & Strategy
  {
    id: 'business-strategy',
    name: 'Business Strategy',
    category: 'Business',
    level: 90,
    experience: '5+ years',
    description: 'Market analysis, competitive intelligence, and business model development',
    icon: TrendingUp,
    color: 'from-emerald-500 to-emerald-600',
    projects: ['Go-to-Market Strategy', 'Competitive Analysis', 'Business Cases']
  },
  {
    id: 'agile-scrum',
    name: 'Agile/Scrum',
    category: 'Process',
    level: 90,
    experience: '5+ years',
    description: 'Agile methodologies, sprint planning, and team facilitation',
    icon: Settings,
    color: 'from-slate-500 to-slate-600',
    projects: ['Sprint Planning', 'Backlog Management', 'Team Retrospectives']
  },
  
  // Communication & Leadership
  {
    id: 'communication',
    name: 'Communication',
    category: 'Leadership',
    level: 92,
    experience: '6+ years',
    description: 'Executive presentations, technical writing, and cross-functional communication',
    icon: MessageSquare,
    color: 'from-rose-500 to-rose-600',
    projects: ['Executive Reports', 'Product Documentation', 'Team Presentations']
  },
  {
    id: 'team-leadership',
    name: 'Team Leadership',
    category: 'Leadership',
    level: 88,
    experience: '4+ years',
    description: 'Team management, mentoring, and cross-functional leadership',
    icon: Award,
    color: 'from-amber-500 to-amber-600',
    projects: ['Team Building', 'Mentorship Programs', 'Performance Management']
  }
]

const categories = [
  'All',
  'Product Management',
  'Analytics',
  'Technical',
  'Design',
  'Business',
  'Process',
  'Leadership'
]

export default function SkillsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const filteredSkills = selectedCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory)

  const getSkillLevelColor = (level: number) => {
    if (level >= 90) return 'text-green-600 dark:text-green-400'
    if (level >= 80) return 'text-blue-600 dark:text-blue-400'
    if (level >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  const getSkillLevelText = (level: number) => {
    if (level >= 90) return 'Expert'
    if (level >= 80) return 'Advanced'
    if (level >= 70) return 'Intermediate'
    return 'Beginner'
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <Zap className="w-12 h-12 text-blue-500 mx-auto" />
          </motion.div>
          
          <h2 className="section-title text-gray-900 dark:text-white mb-4">
            Complete Skill Arsenal
          </h2>
          <p className="body-text text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical and soft skills developed through 6+ years of product management experience. 
            Each skill represents real-world application in delivering successful products.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-600/80 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 transition-all duration-300 group-hover:scale-105 h-full">
                  {/* Skill Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {skill.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/80 px-2 py-1 rounded-full">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  {/* Skill Level */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {getSkillLevelText(skill.level)}
                      </span>
                      <span className={`text-sm font-bold ${getSkillLevelColor(skill.level)}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600/80 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {skill.experience}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Projects (if available) */}
                  {skill.projects && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                        Key Projects
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {skill.projects.slice(0, 2).map((project, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full"
                          >
                            {project}
                          </span>
                        ))}
                        {skill.projects.length > 2 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                            +{skill.projects.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Hover Effect Overlay */}
                  {hoveredSkill === skill.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl pointer-events-none"
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-white/80 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-600/80 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20 transition-all duration-300"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {skillsData.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Skills
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {skillsData.filter(s => s.level >= 90).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Expert Level
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Skill Categories
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                6+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Years Experience
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}