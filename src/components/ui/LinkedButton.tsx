import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface LinkedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gray' | 'black' | 'primary' | 'error' | 'white'
  size?: 'small' | 'medium' | 'large'
  underline?: boolean
  onClick?: () => void
  href?: string
}

const sizes = {
  large: 'text-md font-medium w-[132px] h-[28px] px-0 py-0 gap-1 items-center justify-center inline-flex',
  medium: 'text-sm font-medium w-[122px] h-[24px] px-0 py-0 gap-1 items-center justify-center inline-flex',
  small: 'text-xs w-[106px] h-[16px] px-0 py-0 gap-1 items-center justify-center inline-flex',
}

const colors = {
  gray: 'text-neutral-500',
  black: 'text-neutral-950',
  primary: 'text-primary-400',
  error: 'text-error-500',
  white: 'text-neutral-0',
}

function LinkedButton({ className, size = 'medium', variant = 'primary', underline, children, href, ...props }: LinkedButtonProps) {
  const classes = cn(
    sizes[size],
    colors[variant],
    underline ? 'underline underline-offset-2' : '',
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default LinkedButton