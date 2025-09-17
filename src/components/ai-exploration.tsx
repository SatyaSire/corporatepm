'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, Bot, User, Sparkles, MessageCircle, Phone, Mail, Linkedin } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface AIExplorationProps {
  onBack: () => void
}

export default function AIExploration({ onBack }: AIExplorationProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Initial AI greeting
    const initialMessage: Message = {
      id: '1',
      content: "Hi there! 👋\n\nI'm here to help you learn about my product management journey! Feel free to ask me anything about my background, skills, projects, or just chat about PM life in general.\n\nWhat would you like to know first?",
      sender: 'ai',
      timestamp: new Date()
    }
    setMessages([initialMessage])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response (in real implementation, this would call an AI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, messages)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string, previousMessages: Message[]): string => {
    const input = userInput.toLowerCase()
    const hasAskedAbout = (topic: string) => 
       previousMessages.some(msg => msg.sender === 'user' && msg.content.toLowerCase().includes(topic))
    
    // Product Manager specific responses
    if (input.includes('experience') || input.includes('years')) {
      if (hasAskedAbout('experience') || hasAskedAbout('years')) {
        return "Since we were just talking about my experience... 😊\n\nYou know what's funny? The biggest lesson from those 6 years wasn't technical at all. It was learning that the best product decisions come from the messiest conversations.\n\nLike this one time, our engineering team was convinced we needed to rebuild everything from scratch. Sales wanted more features. Users were asking for simplicity. I spent a week just listening to everyone, then found a solution that made everyone (mostly) happy.\n\nHave you ever been in one of those situations where everyone wants something different? How did you handle it?"
      }
      return "Hey there! 👋\n\nSo I've been in the product management world for over 6 years now, and wow - what a ride it's been!\n\nI've bounced around fintech, e-commerce, and SaaS. Each one taught me something totally different. Like, fintech taught me about compliance and trust, e-commerce showed me the power of scale, and SaaS? That's where I learned to really obsess over user retention.\n\nThe ₹30+ Crores in revenue impact sounds fancy, but honestly, it just represents a bunch of late nights, failed experiments, and those magical moments when everything clicks.\n\nWhat got you curious about my background? Are you in product too, or thinking about making the jump?"
    }
    
    if (input.includes('skill') || input.includes('technical')) {
      if (hasAskedAbout('skill') || hasAskedAbout('technical')) {
        return "Building on what we discussed about my skills... 🔧\n\nHere's something I didn't mention - I'm a bit obsessed with automation. Not the 'replace humans' kind, but the 'let's not do this boring task 50 times' kind.\n\nI once spent a weekend building a simple script that automated our weekly reporting. Saved the team 3 hours every week! The engineers were impressed, and I felt like a wizard. 🧙‍♂️\n\nDo you have any experience with automating repetitive tasks? Or are you more on the strategy side of things?"
      }
      return "Oh, the tools of the trade! 🛠️\n\nI'm pretty cozy with the usual suspects:\n• Product Strategy & User Research\n• Figma (love collaborating with designers)\n• Jira & analytics platforms (keeping the beautiful chaos organized)\n• APIs & system architecture (enough to not constantly bug our engineers! 😅)\n\nBut honestly? The real skills are the soft ones. Reading between the lines in user feedback, translating business speak to engineer speak, knowing when to push back and when to pivot.\n\nWhat's your experience with these tools? Or are you more on the business side of things?"
    }
    
    if (input.includes('project') || input.includes('product')) {
      if (hasAskedAbout('project') || hasAskedAbout('product')) {
        return "Since you're interested in my projects, here's a behind-the-scenes story! 🎬\n\nRemember that feature I mentioned that nobody used? It was a 'smart recommendation' system. We spent 3 months building it, launched with fanfare, and... crickets. 🦗\n\nTurns out users didn't want smart recommendations - they wanted better search. Sometimes the simplest solution is the right one!\n\nThat failure taught me to always validate assumptions early. Now I prototype everything first.\n\nHave you ever built something you were sure would be amazing, only to discover users wanted something completely different?"
      }
      return "You know what I'm most proud of? 🎯\n\nI've shipped 12+ products and 50+ features with 95% user satisfaction. Sounds great on paper, right? But the real win was watching users actually stick around because we made their lives easier.\n\nFrom fintech payment solutions to e-commerce platforms and SaaS products - each one taught me something new about what breaks (spoiler: everything) and what doesn't.\n\nBut failures? Oh boy, I've got stories there too! Want to hear about the time we built a feature literally nobody used? 😂\n\nWhat kind of products are you working on? Or curious about?"
    }
    
    if (input.includes('leadership') || input.includes('team')) {
      if (hasAskedAbout('leadership') || hasAskedAbout('team')) {
        return "You know, thinking more about team leadership... 💭\n\nThe hardest part isn't managing up or down - it's managing sideways. Getting marketing, sales, engineering, and design all rowing in the same direction? That's the real challenge!\n\nI've learned that pizza helps. Seriously! Some of our best alignment sessions happened over lunch. People are more collaborative when they're not hangry.\n\nWhat's your experience with cross-functional collaboration? Any tricks that have worked for you?"
      }
      return "Leading teams is honestly my favorite part! 🚀\n\nHere's what I've learned: the best products come from the best teams, not the other way around.\n\nMy philosophy?\n• Keep communication crystal clear (no corporate BS)\n• Let data guide decisions (but trust your gut too)\n• Never forget the human element\n\nI try to create spaces where everyone feels heard. Whether it's the junior dev with a brilliant idea or the designer pushing back on something that doesn't make sense.\n\nWhat's your experience with cross-functional teams? Love 'em or... well, let's just say it's complicated? 😄"
    }
    
    if (input.includes('contact') || input.includes('hire') || input.includes('job')) {
      return "I may make mistakes as I'm learning right now, but hey, I'm always excited to chat about new opportunities! 🚀\n\nFor the real details about hiring or job opportunities, let's connect directly:\n\n📧 Email: [contact email]\n📱 Phone: [contact number]\n💼 LinkedIn: [LinkedIn profile]\n\nI'd love to hear about what you're building! What kind of role are you thinking about?"
    }
    
    if (input.includes('salary') || input.includes('compensation')) {
      return "I may make mistakes as I'm learning right now, but for the nitty-gritty details about compensation and salary expectations, let's have a proper conversation! 💬\n\nFeel free to reach out directly - I'm always happy to discuss how we can make things work for everyone.\n\nWhat kind of opportunity are you exploring?"
    }
    
    // Check if this is a follow-up question
    if (input.includes('what about') || input.includes('tell me more') || input.includes('how about') || input.includes('and you')) {
      return "I love that you're digging deeper! 🔍\n\nBased on what we've been chatting about, I can share more specific insights. What particular aspect would you like me to elaborate on?\n\nOr if you want to switch gears completely, I'm all ears! Sometimes the best conversations happen when we explore unexpected connections.\n\nWhat's on your mind?"
    }
    
    // Default responses
    const defaultResponses = [
      "That's a great question! 🤔\n\nI've got quite a bit of experience in product strategy and execution, but I'd love to know what specific aspect caught your interest?\n\nAlways happy to dive deeper! What's on your mind?",
      "Ooh, interesting question! 💡\n\nI've been building user-centric products for a while now. What would you like to know more about?\n• The technical side\n• Leadership experiences\n• Specific project stories\n\nWhat sounds most interesting to you?",
      "I'm excited you're curious about my background! 🎉\n\nProduct development and strategy have been such a fun journey. What particular aspect would you like to explore together?\n\nI love a good product conversation!"
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Explore Manually</span>
            </motion.button>
            
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Product Manager Assistant</h1>
            </div>
            
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800/95 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600/80 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 transition-all duration-300">
          {/* Messages */}
          <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <div className="whitespace-pre-wrap">
                      {message.content.split('\n').map((line, index) => (
                        <div key={index} className={index > 0 ? 'mt-2' : ''}>
                          {line}
                        </div>
                      ))}
                    </div>
                    <p className={`text-xs mt-2 opacity-70 ${
                      message.sender === 'user' ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700/80 p-4 rounded-2xl">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about this Product Manager's experience, skills, or projects..."
                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                disabled={isTyping}
              />
              <motion.button
                onClick={handleSendMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setInputValue('Hey! I\'d love to hear about your PM journey - how did you get started and what\'s been the most exciting part?')}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-left hover:shadow-lg transition-all duration-200"
          >
            <Sparkles className="w-5 h-5 text-purple-500 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">My Journey 🚀</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Let's chat about my PM story</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setInputValue('What\'s in your PM toolkit? I\'m curious about the skills that have made the biggest difference for you!')}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-left hover:shadow-lg transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5 text-blue-500 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Skills & Tools 🛠️</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Explore my favorite PM tools</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setInputValue('I\'d love to hear about a project you\'re really proud of! What made it special and what did you learn?')}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-left hover:shadow-lg transition-all duration-200"
          >
            <Phone className="w-5 h-5 text-green-500 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Cool Projects ✨</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Stories from the trenches</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setInputValue('Got any golden advice for someone interested in product management? What do you wish you knew starting out?')}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-left hover:shadow-lg transition-all duration-200"
          >
            <FileText className="w-5 h-5 text-orange-500 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">PM Wisdom 💡</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Career tips & insights</p>
          </motion.button>
        </div>
      </div>
    </div>
  )
}