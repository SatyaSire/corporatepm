import { HeroSection } from '@/components/hero-section'
import CaseStudies from '@/components/case-studies'
import AboutTimeline from '@/components/about-timeline'
import SkillsShowcase from '@/components/skills-showcase'
import ProductRoadmap from '@/components/product-roadmap'
import PersonasJourney from '@/components/personas-journey'
import ContactDetails from '@/components/contact-details'

export default function Home() {
  return (
    <main className="">
      <section id="hero" aria-label="Hero section">
        <HeroSection />
      </section>
      
      <section id="skills" aria-label="Skills showcase section">
        <SkillsShowcase />
      </section>
      
      <section id="about" aria-label="About and timeline section">
        <AboutTimeline />
      </section>
      
      <section id="case-studies" aria-label="Case studies section">
        <CaseStudies />
      </section>
      
      <section id="roadmap" aria-label="Product roadmap section">
        <ProductRoadmap />
      </section>
      
      <section id="personas" aria-label="User personas and journey section">
        <PersonasJourney />
      </section>
      
      <section id="contact" aria-label="Contact section">
        <ContactDetails />
      </section>
    </main>
  )
}
