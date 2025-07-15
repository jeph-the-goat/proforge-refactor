import IcnStarter from "@assets/images/icn-pricing-starter.svg";
import IcnPro from "@assets/images/icn-pricing-pro.svg";
import IcnEnterprise from "@assets/images/icn-pricing-business.svg";
import { ReactNode } from "react";
import { cButtonColors } from "@/types";

export interface PlanProps extends cButtonColors {
  id: string;
  name: string;
  description: string;
  price: string;
  priceAmount: number | null;
  period: string | null;
  btnText: string;
  popular: boolean;
  icon: ReactNode;
  features: string[];
  userCount: number;
  bestFor: string;
  blockchainConnections: string;
  smartContractAutomation: string;
  apiRequests: string;
  analytics: string;
  support: string;
  customIntegrations: string;
  securityCompliance: string;
  [key: string]: string | number | boolean | ReactNode | string[] | null | undefined;
}

export const Plans: PlanProps[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individual developers and small projects.',
    price: 'Free',
    priceAmount: 0,
    period: null,
    btnText: 'Start for Free',
    btnColor: undefined,
    popular: false,
    icon: <IcnStarter/>,
    features: [
      'Connect up to 2 blockchains',
      'Basic smart contract automation',
      'Limited API requests (10k/month)',
      'Community support'
    ],
    userCount: 1,
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
    description: 'Great for startups and teams ready to scale.',
    price: '$99',
    priceAmount: 99,
    period: 'month',
    btnText: 'Go Pro',
    btnColor: 'dark',
    popular: true,
    icon: <IcnPro/>,
    features: [
      'Connect up to 5 blockchains',
      'Advanced smart contract automation',
      'Unlimited API requests',
      'Real-time analytics dashboard',
      'Priority support'
    ],
    userCount: 5,
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
    description: 'Tailored for large teams and enterprise-grade projects.',
    price: 'Custom Pricing',
    priceAmount: null,
    period: null,
    btnText: 'Contact Us',
    btnColor: 'white',
    popular: false,
    icon: <IcnEnterprise/>,
    features: [
      'Unlimited blockchain connections',
      'AI-powered contract builder',
      'Dedicated account manager',
      'Custom integrations',
      'Enterprise-level security & compliance'
    ],
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

export interface ComparePlansLabelProps {
  [key: string]: string;
}

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