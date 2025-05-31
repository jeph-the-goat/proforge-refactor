'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'icon' | 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'neutral' | 'error'
  onClick?: () => void
}

function Button({ className, size = 'medium', color = 'primary', children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
      'flex items-center justify-center gap-1 rounded-sm font-inter border-gradient-radius border border-neutral-0/20 border-solid',
      'hover:shadow-sm hover:[box-shadow:inset_0_-2px_4px_rgba(14,18,27,0.3),_0_16px_24px_-8px_rgba(24,27,37,0.1)]0',
      'active:shadow-sm active:[box-shadow:inset_0_-2px_4px_rgba(14,18,27,0.3),_0_16px_24px_-8px_rgba(24,27,37,0.1)]0',
      size === 'icon' && 'w-[52px] h-[52px] gap-1',
      size === 'small' && 'w-[116px] h-[36px] gap-1 text-sm font-semibold',
      size === 'medium' && 'w-[124px] h-[40px] gap-1 text-sm font-semibold',
      size === 'large' && 'w-[155px] h-[52px] gap-1 text-md font-semibold',
      color === 'primary' && 'bg-primary-500 text-neutral-0 hover:bg-primary-400 active:bg-primary-800 disabled:bg-primary-950 hover:shadow-primary-400 active:shadow-primary-800 focus:shadow-primary-800 focus:[box-shadow:_0_0_0_4px_rgba(108,82,255,0.1),_0_0_0_1px_rgba(76,30,227,1),_0_16px_24px_-8px_rgba(24,27,37,0.1),inset_0_2px_4px_rgba(14,18,27,0.3)] focus:bg-primary-800',
      color === 'secondary' && 'bg-secondary-500 text-neutral-0 hover:bg-secondary-400 active:bg-secondary-600 disabled:bg-secondary-950 hover:shadow-secondary-700 active:shadow-secondary-700',
      color === 'neutral' && 'bg-neutral-500 text-neutral-0 hover:bg-neutral-400 active:bg-neutral-600 disabled:bg-neutral-950 hover:shadow-neutral-700 active:shadow-neutral-700',
      color === 'error' && 'bg-error-500 text-neutral-0 hover:bg-error-400 active:bg-error-600 disabled:bg-error-950 hover:shadow-error-700 active:shadow-error-700',
      className
      )}
        {...props}
      >
        {children}
    </button>
  )
}

export default Button