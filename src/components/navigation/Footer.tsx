import React from 'react'
import { Logo } from '@/components/ui/Logo'
import { SocialMediaIcons } from '@/icons/SocialMediaIcons'
import LinkedButton from '@/components/ui/LinkedButton'
import FooterCTAImage from '../images/FooterCTAImage'
import Button from '../ui/Button'

const SocialMediaIconContainer = () => {
  return (
    <div className="inline-flex justify-start items-start gap-6">
      <SocialMediaIcons icon="X" className="text-neutral-0 w-6 h-6 relative" uri="#" />
      <SocialMediaIcons icon="Instagram" className="text-neutral-0 w-6 h-6 relative" uri="#" />
      <SocialMediaIcons icon="Facebook" className="text-neutral-0 w-6 h-6 relative" uri="#" />
      <SocialMediaIcons icon="LinkedIn" className="text-neutral-0 w-6 h-6 relative" uri="#" />
    </div>
  )
}

const FooterCTA = () => {
  return (
    <div className="flex flex-col py-8xl px-9xl">
      <div className="flex flex-col gap-2 bg-neutral-950 border border-primary-500 rounded-xl overflow-hidden">
        <div className="flex p-7xl flex-col items-center justify-center gap-5xl self-stretch relative">
          <FooterCTAImage />
          <div className="flex flex-col items-center justify-center self-stretch">
            <h3 className="text-[64px] leading-[72px] font-semibold font-['Inter'] text-center bg-gradient-to-b from-white to-[#99a0ae] bg-clip-text text-transparent tracking-[-1.44px]">
              Ready to Transform Your Business?
            </h3>
            <p className="text-[#99A0AE] text-base font-normal font-['Inter'] leading-7 tracking-[-0.32px] text-center mt-2">
              Join Nexora today and experience the future of blockchain technology.
            </p>
            <Button color="primary" size="large" className="mt-8">Get Started - For Free</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CTA = () => {
  return (
    <div className="relative w-full">
      {/* Background split */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="h-1/2 bg-neutral-950 w-full" />
        <div className="h-1/2 bg-neutral-900 w-full" />
      </div>

      {/* CTA content on top */}
      <div className="relative">
        <FooterCTA />
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <div className="relative w-full">
      <CTA />
      <footer className="bg-neutral-900 w-full relative">
        <div className="flex flex-col gap-16 px-[140px] py-[120px]">
          <div className="self-stretch inline-flex justify-start items-center gap-14">
          {/* Top Row: Logo & Socials */}
          <div className="flex flex-row gap-14 items-center w-full">
            {/* Logo & Address */}
            <div className="flex flex-col gap-3 min-w-52">
              <div className="w-52 inline-flex justify-start items-center gap-2">
                {/* Logo SVG */}
                  <Logo className="text-neutral-0 w-9 h-9" />
                  <span className="text-neutral-0 text-2xl font-semibold font-['Inter'] leading-[48px]">Nexora</span>
              </div>
              <span className="text-center justify-start text-text-soft300 text-base font-normal font-['Inter'] leading-7">
                9330 N Court Street, Elmiraland 93666
              </span>
              </div>
            </div>
            {/* Social Icons */}
            <SocialMediaIconContainer />
          </div>

          {/* Middle Row: Links */}
          <div className="self-stretch inline-flex justify-start items-start gap-16">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <span className="text-center justify-start text-text-soft300 text-base font-normal font-['Inter'] leading-7">Company</span>
              <LinkedButton href="#" variant="white" size="medium">About Us</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">Careers</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">Press</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">Blog</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">Contact Us</LinkedButton>
            </div>
            {/* Features */}
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <span className="text-center justify-start text-text-soft300 text-base font-normal font-['Inter'] leading-7">Features</span>
              <LinkedButton href="#" variant="white" size="medium">Multi-Chain Access</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">AI-Driven Smart Contracts</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">Node Deployment</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">Analytics Dashboard</LinkedButton>
            </div>
            {/* Resources */}
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <span className="text-center justify-start text-text-soft300 text-base font-normal font-['Inter'] leading-7">Resources</span>
              <LinkedButton href="#" variant="white" size="medium">Documentation</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">API Reference</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">Community Forum</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">FAQs</LinkedButton>
            </div>
            {/* Get Started */}
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <span className="text-center justify-start text-text-soft300 text-base font-normal font-['Inter'] leading-7">Get Started</span>
              <LinkedButton href="#" variant="white" size="medium">Pricing Plans</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">Demo</LinkedButton>
              <LinkedButton href="#" variant="white" size="medium">Contact Sales</LinkedButton>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-text-strong700" />

          {/* Bottom Row: Copyright */}
          <div className="self-stretch inline-flex justify-center items-center gap-16">
            <div className="flex-1 self-stretch justify-start text-neutral-400 text-sm font-normal font-['Inter'] leading-normal">
              &copy; 2025 All Rights Reserved 
            </div>
            <LinkedButton
              href="#"
              variant="gray"
              size="medium"
            >
              Privacy Policy
            </LinkedButton>
            <LinkedButton
              href="#"
              variant="gray"
              size="medium"
            >
              Terms & Condition
            </LinkedButton>
            <LinkedButton
              href="#"
              variant="gray"
              size="medium"
            >
              Security Policy
            </LinkedButton>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { Footer }