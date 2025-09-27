"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-md border border-gray-600/80 dark:border-gray-400/80 transition-all duration-300">
      <motion.button
        onClick={toggleTheme}
        className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 dark:bg-slate-700/50 hover:bg-white/30 dark:hover:bg-slate-600/50 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: theme === "dark" ? -1 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-label="Toggle theme"
      >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 180 : 0,
          scale: theme === "dark" ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-yellow-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : -180,
          scale: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-blue-400" />
      </motion.div>
    </motion.button>
    </div>
  )
}