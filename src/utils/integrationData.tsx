import IcnBinance from "@assets/images/icn-binance.svg";
import IcnDataDog from "@assets/images/icn-data-dog.svg";
import IcnDiscord from "@assets/images/icn-discord.svg";
import IcnGithub from "@assets/images/icn-github.svg";
import IcnGoogleAnalytics from "@assets/images/icn-google-analytics.svg";
import IcnJenkins from "@assets//images/icn-jenkins.svg";
import IcnPolygon from "@assets/images/icn-polygon.svg";
import IcnSlack from "@assets/images/icn-slack.svg";
import IcnSolana from "@assets/images/icn-solana.svg";
import IcnTrello from "@assets/images/icn-trello.svg";

export const IntegrationCards = [
  {
    id: 'binance-smart-chain',
    title: 'Binance Smart Chain',
    text: 'Tap into the BSC ecosystem for faster and more affordable transactions.',
    icon: <IcnBinance/>,
    category: 'blockchain-networks'
  },
  {
    id: 'datadog',
    title: 'Datadog',
    text: 'Track the performance of your dapps and infrastructure with Datadog\'s advanced monitoring tools.',
    icon: <IcnDataDog/>,
    category: 'monitoring-analytics'
  },
  {
    id: 'discord',
    title: 'Discord',
    text: 'Engage your community or team by integrating Discord for real-time discussions.',
    icon: <IcnDiscord/>,
    category: 'communication-collaboration'
  },
  {
    id: 'github',
    title: 'GitHub',
    text: 'Keep your code organized with seamless GitHub integration for version control and collaboration.',
    icon: <IcnGithub/>,
    category: 'development-tools'
  },
  {
    id: 'google-analytics',
    title: 'Google Analytics',
    text: 'Engage your community or team by integrating Discord for real-time discussions.',
    icon: <IcnGoogleAnalytics/>,
    category: 'monitoring-analytics'
  },
  {
    id: 'jenkins',
    title: 'Jenkins',
    text: 'Automate your build and deployment process with Jenkins CI/CD pipelines.',
    icon: <IcnJenkins/>,
    category: 'development-tools'
  },
  {
    id: 'polygon',
    title: 'Polygon',
    text: 'Scale faster with lower transaction costs using Polygon\'s Layer 2 solution.',
    icon: <IcnPolygon/>,
    category: 'blockchain-networks'
  },
  {
    id: 'slack',
    title: 'Slack',
    text: 'Stay in sync with your team by receiving deployment and issue alerts directly in Slack.',
    icon: <IcnSlack/>,
    category: 'communication-collaboration'
  },
  {
    id: 'solana',
    title: 'Solana',
    text: 'Build high-speed dapps with Solana\'s lightning-fast blockchain network.',
    icon: <IcnSolana/>,
    category: 'blockchain-networks'
  },
  {
    id: 'trello',
    title: 'Trello',
    text: 'Manage tasks and workflows by linking Trello boards to your project dashboard.',
    icon: <IcnTrello/>,
    category: 'communication-collaboration'
  }
];

export const IntegrationCategories = [
  {
    value: 'all-integrations',
    label: 'All Integrations'
  },
  {
    value: 'blockchain-networks',
    label: 'Blockchain Networks'
  },
  {
    value: 'development-tools',
    label: 'Development Tools'
  },
  {
    value: 'communication-collaboration',
    label: 'Communication & Collaboration'
  },
  {
    value: 'monitoring-analytics',
    label: 'Monitoring & Analytics'
  }
];