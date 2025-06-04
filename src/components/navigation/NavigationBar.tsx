import React from 'react'
import Logo from '@/components/ui/Logo'
import LinkedButton from '@/components/ui/LinkedButton'
import Button from '@/components/ui/Button'

function NavigationBar() {
  return (
    <div className="bg-neutral-950 min-h-screen w-full flex flex-col items-center p-2 gap-2 h-[80px] px-36 pt-6">
      <div className="p-2 bg-neutral-400/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-400/10 backdrop-blur-xl inline-flex justify-start items-center gap-10">
        <div className="pl-2 inline-flex flex-col justify-start items-start gap-2">
          <Logo type="icon-text" color="#fff" />
        </div>
        <div className="self-stretch inline-flex justify-center items-center gap-10">
          <LinkedButton size="medium" variant="white" href="/">Home</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">About Us</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">Pricing</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">Blog</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">Integration</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">FAQ</LinkedButton>
          <LinkedButton size="medium" variant="white" href="#">Contact</LinkedButton>
        </div>
        <div className="w-24 inline-flex flex-col justify-start items-end gap-2">
          <Button 
            color="secondary" 
            size="medium"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar