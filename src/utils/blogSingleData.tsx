import {ReactNode} from "react";
import {IcnFacebook, IcnInstagram, IcnLinkedin, IcnX} from "@assets/icons";

export interface SocialShareProps {
  url: string;
  title: string;
  description?: string;

}

export interface BlogShareButton {
  id: string;
  name: string;
  icon: ReactNode;
  getShareUrl: (url: string, title: string, description: string) => string | null;
  ariaLabel: string;
}

export const BlogShareButtons: BlogShareButton[] = [
  {
    id: 'twitter',
    name: 'X',
    icon: <IcnX />,
    getShareUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    ariaLabel: 'Share on X (Twitter)',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <IcnInstagram />,
    getShareUrl: () => null, // Instagram doesn't support direct URL sharing
    ariaLabel: 'Copy link for Instagram',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <IcnFacebook />,
    getShareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    ariaLabel: 'Share on Facebook',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <IcnLinkedin />,
    getShareUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    ariaLabel: 'Share on LinkedIn',
  },
];