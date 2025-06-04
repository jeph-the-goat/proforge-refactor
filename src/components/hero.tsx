import React from 'react'
import Button from './ui/Button'
import LinkedButton from './ui/LinkedButton'
import Image from 'next/image'

const AVATAR_PLACEHOLDER = 'https://via.placeholder.com/28x28.png?text=A';

const HeroImage = () => {
  return (
    <div className="h-[500px]">
      <Image src="/hero-image.svg" alt="hero" className="w-full h-full" width={1160} height={500} />
    </div>
  )
}

const EventBar = ({infoText, linkText, linkHref}: {infoText: string, linkText: string, linkHref: string}) => {
  return (
    <div className="flex flex-row items-center justify-center bg-[rgba(153,160,174,0.10)] rounded-xl px-4 py-2 gap-4">
        {/* Avatars */}
        <div className="flex flex-row items-center -space-x-3">
          <img src={AVATAR_PLACEHOLDER} alt="avatar" className="w-7 h-7 rounded-full border-2 border-white" />
          <img src={AVATAR_PLACEHOLDER} alt="avatar" className="w-7 h-7 rounded-full border-2 border-white" />
          <img src={AVATAR_PLACEHOLDER} alt="avatar" className="w-7 h-7 rounded-full border-2 border-white" />
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-neutral-950 border-2 border-white">+10</div>
        </div>
        {/* Info Text */}
        <span className="text-[14px] leading-[24px] font-normal text-[#99a0ae] tracking-[-0.28px] ml-3">{infoText}</span>
        {/* Link Button */}
        <LinkedButton variant="white" size="small" className="ml-3 font-medium" href={linkHref}>{linkText}</LinkedButton>
    </div>
  )
}

function Hero() {
  return (
    <section className="h-screen w-full bg-neutral-950 flex flex-col justify-center items-center px-6 md:px-32 pt-32 pb-10 gap-10">
      {/* Top Info Bar */}
      <EventBar infoText="Level Up Your Web3 Game" linkText="Join Free Webinar" linkHref="/" />
      {/* Main Content */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Heading */}
        <h2
          className="text-[64px] leading-[72px] font-semibold font-['Inter'] text-center bg-gradient-to-b from-white to-[#99a0ae] bg-clip-text text-transparent tracking-[-2.56px] max-w-[700px] mx-auto break-words"
          style={{ letterSpacing: '-2.56px' }}
        >
          Revolutionize Web3 Development
        </h2>
        {/* Subheading */}
        <p
          className="text-[16px] leading-[28px] font-normal font-['Inter'] text-[#cacfd8] text-center max-w-[481px] tracking-[-0.32px] mx-auto"
          style={{ letterSpacing: '-0.32px' }}
        >
          From multi-chain access to AI-driven smart contracts, our platform simplifies Web3 development.
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