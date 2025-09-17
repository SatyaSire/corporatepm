'use client'

import React, { useState } from 'react'
import { Navigation } from './navigation'
import WelcomePopup from './welcome-popup'
import AIExploration from './ai-exploration'
import ScrollToTop from './scroll-to-top'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showAIExploration, setShowAIExploration] = useState(false)

  const handleAIExplore = () => {
    setShowAIExploration(true)
  }

  const handleBackToManual = () => {
    setShowAIExploration(false)
  }

  if (showAIExploration) {
    return <AIExploration onBack={handleBackToManual} />
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <WelcomePopup onAIExplore={handleAIExplore} />
      <ScrollToTop />
    </>
  )
}