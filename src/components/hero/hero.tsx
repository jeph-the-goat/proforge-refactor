import React from 'react'
import Button from '../ui/Button'
import HeroImage from '../images/HeroImage'
import EventBar, { EventBarProps } from './event-bar'

const HeroContent = {
  heading: "Streamline your Construction Workflow",
  subheading: "From multi-chain access to AI-driven smart contracts, our platform simplifies Web3 development.",
}

const EventBarContent: EventBarProps = {
  infoText: "Level Up Your Web3 Game",
  linkText: "Join Free Webinar",
  linkHref: "/",
}

function Hero() {
  return (
    <section className="h-screen w-full bg-neutral-950 flex flex-col justify-center items-center gap-10 p-9xl">
      {/* Top Info Bar */}
      <EventBar {...EventBarContent} />
      {/* Main Content */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Heading */}
        <h2
          className="text-[64px] leading-[72px] font-semibold font-['Inter'] text-center bg-gradient-to-b from-white to-[#99a0ae] bg-clip-text text-transparent tracking-[-2.56px] max-w-[700px] mx-auto break-words"
          style={{ letterSpacing: '-2.56px' }}
        >
          {HeroContent.heading}
        </h2>
        {/* Subheading */}
        <p
          className="text-[16px] leading-[28px] font-normal font-['Inter'] text-[#cacfd8] text-center max-w-[481px] tracking-[-0.32px] mx-auto"
          style={{ letterSpacing: '-0.32px' }}
        >
          {HeroContent.subheading}
        </p>
      </div>
      {/* Buttons */}
      <div className="flex flex-row gap-3">
        <Button color="primary" size="large" className="w-[150px]">Get Started</Button>
        <Button color="neutral" size="large" className="w-[150px]">Learn More</Button>
      </div>
      <HeroImage />
    </section>
  )
}

export default Hero