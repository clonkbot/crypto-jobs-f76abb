import { Job } from '../types';

const companies = [
  { name: 'Ethereum Foundation', logo: 'ETH' },
  { name: 'Polygon Labs', logo: 'POLY' },
  { name: 'Chainlink', logo: 'LINK' },
  { name: 'Uniswap', logo: 'UNI' },
  { name: 'Aave', logo: 'AAVE' },
  { name: 'OpenSea', logo: 'OS' },
  { name: 'Coinbase', logo: 'CB' },
  { name: 'Binance', logo: 'BNB' },
  { name: 'Solana Labs', logo: 'SOL' },
  { name: 'Avalanche', logo: 'AVAX' },
  { name: 'Arbitrum', logo: 'ARB' },
  { name: 'Optimism', logo: 'OP' },
  { name: 'dYdX', logo: 'DYDX' },
  { name: 'Lido', logo: 'LDO' },
  { name: 'MakerDAO', logo: 'MKR' },
  { name: 'Compound', logo: 'COMP' },
  { name: 'Curve Finance', logo: 'CRV' },
  { name: 'SushiSwap', logo: 'SUSHI' },
  { name: 'Blur', logo: 'BLUR' },
  { name: 'Magic Eden', logo: 'ME' },
];

const engineeringTitles = [
  'Senior Solidity Developer',
  'Blockchain Engineer',
  'Smart Contract Auditor',
  'Protocol Engineer',
  'Full Stack Web3 Developer',
  'Rust Blockchain Developer',
  'ZK Engineer',
  'DeFi Protocol Developer',
  'NFT Platform Engineer',
  'Layer 2 Systems Engineer',
  'Security Researcher',
  'Backend Engineer (Node.js)',
  'Frontend Engineer (React)',
  'DevOps Engineer',
  'Cairo Developer',
];

const designTitles = [
  'Senior Product Designer',
  'UI/UX Designer - Web3',
  'Brand Designer',
  'Visual Designer',
  'Design Lead',
  'Motion Designer',
];

const marketingTitles = [
  'Growth Marketing Manager',
  'Content Marketing Lead',
  'Social Media Manager',
  'Community Marketing',
  'Web3 Marketing Strategist',
  'Influencer Relations',
];

const communityTitles = [
  'Community Manager',
  'Discord Moderator',
  'Developer Relations',
  'Community Lead',
  'Ecosystem Lead',
  'Ambassador Program Manager',
];

const productTitles = [
  'Product Manager - DeFi',
  'Senior Product Manager',
  'Technical Product Manager',
  'Product Lead',
  'Product Analyst',
];

const operationsTitles = [
  'Operations Manager',
  'People Operations',
  'Finance Manager',
  'Legal Counsel - Crypto',
  'Compliance Officer',
  'Business Development',
];

const locations = [
  'Remote',
  'San Francisco, CA',
  'New York, NY',
  'London, UK',
  'Singapore',
  'Dubai, UAE',
  'Berlin, Germany',
  'Lisbon, Portugal',
  'Miami, FL',
  'Austin, TX',
  'Zurich, Switzerland',
  'Hong Kong',
];

const sources = [
  'LinkedIn',
  'crypto.jobs',
  'web3.career',
  'cryptocurrencyjobs.co',
  'remote3.co',
  'angellist.com',
  'Indeed',
  'Company Website',
];

const tags = [
  'Solidity', 'Rust', 'TypeScript', 'React', 'Node.js', 'Python',
  'DeFi', 'NFT', 'DAO', 'L2', 'ZK-Proofs', 'Smart Contracts',
  'Web3', 'Ethereum', 'Polygon', 'Solana', 'Arbitrum', 'Optimism',
  'Remote-First', 'Startup', 'Token Compensation', 'Equity',
];

const types: Job['type'][] = ['full-time', 'part-time', 'contract', 'freelance'];
const categories: Job['category'][] = ['engineering', 'design', 'marketing', 'community', 'product', 'operations'];

const salaryRanges = [
  '$80k - $120k',
  '$100k - $150k',
  '$120k - $180k',
  '$150k - $220k',
  '$180k - $280k',
  '$200k - $350k',
  '$250k - $400k+',
  'Competitive + Tokens',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomTags(): string[] {
  const count = Math.floor(Math.random() * 3) + 2;
  const shuffled = [...tags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getTitleForCategory(category: Job['category']): string {
  switch (category) {
    case 'engineering':
      return getRandomItem(engineeringTitles);
    case 'design':
      return getRandomItem(designTitles);
    case 'marketing':
      return getRandomItem(marketingTitles);
    case 'community':
      return getRandomItem(communityTitles);
    case 'product':
      return getRandomItem(productTitles);
    case 'operations':
      return getRandomItem(operationsTitles);
  }
}

export function generateJobs(count: number): Job[] {
  const jobs: Job[] = [];

  for (let i = 0; i < count; i++) {
    const company = getRandomItem(companies);
    const category = getRandomItem(categories);
    const location = getRandomItem(locations);

    jobs.push({
      id: `job-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
      title: getTitleForCategory(category),
      company: company.name,
      logo: company.logo,
      location,
      type: getRandomItem(types),
      category,
      salary: getRandomItem(salaryRanges),
      tags: getRandomTags(),
      postedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      source: getRandomItem(sources),
      featured: Math.random() > 0.85,
      remote: location === 'Remote' || Math.random() > 0.5,
    });
  }

  return jobs.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
}