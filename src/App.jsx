import { useState, useEffect, useRef } from "react";

/* ─── Arc SVG Logo Mark ─── */
const ArcMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="88" rx="46" ry="7" fill="url(#glow)" opacity="0.5"/>
    <path d="M50 10 C25 10 8 32 8 58 L8 72 C8 72 20 58 50 58 C80 58 92 72 92 72 L92 58 C92 32 75 10 50 10Z" fill="white" opacity="0.95"/>
    <defs>
      <radialGradient id="glow" cx="50%" cy="100%" r="50%">
        <stop offset="0%" stopColor="#d4982a" stopOpacity="1"/>
        <stop offset="100%" stopColor="#d4982a" stopOpacity="0"/>
      </radialGradient>
    </defs>
  </svg>
);

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

/* ─── Color tokens ─── */
// navy-950: #04080f   navy-900: #070c18   navy-800: #0d1525
// navy-700: #152035   navy-600: #1c2d4a   navy-500: #243760
// amber: #d4982a      amber-light: #e8b84b  amber-dim: #7a5515
// text-primary: #f0f4ff  text-secondary: #8fa4c8  text-muted: #4a6080

const ARTICLES = {
  home: { title: "Arcipedia", isHome: true },
  "arc-network": {
    title: "Arc Network",
    category: "Core",
    summary: "An open Layer-1 blockchain purpose-built for onchain finance with stablecoins, deterministic finality, and predictable fees.",
    sections: [
      { heading: "Overview", body: `Arc is an EVM-compatible Layer-1 blockchain designed for onchain finance. It combines predictable fiat-based fees using stablecoins as gas, sub-second deterministic finality, and opt-in configurable privacy to support payments, lending, capital markets, and FX at scale.\n\nArc is purpose-built for real-world economic activity, not general-purpose computation. Each design choice directly supports the needs of financial applications.` },
      { heading: "Network Details", table: [["Property","Value"],["Consensus","Malachite BFT"],["Execution Environment","EVM"],["Gas Token","USDC"],["Finality","Deterministic, sub-second"],["Validator Participation","Permissioned"],["Developer Access","Permissionless"]] },
      { heading: "Stablecoins on Arc", body: `USDC is the native gas token on Arc, so transaction fees are denominated in dollars. The base fee targets $0.01 per transaction and uses an EIP-1559-style smoothing mechanism. Arc also supports EURC for euro-denominated transfers. Both are available on the Circle Faucet for testnet development.` },
      { heading: "Industry Recognition", body: `Arc has attracted design partners from across the financial industry:\n\n"Arc's design — integrating stablecoin-based gas fees, deterministic finality, and programmable interoperability — offers a strong environment to explore how trusted payments networks can connect to and help scale emerging onchain infrastructure." — Cuy Sheffield, Head of Crypto, Visa\n\n"Deepening our longstanding work with Circle as an early design partner, Mastercard is exploring how we can help shape Arc's foundation to enable secure, simple payment experiences across both fiat and stablecoin rails." — Raj Dhamodharan, EVP Blockchain & Digital Assets, Mastercard\n\n"We're excited to be part of an initiative that tests how programmable settlement and interoperable FX workflows can enhance regulated markets." — Mathew McDermott, Global Head of Digital Assets, Goldman Sachs` },
    ],
    tags: ["Layer-1","EVM","Blockchain","Stablecoin"],
    related: ["deterministic-finality","stable-fee-design","arc-use-cases"],
  },
  "arc-use-cases": {
    title: "Arc Use Cases",
    category: "Core",
    summary: "Arc is purpose-built for real-world financial and commercial applications — from payments and FX to AI agents and capital markets.",
    sections: [
      { heading: "The Economic OS for the Internet", body: `Arc is built for a future where money, markets, and software operate as one programmable system across the internet-native economy. It supports financial applications that need instant deterministic settlement, 24/7 market access, transparent predictable fees, programmable execution, and integrated stablecoin liquidity.` },
      { heading: "Use Cases", table: [["Use Case","Description"],["Agentic Economy","Autonomous AI agents coordinate, contract, and settle value in real time"],["Stablecoin FX","Real-time onchain FX with transparent pricing and instant settlement"],["Peer-to-Peer Payments","Instant, low-cost transfers with deterministic settlement"],["Treasury Management","Stablecoin-powered treasury with embedded wallets and programmable liquidity"],["Prediction Markets","Capital-efficient markets with real-time price signals and instant settlement"],["Lending & Borrowing","Instant stablecoin settlement with automated collateral logic"],["Asset Tokenization","Issue and manage tokenized real-world assets with optional privacy"],["Onchain FX","24/7 onchain FX between stablecoins via Circle StableFX"],["Cross-Border Payments","Global payments with instant settlement and dollar-based fees"],["Capital Markets","Sub-second finality supporting high-frequency trading and real-time risk"]] },
      { heading: "Multichain Liquidity Hub", body: `Arc is designed to aggregate stablecoin and tokenized asset liquidity. With CCTP and Gateway, liquidity is programmatically accessible for capital formation and value exchange across the multichain ecosystem.` },
    ],
    tags: ["Use Cases","Finance","Payments","FX","AI Agents"],
    related: ["arc-network","ai-agents","app-kit"],
  },
  "arc-house": {
    title: "Arc House & Architects",
    category: "Community",
    summary: "Arc House is the community hub for Arc Network. Architects is the program that recognizes and rewards meaningful ecosystem contributions.",
    sections: [
      { heading: "What is Arc House?", body: `Arc House is the new home for the Arc community. It brings programs, events, discussions, recognition, and ecosystem activity into one shared space. Arc House serves as the central hub where builders, developers, and community members can connect, collaborate, and contribute to the Arc ecosystem.` },
      { heading: "The Architects Program", body: `Architects is the community program designed to recognize and reward meaningful contributions across the Arc ecosystem.\n\nKey elements:\n\n• Points system for tracking contributions\n• Tiers based on accumulated points and engagement\n• Benefits and perks tied to tier progression\n• Roles within the community structure\n• Recognition for ecosystem activity` },
      { heading: "Community Channels", table: [["Channel","Link"],["Arc House","community.arc.network"],["Arc Discord","discord.gg/buildonarc"],["Arc on X","x.com/arc"],["Arc Website","arc.network"]] },
    ],
    tags: ["Community","Architects","Arc House","Events"],
    related: ["arc-network","arc-on-x","arc-use-cases"],
  },
  "arc-on-x": {
    title: "Arc on X",
    category: "Community",
    summary: "Arc's official X (Twitter) account @arc is the primary channel for announcements, ecosystem updates, and community engagement.",
    sections: [
      { heading: "Official Account", body: `Arc's official X account is @arc (x.com/arc). It serves as the primary broadcast channel for network announcements, partnership reveals, ecosystem milestones, and community spotlights.\n\nFollowing @arc on X is the fastest way to stay up to date with Arc's roadmap, testnet progress, and mainnet launch news.` },
      { heading: "What Arc Posts", table: [["Content Type","Description"],["Network Announcements","Protocol upgrades, feature releases, and testnet milestones"],["Partner Reveals","New ecosystem projects and design partner integrations"],["Community Highlights","Spotlights on Architects and builder contributions"],["Developer Resources","Tutorials, quickstarts, and tooling updates"],["Events","Livestreams, AMAs, and Arc House events"]] },
      { heading: "Community on X", body: `Beyond the official account, the Arc builder community is active on X. Use #BuildOnArc to connect with the community and showcase what you're building.` },
    ],
    tags: ["X","Twitter","Social","Community","Announcements"],
    related: ["arc-house","arc-network"],
  },
  "circle-platform": {
    title: "Circle Developer Platform",
    category: "Ecosystem",
    summary: "Circle provides a full-stack developer platform including USDC, CCTP, Gateway, wallets, and AI tools — all integrated with Arc.",
    sections: [
      { heading: "Overview", body: `Circle is the issuer of USDC and EURC and provides a comprehensive developer platform for building with programmable money. Arc is integrated directly into Circle's full-stack platform.` },
      { heading: "Core Products", table: [["Product","Description"],["USDC","Dollar-backed stablecoin, native gas token on Arc"],["EURC","Euro-backed stablecoin, supported on Arc"],["CCTP","Cross-Chain Transfer Protocol for native USDC bridging"],["Gateway","Chain-abstracted USDC balance across multiple EVM chains"],["Developer-Controlled Wallets","Programmatic wallet infrastructure for apps"],["User-Controlled Wallets","Self-custodial wallets embedded in apps"],["Modular Wallets","Composable wallet components"]] },
      { heading: "AI-Native Developer Tools", body: `• Arc MCP Server — Integrate Arc directly into AI development environments\n• Circle Skills — Pre-built skill plugins for Claude Code and Vercel\n• LLMs.txt — Structured documentation for AI agents at docs.arc.network/llms.txt` },
    ],
    tags: ["Circle","USDC","CCTP","Gateway","Wallets"],
    related: ["arc-network","app-kit","ai-agents"],
  },
  "deterministic-finality": {
    title: "Deterministic Finality",
    category: "Key Features",
    summary: "Transactions on Arc finalize in under one second with no risk of chain reorganization.",
    sections: [
      { heading: "What is Deterministic Finality?", body: `Unlike probabilistic finality in chains like Ethereum mainnet — where you wait for multiple block confirmations — Arc provides deterministic finality. Once a transaction is included in a finalized block, it is irreversible. There is no possibility of reorganization.` },
      { heading: "Why It Matters for Finance", body: `Deterministic finality is essential for financial applications. Payment systems, FX settlement, and lending protocols require certainty that a transaction is final before releasing assets or triggering downstream actions.` },
    ],
    tags: ["Finality","Settlement","Consensus"],
    related: ["arc-network","consensus-layer"],
  },
  "stable-fee-design": {
    title: "Stable Fee Design",
    category: "Key Features",
    summary: "Transaction fees on Arc are denominated in USDC, making costs predictable regardless of token volatility.",
    sections: [
      { heading: "USDC as Gas", body: `Arc uses USDC as the gas token. Transaction fees are paid in US dollars, not a volatile native token. The base fee targets $0.01 per transaction — a predictable, fiat-denominated cost.` },
      { heading: "EIP-1559 Style Mechanism", body: `Arc uses an EIP-1559-style base fee smoothing mechanism to keep costs predictable even under varying network load. When demand spikes, fees adjust gradually rather than spiking dramatically.` },
    ],
    tags: ["Fees","USDC","Gas","EIP-1559"],
    related: ["arc-network","gas-and-fees"],
  },
  "opt-in-privacy": {
    title: "Opt-in Privacy",
    category: "Key Features",
    summary: "Arc supports confidential transfers and selective disclosure for regulated use cases.",
    sections: [
      { heading: "Configurable Privacy", body: `Arc's opt-in privacy model means transactions are transparent by default, but applications and users can selectively enable confidential transfers when needed.` },
      { heading: "Selective Disclosure", body: `Selective disclosure allows parties to prove the validity of a transaction to specific counterparties (like regulators or auditors) without exposing data to the public.` },
    ],
    tags: ["Privacy","Compliance","Confidential Transfers"],
    related: ["arc-network"],
  },
  "consensus-layer": {
    title: "Consensus Layer",
    category: "Network",
    summary: "Arc's consensus layer is built on Malachite, a BFT consensus engine designed for sub-second finality.",
    sections: [
      { heading: "Malachite BFT", body: `The consensus layer is built on Malachite, a Byzantine Fault Tolerant (BFT) consensus engine. BFT consensus provides deterministic finality: once a block is finalized, it cannot be reverted.` },
      { heading: "Permissioned Validators", body: `Arc uses a permissioned validator set. Validators must be approved to participate in consensus, providing compliance and security guarantees while keeping the network open for developers and users.` },
    ],
    tags: ["BFT","Malachite","Validators"],
    related: ["arc-network","deterministic-finality","execution-layer"],
  },
  "execution-layer": {
    title: "Execution Layer",
    category: "Network",
    summary: "Arc's execution layer runs the EVM, enabling Solidity contracts and Ethereum tooling without modification.",
    sections: [
      { heading: "EVM Runtime", body: `The execution layer runs the Ethereum Virtual Machine (EVM). Existing Solidity smart contracts can be deployed on Arc without modification. Standard Ethereum development tools — Hardhat, Foundry, Viem, Ethers.js — work out of the box.` },
      { heading: "Separation of Concerns", body: `Arc separates consensus from execution so each layer can optimize independently. The consensus layer handles ordering and finality; the execution layer handles computation and state transitions.` },
    ],
    tags: ["EVM","Solidity","Smart Contracts"],
    related: ["arc-network","consensus-layer","evm-compatibility"],
  },
  "evm-compatibility": {
    title: "EVM Compatibility",
    category: "Reference",
    summary: "Deploy existing Solidity contracts and use standard Ethereum tooling on Arc.",
    sections: [
      { heading: "What Works Out of the Box", body: `Arc is EVM-compatible:\n\n• Solidity and Vyper contracts\n• Hardhat, Foundry, Truffle\n• Viem, Ethers.js, Web3.js\n• MetaMask and other EVM wallets\n• Standard ABI encoding` },
      { heading: "Key Differences", body: `• Gas token is USDC, not ETH\n• Sub-second block times (vs ~12s on Ethereum)\n• Deterministic finality (no need to wait for confirmations)\n• Some precompiles may differ` },
    ],
    tags: ["EVM","Ethereum","Compatibility","Solidity"],
    related: ["execution-layer","arc-network"],
  },
  "gas-and-fees": {
    title: "Gas and Fees",
    category: "Reference",
    summary: "Arc's fee model uses USDC as the gas token with a base fee targeting $0.01 per transaction.",
    sections: [
      { heading: "Fee Model", body: `Arc uses USDC to pay for gas. The base fee targets approximately $0.01 per transaction. Fees use an EIP-1559-style mechanism to smooth out spikes during high demand.` },
      { heading: "Estimating Fees", body: `Standard EVM fee estimation tools work on Arc. Use eth_estimateGas for gas units, and eth_gasPrice or eth_feeHistory for current fee data. The App Kit also provides fee estimation utilities for bridge and swap operations.` },
    ],
    tags: ["Gas","Fees","USDC"],
    related: ["stable-fee-design","arc-network"],
  },
  "app-kit": {
    title: "App Kit",
    category: "Build",
    summary: "A SDK providing Bridge, Swap, and Send capabilities across chains using CCTP and stablecoins.",
    sections: [
      { heading: "Overview", body: `App Kit is Circle's developer toolkit for building payment and liquidity workflows across chains. It wraps CCTP and provides three core modules:\n\n• Bridge — Transfer USDC across chains\n• Swap — Token swaps on the same chain\n• Send — Wallet-to-wallet transfers on the same chain` },
      { heading: "Supported Adapters", body: `• Viem (EVM chains)\n• Ethers.js (EVM chains)\n• Solana\n• Circle Wallets` },
      { heading: "Installation", body: `npm install @circle-fin/bridge-kit\n\n# Full App Kit\nnpm install @circle-fin/app-kit` },
    ],
    tags: ["SDK","Bridge","Swap","CCTP"],
    related: ["circle-platform","ai-agents"],
  },
  "ai-agents": {
    title: "AI Agents on Arc",
    category: "Build",
    summary: "Arc supports autonomous AI agents with onchain identity, reputation, and escrow-based job settlement via ERC-8004 and ERC-8183.",
    sections: [
      { heading: "Agentic Economy", body: `Arc is designed to enable autonomous AI agents to coordinate, contract, and settle value in real time.\n\n• ERC-8004 — Onchain identity and reputation for AI agents\n• ERC-8183 — Escrow-based job creation and settlement` },
      { heading: "ERC-8004: Agent Identity", body: `ERC-8004 provides a standard for registering AI agents onchain with identity and reputation. Agents can be discovered, rated, and trusted by other agents and humans.` },
      { heading: "ERC-8183: Job Marketplace", body: `ERC-8183 defines a standard for creating jobs with escrow, specifying deliverables, and settling payment upon completion. Enables a trustless marketplace where AI agents can take on work and receive payment automatically.` },
      { heading: "MCP Server", body: `Arc provides an MCP (Model Context Protocol) server to integrate Arc directly into AI development environments. Circle also provides Skills plugins for Claude Code and Vercel.` },
    ],
    tags: ["AI","Agents","ERC-8004","ERC-8183","MCP"],
    related: ["arc-network","circle-platform","app-kit"],
  },
};

const CATEGORIES = [
  { id: "core", label: "Core", icon: "◈", articles: ["arc-network","arc-use-cases"] },
  { id: "community", label: "Community", icon: "⬡", articles: ["arc-house","arc-on-x"] },
  { id: "ecosystem", label: "Ecosystem", icon: "◉", articles: ["circle-platform"] },
  { id: "features", label: "Key Features", icon: "✦", articles: ["deterministic-finality","stable-fee-design","opt-in-privacy"] },
  { id: "network", label: "Network", icon: "◬", articles: ["consensus-layer","execution-layer"] },
  { id: "reference", label: "Reference", icon: "◇", articles: ["evm-compatibility","gas-and-fees"] },
  { id: "build", label: "Build", icon: "⬢", articles: ["app-kit","ai-agents"] },
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
- Arc House is the community hub. Architects is the contributor/recognition program.
- Arc official X account: x.com/arc
- Circle is the issuer of USDC, provides full-stack developer platform at developers.circle.com.
- Circle products: USDC, EURC, CCTP, Gateway, wallets.
- Currently on Testnet. Faucet: faucet.circle.com. Explorer: testnet.arcscan.app.
- Industry partners: Goldman Sachs, Mastercard, Visa.
`;

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
    setAiLoading(true); setAiAnswer("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `You are Arcipedia's AI assistant — a knowledgeable guide for Arc Network. Answer concisely based on: ${ARC_CONTEXT}`,
          messages: [{ role: "user", content: aiQuestion }],
        }),
      });
      const data = await res.json();
      setAiAnswer(data.content?.[0]?.text || "Unable to get a response.");
    } catch { setAiAnswer("Error connecting to AI. Please try again."); }
    setAiLoading(false);
  };

  const navigate = (id) => {
    setCurrentArticle(id); setSearchQuery(""); setSearchResults([]);
    setShowSearch(false); setAiAnswer(""); setAiQuestion("");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const k = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowSearch(true); setTimeout(() => searchRef.current?.focus(), 100); }
      if (e.key === "Escape") { setShowSearch(false); setSearchResults([]); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  /* ─ CSS ─ */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── SOCIAL BAR ── */
    .sbar { background: #04080f; border-bottom: 1px solid rgba(212,152,42,0.15); padding: 0 20px; height: 34px; display: flex; align-items: center; justify-content: space-between; }
    .sbar-l { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #4a6080; letter-spacing: 1.5px; text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
    .sbar-l-dot { width: 5px; height: 5px; border-radius: 50%; background: #d4982a; }
    .sbar-r { display: flex; gap: 6px; }
    .spill { display: flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 16px; border: 1px solid rgba(212,152,42,0.2); background: rgba(212,152,42,0.04); text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #7a9ab8; transition: all 0.15s; }
    .spill:hover { border-color: #d4982a; color: #d4982a; background: rgba(212,152,42,0.1); }

    /* ── HEADER ── */
    .hdr { background: linear-gradient(180deg, #070c18 0%, #0a1020 100%); color: white; padding: 0 20px; height: 54px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(212,152,42,0.35); position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 24px rgba(0,0,0,0.5); }
    .hdr-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
    .hdr-logo-text { font-family: 'Cinzel', serif; font-size: 20px; font-weight: 500; letter-spacing: 1px; color: #f0f4ff; }
    .hdr-logo-text span { color: #d4982a; }
    .hdr-r { display: flex; align-items: center; gap: 12px; }
    .hdr-extlink { color: rgba(255,255,255,0.45); font-size: 11px; font-family: 'JetBrains Mono', monospace; text-decoration: none; transition: color 0.15s; }
    .hdr-extlink:hover { color: #d4982a; }
    .search-btn { background: rgba(255,255,255,0.06); border: 1px solid rgba(212,152,42,0.25); color: rgba(255,255,255,0.6); padding: 6px 14px; border-radius: 6px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; transition: all 0.15s; }
    .search-btn:hover { border-color: #d4982a; color: #d4982a; }
    .tbtn { background: none; border: none; color: #7a9ab8; cursor: pointer; padding: 4px 8px; font-size: 18px; line-height: 1; transition: color 0.15s; }
    .tbtn:hover { color: #d4982a; }

    /* ── LAYOUT ── */
    .layout { display: flex; flex: 1; }

    /* ── SIDEBAR ── */
    .sidebar { width: 234px; flex-shrink: 0; background: #07091400; background: linear-gradient(180deg,#070c18 0%,#060a15 100%); border-right: 1px solid rgba(212,152,42,0.12); padding: 20px 0; position: sticky; top: 54px; height: calc(100vh - 54px); overflow-y: auto; transition: width 0.2s; }
    .sidebar.closed { width: 0; overflow: hidden; padding: 0; }
    .sidebar::-webkit-scrollbar { width: 4px; }
    .sidebar::-webkit-scrollbar-track { background: transparent; }
    .sidebar::-webkit-scrollbar-thumb { background: #1c2d4a; border-radius: 2px; }
    .sb-sect { margin-bottom: 20px; }
    .sb-lbl { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; text-transform: uppercase; letter-spacing: 2px; color: #2e4460; padding: 0 18px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
    .sb-lbl-icon { color: #d4982a; font-size: 10px; }
    .sb-link { display: flex; align-items: center; padding: 6px 18px; font-family: 'EB Garamond', serif; font-size: 14.5px; color: #4a6080; cursor: pointer; border-left: 2px solid transparent; transition: all 0.15s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sb-link:hover { color: #a8c0d8; background: rgba(212,152,42,0.04); border-left-color: #2e4460; }
    .sb-link.active { color: #d4982a; background: rgba(212,152,42,0.08); border-left-color: #d4982a; }
    .sb-divider { height: 1px; background: rgba(212,152,42,0.08); margin: 4px 18px 16px; }

    /* ── MAIN ── */
    .main { flex: 1; min-width: 0; display: flex; flex-direction: column; background: #070c18; }

    /* ── BREADCRUMB ── */
    .bc { background: #060a15; border-bottom: 1px solid rgba(212,152,42,0.1); padding: 9px 36px; font-size: 12px; color: #3a5570; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .bc span { cursor: pointer; transition: color 0.12s; }
    .bc span:hover { color: #d4982a; }

    /* ── ARTICLE ── */
    .article-wrap { max-width: 800px; margin: 0 auto; padding: 44px 36px 80px; flex: 1; width: 100%; }
    .art-cat { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 2.5px; color: #d4982a; margin-bottom: 10px; }
    .art-title { font-family: 'Cinzel', serif; font-size: 36px; font-weight: 500; line-height: 1.2; color: #f0f4ff; margin-bottom: 10px; letter-spacing: 0.5px; }
    .art-summary { font-size: 16px; color: #7a9ab8; line-height: 1.7; margin-bottom: 28px; font-style: italic; border-left: 2px solid #d4982a; padding-left: 14px; font-family: 'EB Garamond', serif; }
    .divider { border: none; border-top: 1px solid rgba(212,152,42,0.15); margin: 28px 0; }
    .sec-h { font-family: 'Cinzel', serif; font-size: 20px; font-weight: 500; color: #c8d8e8; margin: 28px 0 10px; border-bottom: 1px solid rgba(212,152,42,0.15); padding-bottom: 6px; letter-spacing: 0.3px; }
    .sec-b { font-size: 15.5px; line-height: 1.8; color: #6a8aa8; white-space: pre-line; font-family: 'EB Garamond', serif; }
    .dtable { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 14px; }
    .dtable th { background: rgba(212,152,42,0.12); color: #d4982a; padding: 9px 14px; text-align: left; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.8px; border-bottom: 1px solid rgba(212,152,42,0.2); }
    .dtable td { padding: 8px 14px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #6a8aa8; }
    .dtable tr:hover td { background: rgba(212,152,42,0.03); }
    .dtable td:first-child { color: #a8c0d8; font-weight: 500; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 20px 0; }
    .tag { background: rgba(212,152,42,0.1); color: #7a6030; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-family: 'JetBrains Mono', monospace; border: 1px solid rgba(212,152,42,0.2); }

    /* ── RELATED ── */
    .rel-sect { margin-top: 44px; padding-top: 22px; border-top: 1px solid rgba(212,152,42,0.15); }
    .rel-title { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #3a5570; margin-bottom: 14px; }
    .rel-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 10px; }
    .rel-card { background: rgba(212,152,42,0.04); border: 1px solid rgba(212,152,42,0.15); border-radius: 8px; padding: 12px 14px; cursor: pointer; transition: all 0.15s; }
    .rel-card:hover { border-color: #d4982a; background: rgba(212,152,42,0.09); }
    .rel-card-cat { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #d4982a; margin-bottom: 4px; }
    .rel-card-title { font-family: 'EB Garamond', serif; font-size: 15px; font-weight: 500; color: #a8c0d8; }

    /* ── AI PANEL ── */
    .ai-panel { background: rgba(212,152,42,0.04); border: 1px solid rgba(212,152,42,0.2); border-radius: 10px; padding: 20px; margin-top: 44px; }
    .ai-panel-title { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #4a6080; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
    .ai-dot { width: 7px; height: 7px; background: #d4982a; border-radius: 50%; flex-shrink: 0; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
    .ai-row { display: flex; gap: 8px; }
    .ai-inp { flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(212,152,42,0.2); border-radius: 7px; padding: 9px 14px; font-size: 14.5px; font-family: 'EB Garamond', serif; color: #c8d8e8; outline: none; transition: border-color 0.15s; min-width: 0; }
    .ai-inp::placeholder { color: #3a5570; }
    .ai-inp:focus { border-color: #d4982a; }
    .ai-sbtn { background: #d4982a; color: #04080f; border: none; border-radius: 7px; padding: 9px 18px; font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; white-space: nowrap; flex-shrink: 0; }
    .ai-sbtn:hover:not(:disabled) { background: #e8b84b; }
    .ai-sbtn:disabled { opacity: 0.4; cursor: not-allowed; }
    .ai-ans { margin-top: 14px; padding: 14px; background: rgba(255,255,255,0.03); border-radius: 7px; font-size: 15px; line-height: 1.75; color: #7a9ab8; font-family: 'EB Garamond', serif; border-left: 2px solid #d4982a; white-space: pre-line; }
    .ldots { display: inline-flex; gap: 4px; align-items: center; height: 18px; }
    .ldots span { width: 5px; height: 5px; background: #04080f; border-radius: 50%; display: inline-block; animation: bounce 1.2s infinite; }
    .ldots span:nth-child(2) { animation-delay: 0.2s; }
    .ldots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce { 0%,80%,100%{transform:scale(0.7);opacity:0.4} 40%{transform:scale(1);opacity:1} }

    /* ── HOME ── */
    .home-wrap { padding: 0 32px 80px; max-width: 920px; margin: 0 auto; flex: 1; width: 100%; }

    /* Hero with horizon glow */
    .home-hero { text-align: center; padding: 64px 20px 56px; position: relative; overflow: hidden; }
    .home-hero::before { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 600px; height: 160px; background: radial-gradient(ellipse at bottom, rgba(212,152,42,0.18) 0%, transparent 70%); pointer-events: none; }
    .home-hero::after { content: ''; position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); width: 300px; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,152,42,0.6), transparent); }
    .home-logo-mark { display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
    .home-logo-text { font-family: 'Cinzel', serif; font-size: 56px; font-weight: 500; color: #f0f4ff; letter-spacing: 4px; }
    .home-logo-text span { color: #d4982a; }
    .home-tagline { font-size: 16px; color: #4a6080; margin-top: 10px; font-style: italic; font-family: 'EB Garamond', serif; letter-spacing: 0.3px; }

    /* Home search */
    .home-sw { max-width: 460px; margin: 32px auto 0; position: relative; }
    .home-si { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(212,152,42,0.3); border-radius: 8px; padding: 11px 18px; font-size: 15px; font-family: 'EB Garamond', serif; color: #c8d8e8; outline: none; transition: border-color 0.15s; }
    .home-si::placeholder { color: #2e4460; }
    .home-si:focus { border-color: #d4982a; }
    .home-sr { position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px; background: #0d1525; border: 1px solid rgba(212,152,42,0.25); border-radius: 8px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.5); z-index: 10; }

    /* Cat grid */
    .cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
    .cat-card { background: rgba(212,152,42,0.04); border: 1px solid rgba(212,152,42,0.14); border-radius: 10px; padding: 20px; transition: all 0.15s; }
    .cat-card:hover { border-color: rgba(212,152,42,0.4); background: rgba(212,152,42,0.08); box-shadow: 0 4px 20px rgba(212,152,42,0.08); }
    .cat-icon { font-size: 18px; color: #d4982a; margin-bottom: 8px; opacity: 0.8; }
    .cat-name { font-family: 'Cinzel', serif; font-size: 16px; font-weight: 500; color: #a8c0d8; margin-bottom: 10px; letter-spacing: 0.3px; }
    .cat-link { font-size: 14px; color: #3a5570; cursor: pointer; padding: 2px 0; display: block; font-family: 'EB Garamond', serif; transition: color 0.12s; }
    .cat-link:hover { color: #d4982a; }

    /* ── SEARCH MODAL ── */
    .overlay { position: fixed; inset: 0; background: rgba(2,5,12,0.8); z-index: 200; display: flex; align-items: flex-start; justify-content: center; padding-top: 90px; backdrop-filter: blur(4px); }
    .sm { background: #0d1525; border: 1px solid rgba(212,152,42,0.3); border-radius: 12px; width: 580px; max-width: 92vw; padding: 20px; box-shadow: 0 24px 60px rgba(0,0,0,0.6); }
    .sm-inp { width: 100%; background: transparent; border: none; font-size: 17px; font-family: 'EB Garamond', serif; color: #c8d8e8; outline: none; padding: 6px 0; border-bottom: 1px solid rgba(212,152,42,0.25); }
    .sm-inp::placeholder { color: #2e4460; }
    .sm-inp:focus { border-bottom-color: #d4982a; }
    .sm-res { margin-top: 14px; max-height: 340px; overflow-y: auto; }
    .sr-item { padding: 10px 12px; border-radius: 7px; cursor: pointer; transition: background 0.1s; }
    .sr-item:hover { background: rgba(212,152,42,0.07); }
    .sr-title { font-family: 'Cinzel', serif; font-size: 15.5px; color: #a8c0d8; margin-bottom: 3px; }
    .sr-sum { font-size: 12.5px; color: #3a5570; line-height: 1.4; }
    .sr-cat { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #d4982a; }

    /* Search result shared */
    .search-result { padding: 10px 12px; border-radius: 7px; cursor: pointer; transition: background 0.1s; }
    .search-result:hover { background: rgba(212,152,42,0.07); }
    .search-result-title { font-family: 'Cinzel', serif; font-size: 15.5px; color: #a8c0d8; margin-bottom: 3px; }
    .search-result-summary { font-size: 12.5px; color: #3a5570; line-height: 1.4; }

    /* ── FOOTER ── */
    .footer { background: linear-gradient(0deg, #04080f 0%, #070c18 100%); border-top: 1px solid rgba(212,152,42,0.15); flex-shrink: 0; }
    .footer-horizon { height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(212,152,42,0.5) 30%, rgba(212,152,42,0.8) 50%, rgba(212,152,42,0.5) 70%, transparent 100%); }
    .footer-main { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; padding: 22px 36px; }
    .footer-brand { font-family: 'Cinzel', serif; font-size: 16px; color: #3a5570; letter-spacing: 1px; }
    .footer-brand span { color: #d4982a; }
    .footer-links { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
    .flink { color: #2e4460; font-size: 11px; font-family: 'JetBrains Mono', monospace; text-decoration: none; transition: color 0.15s; }
    .flink:hover { color: #d4982a; }
    .footer-soc { display: flex; gap: 8px; align-items: center; }
    .fsoc { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: rgba(212,152,42,0.06); border-radius: 6px; border: 1px solid rgba(212,152,42,0.18); text-decoration: none; color: #3a5570; transition: all 0.15s; }
    .fsoc:hover { border-color: #d4982a; color: #d4982a; background: rgba(212,152,42,0.12); }
    .fsoc.me { border-color: rgba(212,152,42,0.35); color: #7a6030; }
    .fsoc.me:hover { border-color: #d4982a; color: #d4982a; }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.03); padding: 12px 36px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
    .footer-made { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #2e4460; }
    .footer-made a { color: #d4982a; text-decoration: none; }
    .footer-made a:hover { text-decoration: underline; }
    .footer-copy { font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #1c2d4a; }
  `;

  return (
    <div style={{ fontFamily:"'EB Garamond', serif", minHeight:"100vh", background:"#070c18", color:"#f0f4ff", display:"flex", flexDirection:"column" }}>
      <style>{css}</style>

      {/* Social bar */}
      <div className="sbar">
        <div className="sbar-l"><div className="sbar-l-dot"/> Official Channels</div>
        <div className="sbar-r">
          <a className="spill" href="https://www.arc.network" target="_blank" rel="noopener"><GlobeIcon size={11}/> arc.network</a>
          <a className="spill" href="https://x.com/arc" target="_blank" rel="noopener"><XIcon size={11}/> @arc</a>
          <a className="spill" href="https://discord.com/invite/buildonarc" target="_blank" rel="noopener"><DiscordIcon size={12}/> Discord</a>
        </div>
      </div>

      {/* Header */}
      <header className="hdr">
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <button className="tbtn" onClick={() => setSidebarOpen(p=>!p)}>☰</button>
          <div className="hdr-logo" onClick={() => navigate("home")}>
            <ArcMark size={26}/>
            <span className="hdr-logo-text">Arc<span>ipedia</span></span>
          </div>
        </div>
        <div className="hdr-r">
          <button className="search-btn" onClick={() => { setShowSearch(true); setTimeout(() => searchRef.current?.focus(), 100); }}>
            ⌕ Search <span style={{opacity:0.35, fontSize:10}}>⌘K</span>
          </button>
          <a className="hdr-extlink" href="https://docs.arc.network" target="_blank" rel="noopener">Docs ↗</a>
          <a className="hdr-extlink" href="https://community.arc.network" target="_blank" rel="noopener">Community ↗</a>
          <a className="hdr-extlink" href="https://testnet.arcscan.app" target="_blank" rel="noopener">Explorer ↗</a>
        </div>
      </header>

      <div className="layout">
        {/* Sidebar */}
        <nav className={`sidebar ${sidebarOpen?"":"closed"}`}>
          <div style={{padding:"0 18px 16px", borderBottom:"1px solid rgba(212,152,42,0.08)", marginBottom:"14px"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",color:"#2e4460",letterSpacing:"2px",marginBottom:"8px",textTransform:"uppercase"}}>Navigation</div>
            <div className={`sb-link ${currentArticle==="home"?"active":""}`} onClick={() => navigate("home")}>
              <span style={{color:"#d4982a",marginRight:"6px",fontSize:"11px"}}>⌂</span> Main Page
            </div>
          </div>
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="sb-sect">
              <div className="sb-lbl"><span className="sb-lbl-icon">{cat.icon}</span>{cat.label}</div>
              {cat.articles.map(id => (
                <div key={id} className={`sb-link ${currentArticle===id?"active":""}`} onClick={() => navigate(id)}>
                  {ARTICLES[id]?.title}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* Main content */}
        <main className="main">
          {currentArticle !== "home" && article && (
            <div className="bc">
              <span onClick={() => navigate("home")}>Arcipedia</span>
              <span style={{color:"rgba(212,152,42,0.4)"}}>›</span>
              <span style={{color:"#d4982a"}}>{article.category}</span>
              <span style={{color:"rgba(212,152,42,0.4)"}}>›</span>
              <span style={{color:"#7a9ab8"}}>{article.title}</span>
            </div>
          )}

          {currentArticle === "home" ? (
            <div className="home-wrap">
              {/* Hero */}
              <div className="home-hero">
                <div className="home-logo-mark"><ArcMark size={52}/></div>
                <div className="home-logo-text">Arc<span>ipedia</span></div>
                <p className="home-tagline">The open knowledge base for Arc Network — the stablecoin blockchain.</p>
                <div className="home-sw">
                  <input className="home-si" placeholder="Search articles…" value={searchQuery}
                    onChange={e => handleSearch(e.target.value)}
                    onKeyDown={e => { if (e.key==="Enter" && searchResults.length>0) navigate(searchResults[0].id); }}
                  />
                  {searchResults.length > 0 && (
                    <div className="home-sr">
                      {searchResults.map(r => (
                        <div key={r.id} className="search-result" onClick={() => navigate(r.id)}>
                          <div className="search-result-title">{r.title}</div>
                          <div className="search-result-summary">{r.summary?.slice(0,88)}…</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Category grid */}
              <div className="cat-grid">
                {CATEGORIES.map(cat => (
                  <div key={cat.id} className="cat-card">
                    <div className="cat-icon">{cat.icon}</div>
                    <div className="cat-name">{cat.label}</div>
                    <ul style={{listStyle:"none"}}>
                      {cat.articles.map(id => (
                        <li key={id}><span className="cat-link" onClick={() => navigate(id)}>{ARTICLES[id]?.title}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* AI panel */}
              <div className="ai-panel" style={{marginTop:"40px"}}>
                <div className="ai-panel-title"><div className="ai-dot"/>Ask Arcipedia AI</div>
                <div className="ai-row">
                  <input className="ai-inp" placeholder="Ask anything about Arc Network…" value={aiQuestion} onChange={e=>setAiQuestion(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()}/>
                  <button className="ai-sbtn" onClick={askAI} disabled={aiLoading}>
                    {aiLoading?<span className="ldots"><span/><span/><span/></span>:"Ask →"}
                  </button>
                </div>
                {aiAnswer && <div className="ai-ans">{aiAnswer}</div>}
              </div>
            </div>
          ) : article ? (
            <div className="article-wrap">
              {article.category && <div className="art-cat">{article.category}</div>}
              <h1 className="art-title">{article.title}</h1>
              {article.summary && <p className="art-summary">{article.summary}</p>}
              {article.tags && <div className="tags">{article.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>}
              <hr className="divider"/>
              {article.sections?.map((sec, i) => (
                <div key={i}>
                  <h2 className="sec-h">{sec.heading}</h2>
                  {sec.body && <p className="sec-b">{sec.body}</p>}
                  {sec.table && (
                    <table className="dtable">
                      <thead><tr>{sec.table[0].map((h,j)=><th key={j}>{h}</th>)}</tr></thead>
                      <tbody>{sec.table.slice(1).map((row,j)=><tr key={j}>{row.map((cell,k)=><td key={k}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  )}
                </div>
              ))}
              {article.related?.length > 0 && (
                <div className="rel-sect">
                  <div className="rel-title">See also</div>
                  <div className="rel-grid">
                    {article.related.map(id => ARTICLES[id] && (
                      <div key={id} className="rel-card" onClick={() => navigate(id)}>
                        <div className="rel-card-cat">{ARTICLES[id].category}</div>
                        <div className="rel-card-title">{ARTICLES[id].title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="ai-panel">
                <div className="ai-panel-title"><div className="ai-dot"/>Ask Arcipedia AI about this topic</div>
                <div className="ai-row">
                  <input className="ai-inp" placeholder={`Ask about ${article.title}…`} value={aiQuestion} onChange={e=>setAiQuestion(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()}/>
                  <button className="ai-sbtn" onClick={askAI} disabled={aiLoading}>
                    {aiLoading?<span className="ldots"><span/><span/><span/></span>:"Ask →"}
                  </button>
                </div>
                {aiAnswer && <div className="ai-ans">{aiAnswer}</div>}
              </div>
            </div>
          ) : (
            <div style={{padding:"80px 40px",textAlign:"center",color:"#2e4460"}}>Article not found.</div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-horizon"/>
        <div className="footer-main">
          <div className="footer-brand">Arc<span>ipedia</span></div>
          <div className="footer-links">
            <a className="flink" href="https://docs.arc.network" target="_blank" rel="noopener">Docs</a>
            <a className="flink" href="https://community.arc.network" target="_blank" rel="noopener">Community</a>
            <a className="flink" href="https://developers.circle.com" target="_blank" rel="noopener">Circle Devs</a>
            <a className="flink" href="https://testnet.arcscan.app" target="_blank" rel="noopener">Explorer</a>
          </div>
          <div className="footer-soc">
            <a className="fsoc" href="https://www.arc.network" target="_blank" rel="noopener" title="arc.network"><GlobeIcon size={14}/></a>
            <a className="fsoc" href="https://x.com/arc" target="_blank" rel="noopener" title="@arc on X"><XIcon size={13}/></a>
            <a className="fsoc" href="https://discord.com/invite/buildonarc" target="_blank" rel="noopener" title="Arc Discord"><DiscordIcon size={14}/></a>
            <a className="fsoc me" href="https://x.com/0xFatih" target="_blank" rel="noopener" title="@0xFatih on X"><XIcon size={13}/></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-made">made by <a href="https://x.com/0xFatih" target="_blank" rel="noopener">0xFatih</a> with ♥️</span>
          <span className="footer-copy">© 2026 Arcipedia — Community resource, not affiliated with Circle</span>
        </div>
      </footer>

      {/* Search Modal */}
      {showSearch && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setShowSearch(false)}>
          <div className="sm">
            <input ref={searchRef} className="sm-inp" placeholder="Search Arcipedia…" value={searchQuery}
              onChange={e=>handleSearch(e.target.value)}
              onKeyDown={e=>{
                if(e.key==="Enter"&&searchResults.length>0) navigate(searchResults[0].id);
                if(e.key==="Escape"){setShowSearch(false);setSearchResults([]);setSearchQuery("");}
              }}
            />
            <div className="sm-res">
              {searchResults.length > 0 ? searchResults.map(r=>(
                <div key={r.id} className="sr-item" onClick={()=>navigate(r.id)}>
                  <div className="sr-title">{r.title}</div>
                  <div className="sr-sum">{r.summary}</div>
                </div>
              )) : searchQuery ? (
                <div style={{padding:"20px",textAlign:"center",color:"#2e4460",fontFamily:"'EB Garamond',serif"}}>No results for "{searchQuery}"</div>
              ) : (
                <div style={{padding:"8px 0"}}>
                  {Object.entries(ARTICLES).filter(([id])=>id!=="home").map(([id,a])=>(
                    <div key={id} className="sr-item" onClick={()=>navigate(id)}>
                      <div className="sr-title">{a.title}</div>
                      <div className="sr-cat">{a.category}</div>
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
