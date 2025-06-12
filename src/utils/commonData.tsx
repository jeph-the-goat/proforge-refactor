import {IcnFacebook, IcnInstagram, IcnLinkedin, IcnX} from "../../public/icons";

export const NavItems = [
  { label: "Home", url: "/" },
  { label: "About Us", url: "/about-us" },
  { label: "Pricing", url: "/pricing" },
  { label: "Blog", url: "/blog" },
  { label: "Integration", url: "/intergration" },
  { label: "FAQ", url: "/faq" },
  { label: "Contact", url: "/contact" }
];


// Social Links Array
export const SocialLinkNavItems = [
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

// Footer Menu Items Array
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

// Footer Legal Items Array
export const FooterLegalNavItems = [
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