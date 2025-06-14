import { ReactNode } from 'react';

interface FAQItem {
  title: string;
  content: ReactNode;
}

export const FaqList: FAQItem[] = [
  {
    title: "What is this platform, and who is it for?",
    content: (
      <>
        Our platform provides Web3 developers and teams with the essential tools to build, deploy, and manage decentralized applications effortlessly. Whether you're an individual developer, a startup, or an enterprise, we help you scale faster.
      </>
    )
  },
  {
    title: "Is the platform suitable for beginners in Web3?",
    content: (
      <>
        Absolutely! Our intuitive interface, pre-built APIs, and robust support make it easy for beginners to get started while offering advanced features for seasoned developers.
      </>
    )
  },
  {
    title: "Do you offer a free plan?",
    content: (
      <>
        Yes, our <a href="/pricing">Starter Plan is completely free</a> and perfect for small projects or individual developers exploring Web3 development.
      </>
    )
  },
  {
    title: "Can I upgrade or downgrade my plan anytime?",
    content: (
      <>
        Of course. You can upgrade, downgrade, or cancel your subscription at any time directly from your account settings.
      </>
    )
  },
  {
    title: "How do you ensure the security of my data and smart contracts?",
    content: (
      <>
        We use bank-level encryption, perform automated smart contract audits, and offer multi-layered access control to keep your data and dApps secure.
      </>
    )
  },
  {
    title: "Is my project data private?",
    content: (
      <>
        Yes, all your project data is fully private. Only you and those you grant access to can view or manage your projects.
      </>
    )
  },
  {
    title: "Which blockchains does your platform support?",
    content: (
      <>
        We currently support major blockchains including Ethereum, Solana, Binance Smart Chain, and Polygon, with more being added regularly.
      </>
    )
  },
  {
    title: "Can I connect third-party tools like GitHub or Slack?",
    content: (
      <>
        Yes, our platform integrates seamlessly with popular tools like <a href="#">GitHub</a>, <a href="#">Slack</a>, and CI/CD pipelines to enhance your workflow.
      </>
    )
  },
  {
    title: "How can I contact support?",
    content: (
      <>
        You can reach our support team via email or live chat directly through the platform. We also offer priority support for Pro and Enterprise users.
      </>
    )
  },
  {
    title: "Do you offer onboarding assistance?",
    content: (
      <>
        Yes, we provide onboarding guidance, including documentation, video tutorials, and live demos to help you get started quickly.
      </>
    )
  }
];