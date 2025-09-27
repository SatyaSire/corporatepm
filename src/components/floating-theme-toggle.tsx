'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'

export default function FloatingThemeToggle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed bottom-24 right-8 z-50"
    >
      <div className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300">
        <ThemeToggle />
      </div>
    </motion.div>
  )
}