import styles from "@/styles/Avatar.module.scss";
import Image from 'next/image'
import {clsx} from "clsx";

interface AvatarProps {
  extraClassName?: string;
  image: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md'; // xs:28px sm:32px md:40px default:48px
}

export const Avatar = (
  {
    image,
    alt,
    size,
  }: AvatarProps) => {
  const getAvatarSize = () => {
    switch (size) {
      case 'xs':
        return 28;
      case 'sm':
        return 32;
      case 'md':
        return 40;
      default:
        return 48;
    }
  };

  const avatarSize = getAvatarSize();

  return (
    <i
      className={clsx(styles.cAvatar, "c-avatar")}
      aria-label={alt}
      role="img"
      data-size={size}
    >
      <Image
        src={image}
        alt={alt}
        width={avatarSize}
        height={avatarSize}
      />
    </i>
  )
}
