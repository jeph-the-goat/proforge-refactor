import React from 'react'
import Logo from '@/components/ui/Logo'
import LinkedButton from '@/components/ui/LinkedButton'
import Button from '@/components/ui/Button'

function NavigationBar() {
  return (
    <div className="bg-neutral-950 min-h-screen w-full flex flex-col items-center pt-6 px-[140px] gap-2 h-[80px]">
      <div className="flex flex-row items-center p-2 gap-[40px] w-[962px] h-[56px] 
        bg-[rgba(153,160,174,0.1)] border border-[rgba(153,160,174,0.1)] 
        backdrop-blur-[28px] rounded-lg box-border">
        <div className="flex flex-col items-start pl-2 gap-2 w-[99px] h-[32px]">
          <Logo type="icon-text" color="#fff" />
        </div>
        <div className="flex flex-row justify-center items-center gap-[40px] w-[668px] h-6 order-1 flex-none">
          <LinkedButton size="medium" variant="white" href="/">Home</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">About Us</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">Pricing</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">Blog</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">Integration</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">FAQ</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">Contact</LinkedButton>
        </div>
        <div className="flex flex-col items-end gap-2 w-[99px] h-[40px] order-3">
          <Button color="secondary" size="medium">
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar