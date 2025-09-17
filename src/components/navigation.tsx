"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Briefcase, Target, Users, MessageCircle, Download, Zap, TrendingUp, Award, Brain } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { name: "Home", href: "#hero", icon: Home, color: "from-blue-500 to-cyan-500" },
  { name: "Skills", href: "#skills", icon: Brain, color: "from-pink-500 to-rose-500" },
  { name: "About", href: "#about", icon: User, color: "from-purple-500 to-pink-500" },
  { name: "Case Studies", href: "#case-studies", icon: Briefcase, color: "from-green-500 to-emerald-500" },
  { name: "Roadmap", href: "#roadmap", icon: Target, color: "from-orange-500 to-red-500" },
  { name: "Personas", href: "#personas", icon: Users, color: "from-indigo-500 to-purple-500" },
  { name: "Contact", href: "#contact", icon: MessageCircle, color: "from-teal-500 to-blue-500" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [showPMPopup, setShowPMPopup] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setScrolled(scrollTop > 50)
      setScrollProgress(progress)
    }

    const handleSectionChange = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleSectionChange)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleSectionChange)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`fixed top-1 left-4 right-4 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Main line with logo, theme toggle, and resume button */}
          <div className="flex items-center justify-between h-16">
            {/* Floating Logo */}
            <div className="flex-shrink-0 relative">
              <motion.div
                className="cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => setShowPMPopup(!showPMPopup)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="font-hero text-white font-bold caption-text">PM</span>
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-2 h-2 text-white" />
                    </motion.div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="font-nav body-text font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Product Manager
                    </span>
                    <div className="flex items-center space-x-1 mt-0.5">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="font-mono caption-text text-green-500 font-medium">6+ Years</span>
                      <Award className="w-3 h-3 text-yellow-500 ml-2" />
                      <span className="font-mono caption-text text-yellow-600 dark:text-yellow-400 font-medium">₹30Cr+ Impact</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Product Manager Info Popup - Horizontal Layout */}
              <AnimatePresence>
                {showPMPopup && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 z-[60] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-2xl shadow-2xl p-6 min-w-[400px]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="font-hero text-white font-bold text-xl">PM</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                          Senior Product Manager
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          Building digital products that solve real problems
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-green-600 dark:text-green-400 font-medium">6+ Years Experience</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3 text-yellow-500" />
                            <span className="text-yellow-600 dark:text-yellow-400 font-medium">₹30Cr+ Revenue Impact</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="font-bold text-lg text-blue-600 dark:text-blue-400">12+</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Products Shipped</div>
                        </div>
                        <div>
                          <div className="font-bold text-lg text-purple-600 dark:text-purple-400">50+</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Features Delivered</div>
                        </div>
                        <div>
                          <div className="font-bold text-lg text-green-600 dark:text-green-400">95%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">User Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Spacer for centering */}
            <div className="flex-1"></div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              
              {/* Premium Resume Button */}
              <motion.button
                aria-label="Download resume PDF"
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span className="nav-link caption-text font-medium">Resume</span>
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.button>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={isOpen}
                  aria-controls="mobile-navigation"
                  className="p-2 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Horizontal separator line */}
          <div className="hidden lg:block">
            <div className="mx-6 border-t border-gray-300/60 dark:border-gray-500/60"></div>
          </div>
          
          {/* Second line with navigation pills */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-center py-3">
              <div className="flex items-center space-x-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      aria-label={`Navigate to ${item.name} section`}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-slate-800/50"
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? "text-white" : "text-current"
                      }`} />
                      <span className="nav-link caption-text font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full"
                          layoutId="activeIndicator"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ x: "-50%" }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              role="navigation"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden mt-2 mx-4 bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      aria-label={`Navigate to ${item.name} section`}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-slate-800/50"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <div className={`p-2 rounded-lg ${
                        isActive ? "bg-white/20" : `bg-gradient-to-r ${item.color}`
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          isActive ? "text-white" : "text-white"
                        }`} />
                      </div>
                      <span className="font-heading font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-white rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
                
                <motion.button
                  aria-label="Download resume PDF"
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center space-x-3 mt-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <div className="p-2 rounded-lg bg-white/20">
                    <Download className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-heading font-medium">Download Resume</span>
                  <motion.div
                    className="ml-auto w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  )
}