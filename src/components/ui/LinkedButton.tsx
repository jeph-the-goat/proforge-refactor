import React from 'react'
import { cn } from '@/lib/utils'

export interface LinkedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gray' | 'black' | 'primary' | 'error' | 'white'
  size?: 'small' | 'medium' | 'large'
  underline?: boolean
  onClick?: () => void
}

function LinkedButton({ className, size = 'medium', color = 'primary', children, ...props }: LinkedButtonProps) {
  return (
    <div>LinkedButton</div>
  )
}

export default LinkedButton