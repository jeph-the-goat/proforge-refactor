import IcnStarter from "@assets/images/icn-pricing-starter.svg";
import IcnPro from "@assets/images/icn-pricing-pro.svg";
import IcnEnterprise from "@assets/images/icn-pricing-business.svg";

import {ReactNode} from "react";
import {cButtonColors} from "@/types";

export interface PricingPlanProps extends cButtonColors {
  id: string;
  icon: ReactNode;
  mostPopular: boolean;
  name: string;
  description: string;
  price: string;
  priceAmount: number | null;
  period: string | null;
  popular: boolean;
  features: string[];
  btnText: string;
}

export const Pricings: PricingPlanProps[] = [
  {
    id: 'starter',
    icon: <IcnStarter/>,
    mostPopular: false,
    name: 'Starter',
    description: 'Perfect for individual developers and small projects.',
    price: 'Free',
    priceAmount: 0,
    period: null,
    popular: false,
    features: [
      'Connect up to 2 blockchains',
      'Basic smart contract automation',
      'Limited API requests (10k/month)',
      'Community support'
    ],
    btnText: 'Start for Free',
    btnColor: undefined,
  },
  {
    id: 'pro',
    icon: <IcnPro/>,
    mostPopular: true,
    name: 'Pro',
    description: 'Great for startups and teams ready to scale.',
    price: '$99',
    priceAmount: 99,
    period: 'month',
    popular: true,
    features: [
      'Connect up to 5 blockchains',
      'Advanced smart contract automation',
      'Unlimited API requests',
      'Real-time analytics dashboard',
      'Priority support'
    ],
    btnText: 'Go Pro',
    btnColor: 'dark'
  },
  {
    id: 'enterprise',
    icon: <IcnEnterprise/>,
    mostPopular: false,
    name: 'Enterprise',
    description: 'Tailored for large teams and enterprise-grade projects.',
    price: 'Custom Pricing',
    priceAmount: null,
    period: null,
    popular: false,
    features: [
      'Unlimited blockchain connections',
      'AI-powered contract builder',
      'Dedicated account manager',
      'Custom integrations',
      'Enterprise-level security & compliance'
    ],
    btnText: 'Contact Us',
    btnColor: 'white'
  }
];


export interface ComparePlansProps extends cButtonColors{
  id: string;
  name: string;
  price: string;
  btnText: string;
  popular: boolean;
  bestFor: string;
  blockchainConnections: string;
  smartContractAutomation: string;
  apiRequests: string;
  analytics: string;
  support: string;
  customIntegrations: string;
  securityCompliance: string;
  [key: string]: string | boolean | undefined;
}

export interface ComparePlansLabelProps {
  [key: string]: string;
}

export const ComparePlans: ComparePlansProps[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    btnText: 'Start for Free',
    btnColor: undefined,
    popular: false,
    bestFor: 'Beginners & small teams',
    blockchainConnections: 'Connect up to 2 blockchains',
    smartContractAutomation: 'Basic',
    apiRequests: 'Limited (10k/month)',
    analytics: 'Not Included',
    support: 'Community support',
    customIntegrations: 'Not Included',
    securityCompliance: 'Standard'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99/month',
    btnText: 'Go Pro',
    btnColor: 'dark',
    popular: true,
    bestFor: 'Growing teams & businesses',
    blockchainConnections: 'Connect up to 5 blockchains',
    smartContractAutomation: 'Advanced',
    apiRequests: 'Unlimited',
    analytics: 'Real-time dashboard',
    support: 'Priority support',
    customIntegrations: 'Not Included',
    securityCompliance: 'Enhanced'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom Price',
    btnText: 'Contact Us',
    btnColor: 'white',
    popular: false,
    bestFor: 'Large enterprises',
    blockchainConnections: 'Unlimited blockchain',
    smartContractAutomation: 'AI-powered contract builder',
    apiRequests: 'Unlimited',
    analytics: 'Real-time + custom reporting',
    support: 'Dedicated account manager',
    customIntegrations: 'Available',
    securityCompliance: 'Enterprise-level security'
  }
];

export const ComparePlansLabels:ComparePlansLabelProps = {
  bestFor: 'Best For',
  price: 'Price',
  blockchainConnections: 'Blockchain Connections',
  smartContractAutomation: 'Smart Contract Automation',
  apiRequests: 'API Requests',
  analytics: 'Analytics',
  support: 'Support',
  customIntegrations: 'Custom Integrations',
  securityCompliance: 'Security & Compliance'
};