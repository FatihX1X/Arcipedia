import { useState, useEffect, useRef } from "react";

const ARTICLES = {
  home: { title: "Arcipedia", isHome: true },
  "arc-network": {
    title: "Arc Network",
    category: "Core",
    summary: "An open Layer-1 blockchain purpose-built for onchain finance with stablecoins, deterministic finality, and predictable fees.",
    sections: [
      {
        heading: "Overview",
        body: `Arc is an EVM-compatible Layer-1 blockchain designed for onchain finance. It combines predictable fiat-based fees using stablecoins as gas, sub-second deterministic finality, and opt-in configurable privacy to support payments, lending, capital markets, and FX at scale.\n\nArc is purpose-built for real-world economic activity, not general-purpose computation. Each design choice directly supports the needs of financial applications.`,
      },
      {
        heading: "Network Details",
        table: [
          ["Property", "Value"],
          ["Consensus", "Malachite BFT"],
          ["Execution Environment", "EVM"],
          ["Gas Token", "USDC"],
          ["Finality", "Deterministic, sub-second"],
          ["Validator Participation", "Permissioned"],
          ["Developer Access", "Permissionless"],
        ],
      },
      {
        heading: "Stablecoins on Arc",
        body: `USDC is the native gas token on Arc, so transaction fees are denominated in dollars. The base fee targets $0.01 per transaction and uses an EIP-1559-style smoothing mechanism. Arc also supports EURC for euro-denominated transfers. Both are available on the Circle Faucet for testnet development.`,
      },
      {
        heading: "Industry Recognition",
        body: `Arc has attracted design partners from across the financial industry:\n\n"Arc's design — integrating stablecoin-based gas fees, deterministic finality, and programmable interoperability — offers a strong environment to explore how trusted payments networks can connect to and help scale emerging onchain infrastructure." — Cuy Sheffield, Head of Crypto, Visa\n\n"Deepening our longstanding work with Circle as an early design partner, Mastercard is exploring how we can help shape Arc's foundation to enable secure, simple payment experiences across both fiat and stablecoin rails." — Raj Dhamodharan, EVP Blockchain & Digital Assets, Mastercard\n\n"We're excited to be part of an initiative that tests how programmable settlement and interoperable FX workflows can enhance regulated markets." — Mathew McDermott, Global Head of Digital Assets, Goldman Sachs`,
      },
    ],
    tags: ["Layer-1", "EVM", "Blockchain", "Stablecoin"],
    related: ["deterministic-finality", "stable-fee-design", "arc-use-cases"],
  },
  "arc-use-cases": {
    title: "Arc Use Cases",
    category: "Core",
    summary: "Arc is purpose-built for real-world financial and commercial applications — from payments and FX to AI agents and capital markets.",
    sections: [
      {
        heading: "The Economic OS for the Internet",
        body: `Arc is built for a future where money, markets, and software operate as one programmable system across the internet-native economy. It supports financial applications that need instant deterministic settlement, 24/7 market access, transparent predictable fees, programmable execution, and integrated stablecoin liquidity.`,
      },
      {
        heading: "Use Cases",
        table: [
          ["Use Case", "Description"],
          ["Agentic Economy", "Autonomous AI agents coordinate, contract, and settle value in real time"],
          ["Stablecoin FX", "Real-time onchain FX with transparent pricing and instant settlement"],
          ["Peer-to-Peer Payments", "Instant, low-cost transfers with deterministic settlement"],
          ["Treasury Management", "Stablecoin-powered treasury with embedded wallets and programmable liquidity"],
          ["Prediction Markets", "Capital-efficient markets with real-time price signals and instant settlement"],
          ["Lending & Borrowing", "Instant stablecoin settlement with automated collateral logic"],
          ["Asset Tokenization", "Issue and manage tokenized real-world assets with optional privacy"],
          ["Onchain FX", "24/7 onchain FX between stablecoins via Circle StableFX"],
          ["Cross-Border Payments", "Global payments with instant settlement and dollar-based fees"],
          ["Capital Markets", "Sub-second finality supporting high-frequency trading and real-time risk"],
        ],
      },
      {
        heading: "Multichain Liquidity Hub",
        body: `Arc is designed to aggregate stablecoin and tokenized asset liquidity. With CCTP and Gateway, liquidity is programmatically accessible for capital formation and value exchange across the multichain ecosystem. Teams can anchor core financial workflows — settlement, collateral, treasury, issuance — on Arc while interoperating with Ethereum and Solana.`,
      },
    ],
    tags: ["Use Cases", "Finance", "Payments", "FX", "AI Agents"],
    related: ["arc-network", "ai-agents", "app-kit"],
  },
  "arc-house": {
    title: "Arc House & Architects",
    category: "Community",
    summary: "Arc House is the community hub for Arc Network. Architects is the program that recognizes and rewards meaningful ecosystem contributions.",
    sections: [
      {
        heading: "What is Arc House?",
        body: `Arc House is the new home for the Arc community. It brings programs, events, discussions, recognition, and ecosystem activity into one shared space. Arc House serves as the central hub where builders, developers, and community members can connect, collaborate, and contribute to the Arc ecosystem.`,
      },
      {
        heading: "The Architects Program",
        body: `Architects is the community program designed to recognize and reward meaningful contributions across the Arc ecosystem. The program creates a clearer path for community members to contribute, grow, and be recognized.\n\nKey elements of the program include:\n\n• Points system for tracking contributions\n• Tiers based on accumulated points and engagement\n• Benefits and perks tied to tier progression\n• Roles within the community structure\n• Recognition for ecosystem activity`,
      },
      {
        heading: "How to Get Started",
        body: `Join Arc House at community.arc.network. From there you can:\n\n• Participate in community discussions and forums\n• Attend live events and watch replays\n• Earn points through meaningful contributions\n• Progress through Architect tiers\n• Connect with other builders in the ecosystem\n\nArchitects are independent community participants and are not employees or agents of Circle Technology Services, LLC.`,
      },
      {
        heading: "Community Channels",
        table: [
          ["Channel", "Link"],
          ["Arc House (Community Hub)", "community.arc.network"],
          ["Arc Discord", "discord.gg/buildonarc"],
          ["Arc on X", "x.com/arc"],
          ["Arc Website", "arc.network"],
        ],
      },
    ],
    tags: ["Community", "Architects", "Arc House", "Events"],
    related: ["arc-network", "arc-on-x", "arc-use-cases"],
  },
  "arc-on-x": {
    title: "Arc on X",
    category: "Community",
    summary: "Arc's official X (Twitter) account @arc is the primary channel for announcements, ecosystem updates, and community engagement.",
    sections: [
      {
        heading: "Official Account",
        body: `Arc's official X account is @arc (x.com/arc). It serves as the primary broadcast channel for network announcements, partnership reveals, ecosystem milestones, and community spotlights.\n\nFollowing @arc on X is the fastest way to stay up to date with Arc's roadmap, testnet progress, and mainnet launch news.`,
      },
      {
        heading: "What Arc Posts",
        table: [
          ["Content Type", "Description"],
          ["Network Announcements", "Protocol upgrades, feature releases, and testnet milestones"],
          ["Partner Reveals", "New ecosystem projects and design partner integrations"],
          ["Community Highlights", "Spotlights on Architects and builder contributions"],
          ["Developer Resources", "Tutorials, quickstarts, and tooling updates"],
          ["Events", "Livestreams, AMAs, and Arc House events"],
        ],
      },
      {
        heading: "Community on X",
        body: `Beyond the official account, the Arc builder community is active on X. Developers, Architects, and ecosystem contributors regularly share projects built on Arc, insights about stablecoin finance, and updates on their work.\n\nUse #BuildOnArc to connect with the community and showcase what you're building.`,
      },
    ],
    tags: ["X", "Twitter", "Social", "Community", "Announcements"],
    related: ["arc-house", "arc-network"],
  },
  "circle-platform": {
    title: "Circle Developer Platform",
    category: "Ecosystem",
    summary: "Circle provides a full-stack developer platform including USDC, CCTP, Gateway, wallets, and AI tools — all integrated with Arc.",
    sections: [
      {
        heading: "Overview",
        body: `Circle is the issuer of USDC and EURC and provides a comprehensive developer platform for building with programmable money. Arc is integrated directly into Circle's full-stack platform, giving Arc developers access to USDC issuance infrastructure, crosschain transfer protocols, institutional on/off-ramps, and developer tooling.`,
      },
      {
        heading: "Core Products",
        table: [
          ["Product", "Description"],
          ["USDC", "Dollar-backed stablecoin, native gas token on Arc"],
          ["EURC", "Euro-backed stablecoin, supported on Arc"],
          ["CCTP", "Cross-Chain Transfer Protocol for native USDC bridging"],
          ["Gateway", "Chain-abstracted USDC balance across multiple EVM chains"],
          ["Developer-Controlled Wallets", "Programmatic wallet infrastructure for apps"],
          ["User-Controlled Wallets", "Self-custodial wallets embedded in apps"],
          ["Modular Wallets", "Composable wallet components"],
          ["Smart Contract Platform", "Circle-managed contract deployment tooling"],
        ],
      },
      {
        heading: "AI-Native Developer Tools",
        body: `Circle offers MCP (Model Context Protocol) server integration and Skills for AI coding assistants:\n\n• Arc MCP Server — Integrate Arc directly into AI development environments\n• Circle Skills — Pre-built skill plugins for Claude Code and Vercel (use-arc, use-usdc, use-circle-wallets, etc.)\n• LLMs.txt — Structured documentation for AI agents at docs.arc.network/llms.txt`,
      },
      {
        heading: "Getting Started",
        body: `Developers can access Circle's full platform at developers.circle.com. The platform provides quickstarts for embedding USDC payments, creating chain-abstracted balances via Gateway, and integrating wallet infrastructure into applications.`,
      },
    ],
    tags: ["Circle", "USDC", "CCTP", "Gateway", "Wallets"],
    related: ["arc-network", "app-kit", "ai-agents"],
  },
  "deterministic-finality": {
    title: "Deterministic Finality",
    category: "Key Features",
    summary: "Transactions on Arc finalize in under one second with no risk of chain reorganization.",
    sections: [
      {
        heading: "What is Deterministic Finality?",
        body: `Unlike probabilistic finality in chains like Ethereum mainnet — where you wait for multiple block confirmations to gain confidence a transaction is settled — Arc provides deterministic finality. Once a transaction is included in a finalized block, it is irreversible. There is no possibility of reorganization.`,
      },
      {
        heading: "Why It Matters for Finance",
        body: `Deterministic finality is essential for financial applications. Payment systems, FX settlement, and lending protocols require certainty that a transaction is final before releasing assets or triggering downstream actions. With sub-second deterministic finality, Arc provides the settlement guarantees that financial infrastructure demands.`,
      },
    ],
    tags: ["Finality", "Settlement", "Consensus"],
    related: ["arc-network", "consensus-layer"],
  },
  "stable-fee-design": {
    title: "Stable Fee Design",
    category: "Key Features",
    summary: "Transaction fees on Arc are denominated in USDC, making costs predictable regardless of token volatility.",
    sections: [
      {
        heading: "USDC as Gas",
        body: `Arc uses USDC as the gas token. This means transaction fees are paid in US dollars, not a volatile native token. The base fee targets $0.01 per transaction — a predictable, fiat-denominated cost that financial applications can account for reliably.`,
      },
      {
        heading: "EIP-1559 Style Mechanism",
        body: `Arc uses an EIP-1559-style base fee smoothing mechanism to keep costs predictable even under varying network load. When demand spikes, fees adjust gradually rather than spiking dramatically.`,
      },
    ],
    tags: ["Fees", "USDC", "Gas", "EIP-1559"],
    related: ["arc-network", "gas-and-fees"],
  },
  "opt-in-privacy": {
    title: "Opt-in Privacy",
    category: "Key Features",
    summary: "Arc supports confidential transfers and selective disclosure for regulated use cases.",
    sections: [
      {
        heading: "Configurable Privacy",
        body: `Arc's opt-in privacy model means that transactions are transparent by default — just like standard EVM chains — but applications and users can selectively enable confidential transfers when needed.`,
      },
      {
        heading: "Selective Disclosure",
        body: `Selective disclosure allows parties to prove the validity of a transaction to specific counterparties (like regulators or auditors) without exposing data to the public. This balances the need for privacy in commercial transactions with compliance requirements.`,
      },
    ],
    tags: ["Privacy", "Compliance", "Confidential Transfers"],
    related: ["arc-network"],
  },
  "consensus-layer": {
    title: "Consensus Layer",
    category: "Network",
    summary: "Arc's consensus layer is built on Malachite, a BFT consensus engine designed for sub-second finality.",
    sections: [
      {
        heading: "Malachite BFT",
        body: `The consensus layer is built on Malachite, a Byzantine Fault Tolerant (BFT) consensus engine. BFT consensus provides deterministic finality: once a block is finalized, it cannot be reverted. Malachite is designed for high throughput and sub-second block times.`,
      },
      {
        heading: "Permissioned Validators",
        body: `Arc uses a permissioned validator set. Validators must be approved to participate in consensus, providing compliance and security guarantees while keeping the network open for developers and users.`,
      },
    ],
    tags: ["BFT", "Malachite", "Validators"],
    related: ["arc-network", "deterministic-finality", "execution-layer"],
  },
  "execution-layer": {
    title: "Execution Layer",
    category: "Network",
    summary: "Arc's execution layer runs the EVM, enabling Solidity contracts and Ethereum tooling without modification.",
    sections: [
      {
        heading: "EVM Runtime",
        body: `The execution layer runs the Ethereum Virtual Machine (EVM). Existing Solidity smart contracts can be deployed on Arc without modification. Standard Ethereum development tools — Hardhat, Foundry, Viem, Ethers.js — work out of the box.`,
      },
      {
        heading: "Separation of Concerns",
        body: `Arc separates consensus from execution so each layer can optimize independently. The consensus layer handles ordering and finality; the execution layer handles computation and state transitions.`,
      },
    ],
    tags: ["EVM", "Solidity", "Smart Contracts"],
    related: ["arc-network", "consensus-layer", "evm-compatibility"],
  },
  "evm-compatibility": {
    title: "EVM Compatibility",
    category: "Reference",
    summary: "Deploy existing Solidity contracts and use standard Ethereum tooling on Arc.",
    sections: [
      {
        heading: "What Works Out of the Box",
        body: `Arc is EVM-compatible:\n\n• Solidity and Vyper contracts\n• Hardhat, Foundry, Truffle\n• Viem, Ethers.js, Web3.js\n• MetaMask and other EVM wallets\n• Standard ABI encoding`,
      },
      {
        heading: "Key Differences",
        body: `Key differences to be aware of:\n\n• Gas token is USDC, not ETH\n• Sub-second block times (vs ~12s on Ethereum)\n• Deterministic finality (no need to wait for confirmations)\n• Some precompiles may differ`,
      },
    ],
    tags: ["EVM", "Ethereum", "Compatibility", "Solidity"],
    related: ["execution-layer", "arc-network"],
  },
  "gas-and-fees": {
    title: "Gas and Fees",
    category: "Reference",
    summary: "Arc's fee model uses USDC as the gas token with a base fee targeting $0.01 per transaction.",
    sections: [
      {
        heading: "Fee Model",
        body: `Arc uses USDC to pay for gas. The base fee targets approximately $0.01 per transaction. Fees use an EIP-1559-style mechanism to smooth out spikes during high demand periods.`,
      },
      {
        heading: "Estimating Fees",
        body: `Standard EVM fee estimation tools work on Arc. Use eth_estimateGas for gas units, and eth_gasPrice or eth_feeHistory for current fee data. The App Kit also provides fee estimation utilities for bridge and swap operations.`,
      },
    ],
    tags: ["Gas", "Fees", "USDC"],
    related: ["stable-fee-design", "arc-network"],
  },
  "app-kit": {
    title: "App Kit",
    category: "Build",
    summary: "A SDK providing Bridge, Swap, and Send capabilities across chains using CCTP and stablecoins.",
    sections: [
      {
        heading: "Overview",
        body: `App Kit is Circle's developer toolkit for building payment and liquidity workflows across chains. It wraps CCTP and provides three core modules:\n\n• Bridge — Transfer USDC across chains\n• Swap — Token swaps on the same chain\n• Send — Wallet-to-wallet transfers on the same chain`,
      },
      {
        heading: "Supported Adapters",
        body: `• Viem (EVM chains)\n• Ethers.js (EVM chains)\n• Solana\n• Circle Wallets`,
      },
      {
        heading: "Installation",
        body: `npm install @circle-fin/bridge-kit\n\n# Full App Kit (Bridge + Swap + Send)\nnpm install @circle-fin/app-kit`,
      },
    ],
    tags: ["SDK", "Bridge", "Swap", "CCTP"],
    related: ["circle-platform", "ai-agents"],
  },
  "ai-agents": {
    title: "AI Agents on Arc",
    category: "Build",
    summary: "Arc supports autonomous AI agents with onchain identity, reputation, and escrow-based job settlement via ERC-8004 and ERC-8183.",
    sections: [
      {
        heading: "Agentic Economy",
        body: `Arc is designed to enable autonomous AI agents to coordinate, contract, and settle value in real time. Two standards support this:\n\n• ERC-8004 — Onchain identity and reputation for AI agents\n• ERC-8183 — Escrow-based job creation and settlement`,
      },
      {
        heading: "ERC-8004: Agent Identity",
        body: `ERC-8004 provides a standard for registering AI agents onchain with identity and reputation. This allows agents to be discovered, rated, and trusted by other agents and humans in the ecosystem.`,
      },
      {
        heading: "ERC-8183: Job Marketplace",
        body: `ERC-8183 defines a standard for creating jobs with escrow, specifying deliverables, and settling payment upon completion. Enables a trustless marketplace where AI agents can take on work and receive payment automatically when deliverables are verified.`,
      },
      {
        heading: "MCP Server",
        body: `Arc provides an MCP (Model Context Protocol) server to integrate Arc directly into AI development environments. Circle also provides Skills plugins for Claude Code and Vercel for quick AI-assisted development on Arc.`,
      },
    ],
    tags: ["AI", "Agents", "ERC-8004", "ERC-8183", "MCP"],
    related: ["arc-network", "circle-platform", "app-kit"],
  },
};

const CATEGORIES = [
  { id: "core", label: "Core", icon: "◈", articles: ["arc-network", "arc-use-cases"] },
  { id: "community", label: "Community", icon: "⬡", articles: ["arc-house", "arc-on-x"] },
  { id: "ecosystem", label: "Ecosystem", icon: "◉", articles: ["circle-platform"] },
  { id: "features", label: "Key Features", icon: "✦", articles: ["deterministic-finality", "stable-fee-design", "opt-in-privacy"] },
  { id: "network", label: "Network", icon: "◬", articles: ["consensus-layer", "execution-layer"] },
  { id: "reference", label: "Reference", icon: "◇", articles: ["evm-compatibility", "gas-and-fees"] },
  { id: "build", label: "Build", icon: "⬢", articles: ["app-kit", "ai-agents"] },
];

const ARC_CONTEXT = `
Arc is an open Layer-1 blockchain purpose-built for programmable money and stablecoin finance.
- USDC is the native gas token. Base fee targets $0.01 per transaction.
- Sub-second deterministic finality via Malachite BFT consensus.
- EVM compatible: Solidity, Hardhat, Foundry, Viem all work.
- Opt-in privacy for confidential transfers and selective disclosure.
- Supports USDC and EURC stablecoins.
- App Kit provides Bridge (CCTP), Swap, and Send across chains.
- AI Agents: ERC-8004 (identity/reputation), ERC-8183 (job/escrow/settlement).
- MCP Server and Circle Skills available for AI coding assistants.
- Arc House is the community hub (community.arc.network). Architects is the contributor/recognition program.
- Arc official X account: x.com/arc — announcements, ecosystem updates, partner reveals.
- Circle is the issuer of USDC, provides full-stack developer platform at developers.circle.com.
- Circle products: USDC, EURC, CCTP, Gateway, Developer-Controlled Wallets, User-Controlled Wallets, Modular Wallets.
- Currently on Testnet. Faucet: faucet.circle.com. Explorer: testnet.arcscan.app.
- Industry partners include Goldman Sachs, Mastercard, Visa as early design partners.
- Use cases: agentic economy, stablecoin FX, P2P payments, treasury management, prediction markets, lending, asset tokenization, cross-border payments, capital markets.
`;

// Social links bar data
const SOCIALS = [
  { label: "arc.network", href: "https://www.arc.network", icon: "🌐" },
  { label: "@arc", href: "https://x.com/arc", icon: "X" },
  { label: "Discord", href: "https://discord.com/invite/buildonarc", icon: "Discord" },
];

const XIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const DiscordIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const GlobeIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export default function Arcipedia() {
  const [currentArticle, setCurrentArticle] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchRef = useRef(null);

  const article = ARTICLES[currentArticle];

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    const lower = q.toLowerCase();
    const results = Object.entries(ARTICLES)
      .filter(([id, a]) => id !== "home" && (
        a.title?.toLowerCase().includes(lower) ||
        a.summary?.toLowerCase().includes(lower) ||
        a.tags?.some(t => t.toLowerCase().includes(lower))
      ))
      .map(([id, a]) => ({ id, title: a.title, summary: a.summary }));
    setSearchResults(results);
  };

  const askAI = async () => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are Arcipedia's AI assistant — a knowledgeable guide for Arc Network. Answer questions concisely and accurately based on this knowledge:\n\n${ARC_CONTEXT}\n\nProvide clear, helpful answers. If asked about something outside Arc Network, politely redirect.`,
          messages: [{ role: "user", content: aiQuestion }],
        }),
      });
      const data = await res.json();
      setAiAnswer(data.content?.[0]?.text || "Unable to get a response.");
    } catch {
      setAiAnswer("Error connecting to AI. Please try again.");
    }
    setAiLoading(false);
  };

  const navigate = (id) => {
    setCurrentArticle(id);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);
    setAiAnswer("");
    setAiQuestion("");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowSearch(true); setTimeout(() => searchRef.current?.focus(), 100); }
      if (e.key === "Escape") { setShowSearch(false); setSearchResults([]); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#f8f7f4", color: "#1a1a1a", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Social bar */
        .social-bar { background: #0a0f1e; border-bottom: 1px solid #1e293b; padding: 0 24px; height: 36px; display: flex; align-items: center; justify-content: space-between; }
        .social-bar-left { display: flex; align-items: center; gap: 4px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #334155; letter-spacing: 1px; text-transform: uppercase; }
        .social-bar-right { display: flex; align-items: center; gap: 8px; }
        .social-pill { display: flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; border: 1px solid #1e293b; background: rgba(255,255,255,0.03); text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #64748b; transition: all 0.15s; }
        .social-pill:hover { border-color: #00d4aa; color: #00d4aa; background: rgba(0,212,170,0.06); }
        .social-pill-icon { display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; }

        /* Header */
        .arc-header { background: #0f172a; color: white; padding: 0 24px; height: 52px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #00d4aa; position: sticky; top: 0; z-index: 100; }
        .arc-logo { font-family: 'EB Garamond', serif; font-size: 22px; font-weight: 600; letter-spacing: -0.5px; cursor: pointer; user-select: none; }
        .arc-logo span { color: #00d4aa; }
        .search-trigger { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); padding: 6px 16px; border-radius: 6px; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; }
        .search-trigger:hover { background: rgba(255,255,255,0.15); color: white; }

        /* Layout */
        .layout { display: flex; flex: 1; }
        .sidebar { width: 240px; flex-shrink: 0; background: #0f172a; color: #cbd5e1; padding: 24px 0; position: sticky; top: 52px; height: calc(100vh - 52px); overflow-y: auto; transition: width 0.2s; }
        .sidebar.closed { width: 0; overflow: hidden; padding: 0; }
        .sidebar-section { margin-bottom: 24px; }
        .sidebar-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #475569; padding: 0 20px; margin-bottom: 8px; white-space: nowrap; }
        .sidebar-icon { color: #00d4aa; margin-right: 6px; font-size: 11px; }
        .sidebar-link { display: flex; align-items: center; padding: 7px 20px; font-family: 'EB Garamond', serif; font-size: 15px; color: #94a3b8; cursor: pointer; border-left: 2px solid transparent; transition: all 0.15s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sidebar-link:hover { color: #e2e8f0; background: rgba(255,255,255,0.05); border-left-color: #334155; }
        .sidebar-link.active { color: #00d4aa; background: rgba(0,212,170,0.08); border-left-color: #00d4aa; }

        /* Main */
        .main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .breadcrumb { background: white; border-bottom: 1px solid #e2e8f0; padding: 10px 40px; font-size: 13px; color: #64748b; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .breadcrumb span { cursor: pointer; } .breadcrumb span:hover { color: #0f172a; }

        /* Article */
        .article-wrap { max-width: 820px; margin: 0 auto; padding: 48px 40px 80px; flex: 1; width: 100%; }
        .article-category { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #00d4aa; margin-bottom: 12px; }
        .article-title { font-family: 'EB Garamond', serif; font-size: 42px; font-weight: 500; line-height: 1.15; color: #0f172a; margin-bottom: 8px; }
        .article-summary { font-size: 17px; color: #475569; line-height: 1.65; margin-bottom: 32px; font-style: italic; border-left: 3px solid #00d4aa; padding-left: 16px; font-family: 'EB Garamond', serif; }
        .divider { border: none; border-top: 1px solid #e2e8f0; margin: 32px 0; }
        .section-heading { font-family: 'EB Garamond', serif; font-size: 24px; font-weight: 500; color: #0f172a; margin: 32px 0 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        .section-body { font-size: 16px; line-height: 1.75; color: #334155; white-space: pre-line; font-family: 'EB Garamond', serif; }
        .data-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 15px; }
        .data-table th { background: #0f172a; color: white; padding: 10px 16px; text-align: left; font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.5px; }
        .data-table td { padding: 9px 16px; border-bottom: 1px solid #e2e8f0; color: #334155; }
        .data-table tr:nth-child(even) td { background: #f8f7f4; }
        .data-table td:first-child { color: #0f172a; font-weight: 500; }
        .tags-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0; }
        .tag { background: #e2e8f0; color: #475569; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-family: 'JetBrains Mono', monospace; }

        /* Related */
        .related-section { margin-top: 48px; padding-top: 24px; border-top: 2px solid #e2e8f0; }
        .related-title { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 16px; }
        .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
        .related-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; cursor: pointer; transition: all 0.15s; }
        .related-card:hover { border-color: #00d4aa; box-shadow: 0 2px 12px rgba(0,212,170,0.1); }
        .related-card-title { font-family: 'EB Garamond', serif; font-size: 16px; font-weight: 500; color: #0f172a; margin-bottom: 4px; }
        .related-card-cat { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #00d4aa; margin-bottom: 4px; }

        /* AI Panel */
        .ai-panel { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-top: 48px; }
        .ai-panel-title { font-family: 'JetBrains Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #475569; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .ai-dot { width: 8px; height: 8px; background: #00d4aa; border-radius: 50%; flex-shrink: 0; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .ai-input-row { display: flex; gap: 10px; }
        .ai-input { flex: 1; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 10px 16px; font-size: 15px; font-family: 'EB Garamond', serif; color: #0f172a; outline: none; transition: border-color 0.15s; min-width: 0; }
        .ai-input:focus { border-color: #00d4aa; }
        .ai-btn { background: #0f172a; color: white; border: none; border-radius: 8px; padding: 10px 20px; font-family: 'JetBrains Mono', monospace; font-size: 13px; cursor: pointer; transition: background 0.15s; white-space: nowrap; flex-shrink: 0; }
        .ai-btn:hover:not(:disabled) { background: #1e293b; }
        .ai-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .ai-answer { margin-top: 16px; padding: 16px; background: #f8f7f4; border-radius: 8px; font-size: 15px; line-height: 1.7; color: #334155; font-family: 'EB Garamond', serif; border-left: 3px solid #00d4aa; white-space: pre-line; }

        /* Search modal */
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: flex-start; justify-content: center; padding-top: 100px; }
        .search-modal { background: white; border-radius: 12px; width: 600px; max-width: 90vw; padding: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .search-input-modal { width: 100%; border: none; font-size: 18px; font-family: 'EB Garamond', serif; color: #0f172a; outline: none; padding: 8px 0; border-bottom: 2px solid #e2e8f0; }
        .search-input-modal:focus { border-bottom-color: #00d4aa; }
        .search-results { margin-top: 16px; max-height: 340px; overflow-y: auto; }
        .search-result { padding: 12px; border-radius: 8px; cursor: pointer; transition: background 0.1s; }
        .search-result:hover { background: #f8f7f4; }
        .search-result-title { font-family: 'EB Garamond', serif; font-size: 17px; font-weight: 500; color: #0f172a; }
        .search-result-summary { font-size: 13px; color: #64748b; margin-top: 3px; line-height: 1.4; }

        /* Home */
        .home-wrap { padding: 60px 40px 80px; max-width: 960px; margin: 0 auto; flex: 1; }
        .home-hero { text-align: center; margin-bottom: 60px; }
        .home-logo { font-family: 'EB Garamond', serif; font-size: 64px; font-weight: 500; color: #0f172a; letter-spacing: -2px; }
        .home-logo span { color: #00d4aa; }
        .home-tagline { font-size: 18px; color: #64748b; margin-top: 12px; font-style: italic; }
        .home-search-wrap { max-width: 480px; margin: 32px auto 0; position: relative; }
        .home-search-input { width: 100%; border: 2px solid #e2e8f0; border-radius: 8px; padding: 12px 20px; font-size: 16px; font-family: 'EB Garamond', serif; outline: none; transition: border-color 0.15s; background: white; }
        .home-search-input:focus { border-color: #00d4aa; }
        .home-search-results { position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08); z-index: 10; }
        .cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
        .cat-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; transition: all 0.15s; }
        .cat-card:hover { border-color: #00d4aa; box-shadow: 0 4px 20px rgba(0,212,170,0.1); }
        .cat-icon { font-size: 22px; color: #00d4aa; margin-bottom: 10px; }
        .cat-name { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; color: #0f172a; margin-bottom: 12px; }
        .cat-article-link { font-size: 15px; color: #3b82f6; cursor: pointer; padding: 3px 0; display: block; font-family: 'EB Garamond', serif; }
        .cat-article-link:hover { color: #00d4aa; text-decoration: underline; }

        /* Misc */
        .toggle-btn { background: none; border: none; color: #94a3b8; cursor: pointer; padding: 4px 8px; font-size: 18px; line-height: 1; }
        .toggle-btn:hover { color: white; }
        .ext-links { display: flex; gap: 16px; align-items: center; }
        .ext-link { color: rgba(255,255,255,0.6); font-size: 12px; font-family: 'JetBrains Mono', monospace; text-decoration: none; }
        .ext-link:hover { color: #00d4aa; }
        .loading-dots { display: inline-flex; gap: 4px; align-items: center; height: 20px; }
        .loading-dots span { width: 6px; height: 6px; background: #00d4aa; border-radius: 50%; display: inline-block; animation: bounce 1.2s infinite; }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,80%,100%{transform:scale(0.8);opacity:0.5} 40%{transform:scale(1.1);opacity:1} }

        /* Footer */
        .site-footer { background: #0f172a; border-top: 1px solid #1e293b; flex-shrink: 0; }
        .footer-main { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding: 24px 40px; }
        .footer-brand { font-family: 'EB Garamond', serif; font-size: 18px; color: #64748b; }
        .footer-brand span { color: #00d4aa; }
        .footer-links-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .footer-link { color: #475569; font-size: 12px; font-family: 'JetBrains Mono', monospace; text-decoration: none; transition: color 0.15s; }
        .footer-link:hover { color: #00d4aa; }
        .footer-social-btns { display: flex; align-items: center; gap: 8px; }
        .fsoc-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: rgba(255,255,255,0.05); border-radius: 7px; border: 1px solid #1e293b; text-decoration: none; color: #64748b; transition: all 0.15s; }
        .fsoc-btn:hover { background: rgba(0,212,170,0.1); border-color: #00d4aa; color: #00d4aa; }
        .footer-made { border-top: 1px solid #0a0f1e; padding: 12px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .footer-made-text { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #334155; }
        .footer-made-text a { color: #00d4aa; text-decoration: none; }
        .footer-made-text a:hover { text-decoration: underline; }
        .footer-copy { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #1e293b; }
      `}</style>

      {/* Social bar */}
      <div className="social-bar">
        <div className="social-bar-left">
          <span style={{ color: "#00d4aa", marginRight: 4 }}>◈</span> Arc Network Official Channels
        </div>
        <div className="social-bar-right">
          <a className="social-pill" href="https://www.arc.network" target="_blank" rel="noopener">
            <span className="social-pill-icon"><GlobeIcon /></span>arc.network
          </a>
          <a className="social-pill" href="https://x.com/arc" target="_blank" rel="noopener">
            <span className="social-pill-icon"><XIcon /></span>@arc
          </a>
          <a className="social-pill" href="https://discord.com/invite/buildonarc" target="_blank" rel="noopener">
            <span className="social-pill-icon"><DiscordIcon /></span>Discord
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="arc-header">
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button className="toggle-btn" onClick={() => setSidebarOpen(p => !p)}>☰</button>
          <div className="arc-logo" onClick={() => navigate("home")}>Arc<span>ipedia</span></div>
        </div>
        <div className="ext-links">
          <button className="search-trigger" onClick={() => { setShowSearch(true); setTimeout(() => searchRef.current?.focus(), 100); }}>
            ⌕ Search&nbsp;&nbsp;<span style={{ opacity: 0.5 }}>⌘K</span>
          </button>
          <a className="ext-link" href="https://docs.arc.network" target="_blank" rel="noopener">Docs ↗</a>
          <a className="ext-link" href="https://community.arc.network" target="_blank" rel="noopener">Community ↗</a>
          <a className="ext-link" href="https://testnet.arcscan.app" target="_blank" rel="noopener">Explorer ↗</a>
        </div>
      </header>

      <div className="layout">
        {/* Sidebar */}
        <nav className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
          <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #1e293b", marginBottom: "16px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#475569", letterSpacing: "1.5px", marginBottom: "8px", textTransform: "uppercase" }}>Navigation</div>
            <div className={`sidebar-link ${currentArticle === "home" ? "active" : ""}`} onClick={() => navigate("home")}>
              <span className="sidebar-icon">⌂</span> Main Page
            </div>
          </div>
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="sidebar-section">
              <div className="sidebar-label"><span className="sidebar-icon">{cat.icon}</span>{cat.label}</div>
              {cat.articles.map(id => (
                <div key={id} className={`sidebar-link ${currentArticle === id ? "active" : ""}`} onClick={() => navigate(id)}>
                  {ARTICLES[id]?.title}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* Main */}
        <main className="main">
          {currentArticle !== "home" && article && (
            <div className="breadcrumb">
              <span onClick={() => navigate("home")}>Arcipedia</span>
              <span style={{ color: "#cbd5e1" }}>›</span>
              <span style={{ color: "#00d4aa" }}>{article.category}</span>
              <span style={{ color: "#cbd5e1" }}>›</span>
              <span style={{ color: "#0f172a" }}>{article.title}</span>
            </div>
          )}

          {currentArticle === "home" ? (
            <div className="home-wrap">
              <div className="home-hero">
                <div className="home-logo">Arc<span>ipedia</span></div>
                <p className="home-tagline">The open knowledge base for Arc Network — the stablecoin blockchain.</p>
                <div className="home-search-wrap">
                  <input className="home-search-input" placeholder="Search articles…" value={searchQuery}
                    onChange={e => handleSearch(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && searchResults.length > 0) navigate(searchResults[0].id); }}
                  />
                  {searchResults.length > 0 && (
                    <div className="home-search-results">
                      {searchResults.map(r => (
                        <div key={r.id} className="search-result" onClick={() => navigate(r.id)}>
                          <div className="search-result-title">{r.title}</div>
                          <div className="search-result-summary">{r.summary?.slice(0, 90)}…</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="cat-grid">
                {CATEGORIES.map(cat => (
                  <div key={cat.id} className="cat-card">
                    <div className="cat-icon">{cat.icon}</div>
                    <div className="cat-name">{cat.label}</div>
                    <ul style={{ listStyle: "none" }}>
                      {cat.articles.map(id => (
                        <li key={id}><span className="cat-article-link" onClick={() => navigate(id)}>{ARTICLES[id]?.title}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="ai-panel" style={{ marginTop: "48px" }}>
                <div className="ai-panel-title"><div className="ai-dot"></div>Ask Arcipedia AI</div>
                <div className="ai-input-row">
                  <input className="ai-input" placeholder="Ask anything about Arc Network…" value={aiQuestion} onChange={e => setAiQuestion(e.target.value)} onKeyDown={e => e.key === "Enter" && askAI()} />
                  <button className="ai-btn" onClick={askAI} disabled={aiLoading}>
                    {aiLoading ? <span className="loading-dots"><span/><span/><span/></span> : "Ask →"}
                  </button>
                </div>
                {aiAnswer && <div className="ai-answer">{aiAnswer}</div>}
              </div>
            </div>
          ) : article ? (
            <div className="article-wrap">
              {article.category && <div className="article-category">{article.category}</div>}
              <h1 className="article-title">{article.title}</h1>
              {article.summary && <p className="article-summary">{article.summary}</p>}
              {article.tags && <div className="tags-row">{article.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>}
              <hr className="divider" />
              {article.sections?.map((sec, i) => (
                <div key={i}>
                  <h2 className="section-heading">{sec.heading}</h2>
                  {sec.body && <p className="section-body">{sec.body}</p>}
                  {sec.table && (
                    <table className="data-table">
                      <thead><tr>{sec.table[0].map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
                      <tbody>{sec.table.slice(1).map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  )}
                </div>
              ))}
              {article.related?.length > 0 && (
                <div className="related-section">
                  <div className="related-title">See also</div>
                  <div className="related-grid">
                    {article.related.map(id => ARTICLES[id] && (
                      <div key={id} className="related-card" onClick={() => navigate(id)}>
                        <div className="related-card-cat">{ARTICLES[id].category}</div>
                        <div className="related-card-title">{ARTICLES[id].title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="ai-panel">
                <div className="ai-panel-title"><div className="ai-dot"></div>Ask Arcipedia AI about this topic</div>
                <div className="ai-input-row">
                  <input className="ai-input" placeholder={`Ask about ${article.title}…`} value={aiQuestion} onChange={e => setAiQuestion(e.target.value)} onKeyDown={e => e.key === "Enter" && askAI()} />
                  <button className="ai-btn" onClick={askAI} disabled={aiLoading}>
                    {aiLoading ? <span className="loading-dots"><span/><span/><span/></span> : "Ask →"}
                  </button>
                </div>
                {aiAnswer && <div className="ai-answer">{aiAnswer}</div>}
              </div>
            </div>
          ) : (
            <div style={{ padding: "80px 40px", textAlign: "center", color: "#64748b" }}>Article not found.</div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">Arc<span>ipedia</span></div>
          <div className="footer-links-row">
            <a className="footer-link" href="https://docs.arc.network" target="_blank" rel="noopener">Docs</a>
            <a className="footer-link" href="https://community.arc.network" target="_blank" rel="noopener">Community</a>
            <a className="footer-link" href="https://developers.circle.com" target="_blank" rel="noopener">Circle Devs</a>
            <a className="footer-link" href="https://testnet.arcscan.app" target="_blank" rel="noopener">Explorer</a>
          </div>
          <div className="footer-social-btns">
            <a className="fsoc-btn" href="https://www.arc.network" target="_blank" rel="noopener" title="arc.network"><GlobeIcon size={15} /></a>
            <a className="fsoc-btn" href="https://x.com/arc" target="_blank" rel="noopener" title="@arc on X"><XIcon size={14} /></a>
            <a className="fsoc-btn" href="https://discord.com/invite/buildonarc" target="_blank" rel="noopener" title="Arc Discord"><DiscordIcon size={15} /></a>
            <a className="fsoc-btn" href="https://x.com/0xFatih" target="_blank" rel="noopener" title="@0xFatih on X" style={{ borderColor: "#00d4aa", color: "#00d4aa" }}><XIcon size={14} /></a>
          </div>
        </div>
        <div className="footer-made">
          <span className="footer-made-text">made by <a href="https://x.com/0xFatih" target="_blank" rel="noopener">0xFatih</a> with ♥️</span>
          <span className="footer-copy">© 2026 Arcipedia — Community resource, not affiliated with Circle</span>
        </div>
      </footer>

      {/* Search Modal */}
      {showSearch && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setShowSearch(false)}>
          <div className="search-modal">
            <input ref={searchRef} className="search-input-modal" placeholder="Search Arcipedia…" value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && searchResults.length > 0) navigate(searchResults[0].id);
                if (e.key === "Escape") { setShowSearch(false); setSearchResults([]); setSearchQuery(""); }
              }}
            />
            <div className="search-results">
              {searchResults.length > 0 ? searchResults.map(r => (
                <div key={r.id} className="search-result" onClick={() => navigate(r.id)}>
                  <div className="search-result-title">{r.title}</div>
                  <div className="search-result-summary">{r.summary}</div>
                </div>
              )) : searchQuery ? (
                <div style={{ padding: "20px", textAlign: "center", color: "#94a3b8", fontFamily: "'EB Garamond', serif" }}>No results for "{searchQuery}"</div>
              ) : (
                <div style={{ padding: "12px 0" }}>
                  {Object.entries(ARTICLES).filter(([id]) => id !== "home").map(([id, a]) => (
                    <div key={id} className="search-result" onClick={() => navigate(id)}>
                      <div className="search-result-title">{a.title}</div>
                      <div className="search-result-summary" style={{ color: "#00d4aa", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}>{a.category}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
