import React from 'react'
import AboutSection from "../About/AboutSection";
import AboutHero from "../About/AboutHero";
import AboutStory from "../About/AboutStory";
import AboutFeatures from "../About/AboutFeatures";
const About = () => {
  return (
  
  <div dir="rtl" className="w-full bg-gray-50">
      <AboutSection/>
      <AboutHero />

      <main className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-24">
        <AboutStory />
        <AboutFeatures />
      </main>
    </div>
  )
}

export default About

