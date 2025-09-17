"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Download, MessageCircle, TrendingUp, Users, Target, DollarSign, BarChart3 } from "lucide-react"
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useRef } from "react"

const kpiData = [
  { label: "Years of Experience", value: 6, suffix: "+", icon: TrendingUp, color: "text-blue-500" },
  { label: "Products Contributed", value: 12, suffix: "+", icon: Target, color: "text-green-500" },
  { label: "Teams Led", value: 6, suffix: "+", icon: Users, color: "text-purple-500" },
  { label: "Revenue Impact", value: 30, suffix: " Cr+", prefix: "₹", icon: DollarSign, color: "text-orange-500" },
  { label: "Retention Growth", value: 28, suffix: "%", prefix: "+", icon: BarChart3, color: "text-pink-500" },
]

const growthData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 72 },
  { month: "Mar", value: 78 },
  { month: "Apr", value: 85 },
  { month: "May", value: 92 },
  { month: "Jun", value: 98 },
]

const productSplitData = [
  { name: "E-Invoice", value: 35, color: "#3b82f6" },
  { name: "CRM", value: 25, color: "#10b981" },
  { name: "Call Handling", value: 20, color: "#8b5cf6" },
  { name: "Analytics", value: 20, color: "#f59e0b" },
]

function AnimatedCounter({ value, prefix = "", suffix = "", duration = 2000 }: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * value))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:20px_20px] opacity-60" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-full border border-green-200 dark:border-green-700/50 shadow-sm"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                <span className="caption-text text-green-700 dark:text-green-300">Available for Product Manager roles</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="hero-title text-gray-900 dark:text-white"
              >
                I build digital products that{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  solve real problems
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="body-text text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
              >
                Product Manager with <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">6+ years</span> of experience in product strategy, roadmap planning, and team leadership. 
                Delivered <span className="font-mono font-semibold text-green-600 dark:text-green-400">12+ products</span> with <span className="font-mono font-semibold text-orange-600 dark:text-orange-400">₹30 Cr+ revenue impact</span> and <span className="font-mono font-semibold text-purple-600 dark:text-purple-400">28% retention growth</span>.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => scrollToSection("case-studies")}
                aria-label="Navigate to case studies section"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 group shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-nav font-medium">View Case Studies</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                aria-label="Download resume PDF"
                className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-gray-900 dark:text-white rounded-xl border border-gray-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="mr-2 w-4 h-4" />
                <span className="font-nav font-medium">Download Resume</span>
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection("contact")}
                aria-label="Navigate to contact section"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="mr-2 w-4 h-4" />
                Connect with Me
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-4">
              {kpiData.map((kpi, index) => {
                const Icon = kpi.icon
                return (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-slate-600/60 hover:bg-white/90 dark:hover:bg-slate-800/95 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 transition-all group"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${kpi.color}`} />
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div className={`metric-value ${kpi.color} mb-1`}>
                      <AnimatedCounter 
                        value={kpi.value} 
                        prefix={kpi.prefix} 
                        suffix={kpi.suffix}
                        duration={2000 + index * 200}
                      />
                    </div>
                    <div className="caption-text text-gray-600 dark:text-gray-400">
                      {kpi.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Growth Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-slate-600/60 hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20 transition-all duration-300"
              >
                <h3 className="card-title text-gray-700 dark:text-gray-300 mb-3">Growth Trajectory</h3>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={growthData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        border: 'none', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Product Split Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
                className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-slate-600/60 hover:shadow-lg hover:shadow-green-500/10 dark:hover:shadow-green-400/20 transition-all duration-300"
              >
                <h3 className="card-title text-gray-700 dark:text-gray-300 mb-3">Product Portfolio</h3>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie
                      data={productSplitData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {productSplitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        border: 'none', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-2">
                  {productSplitData.map((item, index) => (
                    <div key={index} className="flex items-center caption-text">
                      <div 
                        className="w-2 h-2 rounded-full mr-1" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}