import 'swiper/css';
import 'swiper/css/free-mode';
import "@/styles/index.scss";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://proforgeerp.com'),
  title: {
    default: "ProForge ERP | Construction Management Software",
    template: "%s | ProForge ERP"
  },
  description: "Power your construction business with ProForge ERP - The only ERP built for AIA billing and Union compliance. Streamline operations with job costing, certified payroll, and work-in-progress tracking.",
  keywords: ["construction erp", "aia billing software", "union compliance software", "construction management", "job costing", "certified payroll", "work in progress tracking"],
  authors: [{ name: "ProForge ERP LLC" }],
  creator: "ProForge ERP LLC",
  publisher: "ProForge ERP LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://proforgeerp.com/',
    siteName: 'ProForge ERP',
    title: 'ProForge ERP | Construction Management Software',
    description: 'Power your construction business with ProForge ERP - The only ERP built for AIA billing and Union compliance.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ProForge ERP - Construction Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@proforgeerp',
    title: 'ProForge ERP | Construction Management Software',
    description: 'Power your construction business with ProForge ERP - The only ERP built for AIA billing and Union compliance.',
    images: ['/twitter-image.jpg'],
    creator: '@proforge',
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  },
  alternates: {
    canonical: 'https://proforgeerp.com/',
  },
};

export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <SessionProvider>
          <div className="c-body-bg"/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
