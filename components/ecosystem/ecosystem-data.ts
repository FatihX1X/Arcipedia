export type EcosystemCategory =
  | 'All'
  | 'DeFi'
  | 'Wallets'
  | 'Infrastructure'
  | 'Payments'
  | 'Trading'
  | 'Tools';

export type EcosystemProject = {
  name: string;
  description: string;
  category: Exclude<EcosystemCategory, 'All'>;
  logoUrl: string;
  website: string;
};

export const ecosystemCategories: EcosystemCategory[] = [
  'All',
  'DeFi',
  'Wallets',
  'Infrastructure',
  'Payments',
  'Trading',
  'Tools',
];

export const ecosystemProjects: EcosystemProject[] = [
  { name: 'Aave', description: 'Leading DeFi lending protocol', category: 'DeFi', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=A', website: 'https://aave.com' },
  { name: 'Curve', description: 'Best stablecoin exchange', category: 'DeFi', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=C', website: 'https://curve.fi' },
  { name: 'Axelar', description: 'Cross-chain interoperability', category: 'Infrastructure', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=AX', website: 'https://axelar.network' },
  { name: 'Crossmint', description: 'Crypto developer tools & NFTs', category: 'Tools', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=CM', website: 'https://crossmint.com' },
  { name: 'Blockradar', description: 'Stablecoin infrastructure', category: 'Infrastructure', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=BR', website: 'https://blockradar.co' },
  { name: 'Copperx', description: 'Stablecoin banking', category: 'Payments', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=CP', website: 'https://www.copperx.io' },
  { name: 'ZKP2P', description: 'On-chain stablecoin protocol', category: 'DeFi', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=ZK', website: 'https://zkp2p.xyz' },
  { name: 'Sequence', description: 'Universal trading platform', category: 'Trading', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=SQ', website: 'https://sequence.xyz' },
  { name: 'Hinkal', description: 'Zero-knowledge wallet', category: 'Wallets', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=HK', website: 'https://hinkal.pro' },
  { name: 'Para', description: 'Wallet infrastructure', category: 'Wallets', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=PA', website: 'https://para.xyz' },
  { name: 'CFi', description: 'Personalized finance', category: 'DeFi', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=CF', website: 'https://cfi.trade' },
  { name: 'Uniswap Labs', description: 'Leading DEX', category: 'DeFi', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=UNI', website: 'https://uniswap.org' },
  { name: 'Alchemy', description: 'Web3 developer platform', category: 'Tools', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=AL', website: 'https://alchemy.com' },
  { name: 'Thirdweb', description: 'Full-stack web3 toolkit', category: 'Tools', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=TW', website: 'https://thirdweb.com' },
  { name: 'Fireblocks', description: 'Enterprise custody', category: 'Infrastructure', logoUrl: 'https://via.placeholder.com/96x96/0b1220/22d3ee?text=FB', website: 'https://www.fireblocks.com' },
];
