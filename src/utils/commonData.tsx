import {IcnFacebook, IcnInstagram, IcnLinkedin, IcnX} from "@assets/icons";


export const NavItems = [
  { label: "Home", url: "/" },
  { label: "About Us", url: "/about" },
  { label: "Pricing", url: "/pricing" },
  { label: "Blog", url: "/blog" },
  { label: "Integration", url: "/integration" },
  { label: "FAQ", url: "/faq" },
  { label: "Contact", url: "/contact" }
];

export const SocialNavItems = [
  {
    label: "X",
    url: "https://twitter.com/nexora",
    icon: <IcnX/>,
  },
  {
    label: "Instagram",
    url: "https://instagram.com/nexora",
    icon: <IcnInstagram/>,
  },
  {
    label: "Facebook",
    url: "https://facebook.com/nexora",
    icon: <IcnFacebook/>,
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/company/nexora",
    icon: <IcnLinkedin/>,
  }
];

export const FooterNavItems = [
  {
    id: 1,
    category: "Company",
    links: [
      {
        label: "About Us",
        url: "/about",
        isExternal: false
      },
      {
        label: "Careers",
        url: "/careers",
        isExternal: false
      },
      {
        label: "Press",
        url: "/press",
        isExternal: false
      },
      {
        label: "Blog",
        url: "/blog",
        isExternal: false
      },
      {
        label: "Contact Us",
        url: "/contact",
        isExternal: false
      }
    ]
  },
  {
    id: 2,
    category: "Features",
    links: [
      {
        label: "Multi-Chain Access",
        url: "/features/multi-chain",
        isExternal: false
      },
      {
        label: "AI-Driven Smart Contracts",
        url: "/features/smart-contracts",
        isExternal: false
      },
      {
        label: "Node Deployment",
        url: "/features/node-deployment",
        isExternal: false
      },
      {
        label: "Analytics Dashboard",
        url: "/features/analytics",
        isExternal: false
      }
    ]
  },
  {
    id: 3,
    category: "Resources",
    links: [
      {
        label: "Documentation",
        url: "/docs",
        isExternal: false
      },
      {
        label: "API Reference",
        url: "/api",
        isExternal: false
      },
      {
        label: "Community Forum",
        url: "https://community.nexora.com",
        isExternal: true
      },
      {
        label: "FAQs",
        url: "/faqs",
        isExternal: false
      }
    ]
  },
  {
    id: 4,
    category: "Get Started",
    links: [
      {
        label: "Pricing Plans",
        url: "/pricing",
        isExternal: false
      },
      {
        label: "Demo",
        url: "/demo",
        isExternal: false
      },
      {
        label: "Contact Sales",
        url: "/contact-sales",
        isExternal: false
      }
    ]
  }
];

export const LegalNavItems = [
  {
    label: "Privacy Policy",
    url: "/privacy-policy",
    isExternal: false
  },
  {
    label: "Terms & Condition",
    url: "/terms-conditions",
    isExternal: false
  },
  {
    label: "Security Policy",
    url: "/security-policy",
    isExternal: false
  }
];


export const SectionLogoBannerList = [
  {
    title: "Discord",
    image: "/images/logo-discord.svg"
  },
  {
    title: "Square",
    image: "/images/logo-square.svg"
  },
  {
    title: "Slack",
    image: "/images/logo-slack.svg"
  },
  {
    title: "GitHub",
    image: "/images/logo-github.svg"
  },
  {
    title: "GitLab",
    image: "/images/logo-gitlab.svg"
  },
  {
    title: "Framer",
    image: "/images/logo-framer.svg"
  },
  {
    title: "Google",
    image: "/images/logo-google.svg"
  },
  {
    title: "Coinbase",
    image: "/images/logo-coinbase.svg"
  },
  {
    title: "Stripe",
    image: "/images/logo-stripe.svg"
  },
];

export const SectionTestimonialList = [
  {
    quote: "As a solo developer, I always struggled with juggling tools. This platform has been a game-changer, it's like having a whole team in one app!",
    image: "https://i.pravatar.cc/150?img=21",
    name: "Jordan M.",
    jobTitle: "Indie Developer",
    function: "Solo Developer"
  },
  {
    quote: "Their community support is top-notch. I got answers to my questions in minutes, and their guides are super helpful for beginners and pros alike.",
    image: "https://i.pravatar.cc/150?img=2",
    name: "Evan K.",
    jobTitle: "Smart Contract Developer",
    function: "Community Advocate"
  },
  {
    quote: "We needed to build and launch our dApp fast, and this platform delivered. The AI-driven contract builder saved us weeks of work!",
    image: "https://i.pravatar.cc/150?img=6",
    name: "Rachel T.",
    jobTitle: "Founder of NovaChain",
    function: "Startup Founder"
  },
  {
    quote: "Our team of 20 used to spend hours syncing across platforms. Now, we collaborate effortlessly and deploy in half the time. This is a must-have!",
    image: "https://i.pravatar.cc/150?img=10",
    name: "Michael L.",
    jobTitle: "Lead Engineer at Decentro Labs",
    function: "Enterprise Team Lead"
  },
  {
    quote: "As someone new to Web3, I found the tools easy to use and incredibly powerful. The interactive demo was the perfect introduction!",
    image: "https://i.pravatar.cc/150?img=32",
    name: "Sofia G.",
    jobTitle: "Blockchain Enthusiast",
    function: "Web3 Enthusiast"
  }
];
