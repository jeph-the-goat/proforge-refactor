import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Avatar component for displaying user profile images
 * @component
 * @example
 * ```tsx
 * <Avatar
 *   image="/path/to/image.jpg"
 *   alt="User's name"
 *   size="md"
 * />
 * ```
 */
export interface AvatarProps {
  /** The URL of the avatar image */
  image: string;
  /** The size of the avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Alt text for the avatar image */
  alt: string;
  /** Additional className for the avatar container */
  className?: string;
}

const sizeMap = {
  xs: { class: 'w-6 h-6', pixels: 24 },
  sm: { class: 'w-8 h-8', pixels: 32 },
  md: { class: 'w-10 h-10', pixels: 40 },
  lg: { class: 'w-12 h-12', pixels: 48 },
  xl: { class: 'w-14 h-14', pixels: 56 },
  '2xl': { class: 'w-16 h-16', pixels: 64 },
} as const;

export function Avatar({
  image,
  size = 'md',
  alt,
  className,
}: AvatarProps) {
  const { class: sizeClass, pixels } = sizeMap[size];
  
  return (
    <div 
      className={cn(
        'relative inline-block',
        sizeClass,
        className
      )}
      role="img"
      aria-label={alt}
    >
      <Image 
        src={image} 
        alt={alt}
        className="w-full h-full object-cover rounded-full"
        width={pixels}
        height={pixels}
        priority={size === 'lg' || size === 'xl' || size === '2xl'}
      />
    </div>
  )
}

export default Avatar