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
      'flex items-center justify-center gap-1 rounded-sm font-inter',
      size === 'icon' && 'w-[52px] h-[52px] gap-1',
      size === 'small' && 'w-[116px] h-[36px] gap-1 text-sm font-semibold',
      size === 'medium' && 'w-[124px] h-[40px] gap-1 text-sm font-semibold',
      size === 'large' && 'w-[155px] h-[52px] gap-1 text-md font-semibold',
      color === 'primary' &&
        'bg-primary-500 text-neutral-0 hover:bg-primary-400 active:bg-primary-800 disabled:bg-primary-950 ' +
        'hover:shadow-primary-400 active:shadow-primary-800 focus:shadow-primary-800 ' +
        '[box-shadow:0_0_0_1px_#4c1ee3,0_16px_24px_-8px_#181b251a,inset_0_2px_4px_#0e121b4d,inset_0_-2px_4px_rgba(14,18,27,0.3),inset_0_2px_6px_rgba(255,255,255,1)]' +
        'focus:[box-shadow:_0_0_0_4px_#6c52ff1a,_0_0_0_1px_#4c1ee3,_0_16px_24px_-8px_#181b251a,inset_0_2px_4px_#0e121b4d] ' +
        'focus:bg-primary-800 border-gradient-radius border border-neutral-0/20 border-solid ' +
        'hover:shadow-sm hover:[box-shadow:inset_0_-2px_4px_#0e121b4d,_0_16px_24px_-8px_#181b251a] ' +
        'active:shadow-sm active:[box-shadow:inset_0_-2px_4px_#0e121b4d,_0_16px_24px_-8px_#181b251a] ' +
        'focus:[box-shadow:0_0_0_4px_#6c52ff1a,_0_0_0_1px_#4c1ee3,_0_16px_24px_-8px_#181b251a,inset_0_2px_4px_#0e121b4d] ' +
        'focus:bg-primary-800',
      color === 'secondary' && 
        'bg-neutral-50 text-neutral-950 hover:bg-neutral-0 active:bg-neutral-50 focus:bg-neutral-50 ' +
        'disabled:bg-neutral-950 border-gradient-radius border border-neutral-0 border-solid ' +
        '[box-shadow:0_0_0_1px_rgba(225,228,234,0.2),0_16px_24px_-8px_rgba(24,27,37,0.1),inset_0_-2px_4px_rgba(14,18,27,0.2),inset_0_2px_6px_rgba(255,255,255,1)] ' +
        'hover:[box-shadow:0_0_0_1px_rgba(225,228,234,0.2),0_16px_24px_-8px_rgba(24,27,37,0.1),inset_0_-2px_4px_rgba(14,18,27,0.2),inset_0_2px_6px_rgba(255,255,255,1)] '+
        'active:[box-shadow:inset_0_2px_4px_rgba(14,18,27,0.1),0_0_0_1px_rgba(225,228,234,1),0_16px_24px_-8px_rgba(24,27,37,0.1)] ' +
        'focus:[box-shadow:0_0_0_4px_rgba(153,160,174,0.1),inset_0_2px_4px_rgba(14,18,24,0.1),0_0_0_1px_rgba(225,228,234,1),0_16px_24px_-8px_rgba(24,27,37,0.1)]',
      color === 'neutral' && 
        'bg-neutral-800 text-neutral-0 hover:bg-neutral-600 active:bg-neutral-800 focus:bg-neutral-800 disabled:bg-neutral-950 ' +
        '[box-shadow:0_0_0_1px_rgba(34,37,48,1),0_16px_24px_-8px_rgba(24,27,37,0.1),inset_0_-2px_4px_0_rgba(14,18,27,1),inset_0_2px_6px_0_rgba(255,255,255,0.2)] ' +
        'hover:[box-shadow:0_0_0_1px_rgba(34,37,48,1),0_16px_24px_-8px_rgba(24,27,37,0.1),inset_0_-2px_4px_0_rgba(14,18,27,1)] ' + 
        'active:[box-shadow:inset_0_2px_4px_0_rgba(14,18,27,1),0_0_0_1px_rgba(34,37,48,1),0_16px_24px_-8px_rgba(24,27,37,0.1)] ' +
        'focus:[box-shadow:0_0_0_4px_rgba(153,160,174,0.1),inset_0_2px_4px_0_rgba(14,18,27,1),0_0_0_1px_rgba(34,37,48,1),0_16px_24px_-8px_rgba(24,27,37,0.1)] ' +
        'transition-all',
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