import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface LinkedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gray' | 'black' | 'primary' | 'error' | 'white'
  size?: 'small' | 'medium' | 'large'
  underline?: boolean
  onClick?: () => void
  href?: string
  disabled?: boolean
}

const sizes = {
  large: 'text-md font-medium font-[\'Inter\'] px-4 py-0 gap-1 items-center justify-center inline-flex rounded-xs',
  medium: 'text-sm font-medium font-[\'Inter\'] px-4 py-0 gap-1 items-center justify-center inline-flex rounded-xs',
  small: 'text-xs font-medium font-[\'Inter\'] px-0 py-0 gap-1 items-center justify-center inline-flex rounded-xs',
}

const colors = {
  gray:    'text-neutral-500 hover:underline focus:text-neutral-950 focus:underline',
  black:   'text-neutral-950 hover:underline focus:underline',
  primary: 'text-primary-400 hover:text-primary-800 focus:text-primary-800 hover:underline focus:underline',
  error:   'text-error-500 hover:text-error-400 focus:text-error-500 hover:underline focus:underline',
  white:   'text-neutral-0 hover:underline focus:underline',
}

function LinkedButton({ className, size = 'medium', variant = 'primary', underline, children, href, disabled, ...props }: LinkedButtonProps) {
  const classes = cn(
    sizes[size],
    colors[variant],
    underline ? 'underline underline-offset-2' : '',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
    disabled ? 'pointer-events-none opacity-60' : '',
    className
  )

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : props.onClick}
      >
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props} disabled={disabled}>
      {children}
    </button>
  )
}

export default LinkedButton