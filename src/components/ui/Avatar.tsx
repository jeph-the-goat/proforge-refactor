import Image from 'next/image'

interface AvatarProps {
  extraClassName?: string;
  image: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Avatar = ({
  image,
  alt,
  size = 'md',
}: AvatarProps) => {
  return (
    <div
      role="img"
      aria-label={alt}
    >
      <Image 
        src={image} 
        alt={alt}
        className="c-avatar"
        width={30}
        height={30}
        priority={size === 'lg' || size === 'xl' || size === '2xl'}
      />
    </div>
  )
}
