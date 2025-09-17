'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, MousePointer, FileText } from 'lucide-react'

interface WelcomePopupProps {
  onClose?: () => void
  onAIExplore?: () => void
}

export default function WelcomePopup({ onClose, onAIExplore }: WelcomePopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)

  useEffect(() => {
    // Show popup after a short delay on every page load
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setHasBeenShown(true)
    onClose?.()
  }

  const handleExplore = () => {
    setIsVisible(false)
    setHasBeenShown(true)
    onClose?.()
    
    // Smooth scroll to the about section
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAIExplore = () => {
    setIsVisible(false)
    setHasBeenShown(true)
    onAIExplore?.()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            onClick={handleClose}
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl p-6 max-w-2xl w-full mx-4 shadow-2xl border border-white/20 dark:border-gray-700/50"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Close welcome popup"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Header with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-6"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="inline-block mb-4"
              >
                <Sparkles className="w-12 h-12 text-purple-500 mx-auto" />
              </motion.div>
              
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Welcome to the Journey of a Product Manager
              </h1>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mb-6"
            >
              <div className="space-y-4 mb-6">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-base font-semibold text-gray-800 dark:text-gray-200"
                >
                  Let's End the Era of Traditional Resumes
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  This isn't just another resume - it's an interactive experience that tells my story as a Product Manager. 
                  Every element is clickable, every section reveals insights, and every interaction showcases my approach to product thinking.
                </motion.p>
              </div>

              {/* Interactive Elements Hint */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-3 mb-4 border border-blue-200/50 dark:border-blue-700/50"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MousePointer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-800 dark:text-blue-300">Everything is Interactive!</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Click, hover, and explore every section to discover my complete professional journey
                </p>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-col gap-3"
            >
              <motion.button
                onClick={handleExplore}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MousePointer className="w-5 h-5" />
                Start Exploring Manually
              </motion.button>
              
              <motion.button
                onClick={handleAIExplore}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Start Exploring using AI
              </motion.button>
            </motion.div>

            {/* Bottom Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4"
            >
              This popup appears only once per session
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}