import React from 'react'
import Logo from '@/components/ui/Logo'
import Button from '../ui/Button'

function NavigationBar() {
  return (
    <div className="flex w-[962px] h-[56px] items-center gap-[40px] px-2 py-2 overflow-hidden rounded-lg bg-neutral-400/10">
      <div className="flex flex-col w-[99px] h-[32px] gap-2 pt-2">
        <Logo type="icon-text" />
      </div>
      <div className="flex w-[668px] h-[24px] items-center gap-3xl text-neutral-0">
        <p>Home</p>
        <p>About</p>
        <p>Contact</p>
      </div>
      <div className="flex flex-col w-[99px] h-[40px] items-center gap-2">
        <Button
          color="secondary"
          size="medium"
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default NavigationBar