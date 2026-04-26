import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════ */
const SVG = {
  home:    "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  info:    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 16v-4 M12 8h.01",
  zap:     "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  cpu:     "M4 4h16v16H4z M9 9h6v6H9z M9 1v3 M15 1v3 M9 20v3 M15 20v3 M20 9h3 M20 14h3 M1 9h3 M1 14h3",
  layout:  "M3 3h18v18H3z M3 9h18 M9 21V9",
  code:    "M16 18l6-6-6-6 M8 6l-6 6 6 6",
  globe:   "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  chart:   "M18 20V10 M12 20V4 M6 20v-6",
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  chevR:   "M9 18l6-6-6-6",
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  menu:    "M3 12h18 M3 6h18 M3 18h18",
  x:       "M18 6L6 18 M6 6l12 12",
  ext:     "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3",
  clock:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
  tag:     "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01",
  list:    "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  shield:  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  brain:   "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2z",
  dollar:  "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  users:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  arrow:   "M5 12h14 M12 5l7 7-7 7",
  warn:    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
};

const Icon = ({ name, size = 16, color = "currentColor", style: s = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ display:"inline-block", flexShrink:0, ...s }}>
    {(SVG[name]||"").split(" M").map((d,i) => (
      <path key={i} d={i===0?d:"M"+d} />
    ))}
  </svg>
);

const XLogo = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const DiscordLogo = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════
   ARC LOGO MARK
══════════════════════════════════════════════════════════ */
const ArcMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="88" rx="46" ry="7" fill="url(#ag)" opacity="0.6"/>
    <path d="M50 10 C25 10 8 32 8 58 L8 72 C8 72 20 58 50 58 C80 58 92 72 92 72 L92 58 C92 32 75 10 50 10Z" fill="white" opacity="0.95"/>
    <defs>
      <radialGradient id="ag" cx="50%" cy="100%" r="50%">
        <stop offset="0%" stopColor="#00d4aa"/>
        <stop offset="100%" stopColor="#00d4aa" stopOpacity="0"/>
      </radialGradient>
    </defs>
  </svg>
);

const Wordmark = () => (
  <span style={{ fontFamily:"'Cinzel',Georgia,serif", fontSize:"1.2rem", fontWeight:500, letterSpacing:"0.05em" }}>
    <span style={{ color:"#f1f5f9" }}>Arc</span>
    <span style={{ color:"#00d4aa" }}>ipedia</span>
  </span>
);

/* ═══════════════════════════════════════════════════════
   NAVIGATION STRUCTURE
══════════════════════════════════════════════════════════ */
const NAV = [
  { id:"home",         en:"Home",          tr:"Ana Sayfa",       icon:"home" },
  { id:"about",        en:"About Arc",     tr:"Arc Hakkında",    icon:"info",
    ch:[
      { id:"about",       en:"Overview",      tr:"Genel Bakış" },
      { id:"why-arc",     en:"Why Arc?",      tr:"Neden Arc?" },
      { id:"roadmap",     en:"Roadmap",       tr:"Yol Haritası" },
    ]},
  { id:"features",     en:"Key Features",  tr:"Temel Özellikler",icon:"zap",
    ch:[
      { id:"finality",    en:"Deterministic Finality", tr:"Deterministik Kesinlik" },
      { id:"fees",        en:"Stable Gas (USDC)",      tr:"Sabit Gas (USDC)" },
      { id:"privacy",     en:"Opt-in Privacy",         tr:"İsteğe Bağlı Gizlilik" },
      { id:"evm",         en:"EVM Compatibility",      tr:"EVM Uyumluluğu" },
    ]},
  { id:"architecture", en:"Architecture",  tr:"Mimari",          icon:"cpu",
    ch:[
      { id:"consensus",   en:"Consensus Layer",  tr:"Konsensüs Katmanı" },
      { id:"execution",   en:"Execution Layer",  tr:"Yürütme Katmanı" },
      { id:"malachite",   en:"Malachite BFT",    tr:"Malachite BFT" },
    ]},
  { id:"use-cases",    en:"Use Cases",     tr:"Kullanım Alanları",icon:"layout",
    ch:[
      { id:"payments",         en:"Payments & FX",      tr:"Ödemeler ve Döviz" },
      { id:"ai-agents",        en:"AI Agents",           tr:"Yapay Zeka Ajanları" },
      { id:"capital-markets",  en:"Capital Markets",     tr:"Sermaye Piyasaları" },
      { id:"tokenization",     en:"Asset Tokenization",  tr:"Varlık Tokenizasyonu" },
    ]},
  { id:"developers",   en:"Developers",   tr:"Geliştiriciler",  icon:"code", badge:"New",
    ch:[
      { id:"getting-started", en:"Getting Started",  tr:"Başlangıç" },
      { id:"app-kit",         en:"App Kit",          tr:"App Kit" },
      { id:"gas",             en:"Gas & Fees",       tr:"Gas ve Ücretler" },
      { id:"testnet",         en:"Testnet Guide",    tr:"Test Ağı Rehberi" },
    ]},
  { id:"ecosystem",    en:"Ecosystem",    tr:"Ekosistem",       icon:"globe",
    ch:[
      { id:"circle",      en:"Circle Platform",  tr:"Circle Platformu" },
      { id:"arc-house",   en:"Arc House",        tr:"Arc House" },
      { id:"partners",    en:"Partners",         tr:"Ortaklar" },
      { id:"architects",  en:"Architects",       tr:"Mimarlar Programı" },
    ]},
  { id:"comparison",   en:"Comparison",   tr:"Karşılaştırma",  icon:"chart" },
  { id:"glossary",     en:"Glossary",     tr:"Sözlük",          icon:"book" },
];

const SEARCH_INDEX = [
  { id:"about",           en:"Arc Network Overview",      tr:"Arc Network Genel Bakış",    cat:"About",        x:"EVM-compatible L1 for stablecoin finance" },
  { id:"finality",        en:"Deterministic Finality",    tr:"Deterministik Kesinlik",     cat:"Features",     x:"Sub-second finality, zero reorg risk" },
  { id:"fees",            en:"Stable USDC Gas",           tr:"Sabit USDC Gas",             cat:"Features",     x:"$0.01 base fee, fiat-pegged costs" },
  { id:"privacy",         en:"Opt-in Privacy",            tr:"İsteğe Bağlı Gizlilik",      cat:"Features",     x:"Confidential transfers, selective disclosure" },
  { id:"evm",             en:"EVM Compatibility",         tr:"EVM Uyumluluğu",             cat:"Architecture", x:"Solidity, Hardhat, Foundry, Metamask all work" },
  { id:"malachite",       en:"Malachite BFT",             tr:"Malachite BFT",              cat:"Architecture", x:"Byzantine fault tolerant consensus engine" },
  { id:"ai-agents",       en:"AI Agents on Arc",          tr:"Arc'ta Yapay Zeka Ajanları", cat:"Use Cases",    x:"ERC-8004 identity, ERC-8183 job marketplace" },
  { id:"app-kit",         en:"App Kit SDK",               tr:"App Kit SDK",                cat:"Developers",   x:"Bridge, Swap, Send across chains via CCTP" },
  { id:"getting-started", en:"Getting Started",           tr:"Başlangıç",                  cat:"Developers",   x:"Deploy your first contract on Arc testnet" },
  { id:"circle",          en:"Circle Platform",           tr:"Circle Platformu",           cat:"Ecosystem",    x:"USDC, CCTP, Gateway, Wallets infrastructure" },
  { id:"arc-house",       en:"Arc House & Architects",    tr:"Arc House ve Mimarlar",      cat:"Ecosystem",    x:"Community hub and contribution program" },
  { id:"comparison",      en:"Blockchain Comparison",     tr:"Blockchain Karşılaştırması", cat:"Reference",    x:"Arc vs Ethereum vs Solana vs Polygon" },
  { id:"glossary",        en:"Glossary",                  tr:"Sözlük",                     cat:"Reference",    x:"BFT, CCTP, USDC, EVM and more defined" },
  { id:"payments",        en:"Payments & FX",             tr:"Ödemeler ve Döviz",          cat:"Use Cases",    x:"Cross-border payments, stablecoin FX" },
  { id:"testnet",         en:"Testnet Guide",             tr:"Test Ağı Rehberi",           cat:"Developers",   x:"Faucet, explorer, contract addresses" },
];

/* ═══════════════════════════════════════════════════════
   COMPARISON TABLE DATA
══════════════════════════════════════════════════════════ */
const COMPARE = [
  { f:"Finality",       fTr:"Kesinlik",
    arc:{v:"<1s deterministic",g:"best"}, eth:{v:"~12 min (prob.)",g:"bad"}, sol:{v:"~0.4s (prob.)",g:"good"}, pol:{v:"~2.3s (prob.)",g:"ok"} },
  { f:"Gas Token",      fTr:"Gas Tokeni",
    arc:{v:"USDC ($0.01)",g:"best"}, eth:{v:"ETH (volatile)",g:"bad"}, sol:{v:"SOL (volatile)",g:"ok"}, pol:{v:"MATIC (volatile)",g:"ok"} },
  { f:"Fee Stability",  fTr:"Ücret Sabitliği",
    arc:{v:"Fiat-pegged",g:"best"}, eth:{v:"Highly variable",g:"bad"}, sol:{v:"Low, spiky",g:"ok"}, pol:{v:"Low, volatile",g:"ok"} },
  { f:"EVM",            fTr:"EVM Uyumu",
    arc:{v:"Full EVM",g:"best"}, eth:{v:"Native",g:"best"}, sol:{v:"None (SVM)",g:"bad"}, pol:{v:"Full EVM",g:"best"} },
  { f:"Opt-in Privacy", fTr:"Gizlilik",
    arc:{v:"Yes",g:"best"}, eth:{v:"No",g:"bad"}, sol:{v:"No",g:"bad"}, pol:{v:"No",g:"bad"} },
  { f:"AI Standards",   fTr:"Yapay Zeka",
    arc:{v:"ERC-8004/8183",g:"best"}, eth:{v:"None",g:"na"}, sol:{v:"None",g:"na"}, pol:{v:"None",g:"na"} },
  { f:"Stablecoin Gas", fTr:"Stablecoin Gas",
    arc:{v:"Yes (USDC/EURC)",g:"best"}, eth:{v:"No",g:"bad"}, sol:{v:"No",g:"bad"}, pol:{v:"Partial",g:"ok"} },
  { f:"Approx. TPS",    fTr:"Yaklaşık TPS",
    arc:{v:"~5,000+",g:"good"}, eth:{v:"~15-30",g:"bad"}, sol:{v:"~50,000",g:"best"}, pol:{v:"~7,000",g:"good"} },
];

const GLOSSARY = [
  { t:"BFT",                 d:"Byzantine Fault Tolerance. A consensus property ensuring the network functions correctly even if some nodes act maliciously." },
  { t:"CCTP",                d:"Cross-Chain Transfer Protocol. Circle's standard for burning USDC on one chain and minting it natively on another." },
  { t:"Consensus Layer",     d:"The protocol layer responsible for ordering transactions and achieving agreement among validators." },
  { t:"Deterministic Finality",d:"A property where, once a block is finalized, it cannot be reversed under any circumstance." },
  { t:"EIP-1559",            d:"A fee mechanism that uses a base fee and a priority tip to smooth transaction costs across demand spikes." },
  { t:"ERC-8004",            d:"Arc-specific standard for onchain AI agent identity and reputation registration." },
  { t:"ERC-8183",            d:"Arc-specific standard for escrow-based job creation and settlement for AI agents." },
  { t:"EURC",                d:"Euro Coin. Circle's euro-backed stablecoin, supported on Arc alongside USDC." },
  { t:"EVM",                 d:"Ethereum Virtual Machine. The runtime environment that executes smart contracts on Ethereum and compatible chains like Arc." },
  { t:"Gateway",             d:"Circle's chain-abstraction layer providing a unified USDC balance across multiple EVM chains." },
  { t:"Malachite BFT",       d:"The Byzantine Fault Tolerant consensus engine used by Arc, designed for sub-second deterministic finality." },
  { t:"MCP",                 d:"Model Context Protocol. A standard for integrating external tools (like Arc) into AI coding assistants." },
  { t:"Opt-in Privacy",      d:"A model where transactions are transparent by default, but users can selectively enable confidential transfers." },
  { t:"Probabilistic Finality",d:"A consensus model where transactions are considered final after enough confirmations, but never truly irreversible." },
  { t:"Selective Disclosure",d:"The ability to prove transaction validity to specific parties (e.g. regulators) without revealing data publicly." },
  { t:"USDC",                d:"USD Coin. Circle's dollar-backed stablecoin and Arc's native gas token, targeting $0.01 per transaction." },
  { t:"Validator",           d:"A node that participates in consensus to validate transactions and produce new blocks. Arc uses a permissioned set." },
];

/* ═══════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Cinzel:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#03060d;color:#e2e8f0;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:#070d1a}
::-webkit-scrollbar-thumb{background:rgba(0,212,170,.25);border-radius:3px}
::selection{background:rgba(0,212,170,.25)}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.fade-up{animation:fadeUp .4s ease-out}
.arc-gradient{background:linear-gradient(135deg,#00d4aa,#0ea5e9,#00d4aa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
code{font-family:'JetBrains Mono',monospace;font-size:.84em;background:rgba(0,212,170,.1);color:#00d4aa;padding:.15em .4em;border-radius:4px}
.prose p{font-size:.9375rem;line-height:1.8;color:#94a3b8;margin-bottom:.9rem}
.prose h2{font-family:'Cinzel',serif;font-size:1.3rem;font-weight:500;color:#f1f5f9;margin:1.8rem 0 .65rem;padding-bottom:.5rem;border-bottom:1px solid rgba(0,212,170,.15);letter-spacing:.02em}
.prose h3{font-size:1.05rem;font-weight:600;color:#cbd5e1;margin:1.4rem 0 .5rem}
.prose ul{padding-left:1.2rem;margin-bottom:.9rem}
.prose li{font-size:.9375rem;line-height:1.8;color:#94a3b8;margin-bottom:.3rem}
.prose li::marker{color:#00d4aa}
.prose strong{color:#cbd5e1}
.prose blockquote{border-left:2px solid #00d4aa;padding:10px 16px;background:rgba(0,212,170,.06);border-radius:0 6px 6px 0;margin:1rem 0}
.prose blockquote p{font-style:italic;color:#7a9ab8;margin:0}
.prose blockquote footer{font-size:.8rem;color:#00d4aa;margin-top:6px}
.toc-a{display:block;padding:4px 0;font-size:12.5px;color:#475569;text-decoration:none;transition:color .15s;position:relative}
.toc-a:hover{color:#94a3b8}
.toc-a.active{color:#00d4aa;font-weight:500}
.toc-a.active::before{content:'';position:absolute;left:-12px;top:50%;transform:translateY(-50%);width:3px;height:14px;background:#00d4aa;border-radius:2px}
.cmp-best{color:#00d4aa}.cmp-good{color:#86efac}.cmp-ok{color:#fbbf24}.cmp-bad{color:#f87171}.cmp-na{color:#475569}
.sb-btn{width:100%;display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;border:none;background:transparent;cursor:pointer;text-align:left;font-size:13.5px;transition:all .15s;font-family:'Inter',sans-serif}
.sb-btn:hover{background:rgba(0,212,170,.05);color:#94a3b8}
.sb-btn.active{background:rgba(0,212,170,.1);color:#00d4aa;border-left:2px solid #00d4aa}
.sb-btn.parent{color:#64748b;font-weight:500}
.sb-btn.parent.has-active{color:#cbd5e1}
.feature-card{display:flex;flex-direction:column;gap:12px;padding:18px;border-radius:12px;border:1px solid rgba(0,212,170,.15);background:rgba(7,13,26,.6);cursor:pointer;text-align:left;transition:all .2s;width:100%}
.feature-card:hover{border-color:rgba(0,212,170,.4);background:rgba(0,212,170,.04)}
.quick-btn{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:9px;border:1px solid rgba(0,212,170,.15);background:rgba(7,13,26,.5);cursor:pointer;transition:all .15s;width:100%}
.quick-btn:hover{border-color:rgba(0,212,170,.35);background:rgba(0,212,170,.04)}
.ext-a{color:#475569;text-decoration:none;font-size:12px;transition:color .15s}
.ext-a:hover{color:#00d4aa}
.soc-btn{width:30px;height:30px;border-radius:7px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.04);border:1px solid rgba(0,212,170,.15);color:#475569;text-decoration:none;transition:all .15s}
.soc-btn:hover{border-color:#00d4aa;color:#00d4aa}
.soc-btn.me{border-color:rgba(212,152,42,.4);color:#d4982a}
.info-table{width:100%;border-collapse:collapse;font-size:.875rem}
.info-table th{background:rgba(0,212,170,.08);color:#00d4aa;padding:8px 12px;text-align:left;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid rgba(0,212,170,.2)}
.info-table td{padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.04);color:#94a3b8}
.info-table tr:hover td{background:rgba(0,212,170,.03)}
.info-table td:first-child{color:#cbd5e1;font-weight:500}
.pre-block{font-family:'JetBrains Mono',monospace;background:#070d1a;border:1px solid rgba(0,212,170,.15);border-radius:8px;padding:16px;overflow-x:auto;font-size:12.5px;line-height:1.65;color:#94a3b8;margin:1rem 0;white-space:pre}
.callout-info{display:flex;gap:12px;padding:13px 16px;border-radius:8px;background:rgba(0,212,170,.06);border:1px solid rgba(0,212,170,.2);margin:1rem 0}
.callout-warn{display:flex;gap:12px;padding:13px 16px;border-radius:8px;background:rgba(212,152,42,.08);border:1px solid rgba(212,152,42,.25);margin:1rem 0}
.tag-pill{display:inline-flex;align-items:center;padding:2px 9px;border-radius:99px;font-size:11px;background:#0d1525;border:1px solid rgba(0,212,170,.15);color:#64748b}
@media(min-width:1024px){.lg-show{display:block!important}.lg-hide{display:none!important}}
@media(max-width:1023px){.lg-show{display:none!important}}
@media(min-width:640px){.sm-show{display:inline!important}}
@media(max-width:639px){.sm-show{display:none!important}}
`;

/* ═══════════════════════════════════════════════════════
   REUSABLE CONTENT COMPONENTS
══════════════════════════════════════════════════════════ */
const H2 = ({ id, children }) => (
  <h2 id={id} className="prose" style={{ fontFamily:"'Cinzel',serif", fontSize:"1.3rem", fontWeight:500, color:"#f1f5f9", margin:"1.8rem 0 .65rem", paddingBottom:".5rem", borderBottom:"1px solid rgba(0,212,170,.15)", letterSpacing:".02em" }}>
    {children}
  </h2>
);

const P = ({ children }) => (
  <p style={{ fontSize:".9375rem", lineHeight:1.8, color:"#94a3b8", marginBottom:".9rem" }}>{children}</p>
);

const UL = ({ items }) => (
  <ul style={{ paddingLeft:"1.2rem", marginBottom:".9rem" }}>
    {items.map((x,i) => (
      <li key={i} style={{ fontSize:".9375rem", lineHeight:1.8, color:"#94a3b8", marginBottom:".3rem" }}>{x}</li>
    ))}
  </ul>
);

const Quote = ({ text, author }) => (
  <blockquote style={{ borderLeft:"2px solid #00d4aa", padding:"10px 16px", background:"rgba(0,212,170,.06)", borderRadius:"0 6px 6px 0", margin:"1rem 0" }}>
    <p style={{ fontStyle:"italic", color:"#7a9ab8", margin:0, fontSize:".9rem", lineHeight:1.7 }}>"{text}"</p>
    <footer style={{ fontSize:".78rem", color:"#00d4aa", marginTop:6 }}>— {author}</footer>
  </blockquote>
);

const InfoTable = ({ rows }) => (
  <div style={{ overflowX:"auto", borderRadius:8, border:"1px solid rgba(0,212,170,.15)", margin:"1rem 0" }}>
    <table className="info-table"><tbody>
      {rows.map(([k,v],i) => (
        <tr key={i}>
          <td style={{ color:"#cbd5e1", fontWeight:500, width:"42%" }}>{k}</td>
          <td style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".8rem" }}>{v}</td>
        </tr>
      ))}
    </tbody></table>
  </div>
);

const Pre = ({ children }) => (
  <div className="pre-block">{children}</div>
);

const CalloutInfo = ({ children }) => (
  <div className="callout-info">
    <Icon name="info" size={15} color="#00d4aa" style={{ flexShrink:0, marginTop:1 }}/>
    <div style={{ fontSize:".875rem", color:"#5eead4", lineHeight:1.6 }}>{children}</div>
  </div>
);

const CalloutWarn = ({ children }) => (
  <div className="callout-warn">
    <Icon name="warn" size={15} color="#d4982a" style={{ flexShrink:0, marginTop:1 }}/>
    <div style={{ fontSize:".875rem", color:"#fbbf24", lineHeight:1.6 }}>{children}</div>
  </div>
);

const GridCards = ({ items }) => (
  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:10, margin:"1rem 0" }}>
    {items.map((p,i) => (
      <div key={i} style={{ padding:"13px 14px", borderRadius:8, border:"1px solid rgba(0,212,170,.15)", background:"#0d1525" }}>
        <div style={{ fontSize:".78rem", fontWeight:600, color:"#00d4aa", marginBottom:4, fontFamily:"'JetBrains Mono',monospace" }}>{p.title}</div>
        <div style={{ fontSize:".75rem", color:"#64748b", lineHeight:1.5 }}>{p.desc}</div>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════
   COMPARISON TABLE
══════════════════════════════════════════════════════════ */
const CompareTable = ({ lang }) => {
  const gc = { best:"cmp-best", good:"cmp-good", ok:"cmp-ok", bad:"cmp-bad", na:"cmp-na" };
  return (
    <div style={{ overflowX:"auto", borderRadius:12, border:"1px solid rgba(0,212,170,.15)" }}>
      <table style={{ width:"100%", minWidth:580, borderCollapse:"collapse", fontSize:".8rem" }}>
        <thead>
          <tr style={{ borderBottom:"1px solid rgba(0,212,170,.15)", background:"rgba(0,212,170,.04)" }}>
            <th style={{ padding:"10px 12px", textAlign:"left", color:"#64748b", fontSize:".68rem", textTransform:"uppercase", letterSpacing:".08em", width:160 }}>
              {lang==="tr" ? "Özellik" : "Feature"}
            </th>
            {[["Arc",true],["Ethereum"],["Solana"],["Polygon"]].map(([c,hi]) => (
              <th key={c} style={{ padding:"10px 12px", textAlign:"center", color:hi?"#00d4aa":"#64748b", fontSize:".68rem", textTransform:"uppercase", letterSpacing:".08em", background:hi?"rgba(0,212,170,.03)":"transparent" }}>
                {c}{hi && <span style={{ marginLeft:5, padding:"1px 5px", borderRadius:20, background:"rgba(0,212,170,.15)", fontSize:"9px", textTransform:"none", color:"#00d4aa" }}>★</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE.map((row,i) => (
            <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,.04)" }}>
              <td style={{ padding:"8px 12px", color:"#cbd5e1", fontWeight:500 }}>{lang==="tr" ? row.fTr : row.f}</td>
              {[["arc",true],["eth"],["sol"],["pol"]].map(([k,hi]) => (
                <td key={k} className={gc[row[k].g]} style={{ padding:"8px 12px", textAlign:"center", fontSize:".78rem", background:hi?"rgba(0,212,170,.02)":"transparent" }}>
                  {row[k].v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display:"flex", flexWrap:"wrap", gap:14, padding:"8px 12px", borderTop:"1px solid rgba(255,255,255,.04)", background:"rgba(0,0,0,.15)", fontSize:"11px" }}>
        {[["best","Best"],["good","Good"],["ok","Adequate"],["bad","Weak"],["na","N/A"]].map(([g,l])=>(
          <span key={g} className={`cmp-${g}`} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"currentColor", display:"inline-block" }}/>{l}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE CONTENT
══════════════════════════════════════════════════════════ */
const renderPage = (id, lang) => {
  const T = (en, tr) => lang === "tr" ? tr : en;

  const pages = {
    about: () => (
      <div className="prose">
        <H2 id="what">{T("What is Arc?","Arc Nedir?")}</H2>
        <P>{T("Arc is an open Layer-1 blockchain purpose-built for stablecoin finance. It uses USDC as its native gas token, provides deterministic sub-second finality via Malachite BFT, and supports opt-in privacy for confidential transfers.",
          "Arc, stablecoin finansı için inşa edilmiş açık bir Layer-1 blockchain'dir. USDC'yi yerel gas tokeni olarak kullanır, Malachite BFT aracılığıyla deterministik sub-saniye kesinlik sağlar ve gizli transferler için isteğe bağlı gizliliği destekler.")}</P>
        <P>{T("Arc is purpose-built for real-world economic activity, not general-purpose computation. Every design decision directly supports the needs of financial infrastructure.",
          "Arc, genel amaçlı hesaplama için değil, gerçek dünya ekonomik faaliyeti için özel olarak tasarlanmıştır.")}</P>

        <H2 id="why">{T("Why Arc?","Neden Arc?")}</H2>
        <P>{T("Existing blockchain infrastructure has critical gaps for financial applications:","Mevcut blockchain altyapısı, finansal uygulamalar için kritik boşluklara sahiptir:")}</P>
        <UL items={[
          T("Volatile gas costs — ETH/SOL fees are unpredictable","Değişken gas maliyetleri — ETH/SOL ücretleri öngörülemez"),
          T("No deterministic finality — probabilistic systems carry reorg risk","Deterministik kesinlik yok — olasılıksal sistemler yeniden düzenleme riski taşır"),
          T("No built-in privacy — all transactions are fully public","Yerleşik gizlilik yok — tüm işlemler tamamen halka açık"),
          T("No AI agent standards — no protocol-level support for autonomous value settlement","Yapay zeka ajan standartları yok — otonom değer uzlaşması için protokol düzeyinde destek yok"),
        ]}/>

        <H2 id="design">{T("Core Design Principles","Temel Tasarım İlkeleri")}</H2>
        <GridCards items={[
          { title:"Stablecoin Gas",              desc:T("USDC as native gas, $0.01 base fee","Yerel gas olarak USDC, $0.01 taban ücreti") },
          { title:"Deterministic Finality",      desc:T("Sub-second BFT, zero reorg","Saniyenin altında BFT, sıfır yeniden düzenleme") },
          { title:"Full EVM",                   desc:T("Deploy Solidity unchanged","Solidity'yi değiştirmeden deploy et") },
          { title:"Opt-in Privacy",              desc:T("Transparent by default","Varsayılan olarak şeffaf") },
        ]}/>

        <H2 id="network">{T("Network Parameters","Ağ Parametreleri")}</H2>
        <InfoTable rows={[
          [T("Consensus","Konsensüs"),"Malachite BFT"],
          [T("Execution","Yürütme"),"EVM"],
          [T("Gas Token","Gas Tokeni"),"USDC"],
          [T("Base Fee","Taban Ücret"),"~$0.01"],
          [T("Finality","Kesinlik"),"<1 second, deterministic"],
          [T("Validators","Doğrulayıcılar"),T("Permissioned set","İzinli küme")],
          [T("Dev Access","Geliştirici Erişimi"),T("Permissionless","İzinsiz")],
          [T("Stablecoins","Stablecoinler"),"USDC, EURC"],
        ]}/>

        <H2 id="partners">{T("Design Partners","Tasarım Ortakları")}</H2>
        {[
          { name:"Visa", q:T("Arc's design — integrating stablecoin-based gas fees, deterministic finality, and programmable interoperability — offers a strong environment to explore how trusted payments networks can connect to and help scale emerging onchain infrastructure.","Arc'ın tasarımı güvenilir ödeme ağlarının zincir üstü altyapıya nasıl bağlanabileceğini keşfetmek için güçlü bir ortam sunuyor."), a:"Cuy Sheffield, Head of Crypto, Visa" },
          { name:"Mastercard", q:T("Deepening our longstanding work with Circle as an early design partner, Mastercard is exploring how we can help shape Arc's foundation to enable secure, simple payment experiences.","Mastercard, erken tasarım ortağı olarak Arc'ın temelini şekillendirmeye yardımcı olmayı araştırıyor."), a:"Raj Dhamodharan, EVP Blockchain & Digital Assets, Mastercard" },
          { name:"Goldman Sachs", q:T("We're excited to be part of an initiative that tests how programmable settlement and interoperable FX workflows can enhance regulated markets.","Programlanabilir uzlaşmanın düzenlenmiş piyasaları nasıl geliştirebileceğini test eden girişimin parçası olmaktan heyecan duyuyoruz."), a:"Mathew McDermott, Global Head of Digital Assets, Goldman Sachs" },
        ].map((p,i)=><Quote key={i} text={p.q} author={p.a}/>)}
      </div>
    ),

    finality: () => (
      <div className="prose">
        <H2 id="what">{T("What is Finality?","Kesinlik Nedir?")}</H2>
        <P>{T("Finality is the point at which a blockchain transaction becomes irreversible. Once finalized, it cannot be reversed, double-spent, or reorganized.","Kesinlik, bir blockchain işleminin geri döndürülemez hale geldiği noktadır.")}</P>

        <H2 id="prob">{T("Probabilistic vs Deterministic","Olasılıksal vs Deterministik")}</H2>
        <div style={{ overflowX:"auto", borderRadius:8, border:"1px solid rgba(0,212,170,.15)", margin:"1rem 0" }}>
          <table className="info-table">
            <thead><tr>
              {[T("Chain","Zincir"),T("Type","Tür"),T("Time","Süre"),T("Reorg Risk","Yeniden Düzenleme")].map(h=>(
                <th key={h}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[
                { c:"Arc",      t:"Deterministic BFT", tm:"<1s",    r:T("None ✓","Yok ✓"), arc:true },
                { c:"Ethereum", t:"Probabilistic PoS",  tm:"~12 min",r:T("Low","Düşük") },
                { c:"Solana",   t:"Probabilistic PoH",  tm:"~0.4s",  r:T("Low","Düşük") },
                { c:"Polygon",  t:"Probabilistic PoS",  tm:"~2.3s",  r:T("Low","Düşük") },
              ].map((r,i)=>(
                <tr key={i} style={{ background:r.arc?"rgba(0,212,170,.03)":"transparent" }}>
                  <td style={{ color:r.arc?"#00d4aa":"#cbd5e1", fontWeight:r.arc?600:400 }}>{r.c}</td>
                  <td style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".78rem" }}>{r.t}</td>
                  <td style={{ color:r.arc?"#00d4aa":"#94a3b8", fontFamily:"'JetBrains Mono',monospace", fontSize:".78rem" }}>{r.tm}</td>
                  <td style={{ color:r.arc?"#86efac":"#fbbf24" }}>{r.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H2 id="finance">{T("Why It Matters for Finance","Finansta Neden Önemli?")}</H2>
        <UL items={[
          T("Payment systems need to know a payment is settled before releasing goods","Ödeme sistemleri, mal teslim etmeden önce ödemenin uzlaşıldığını bilmek zorundadır"),
          T("FX settlement requires both legs to finalize atomically","Döviz uzlaşması, her iki tarafın atomik olarak kesinleşmesini gerektirir"),
          T("Lending protocols need collateral confirmation before releasing loans","Borç verme protokolleri kredi açmadan önce teminat onayına ihtiyaç duyar"),
          T("Capital markets need zero reorg risk for real-time settlement","Sermaye piyasaları gerçek zamanlı uzlaşma için sıfır yeniden düzenleme riski gerektirir"),
        ]}/>

        <H2 id="arc">{T("How Arc Achieves It","Arc Nasıl Sağlar?")}</H2>
        <P>{T("Arc uses Malachite BFT: a Byzantine Fault Tolerant engine. A block is finalized once 2/3+ validators sign it. Immediate and irreversible — no reorg possible.",
          "Arc, Malachite BFT kullanır. Doğrulayıcıların 2/3'ünden fazlası imzaladıktan sonra bir blok kesinleşir. Anında ve geri döndürülemez.")}</P>
      </div>
    ),

    fees: () => (
      <div className="prose">
        <H2 id="model">{T("Fee Model","Ücret Modeli")}</H2>
        <InfoTable rows={[
          [T("Gas Token","Gas Tokeni"),"USDC"],
          [T("Base Fee Target","Taban Ücret Hedefi"),"~$0.01 per transaction"],
          [T("Mechanism","Mekanizma"),"EIP-1559 style smoothing"],
          [T("Priority Fee","Öncelik Ücreti"),T("Optional, paid to validators","İsteğe bağlı, doğrulayıcılara ödenir")],
        ]}/>

        <H2 id="usdc">{T("USDC as Gas","Gas Olarak USDC")}</H2>
        <P>{T("By using USDC as the gas token, Arc eliminates the need to hold multiple tokens. Users and applications only need USDC to transact and pay fees.",
          "USDC'yi gas tokeni olarak kullanarak Arc, birden fazla token tutma ihtiyacını ortadan kaldırır.")}</P>
        <CalloutInfo>{T("Gas is charged in USDC at the token level — no wrapping or conversion required.","Gas, token düzeyinde USDC cinsinden ücretlendirilir — sarmanıza veya dönüştürmenize gerek yoktur.")}</CalloutInfo>

        <H2 id="eip">{T("EIP-1559 Smoothing","EIP-1559 Düzleştirme")}</H2>
        <P>{T("Arc uses an EIP-1559 style fee mechanism to smooth costs during demand spikes. The base fee adjusts gradually, ensuring predictable costs even under load.",
          "Arc, talep artışları sırasında maliyetleri düzeltmek için EIP-1559 tarzı bir ücret mekanizması kullanır.")}</P>

        <H2 id="compare">{T("Fee Comparison","Ücret Karşılaştırması")}</H2>
        <div style={{ overflowX:"auto", borderRadius:8, border:"1px solid rgba(0,212,170,.15)", margin:"1rem 0" }}>
          <table className="info-table">
            <thead><tr>
              {["Chain",T("Gas Token","Gas Tokeni"),T("Typical Cost","Tipik Maliyet"),T("Stability","Sabitlik")].map(h=><th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[
                { c:"Arc",     g:"USDC", co:"~$0.01", s:T("Fiat-pegged","Fiat sabitli"), arc:true },
                { c:"Ethereum",g:"ETH",  co:"$1-200+", s:T("Highly variable","Çok değişken") },
                { c:"Solana",  g:"SOL",  co:"<$0.001", s:T("Low but spiky","Düşük ama ani artış") },
                { c:"Polygon", g:"MATIC",co:"~$0.01",  s:T("Volatile token","Değişken token") },
              ].map((r,i)=>(
                <tr key={i} style={{ background:r.arc?"rgba(0,212,170,.03)":"transparent" }}>
                  <td style={{ color:r.arc?"#00d4aa":"#cbd5e1", fontWeight:r.arc?600:400 }}>{r.c}</td>
                  <td style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".78rem" }}>{r.g}</td>
                  <td style={{ color:r.arc?"#86efac":"#94a3b8", fontFamily:"'JetBrains Mono',monospace" }}>{r.co}</td>
                  <td style={{ color:r.arc?"#86efac":"#fbbf24" }}>{r.s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),

    privacy: () => (
      <div className="prose">
        <H2 id="model">{T("Privacy Model","Gizlilik Modeli")}</H2>
        <P>{T("Arc's opt-in privacy model means transactions are transparent by default — just like standard EVM chains — but users can selectively enable confidential transfers when needed.",
          "Arc'ın isteğe bağlı gizlilik modeli, işlemlerin varsayılan olarak şeffaf olduğu anlamına gelir — standart EVM zincirleri gibi — ancak kullanıcılar gerektiğinde gizli transferleri seçici olarak etkinleştirebilir.")}</P>

        <H2 id="selective">{T("Selective Disclosure","Seçici Açıklama")}</H2>
        <P>{T("Selective disclosure allows parties to prove the validity of a transaction to specific counterparties (like regulators or auditors) without exposing data to the public.",
          "Seçici açıklama, tarafların verileri halka açıklamadan belirli karşı taraflara (düzenleyiciler veya denetçiler gibi) bir işlemin geçerliliğini kanıtlamasına olanak tanır.")}</P>
        <UL items={[
          T("Prove payment to a regulator without public exposure","Kamuya açıklamadan düzenleyiciye ödeme kanıtla"),
          T("Enable compliance audits with zero data leakage","Sıfır veri sızıntısıyla uyum denetimlerini etkinleştir"),
          T("Meet KYC/AML requirements while preserving user privacy","Kullanıcı gizliliğini korurken KYC/AML gereksinimlerini karşıla"),
        ]}/>

        <H2 id="use-cases">{T("Use Cases","Kullanım Alanları")}</H2>
        <GridCards items={[
          { title:T("Corporate Payments","Kurumsal Ödemeler"), desc:T("Hide transaction amounts between business partners","İş ortakları arasında işlem tutarlarını gizle") },
          { title:T("Regulated Finance","Düzenlenmiş Finans"), desc:T("Compliance with selective disclosure to regulators","Düzenleyicilere seçici açıklamayla uyumluluk") },
          { title:T("Asset Management","Varlık Yönetimi"), desc:T("Confidential portfolio movements","Gizli portföy hareketleri") },
          { title:T("FX Settlement","Döviz Uzlaşması"), desc:T("Private bilateral settlement amounts","Özel ikili uzlaşma tutarları") },
        ]}/>
      </div>
    ),

    evm: () => (
      <div className="prose">
        <H2 id="compat">{T("What Works Out of the Box","Kutusundan Çıkan Neler Çalışır")}</H2>
        <UL items={["Solidity & Vyper contracts","Hardhat","Foundry","Truffle","MetaMask & other EVM wallets","Ethers.js, Web3.js","Standard ABI encoding"]}/>

        <H2 id="diff">{T("Key Differences","Temel Farklar")}</H2>
        <UL items={[
          T("Gas token is USDC, not ETH — fees paid in dollars","Gas tokeni ETH değil USDC — ücretler dolar cinsinden"),
          T("Sub-second block times (vs ~12s on Ethereum)","Saniyenin altında blok süreleri (Ethereum'un ~12s'ye karşı)"),
          T("Deterministic finality — no need to wait for confirmations","Deterministik kesinlik — onayları beklemeye gerek yok"),
          T("Permissioned validators (same EVM, different consensus)","İzinli doğrulayıcılar (aynı EVM, farklı konsensüs)"),
        ]}/>

        <H2 id="tools">{T("Developer Tools","Geliştirici Araçları")}</H2>
        <InfoTable rows={[
          ["Hardhat", T("Full support, use arc_testnet network config","Tam destek, arc_testnet ağ yapılandırması kullan")],
          ["Foundry", T("Full support","Tam destek")],
          ["Ethers.js",T("Connect to Arc RPC endpoint directly","Arc RPC uç noktasına doğrudan bağlan")],
          ["MetaMask", T("Add Arc testnet as custom network","Arc testnet'i özel ağ olarak ekle")],
        ]}/>
      </div>
    ),

    "ai-agents": () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("Arc enables autonomous AI agents to coordinate, contract, and settle value in real time via two new standards: ERC-8004 for onchain identity and ERC-8183 for an escrow-based job marketplace.",
          "Arc, iki yeni standart aracılığıyla otonom yapay zeka ajanlarının gerçek zamanlı olarak koordinasyon, sözleşme ve değer uzlaşması yapabilmesini sağlar.")}</P>
        <CalloutWarn>{T("ERC-8004 and ERC-8183 are Arc-specific standards in development. Available on testnet, not yet on mainnet.","ERC-8004 ve ERC-8183, geliştirilmekte olan Arc'a özgü standartlardır. Testnet'te mevcut, mainnet'te henüz değil.")}</CalloutWarn>

        <H2 id="erc8004">ERC-8004: Agent Identity</H2>
        <P>{T("Provides a standard for registering AI agents onchain with identity and reputation — making them discoverable, rateable, and trustable by other agents and humans.",
          "Yapay zeka ajanlarını zincir üstünde kimlik ve itibarla kayıt etmek için bir standart sağlar.")}</P>
        <UL items={[T("Onchain registration","Zincir üstü kayıt"),T("Reputation & rating system","İtibar ve derecelendirme"),T("Discoverability","Keşfedilebilirlik"),T("Capability attestation","Yetenek attestasyonu")]}/>

        <H2 id="erc8183">ERC-8183: Job Marketplace</H2>
        <P>{T("Defines a standard for creating jobs with escrow, specifying deliverables, and settling payment upon verification. Enables a trustless marketplace where AI agents take on work and receive USDC automatically.",
          "Emanetli işler oluşturmak, çıktıları belirtmek ve doğrulama üzerine ödemeyi uzlaşmak için bir standart tanımlar.")}</P>
        <UL items={[T("Escrow-based job creation","Emanetli iş oluşturma"),T("Verifiable deliverables","Doğrulanabilir çıktılar"),T("Automatic USDC payment","Otomatik USDC ödemesi"),T("Dispute resolution","Anlaşmazlık çözümü")]}/>

        <H2 id="mcp">{T("MCP Server","MCP Sunucusu")}</H2>
        <P>{T("Arc provides an MCP (Model Context Protocol) server to integrate Arc into AI coding assistants. Circle also provides Skills plugins for Claude Code and Vercel.",
          "Arc, AI kodlama asistanlarına Arc'ı entegre etmek için bir MCP sunucusu sağlar.")}</P>
        <GridCards items={[
          { title:"use-arc",            desc:"Arc-specific development skill" },
          { title:"use-usdc",           desc:"USDC payment integration" },
          { title:"use-circle-wallets", desc:"Wallet management" },
        ]}/>

        <H2 id="diagram">{T("Agent Job Flow","Ajan İş Akışı")}</H2>
        <div style={{ background:"#070d1a", border:"1px solid rgba(0,212,170,.15)", borderRadius:12, padding:20, margin:"1rem 0" }}>
          {[
            { n:1, actor:T("Client","Müşteri"),   a:T("Creates job + funds USDC escrow","İş oluşturur + USDC emaneti fon eder"),   c:"#00d4aa" },
            { n:2, actor:T("Marketplace","Pazar"),a:T("Locks USDC, broadcasts job offer","USDC kilitler, iş teklifini yayınlar"),   c:"#0ea5e9" },
            { n:3, actor:T("AI Agent","Yapay Zeka Ajan"),a:T("Accepts and executes the task","İşi kabul eder ve görevi yürütür"),c:"#86efac" },
            { n:4, actor:T("Agent","Ajan"),        a:T("Submits deliverable onchain","Çıktıyı zincir üstünde sunar"),              c:"#86efac" },
            { n:5, actor:T("Client","Müşteri"),   a:T("Approves → USDC released to agent ✓","Onaylar → USDC ajana serbest bırakılır ✓"),c:"#00d4aa" },
          ].map((s,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom: i<4?8:0 }}>
              <div style={{ width:22, height:22, borderRadius:"50%", background:"#0d1525", border:"1px solid rgba(0,212,170,.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:700, color:"#00d4aa", flexShrink:0, fontFamily:"'JetBrains Mono',monospace" }}>{s.n}</div>
              <div style={{ flex:1 }}>
                <span style={{ fontSize:"11px", fontWeight:600, color:s.c, fontFamily:"'JetBrains Mono',monospace" }}>[{s.actor}]</span>
                {" "}<span style={{ fontSize:".8rem", color:"#94a3b8" }}>{s.a}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    "getting-started": () => (
      <div className="prose">
        <H2 id="network">{T("Network Configuration","Ağ Yapılandırması")}</H2>
        <InfoTable rows={[
          [T("Network Name","Ağ Adı"),"Arc Testnet"],
          ["RPC URL","See docs.arc.network for current endpoint"],
          [T("Currency","Para Birimi"),"USDC"],
          [T("Block Explorer","Blok Gezgini"),"testnet.arcscan.app"],
        ]}/>

        <H2 id="faucet">{T("Get Testnet USDC","Testnet USDC Al")}</H2>
        <P>{T("Visit the Circle faucet to get USDC for testnet development:","Testnet geliştirmesi için USDC almak amacıyla Circle musluğunu ziyaret edin:")}</P>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", margin:"1rem 0" }}>
          {[["Circle Faucet","https://faucet.circle.com"],["ArcScan Explorer","https://testnet.arcscan.app"],["Arc Docs","https://docs.arc.network"]].map(([l,u])=>(
            <a key={l} href={u} target="_blank" rel="noopener" style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:8, border:"1px solid rgba(0,212,170,.2)", background:"#0d1525", color:"#00d4aa", fontSize:".8rem", textDecoration:"none" }}>
              {l} <Icon name="ext" size={12} color="#00d4aa"/>
            </a>
          ))}
        </div>

        <H2 id="deploy">{T("Hardhat Config Example","Hardhat Yapılandırma Örneği")}</H2>
        <Pre>{`// hardhat.config.js (arc testnet)
module.exports = {
  solidity: "0.8.24",
  networks: {
    arc_testnet: {
      url: "RPC_URL_FROM_DOCS",
      accounts: [process.env.PRIVATE_KEY],
      // Gas paid in USDC — use standard estimateGas
    },
  },
};`}</Pre>

        <H2 id="tools">{T("Supported Tools","Desteklenen Araçlar")}</H2>
        <UL items={["Hardhat","Foundry","Ethers.js","Web3.js","MetaMask","OpenZeppelin Contracts"]}/>
      </div>
    ),

    "app-kit": () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("App Kit is Circle's developer toolkit for building payment and liquidity workflows across chains using CCTP. It provides Bridge, Swap, and Send in a single SDK.",
          "App Kit, CCTP kullanarak zincirler arası ödeme ve likidite iş akışları oluşturmak için Circle'ın geliştirici araç setidir.")}</P>

        <H2 id="install">{T("Installation","Kurulum")}</H2>
        <Pre>{`# Bridge only
npm install @circle-fin/bridge-kit

# Full SDK (Bridge + Swap + Send)
npm install @circle-fin/app-kit`}</Pre>

        <H2 id="bridge">Bridge</H2>
        <P>{T("Transfer USDC natively across chains using CCTP. No wrapped tokens — burned on source, minted natively on destination.",
          "CCTP kullanarak USDC'yi zincirler arasında yerel olarak transfer edin.")}</P>
        <Pre>{`// Example: Bridge USDC from Arc to Ethereum
// Refer to developers.circle.com for full API docs
const bridge = new BridgeKit({
  sourceChain: "arc-testnet",
  destChain:   "ethereum",
  adapter:     yourWalletClient,
});

const tx = await bridge.transfer({
  amount:    "100",   // 100 USDC
  recipient: "0x...",
});`}</Pre>

        <H2 id="adapters">{T("Supported Adapters","Desteklenen Adaptörler")}</H2>
        <UL items={["Ethers.js v6","Solana web3.js","Circle developer-controlled wallets"]}/>
      </div>
    ),

    circle: () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("Circle is the issuer of USDC and EURC and provides a comprehensive developer platform for building with programmable money. Arc is natively integrated into Circle's full-stack platform.",
          "Circle, USDC ve EURC'nin ihraçcısıdır ve programlanabilir para ile inşaat yapmak için kapsamlı bir geliştirici platformu sağlar.")}</P>

        <H2 id="products">{T("Core Products","Temel Ürünler")}</H2>
        <GridCards items={[
          { title:"USDC",                    desc:T("Dollar-backed stablecoin, Arc's native gas token","Dolar destekli stablecoin, Arc'ın yerel gas tokeni") },
          { title:"EURC",                    desc:T("Euro-backed stablecoin, supported on Arc","Euro destekli stablecoin, Arc'ta destekleniyor") },
          { title:"CCTP",                    desc:T("Cross-Chain Transfer Protocol — native USDC bridging","Zincirler Arası Transfer Protokolü") },
          { title:"Gateway",                 desc:T("Chain-abstracted USDC balance across EVM chains","EVM zincirleri genelinde soyutlanmış USDC") },
          { title:"Developer Wallets",       desc:T("Programmatic wallet infrastructure","Programatik cüzdan altyapısı") },
          { title:"User-Controlled Wallets", desc:T("Self-custodial embedded wallets","Kendi gözetiminde gömülü cüzdanlar") },
        ]}/>

        <H2 id="ai-tools">{T("AI Developer Tools","Yapay Zeka Geliştirici Araçları")}</H2>
        <UL items={[
          T("Arc MCP Server — integrate Arc into AI coding assistants","Arc MCP Sunucusu — Arc'ı AI kodlama asistanlarına entegre edin"),
          T("Circle Skills — pre-built plugins for Claude Code & Vercel","Circle Skills — Claude Code ve Vercel için eklentiler"),
          "LLMs.txt — docs.arc.network/llms.txt",
        ]}/>
      </div>
    ),

    "arc-house": () => (
      <div className="prose">
        <H2 id="archouse">Arc House</H2>
        <P>{T("Arc House is the new home for the Arc community — bringing programs, events, discussions, and recognition into one shared space.",
          "Arc House, Arc topluluğu için programları, etkinlikleri, tartışmaları ve tanınmayı tek bir alana getiren yeni bir evdir.")}</P>

        <H2 id="architects">{T("Architects Program","Mimarlar Programı")}</H2>
        <UL items={[
          T("Points system for tracking contributions","Katkıları takip etmek için puan sistemi"),
          T("Tiers based on accumulated points and engagement","Birikmiş puanlara dayalı katmanlar"),
          T("Benefits and perks tied to tier progression","Katman ilerlemesine bağlı faydalar"),
          T("Recognition for ecosystem activity","Ekosistem aktivitesi için tanınma"),
        ]}/>
        <CalloutInfo>{T("Architects are independent community participants — not employees of Circle Technology Services, LLC.","Mimarlar bağımsız topluluk katılımcılarıdır — Circle Technology Services, LLC çalışanları değildir.")}</CalloutInfo>

        <H2 id="started">{T("Getting Started","Başlangıç")}</H2>
        <P>{T("Join at community.arc.network to participate in discussions, attend events, earn points, and progress through Architect tiers.",
          "Tartışmalara katılmak, etkinliklere katılmak ve Mimar katmanlarında ilerlemek için community.arc.network'e katılın.")}</P>

        <H2 id="channels">{T("Community Channels","Topluluk Kanalları")}</H2>
        <InfoTable rows={[
          [T("Community Hub","Topluluk Merkezi"),"community.arc.network"],
          ["Discord","discord.gg/buildonarc"],
          ["X / Twitter","x.com/arc"],
          [T("Website","Web Sitesi"),"arc.network"],
        ]}/>
      </div>
    ),

    comparison: () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("Arc significantly outperforms competitors for specific financial use cases: deterministic finality, stablecoin gas, and opt-in privacy. It aims to be the best blockchain for financial infrastructure — not the fastest general-purpose chain.",
          "Arc, belirli finansal kullanım alanları için rakiplerinden belirgin biçimde üstündür.")}</P>
        <H2 id="table">{T("Comparison Table","Karşılaştırma Tablosu")}</H2>
        <CompareTable lang={lang}/>
        <H2 id="finality">{T("Finality Deep-dive","Kesinlik İncelemesi")}</H2>
        <P>{T("Deterministic finality is Arc's single biggest advantage for financial applications. Every other chain listed uses probabilistic finality — meaning transactions could theoretically be reversed. With Malachite BFT, finality is achieved the moment 2/3+ validators sign a block.",
          "Deterministik kesinlik, finansal uygulamalar için Arc'ın en büyük avantajıdır.")}</P>
        <H2 id="fees">{T("Fee Structures","Ücret Yapıları")}</H2>
        <UL items={[
          `Arc: ${T("~$0.01 in USDC, fiat-pegged","~$0.01 USDC, fiat sabitli")}`,
          `Ethereum: ${T("$1-200+ in ETH during congestion","Yoğunlukta ETH cinsinden $1-200+")}`,
          `Solana: ${T("Usually <$0.001 but priority fees spike","Genellikle <$0.001 ama öncelik ücretleri ani artış")}`,
          `Polygon: ${T("Low in MATIC but token volatility risk","Düşük MATIC ama token volatilite riski")}`,
        ]}/>
      </div>
    ),

    glossary: () => (
      <div className="prose">
        {[["A–C","a-c",/^[A-C]/i],["D–G","d-g",/^[D-G]/i],["H–Z","h-z",/^[H-Z]/i]].map(([label,id,re])=>{
          const items = GLOSSARY.filter(g=>re.test(g.t));
          return (
            <div key={id}>
              <H2 id={id}>{label}</H2>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {items.map((g,i)=>(
                  <div key={i} style={{ padding:"12px 14px", borderRadius:8, border:"1px solid rgba(0,212,170,.15)", background:"#0d1525" }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".78rem", fontWeight:600, color:"#00d4aa", marginBottom:4 }}>{g.t}</div>
                    <div style={{ fontSize:".875rem", color:"#94a3b8", lineHeight:1.6 }}>{g.d}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    ),

    testnet: () => (
      <div className="prose">
        <H2 id="network">{T("Network Details","Ağ Detayları")}</H2>
        <InfoTable rows={[
          [T("Network","Ağ"),"Arc Testnet"],
          ["RPC","See docs.arc.network for current endpoint"],
          [T("Explorer","Gezgin"),"testnet.arcscan.app"],
          [T("Gas Token","Gas Tokeni"),"USDC (testnet)"],
        ]}/>
        <H2 id="faucet">{T("Getting Testnet Tokens","Testnet Token Alma")}</H2>
        <P>{T("Use the Circle faucet at faucet.circle.com to get testnet USDC. You'll need a wallet address on Arc testnet.",
          "Testnet USDC almak için faucet.circle.com adresindeki Circle musluğunu kullanın.")}</P>
        <CalloutInfo>{T("Faucet URL: faucet.circle.com — Select 'Arc Testnet' and paste your wallet address.","Musluk URL'si: faucet.circle.com — 'Arc Testnet' seçin ve cüzdan adresinizi yapıştırın.")}</CalloutInfo>
        <H2 id="explorer">{T("Block Explorer","Blok Gezgini")}</H2>
        <P>{T("ArcScan is the official Arc testnet explorer, compatible with Etherscan's API and interface patterns. Visit testnet.arcscan.app.",
          "ArcScan, Etherscan API'si ve arayüz desenleriyle uyumlu resmi Arc testnet gezginidir. testnet.arcscan.app adresini ziyaret edin.")}</P>
      </div>
    ),

    gas: () => (
      <div className="prose">
        <H2 id="model">{T("Fee Model","Ücret Modeli")}</H2>
        <P>{T("Arc uses USDC as the gas token. The base fee targets approximately $0.01 per transaction. An EIP-1559-style mechanism smooths fees during demand spikes.",
          "Arc, gas tokeni olarak USDC kullanır. Taban ücret, işlem başına yaklaşık $0.01'i hedefler.")}</P>
        <H2 id="estimate">{T("Estimating Fees","Ücret Tahmini")}</H2>
        <P>{T("Standard EVM fee estimation RPC methods work on Arc: eth_estimateGas, eth_gasPrice, eth_feeHistory. The App Kit also provides fee estimation utilities.",
          "Standart EVM ücret tahmini RPC yöntemleri Arc'ta çalışır: eth_estimateGas, eth_gasPrice, eth_feeHistory.")}</P>
        <InfoTable rows={[
          ["eth_estimateGas", T("Estimate gas units needed","Gerekli gas birimlerini tahmin et")],
          ["eth_gasPrice",    T("Get current gas price in USDC","Mevcut gas fiyatını USDC cinsinden al")],
          ["eth_feeHistory",  T("Get historical fee data","Geçmiş ücret verilerini al")],
        ]}/>
      </div>
    ),

    consensus: () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("Arc's consensus layer is responsible for ordering transactions and achieving irreversible agreement among validators. It uses Malachite BFT for sub-second deterministic finality.",
          "Arc'ın konsensüs katmanı, işlemleri sıralamak ve doğrulayıcılar arasında geri döndürülemez anlaşma sağlamaktan sorumludur.")}</P>
        <H2 id="malachite">Malachite BFT</H2>
        <P>{T("Malachite is a Byzantine Fault Tolerant consensus engine. A block is finalized once 2/3+ validators sign it — providing immediate, irreversible finality.",
          "Malachite, Bizans Hata Toleranslı bir konsensüs motorudur. Doğrulayıcıların 2/3'ünden fazlası imzaladıktan sonra bir blok kesinleşir.")}</P>
        <H2 id="validators">{T("Validator Set","Doğrulayıcı Kümesi")}</H2>
        <P>{T("Arc uses a permissioned validator set. Validators must be approved to participate in consensus, providing compliance and security guarantees.",
          "Arc, izinli bir doğrulayıcı kümesi kullanır. Doğrulayıcıların konsensüse katılmak için onaylanması gerekir.")}</P>
      </div>
    ),

    malachite: () => (
      <div className="prose">
        <H2 id="bft">{T("What is BFT?","BFT Nedir?")}</H2>
        <P>{T("Byzantine Fault Tolerance (BFT) is a property of distributed systems that allows them to function correctly even when some nodes fail or act maliciously. A BFT system can tolerate up to 1/3 of nodes being faulty.",
          "Bizans Hata Toleransı (BFT), bazı düğümler başarısız olsa veya kötü niyetli hareket etse bile doğru şekilde çalışmasına olanak tanıyan dağıtık sistemlerin bir özelliğidir.")}</P>
        <H2 id="malachite">Malachite Engine</H2>
        <P>{T("Malachite is Arc's BFT consensus engine. It achieves sub-second block times and deterministic finality — once a block is signed by 2/3+ validators, it is finalized and cannot be reorganized.",
          "Malachite, Arc'ın BFT konsensüs motorudur. Saniyenin altında blok süreleri ve deterministik kesinlik sağlar.")}</P>
        <H2 id="properties">{T("Safety & Liveness","Güvenlik ve Canlılık")}</H2>
        <UL items={[
          T("Safety: the network never finalizes conflicting blocks","Güvenlik: ağ asla çakışan blokları kesinleştirmez"),
          T("Liveness: the network always makes progress given 2/3+ honest validators","Canlılık: ağ her zaman 2/3+ dürüst doğrulayıcı verildiğinde ilerleme kaydeder"),
          T("Finality: immediate and irreversible once a block is signed","Kesinlik: bir blok imzalandıktan sonra anında ve geri döndürülemez"),
        ]}/>
      </div>
    ),

    execution: () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("Arc's execution layer runs the Ethereum Virtual Machine (EVM). It processes smart contract execution and state transitions, separated from the consensus layer for independent optimization.",
          "Arc'ın yürütme katmanı, Ethereum Sanal Makinesini (EVM) çalıştırır. Akıllı sözleşme yürütmesini ve durum geçişlerini işler.")}</P>
        <H2 id="evm">EVM Runtime</H2>
        <P>{T("Existing Solidity smart contracts can be deployed on Arc without modification. All standard Ethereum development tools — Hardhat, Foundry, Ethers.js — work natively.",
          "Mevcut Solidity akıllı sözleşmeleri Arc'ta değişiklik yapmadan deploy edilebilir.")}</P>
        <H2 id="sep">{T("Separation of Concerns","Endişelerin Ayrılması")}</H2>
        <P>{T("By separating consensus from execution, each layer can optimize independently. The consensus layer handles ordering and finality; the execution layer handles computation.",
          "Konsensüsü yürütmeden ayırarak, her katman bağımsız olarak optimize edebilir.")}</P>
      </div>
    ),

    payments: () => (
      <div className="prose">
        <H2 id="payments">{T("P2P Payments","P2P Ödemeleri")}</H2>
        <P>{T("Arc enables instant, low-cost peer-to-peer payments denominated in USDC. With sub-second deterministic finality, payments settle immediately with zero reorganization risk.",
          "Arc, USDC cinsinden anında, düşük maliyetli eşler arası ödemeleri mümkün kılar.")}</P>
        <H2 id="fx">{T("Onchain FX","Zincir Üstü Döviz")}</H2>
        <P>{T("Real-time onchain FX between USDC and EURC via Circle StableFX. Transparent pricing, instant settlement, 24/7 availability.",
          "Circle StableFX aracılığıyla USDC ve EURC arasında gerçek zamanlı zincir üstü döviz.")}</P>
        <H2 id="crossborder">{T("Cross-border Payments","Sınır Ötesi Ödemeler")}</H2>
        <P>{T("Dollar-based fees and USDC liquidity make Arc ideal for cross-border payments: predictable costs, instant settlement, no correspondent banking delays.",
          "Dolar bazlı ücretler ve USDC likiditesi, Arc'ı sınır ötesi ödemeler için ideal hale getirir.")}</P>
      </div>
    ),

    "capital-markets": () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("Sub-second deterministic finality makes Arc suitable for high-frequency trading and real-time risk management. Capital markets require instant, irreversible settlement — exactly what Arc's Malachite BFT provides.",
          "Saniyenin altında deterministik kesinlik, Arc'ı yüksek frekanslı ticaret ve gerçek zamanlı risk yönetimi için uygun kılar.")}</P>
        <GridCards items={[
          { title:T("HFT","Yüksek Frekanslı Ticaret"), desc:T("Sub-second finality for real-time trading","Gerçek zamanlı ticaret için saniyenin altında kesinlik") },
          { title:T("Risk Management","Risk Yönetimi"), desc:T("Instant settlement enables live risk books","Anında uzlaşma canlı risk defterlerini mümkün kılar") },
          { title:T("FX Settlement","Döviz Uzlaşması"), desc:T("Atomic bilateral FX with USDC/EURC","USDC/EURC ile atomik ikili döviz") },
          { title:T("Repo Markets","Repo Piyasaları"), desc:T("Tokenized collateral with instant delivery","Anında teslimat ile tokenize edilmiş teminat") },
        ]}/>
      </div>
    ),

    tokenization: () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("Arc supports issuing and managing tokenized real-world assets (RWAs) with optional privacy features. Deterministic finality ensures delivery-versus-payment atomicity.",
          "Arc, isteğe bağlı gizlilik özellikleriyle gerçek dünya varlıklarının (RWA) tokenizasyonunu ve yönetimini destekler.")}</P>
        <GridCards items={[
          { title:T("Securities","Menkul Kıymetler"), desc:T("Tokenized bonds, equities with instant settlement","Tokenize tahviller, anında uzlaşmalı hisse senetleri") },
          { title:T("Real Estate","Gayrimenkul"), desc:T("Fractional ownership with transparent transfers","Şeffaf transferlerle kısmi mülkiyet") },
          { title:T("Fund Shares","Fon Payları"), desc:T("NAV-based issuance and redemption","NAV tabanlı ihraç ve itfa") },
          { title:T("Commodities","Emtialar"), desc:T("Tokenized commodities with optional privacy","İsteğe bağlı gizlilik ile tokenize emtialar") },
        ]}/>
      </div>
    ),

    roadmap: () => (
      <div className="prose">
        <H2 id="phases">{T("Development Phases","Geliştirme Fazları")}</H2>
        <div style={{ display:"flex", flexDirection:"column", gap:12, margin:"1rem 0" }}>
          {[
            { phase:T("Phase 1 — Testnet","Faz 1 — Testnet"), status:T("Live","Aktif"), desc:T("Public testnet with USDC faucet, ArcScan explorer, EVM deployment","Halka açık testnet — USDC musluğu, ArcScan gezgini, EVM deployment"), color:"#00d4aa" },
            { phase:T("Phase 2 — Mainnet","Faz 2 — Mainnet"), status:T("Upcoming","Yakında"), desc:T("Full mainnet launch with permissioned validator set","İzinli doğrulayıcı kümesiyle tam mainnet lansmanı"), color:"#0ea5e9" },
            { phase:T("Phase 3 — Ecosystem","Faz 3 — Ekosistem"), status:T("Future","Gelecek"), desc:T("Expanded ecosystem, deeper Circle platform integration, AI agent standards","Genişletilmiş ekosistem, daha derin Circle platformu entegrasyonu"), color:"#475569" },
          ].map((p,i)=>(
            <div key={i} style={{ padding:"14px 16px", borderRadius:10, border:`1px solid ${p.color}30`, background:`${p.color}08` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:".875rem", fontWeight:500, color:p.color }}>{p.phase}</span>
                <span style={{ fontSize:"10px", padding:"1px 8px", borderRadius:99, background:`${p.color}20`, color:p.color, fontWeight:600 }}>{p.status}</span>
              </div>
              <p style={{ fontSize:".875rem", color:"#94a3b8", margin:0, lineHeight:1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),

    partners: () => (
      <div className="prose">
        <P>{T("Arc has attracted design partners from across the global financial industry — exploring how Arc's capabilities can enhance their existing infrastructure.","Arc, mevcut altyapılarını geliştirmek için Arc'ın yeteneklerini araştıran küresel finansal sektörden tasarım ortakları çekmiştir.")}</P>
        {[
          { name:"Visa", q:T("Arc's design — integrating stablecoin-based gas fees, deterministic finality, and programmable interoperability — offers a strong environment to explore how trusted payments networks can connect to and help scale emerging onchain infrastructure.","Arc'ın tasarımı, güvenilir ödeme ağlarının zincir üstü altyapıya nasıl bağlanabileceğini keşfetmek için güçlü bir ortam sunuyor."), a:"Cuy Sheffield, Head of Crypto, Visa" },
          { name:"Mastercard", q:T("Deepening our longstanding work with Circle as an early design partner, Mastercard is exploring how we can help shape Arc's foundation to enable secure, simple payment experiences across both fiat and stablecoin rails.","Mastercard, erken tasarım ortağı olarak Arc'ın temelini şekillendirmeye yardımcı olmayı araştırıyor."), a:"Raj Dhamodharan, EVP Blockchain & Digital Assets, Mastercard" },
          { name:"Goldman Sachs", q:T("We're excited to be part of an initiative that tests how programmable settlement and interoperable FX workflows can enhance regulated markets.","Programlanabilir uzlaşmanın düzenlenmiş piyasaları nasıl geliştirebileceğini test eden girişimin parçası olmaktan heyecan duyuyoruz."), a:"Mathew McDermott, Global Head of Digital Assets, Goldman Sachs" },
        ].map((p,i)=>(
          <div key={i}>
            <h3 style={{ fontSize:"1.05rem", fontWeight:600, color:"#cbd5e1", margin:"1.4rem 0 .5rem" }}>{p.name}</h3>
            <Quote text={p.q} author={p.a}/>
          </div>
        ))}
      </div>
    ),

    architects: () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("The Architects program is designed to recognize and reward meaningful contributions to the Arc ecosystem. It creates a clear path for community members to contribute, grow, and be recognized.",
          "Mimarlar programı, Arc ekosistemine anlamlı katkıları tanımak ve ödüllendirmek için tasarlanmıştır.")}</P>
        <UL items={[
          T("Earn points for contributions (code, content, community)","Katkılar için puan kazanın (kod, içerik, topluluk)"),
          T("Progress through tiers based on accumulated points","Birikmiş puanlara göre katmanlar arasında ilerleyin"),
          T("Unlock benefits and perks at higher tiers","Daha yüksek katmanlarda avantajların kilidini açın"),
          T("Get recognized publicly in the Arc ecosystem","Arc ekosisteminde kamuoyu önünde tanının"),
        ]}/>
        <H2 id="join">{T("How to Join","Nasıl Katılınır")}</H2>
        <P>{T("Join Arc House at community.arc.network and start contributing. All meaningful contributions are tracked and rewarded.",
          "community.arc.network'te Arc House'a katılın ve katkıda bulunmaya başlayın.")}</P>
      </div>
    ),

    "why-arc": () => (
      <div className="prose">
        <H2 id="problem">{T("The Problem","Problem")}</H2>
        <P>{T("Financial applications require specific infrastructure properties that general-purpose blockchains don't provide: predictable costs, instant settlement, and privacy. Existing chains force developers to work around these limitations.",
          "Finansal uygulamalar, genel amaçlı blockchain'lerin sağlamadığı özel altyapı özelliklerine ihtiyaç duyar.")}</P>
        <H2 id="gaps">{T("Infrastructure Gaps","Altyapı Boşlukları")}</H2>
        <GridCards items={[
          { title:T("Volatile Fees","Değişken Ücretler"), desc:T("ETH/SOL gas is unpredictable — impossible to budget","ETH/SOL gas öngörülemez — bütçelemek imkansız") },
          { title:T("No Finality","Kesinlik Yok"), desc:T("Probabilistic systems carry reorganization risk","Olasılıksal sistemler yeniden düzenleme riski taşır") },
          { title:T("Public Only","Sadece Halka Açık"), desc:T("All transactions visible — no business confidentiality","Tüm işlemler görünür — iş gizliliği yok") },
          { title:T("No Agent Standards","Ajan Standardı Yok"), desc:T("No protocol-level support for AI agent value settlement","Yapay zeka ajan değer uzlaşması için destek yok") },
        ]}/>
        <H2 id="solution">{T("Arc's Solution","Arc'ın Çözümü")}</H2>
        <P>{T("Arc directly addresses each gap with protocol-level design: USDC gas for predictable costs, Malachite BFT for deterministic finality, opt-in privacy for confidentiality, and ERC-8004/8183 for AI agents.",
          "Arc, her boşluğu protokol düzeyinde tasarımla doğrudan ele alır.")}</P>
      </div>
    ),

    "use-cases": () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("Arc is built for real-world economic activity: payments, capital markets, FX, AI agents, and asset tokenization. Each use case benefits directly from Arc's core design properties.",
          "Arc, gerçek dünya ekonomik faaliyeti için inşa edilmiştir: ödemeler, sermaye piyasaları, döviz, yapay zeka ajanları ve varlık tokenizasyonu.")}</P>
        <H2 id="table">{T("Use Case Table","Kullanım Senaryoları Tablosu")}</H2>
        <div style={{ overflowX:"auto", borderRadius:8, border:"1px solid rgba(0,212,170,.15)", margin:"1rem 0" }}>
          <table className="info-table">
            <thead><tr><th>{T("Use Case","Kullanım")}</th><th>{T("Key Benefit","Temel Fayda")}</th></tr></thead>
            <tbody>
              {[
                [T("P2P Payments","P2P Ödemeleri"),T("Instant, low-cost, deterministic","Anında, düşük maliyetli, deterministik")],
                [T("Stablecoin FX","Stablecoin Döviz"),T("Real-time onchain FX 24/7","Gerçek zamanlı zincir üstü döviz 7/24")],
                [T("Capital Markets","Sermaye Piyasaları"),T("Sub-second finality for HFT","Yüksek frekanslı ticaret için sub-saniye kesinlik")],
                [T("AI Agents","Yapay Zeka Ajanları"),T("ERC-8004/8183 trustless job settlement","Güven gerektirmeyen iş uzlaşması")],
                [T("Asset Tokenization","Varlık Tokenizasyonu"),T("RWA issuance with optional privacy","İsteğe bağlı gizlilikle RWA ihracı")],
                [T("Cross-border Payments","Sınır Ötesi Ödemeler"),T("Dollar fees, USDC liquidity, instant","Dolar ücretler, USDC likiditesi, anında")],
                [T("Treasury Management","Hazine Yönetimi"),T("Programmatic USDC treasury","Programatik USDC hazinesi")],
                [T("Prediction Markets","Tahmin Piyasaları"),T("Instant settlement, transparent pricing","Anında uzlaşma, şeffaf fiyatlama")],
              ].map(([k,v],i)=><tr key={i}><td>{k}</td><td style={{ color:"#64748b", fontWeight:400 }}>{v}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    ),

    architecture: () => (
      <div className="prose">
        <H2 id="overview">{T("Overview","Genel Bakış")}</H2>
        <P>{T("Arc separates consensus from execution, allowing each layer to optimize independently while maintaining full EVM compatibility.",
          "Arc, konsensüsü yürütmeden ayırarak her katmanın tam EVM uyumluluğunu korurken bağımsız olarak optimize etmesine olanak tanır.")}</P>
        <H2 id="layers">{T("Layer Breakdown","Katman Dökümü")}</H2>
        <InfoTable rows={[
          [T("Application Layer","Uygulama Katmanı"),T("Smart contracts, dApps, wallets","Akıllı sözleşmeler, dApp'ler, cüzdanlar")],
          [T("Execution Layer","Yürütme Katmanı"),T("EVM — runs Solidity contracts","EVM — Solidity sözleşmelerini çalıştırır")],
          [T("Consensus Layer","Konsensüs Katmanı"),T("Malachite BFT — orders txs, provides finality","Malachite BFT — işlemleri sıralar, kesinlik sağlar")],
          [T("Network Layer","Ağ Katmanı"),T("P2P networking, validator communication","P2P ağ, doğrulayıcı iletişimi")],
        ]}/>
        <H2 id="diagram">{T("Architecture Diagram","Mimari Diyagram")}</H2>
        <div style={{ background:"#070d1a", border:"1px solid rgba(0,212,170,.15)", borderRadius:12, padding:20, margin:"1rem 0", fontFamily:"'JetBrains Mono',monospace", fontSize:"12px", color:"#64748b", lineHeight:1.8 }}>
          <div style={{ color:"#00d4aa" }}>┌─────────────────────────────────┐</div>
          <div>│  <span style={{ color:"#0ea5e9" }}>Application Layer</span> (dApps, Wallets) │</div>
          <div style={{ color:"#00d4aa" }}>├─────────────────────────────────┤</div>
          <div>│  <span style={{ color:"#86efac" }}>Execution Layer</span> (EVM)           │</div>
          <div style={{ color:"#00d4aa" }}>├─────────────────────────────────┤</div>
          <div>│  <span style={{ color:"#00d4aa" }}>Consensus Layer</span> (Malachite BFT) │</div>
          <div style={{ color:"#00d4aa" }}>├─────────────────────────────────┤</div>
          <div>│  <span style={{ color:"#475569" }}>Network Layer</span> (P2P / Validators)│</div>
          <div style={{ color:"#00d4aa" }}>└─────────────────────────────────┘</div>
          <div style={{ marginTop:12, color:"#334155" }}>
            ↕ CCTP Bridge ↕ &nbsp;&nbsp; Other EVM chains (Ethereum, etc.)
          </div>
        </div>
      </div>
    ),
  };

  const render = pages[id];
  if (render) return render();

  return (
    <div style={{ paddingTop:20 }}>
      <P>{T("This page is being written. Check back soon or visit the official Arc docs.","Bu sayfa yazılmaktadır. Yakında tekrar kontrol edin veya resmi Arc belgelerini ziyaret edin.")}</P>
      <a href="https://docs.arc.network" target="_blank" rel="noopener"
        style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:8, border:"1px solid rgba(0,212,170,.2)", color:"#00d4aa", textDecoration:"none", fontSize:".875rem" }}>
        docs.arc.network <Icon name="ext" size={13} color="#00d4aa"/>
      </a>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE META DB
══════════════════════════════════════════════════════════ */
const META = {
  home:{ en:"Home", tr:"Ana Sayfa" },
  about:{ en:"Arc Network Overview", tr:"Arc Network Genel Bakış", cat:"About", up:"April 1, 2025", upTr:"1 Nisan 2025", desc:{ en:"Comprehensive overview of Arc Network, an EVM-compatible Layer-1 blockchain built for stablecoin finance.", tr:"Stablecoin finansı için inşa edilmiş EVM uyumlu Layer-1 blockchain Arc Network'e kapsamlı genel bakış." }, tags:["Layer-1","EVM","Stablecoin","USDC"], src:[{l:"Official Docs",u:"https://docs.arc.network"},{l:"arc.network",u:"https://www.arc.network"}], toc:[{id:"what",en:"What is Arc?",tr:"Arc Nedir?"},{id:"why",en:"Why Arc?",tr:"Neden Arc?"},{id:"design",en:"Core Design",tr:"Temel Tasarım"},{id:"network",en:"Network Parameters",tr:"Ağ Parametreleri"},{id:"partners",en:"Design Partners",tr:"Tasarım Ortakları"}] },
  "why-arc":{ en:"Why Arc?", tr:"Neden Arc?", cat:"About", up:"April 1, 2025", upTr:"1 Nisan 2025", desc:{ en:"The problem Arc solves and why existing blockchains fall short for financial applications.", tr:"Arc'ın çözdüğü problem ve mevcut blokchainlerin neden yetersiz kaldığı." }, tags:["Finance","Problem Statement"], src:[{l:"arc.network",u:"https://www.arc.network"}], toc:[{id:"problem",en:"The Problem",tr:"Problem"},{id:"gaps",en:"Infrastructure Gaps",tr:"Altyapı Boşlukları"},{id:"solution",en:"Arc's Solution",tr:"Arc'ın Çözümü"}] },
  roadmap:{ en:"Roadmap", tr:"Yol Haritası", cat:"About", up:"April 1, 2025", upTr:"1 Nisan 2025", desc:{ en:"Arc's development phases from testnet to mainnet and beyond.", tr:"Arc'ın testnet'ten mainnet'e geliştirme fazları." }, tags:["Roadmap","Testnet","Mainnet"], src:[{l:"arc.network",u:"https://www.arc.network"}], toc:[{id:"phases",en:"Phases",tr:"Fazlar"}] },
  finality:{ en:"Deterministic Finality", tr:"Deterministik Kesinlik", cat:"Features", up:"April 5, 2025", upTr:"5 Nisan 2025", desc:{ en:"Sub-second finality with zero reorganization risk.", tr:"Sıfır yeniden düzenleme riskiyle saniyenin altında kesinlik." }, tags:["Finality","BFT","Settlement"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"what",en:"What is Finality?",tr:"Kesinlik Nedir?"},{id:"prob",en:"Probabilistic vs Det.",tr:"Olasılıksal vs Det."},{id:"finance",en:"Why It Matters",tr:"Neden Önemli"},{id:"arc",en:"How Arc Does It",tr:"Arc Nasıl Sağlar"}] },
  fees:{ en:"Stable Gas (USDC)", tr:"Sabit Gas (USDC)", cat:"Features", up:"April 5, 2025", upTr:"5 Nisan 2025", desc:{ en:"USDC gas token with $0.01 base fee — no volatile token exposure.", tr:"$0.01 taban ücreti ile USDC gas tokeni." }, tags:["Fees","USDC","Gas","EIP-1559"], src:[{l:"Arc Docs",u:"https://docs.arc.network"},{l:"USDC",u:"https://www.circle.com/usdc"}], toc:[{id:"model",en:"Fee Model",tr:"Ücret Modeli"},{id:"usdc",en:"USDC as Gas",tr:"Gas Olarak USDC"},{id:"eip",en:"EIP-1559 Smoothing",tr:"EIP-1559"},{id:"compare",en:"Comparison",tr:"Karşılaştırma"}] },
  privacy:{ en:"Opt-in Privacy", tr:"İsteğe Bağlı Gizlilik", cat:"Features", up:"April 5, 2025", upTr:"5 Nisan 2025", desc:{ en:"Confidential transfers and selective disclosure for regulated use cases.", tr:"Düzenlenmiş kullanım alanları için gizli transferler." }, tags:["Privacy","Compliance","Confidential"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"model",en:"Privacy Model",tr:"Gizlilik Modeli"},{id:"selective",en:"Selective Disclosure",tr:"Seçici Açıklama"},{id:"use-cases",en:"Use Cases",tr:"Kullanım Alanları"}] },
  evm:{ en:"EVM Compatibility", tr:"EVM Uyumluluğu", cat:"Architecture", up:"April 3, 2025", upTr:"3 Nisan 2025", desc:{ en:"Deploy existing Solidity contracts. Hardhat, Foundry, MetaMask all work natively.", tr:"Mevcut Solidity sözleşmelerini deploy edin." }, tags:["EVM","Solidity","Ethereum"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"compat",en:"What Works",tr:"Neler Çalışır"},{id:"diff",en:"Key Differences",tr:"Temel Farklar"},{id:"tools",en:"Developer Tools",tr:"Geliştirici Araçları"}] },
  architecture:{ en:"Architecture Overview", tr:"Mimari Genel Bakış", cat:"Architecture", up:"April 3, 2025", upTr:"3 Nisan 2025", desc:{ en:"How Arc's consensus and execution layers work together.", tr:"Arc'ın konsensüs ve yürütme katmanlarının nasıl çalıştığı." }, tags:["Architecture","EVM","BFT"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"},{id:"layers",en:"Layer Breakdown",tr:"Katman Dökümü"},{id:"diagram",en:"Diagram",tr:"Diyagram"}] },
  consensus:{ en:"Consensus Layer", tr:"Konsensüs Katmanı", cat:"Architecture", up:"April 3, 2025", upTr:"3 Nisan 2025", desc:{ en:"Arc's consensus layer uses Malachite BFT for deterministic, sub-second finality.", tr:"Arc'ın konsensüs katmanı Malachite BFT kullanır." }, tags:["Consensus","BFT","Malachite"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"},{id:"malachite",en:"Malachite BFT",tr:"Malachite BFT"},{id:"validators",en:"Validator Set",tr:"Doğrulayıcı Kümesi"}] },
  execution:{ en:"Execution Layer", tr:"Yürütme Katmanı", cat:"Architecture", up:"April 3, 2025", upTr:"3 Nisan 2025", desc:{ en:"Arc's EVM execution layer for smart contract processing.", tr:"Akıllı sözleşme işleme için Arc'ın EVM yürütme katmanı." }, tags:["EVM","Execution","Smart Contracts"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"},{id:"evm",en:"EVM Runtime",tr:"EVM Çalışma Zamanı"},{id:"sep",en:"Separation of Concerns",tr:"Endişelerin Ayrılması"}] },
  malachite:{ en:"Malachite BFT", tr:"Malachite BFT", cat:"Architecture", up:"April 3, 2025", upTr:"3 Nisan 2025", desc:{ en:"Byzantine Fault Tolerant consensus engine powering Arc's finality.", tr:"Arc'ın kesinliğini sağlayan Bizans Hata Toleranslı konsensüs motoru." }, tags:["BFT","Consensus","Finality"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"bft",en:"What is BFT?",tr:"BFT Nedir?"},{id:"malachite",en:"Malachite Engine",tr:"Malachite Motoru"},{id:"properties",en:"Safety & Liveness",tr:"Güvenlik ve Canlılık"}] },
  "use-cases":{ en:"Arc Use Cases", tr:"Arc Kullanım Alanları", cat:"Use Cases", up:"April 8, 2025", upTr:"8 Nisan 2025", desc:{ en:"Arc is purpose-built for financial and commercial applications.", tr:"Arc, finansal ve ticari uygulamalar için özel olarak tasarlanmıştır." }, tags:["Finance","Payments","FX","AI"], src:[{l:"arc.network",u:"https://www.arc.network"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"},{id:"table",en:"Use Case Table",tr:"Kullanım Tablosu"}] },
  payments:{ en:"Payments & FX", tr:"Ödemeler ve Döviz", cat:"Use Cases", up:"April 8, 2025", upTr:"8 Nisan 2025", desc:{ en:"Instant cross-border payments and real-time onchain FX.", tr:"Anında sınır ötesi ödemeler ve gerçek zamanlı zincir üstü döviz." }, tags:["Payments","FX","Cross-border","USDC"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"payments",en:"P2P Payments",tr:"P2P Ödemeleri"},{id:"fx",en:"Onchain FX",tr:"Zincir Üstü Döviz"},{id:"crossborder",en:"Cross-border",tr:"Sınır Ötesi"}] },
  "ai-agents":{ en:"AI Agents on Arc", tr:"Arc'ta Yapay Zeka Ajanları", cat:"Use Cases", up:"April 10, 2025", upTr:"10 Nisan 2025", desc:{ en:"Autonomous AI agents with onchain identity (ERC-8004) and job settlement (ERC-8183).", tr:"Zincir üstü kimlik (ERC-8004) ve iş uzlaşması (ERC-8183) ile otonom yapay zeka ajanları." }, tags:["AI","Agents","ERC-8004","ERC-8183","MCP"], src:[{l:"Arc Docs",u:"https://docs.arc.network"},{l:"Circle MCP",u:"https://developers.circle.com"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"},{id:"erc8004",en:"ERC-8004: Identity",tr:"ERC-8004: Kimlik"},{id:"erc8183",en:"ERC-8183: Jobs",tr:"ERC-8183: İşler"},{id:"mcp",en:"MCP Server",tr:"MCP Sunucusu"},{id:"diagram",en:"Agent Flow",tr:"Ajan Akışı"}] },
  "capital-markets":{ en:"Capital Markets", tr:"Sermaye Piyasaları", cat:"Use Cases", up:"April 8, 2025", upTr:"8 Nisan 2025", desc:{ en:"HFT and real-time risk management powered by sub-second finality.", tr:"Saniyenin altında kesinlikle desteklenen yüksek frekanslı ticaret." }, tags:["Capital Markets","HFT","Settlement"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"}] },
  tokenization:{ en:"Asset Tokenization", tr:"Varlık Tokenizasyonu", cat:"Use Cases", up:"April 8, 2025", upTr:"8 Nisan 2025", desc:{ en:"Issue and manage tokenized real-world assets with optional privacy.", tr:"İsteğe bağlı gizlilikle gerçek dünya varlıklarını tokenize edin." }, tags:["Tokenization","RWA","Privacy"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"}] },
  "getting-started":{ en:"Getting Started", tr:"Başlangıç", cat:"Developers", up:"April 12, 2025", upTr:"12 Nisan 2025", desc:{ en:"Deploy your first smart contract on Arc testnet in minutes.", tr:"Dakikalar içinde Arc testnet'e ilk akıllı sözleşmenizi deploy edin." }, tags:["Testnet","Deployment","Solidity"], src:[{l:"Arc Docs",u:"https://docs.arc.network"},{l:"Faucet",u:"https://faucet.circle.com"}], toc:[{id:"network",en:"Network Config",tr:"Ağ Yapılandırması"},{id:"faucet",en:"Faucet",tr:"Musluk"},{id:"deploy",en:"Deploy a Contract",tr:"Sözleşme Deploy Et"},{id:"tools",en:"Tools",tr:"Araçlar"}] },
  "app-kit":{ en:"App Kit SDK", tr:"App Kit SDK", cat:"Developers", up:"April 12, 2025", upTr:"12 Nisan 2025", desc:{ en:"Circle's App Kit: Bridge, Swap, and Send across chains via CCTP.", tr:"Circle'ın App Kit'i: CCTP aracılığıyla Bridge, Swap ve Send." }, tags:["SDK","Bridge","Swap","CCTP"], src:[{l:"Circle Developers",u:"https://developers.circle.com"},{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"},{id:"install",en:"Installation",tr:"Kurulum"},{id:"bridge",en:"Bridge",tr:"Köprü"},{id:"adapters",en:"Adapters",tr:"Adaptörler"}] },
  gas:{ en:"Gas & Fees", tr:"Gas ve Ücretler", cat:"Developers", up:"April 12, 2025", upTr:"12 Nisan 2025", desc:{ en:"Arc's gas model: USDC token, EIP-1559 smoothing, fee estimation.", tr:"Arc'ın gas modeli: USDC tokeni, EIP-1559 düzleştirme, ücret tahmini." }, tags:["Gas","Fees","USDC","EIP-1559"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"model",en:"Fee Model",tr:"Ücret Modeli"},{id:"estimate",en:"Estimating Fees",tr:"Ücret Tahmini"}] },
  testnet:{ en:"Testnet Guide", tr:"Test Ağı Rehberi", cat:"Developers", up:"April 12, 2025", upTr:"12 Nisan 2025", desc:{ en:"Connect to Arc testnet, get test tokens, explore the chain.", tr:"Arc testnet'e bağlanın, test tokeni alın ve zinciri keşfedin." }, tags:["Testnet","Faucet","Explorer","RPC"], src:[{l:"Arc Docs",u:"https://docs.arc.network"},{l:"Faucet",u:"https://faucet.circle.com"},{l:"ArcScan",u:"https://testnet.arcscan.app"}], toc:[{id:"network",en:"Network Details",tr:"Ağ Detayları"},{id:"faucet",en:"Faucet",tr:"Musluk"},{id:"explorer",en:"Explorer",tr:"Gezgin"}] },
  circle:{ en:"Circle Developer Platform", tr:"Circle Geliştirici Platformu", cat:"Ecosystem", up:"April 6, 2025", upTr:"6 Nisan 2025", desc:{ en:"Circle's full-stack platform: USDC, EURC, CCTP, Gateway, Wallets.", tr:"Circle'ın tam yığın platformu: USDC, EURC, CCTP, Gateway, Cüzdanlar." }, tags:["Circle","USDC","EURC","CCTP","Gateway"], src:[{l:"developers.circle.com",u:"https://developers.circle.com"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"},{id:"products",en:"Products",tr:"Ürünler"},{id:"ai-tools",en:"AI Dev Tools",tr:"Yapay Zeka Araçları"}] },
  "arc-house":{ en:"Arc House & Architects", tr:"Arc House ve Mimarlar", cat:"Ecosystem", up:"April 7, 2025", upTr:"7 Nisan 2025", desc:{ en:"Community hub for Arc Network and the Architects contribution program.", tr:"Arc Network için topluluk merkezi ve Mimarlar katkı programı." }, tags:["Community","Architects","Arc House"], src:[{l:"community.arc.network",u:"https://community.arc.network"}], toc:[{id:"archouse",en:"Arc House",tr:"Arc House"},{id:"architects",en:"Architects Program",tr:"Mimarlar Programı"},{id:"started",en:"Getting Started",tr:"Başlangıç"},{id:"channels",en:"Community Channels",tr:"Topluluk Kanalları"}] },
  partners:{ en:"Design Partners", tr:"Tasarım Ortakları", cat:"Ecosystem", up:"April 6, 2025", upTr:"6 Nisan 2025", desc:{ en:"Global financial institutions exploring Arc as early design partners.", tr:"Erken tasarım ortakları olarak Arc'ı araştıran küresel finansal kurumlar." }, tags:["Visa","Mastercard","Goldman Sachs"], src:[{l:"arc.network",u:"https://www.arc.network"}], toc:[{id:"visa",en:"Visa",tr:"Visa"},{id:"mc",en:"Mastercard",tr:"Mastercard"},{id:"gs",en:"Goldman Sachs",tr:"Goldman Sachs"}] },
  architects:{ en:"Architects Program", tr:"Mimarlar Programı", cat:"Ecosystem", up:"April 7, 2025", upTr:"7 Nisan 2025", desc:{ en:"Earn recognition for contributing to the Arc ecosystem.", tr:"Arc ekosistemine katkıda bulunarak tanınma kazanın." }, tags:["Community","Architects","Points"], src:[{l:"community.arc.network",u:"https://community.arc.network"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"},{id:"join",en:"How to Join",tr:"Nasıl Katılınır"}] },
  comparison:{ en:"Arc vs Other Blockchains", tr:"Arc vs Diğer Blockchainler", cat:"Reference", up:"April 10, 2025", upTr:"10 Nisan 2025", desc:{ en:"Side-by-side comparison: Arc vs Ethereum, Solana, Polygon.", tr:"Karşılaştırma: Arc vs Ethereum, Solana, Polygon." }, tags:["Comparison","Ethereum","Solana","Polygon"], src:[{l:"Arc Docs",u:"https://docs.arc.network"},{l:"Ethereum",u:"https://ethereum.org"},{l:"Solana",u:"https://solana.com"}], toc:[{id:"overview",en:"Overview",tr:"Genel Bakış"},{id:"table",en:"Comparison Table",tr:"Karşılaştırma"},{id:"finality",en:"Finality Deep-dive",tr:"Kesinlik İncelemesi"},{id:"fees",en:"Fee Structures",tr:"Ücret Yapıları"}] },
  glossary:{ en:"Glossary", tr:"Sözlük", cat:"Reference", up:"April 10, 2025", upTr:"10 Nisan 2025", desc:{ en:"Definitions of key terms used in Arc Network documentation.", tr:"Arc Network dokümantasyonunda kullanılan temel terimlerin tanımları." }, tags:["Glossary","BFT","CCTP","EVM"], src:[{l:"Arc Docs",u:"https://docs.arc.network"}], toc:[{id:"a-c",en:"A–C",tr:"A–C"},{id:"d-g",en:"D–G",tr:"D–G"},{id:"h-z",en:"H–Z",tr:"H–Z"}] },
};

/* ═══════════════════════════════════════════════════════
   SEARCH MODAL
══════════════════════════════════════════════════════════ */
const SearchModal = ({ lang, onClose, onNav }) => {
  const [q, setQ] = useState("");
  const [cur, setCur] = useState(0);
  const ref = useRef(null);
  useEffect(() => { setTimeout(() => ref.current?.focus(), 40); }, []);

  const results = q.trim()
    ? SEARCH_INDEX.filter(i =>
        (lang==="tr" ? i.tr : i.en).toLowerCase().includes(q.toLowerCase()) ||
        i.x.toLowerCase().includes(q.toLowerCase()) ||
        i.cat.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 8)
    : SEARCH_INDEX.slice(0, 6);

  const grouped = results.reduce((a, item) => { (a[item.cat]=a[item.cat]||[]).push(item); return a; }, {});

  const go = useCallback(id => { onNav(id); onClose(); }, [onNav, onClose]);

  useEffect(() => { setCur(0); }, [q]);
  useEffect(() => {
    const h = e => {
      if (e.key==="Escape") onClose();
      if (e.key==="ArrowDown") { e.preventDefault(); setCur(c=>Math.min(c+1,results.length-1)); }
      if (e.key==="ArrowUp") { e.preventDefault(); setCur(c=>Math.max(c-1,0)); }
      if (e.key==="Enter" && results[cur]) go(results[cur].id);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [results, cur, go, onClose]);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"14vh", padding:"14vh 16px 0", background:"rgba(3,6,13,.85)", backdropFilter:"blur(8px)" }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ width:"100%", maxWidth:560, background:"#070d1a", border:"1px solid rgba(0,212,170,.3)", borderRadius:14, overflow:"hidden", boxShadow:"0 24px 60px rgba(0,0,0,.7)" }} className="fade-up">
        {/* Input */}
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", borderBottom:"1px solid rgba(0,212,170,.1)" }}>
          <Icon name="search" size={15} color="#64748b"/>
          <input ref={ref} value={q} onChange={e=>setQ(e.target.value)}
            placeholder={lang==="tr" ? "Makaleleri ara..." : "Search articles..."}
            style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"15px", color:"#e2e8f0", fontFamily:"'Inter',sans-serif" }}/>
          {q && <button onClick={()=>setQ("")} style={{ background:"none", border:"none", cursor:"pointer", color:"#64748b", display:"flex" }}><Icon name="x" size={13}/></button>}
          <kbd style={{ padding:"2px 6px", borderRadius:4, background:"#0d1525", border:"1px solid rgba(0,212,170,.15)", fontSize:"10px", color:"#475569", fontFamily:"'JetBrains Mono',monospace" }}>ESC</kbd>
        </div>
        {/* Results */}
        <div style={{ maxHeight:380, overflowY:"auto", padding:"6px 0" }}>
          {results.length===0 ? (
            <div style={{ padding:"28px 16px", textAlign:"center", color:"#475569", fontSize:".875rem" }}>
              {lang==="tr" ? "Sonuç bulunamadı" : "No results found"}
            </div>
          ) : Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <div style={{ padding:"5px 16px 3px", fontSize:"10px", fontWeight:600, textTransform:"uppercase", letterSpacing:".1em", color:"#475569" }}>{cat}</div>
              {items.map(item => {
                const idx = results.indexOf(item);
                return (
                  <button key={item.id} onClick={()=>go(item.id)} onMouseEnter={()=>setCur(idx)}
                    style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"8px 16px", background: cur===idx ? "rgba(0,212,170,.08)" : "transparent", border:"none", cursor:"pointer", transition:"background .1s" }}>
                    <Icon name="book" size={13} color="#475569"/>
                    <div style={{ flex:1, minWidth:0, textAlign:"left" }}>
                      <div style={{ fontSize:"13.5px", fontWeight:500, color: cur===idx ? "#00d4aa" : "#cbd5e1" }}>{lang==="tr" ? item.tr : item.en}</div>
                      <div style={{ fontSize:"11.5px", color:"#475569", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.x}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:14, padding:"7px 16px", borderTop:"1px solid rgba(255,255,255,.03)", fontSize:"11px", color:"#334155" }}>
          {[["↑↓","navigate"],["↵","open"],["esc","close"]].map(([k,l])=>(
            <span key={k}><kbd style={{ background:"#0d1525", padding:"1px 5px", borderRadius:3, fontFamily:"'JetBrains Mono',monospace" }}>{k}</kbd> {l}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════════ */
const SidebarContent = ({ lang, cur, onNav }) => {
  const [open, setOpen] = useState(() => {
    const s = {};
    NAV.forEach(it => { if (it.ch?.some(c=>c.id===cur) || it.id===cur) s[it.id]=true; });
    return s;
  });
  const tog = id => setOpen(s=>({...s,[id]:!s[id]}));

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      {/* Logo */}
      <div style={{ padding:"14px 16px", borderBottom:"1px solid rgba(0,212,170,.12)", marginBottom:6 }}>
        <button onClick={()=>onNav("home")} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <ArcMark size={22}/><Wordmark/>
        </button>
      </div>
      {/* Nav */}
      <nav style={{ flex:1, overflowY:"auto", padding:"6px 8px" }}>
        {NAV.map(item => {
          const active = cur===item.id;
          const childActive = item.ch?.some(c=>c.id===cur);
          const label = lang==="tr" ? item.tr : item.en;
          if (!item.ch) return (
            <button key={item.id} onClick={()=>onNav(item.id)}
              className={`sb-btn${active?" active":""}`}
              style={{ color: active?"#00d4aa":childActive?"#94a3b8":"#64748b", borderLeft: active?"2px solid #00d4aa":"2px solid transparent" }}>
              <Icon name={item.icon} size={14} color={active?"#00d4aa":undefined}/>
              <span style={{ flex:1 }}>{label}</span>
              {item.badge && <span style={{ fontSize:"9px", padding:"1px 5px", borderRadius:99, background:"rgba(0,212,170,.2)", color:"#00d4aa", fontWeight:600 }}>{item.badge}</span>}
            </button>
          );
          return (
            <div key={item.id} style={{ marginBottom:2 }}>
              <button onClick={()=>tog(item.id)}
                className={`sb-btn parent${childActive?" has-active":""}`}>
                <Icon name={item.icon} size={14} color={childActive?"#00d4aa":undefined}/>
                <span style={{ flex:1, textAlign:"left" }}>{label}</span>
                {item.badge && <span style={{ fontSize:"9px", padding:"1px 5px", borderRadius:99, background:"rgba(0,212,170,.2)", color:"#00d4aa", fontWeight:600 }}>{item.badge}</span>}
                <Icon name="chevR" size={12} color="#334155" style={{ transform:open[item.id]?"rotate(90deg)":"rotate(0)", transition:"transform .2s", flexShrink:0 }}/>
              </button>
              {open[item.id] && (
                <div style={{ borderLeft:"1px solid rgba(0,212,170,.13)", marginLeft:22, paddingLeft:4, marginBottom:2 }}>
                  {item.ch.map(c => {
                    const ca = cur===c.id;
                    return (
                      <button key={c.id} onClick={()=>onNav(c.id)}
                        className={`sb-btn${ca?" active":""}`}
                        style={{ fontSize:"13px", color:ca?"#00d4aa":"#4a6080", borderLeft:ca?"2px solid #00d4aa":"2px solid transparent", paddingLeft:10 }}>
                        {lang==="tr" ? c.tr : c.en}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      {/* Footer */}
      <div style={{ padding:"10px 16px", borderTop:"1px solid rgba(0,212,170,.1)" }}>
        <div style={{ display:"flex", gap:10, marginBottom:5, flexWrap:"wrap" }}>
          {[["Docs","https://docs.arc.network"],["Community","https://community.arc.network"],["Explorer","https://testnet.arcscan.app"]].map(([l,u])=>(
            <a key={l} href={u} target="_blank" rel="noopener" className="ext-a">{l} ↗</a>
          ))}
        </div>
        <p style={{ fontSize:"11px", color:"#334155" }}>
          made by <a href="https://x.com/0xFatih" target="_blank" rel="noopener" style={{ color:"#d4982a", textDecoration:"none" }}>0xFatih</a> with ♥️
        </p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   TABLE OF CONTENTS
══════════════════════════════════════════════════════════ */
const TOC = ({ items, lang }) => {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!items?.length) return;
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) { if (e.isIntersecting) setActive(e.target.id); }
    }, { rootMargin:"-15% 0% -70% 0%" });
    items.forEach(it => { const el = document.getElementById(it.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [items]);

  if (!items?.length) return null;
  return (
    <div style={{ position:"sticky", top:72, paddingLeft:16 }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8, fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:".1em", color:"#475569" }}>
        <Icon name="list" size={11} color="#475569"/> {lang==="tr" ? "Bu Sayfada" : "On this page"}
      </div>
      {items.map(it => (
        <a key={it.id} href={`#${it.id}`} className={`toc-a${active===it.id?" active":""}`}
          style={{ paddingLeft: it.level===3?12: it.level===4?20:0 }}>
          {lang==="tr" ? it.tr : it.en}
        </a>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   HEADER
══════════════════════════════════════════════════════════ */
const Header = ({ lang, setLang, onSearch, onMenu, menuOpen }) => (
  <header style={{ height:58, display:"flex", alignItems:"center", padding:"0 20px", background:"rgba(3,6,13,.92)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(0,212,170,.15)", position:"sticky", top:0, zIndex:40, gap:10 }}>
    <button onClick={onMenu} className="lg-hide"
      style={{ background:"none", border:"none", cursor:"pointer", color:"#64748b", padding:4, display:"flex", alignItems:"center" }}>
      <Icon name={menuOpen?"x":"menu"} size={20} color="#64748b"/>
    </button>
    <div style={{ flex:1 }}/>
    {/* Search */}
    <button onClick={onSearch}
      style={{ display:"flex", alignItems:"center", gap:7, padding:"5px 12px", borderRadius:8, border:"1px solid rgba(0,212,170,.2)", background:"rgba(13,21,37,.6)", color:"#64748b", fontSize:"13px", cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
      <Icon name="search" size={13} color="#64748b"/>
      <span className="sm-show">{lang==="tr" ? "Ara..." : "Search..."}</span>
      <kbd style={{ display:"flex", gap:2, padding:"1px 5px", borderRadius:4, background:"#070d1a", border:"1px solid rgba(0,212,170,.12)", fontSize:"10px", color:"#334155", fontFamily:"'JetBrains Mono',monospace" }}>⌘K</kbd>
    </button>
    {/* Lang */}
    <div style={{ display:"flex", borderRadius:7, border:"1px solid rgba(0,212,170,.15)", overflow:"hidden" }}>
      {["en","tr"].map(l=>(
        <button key={l} onClick={()=>setLang(l)}
          style={{ padding:"4px 9px", fontSize:"12px", fontWeight:500, background:lang===l?"rgba(0,212,170,.15)":"transparent", color:lang===l?"#00d4aa":"#475569", border:"none", cursor:"pointer", textTransform:"uppercase", fontFamily:"'Inter',sans-serif" }}>
          {l}
        </button>
      ))}
    </div>
    {/* External */}
    <a href="https://docs.arc.network" target="_blank" rel="noopener" className="ext-a sm-show" style={{ display:"flex", alignItems:"center", gap:4 }}>
      Docs <Icon name="ext" size={11} color="currentColor"/>
    </a>
    <a href="https://x.com/arc" target="_blank" rel="noopener" style={{ display:"flex", color:"#475569", padding:4, borderRadius:6, transition:"color .15s" }}>
      <XLogo size={15}/>
    </a>
  </header>
);

/* ═══════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════ */
const HomePage = ({ lang, onNav }) => {
  const T = (en, tr) => lang==="tr" ? tr : en;
  const FEATURES = [
    { icon:"zap",    id:"finality",      en:"Deterministic Finality",  tr:"Deterministik Kesinlik",  den:"Sub-second, zero reorg",         dtr:"Saniyenin altında, sıfır yeniden düzenleme", c:"#00d4aa" },
    { icon:"dollar", id:"fees",          en:"Stable USDC Gas",         tr:"Sabit USDC Gas",          den:"$0.01 base fee, fiat-pegged",    dtr:"$0.01 taban ücreti, fiat sabitli",           c:"#0ea5e9" },
    { icon:"code",   id:"evm",           en:"Full EVM Compatibility",  tr:"Tam EVM Uyumluluğu",      den:"Solidity, Hardhat, Foundry",     dtr:"Değişiklik yapmadan deploy et",              c:"#00d4aa" },
    { icon:"shield", id:"privacy",       en:"Opt-in Privacy",          tr:"İsteğe Bağlı Gizlilik",   den:"Confidential when needed",       dtr:"Gerektiğinde gizli transferler",             c:"#0ea5e9" },
    { icon:"brain",  id:"ai-agents",     en:"AI Agent Standards",      tr:"Yapay Zeka Standartları",  den:"ERC-8004 identity & ERC-8183",   dtr:"ERC-8004 kimlik ve ERC-8183 işler",          c:"#00d4aa" },
    { icon:"globe",  id:"circle",        en:"Circle Ecosystem",        tr:"Circle Ekosistemi",        den:"CCTP, Gateway, USDC, EURC",      dtr:"CCTP, Gateway, USDC, EURC",                  c:"#0ea5e9" },
  ];
  const STATS = [
    { v:"<1s",    l:T("Finality","Kesinlik"),       s:"Deterministic", c:"#00d4aa" },
    { v:"USDC",   l:T("Gas Token","Gas Tokeni"),    s:"$0.01 base fee",c:"#0ea5e9" },
    { v:"BFT",    l:T("Consensus","Konsensüs"),     s:"Malachite",     c:"#00d4aa" },
    { v:"EVM",    l:T("Compatible","Uyumlu"),       s:"Full support",  c:"#0ea5e9" },
    { v:"Opt-in", l:T("Privacy","Gizlilik"),        s:"Selective disc",c:"#00d4aa" },
    { v:"🟢",     l:T("Status","Durum"),            s:"Testnet live",  c:"#d4982a" },
  ];

  return (
    <div className="fade-up">
      {/* HERO */}
      <section style={{ position:"relative", overflow:"hidden", borderBottom:"1px solid rgba(0,212,170,.15)" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#03060d 0%,#070d1a 50%,#0d1525 100%)" }}/>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% -10%,rgba(0,212,170,.12) 0%,transparent 60%)" }}/>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(0,212,170,.7),transparent)" }}/>
        <div style={{ position:"relative", padding:"clamp(40px,8vw,72px) clamp(20px,6vw,56px)" }}>
          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, marginBottom:18, padding:"4px 14px", borderRadius:99, border:"1px solid rgba(0,212,170,.3)", background:"rgba(0,212,170,.06)", fontSize:"12px", color:"#00d4aa", fontWeight:500 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#00d4aa", animation:"pulse 2s infinite", display:"inline-block" }}/>
            {T("Testnet Live","Testnet Aktif")}
          </div>
          {/* Headline */}
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(2rem,5vw,3.25rem)", fontWeight:500, lineHeight:1.15, marginBottom:18, letterSpacing:".02em", maxWidth:700 }}>
            <span style={{ color:"#f1f5f9" }}>{T("The knowledge base for ","Arc Network için ")}</span>
            <span className="arc-gradient">{T("Arc Network","Bilgi Tabanı")}</span>
          </h1>
          <p style={{ fontSize:"clamp(.95rem,2vw,1.1rem)", color:"#64748b", lineHeight:1.75, maxWidth:540, marginBottom:28 }}>
            {T("The open-source wiki for Arc — a Layer-1 blockchain built for stablecoin finance, deterministic finality, and the agentic economy.",
              "Arc için açık kaynak wiki — stablecoin finansı, deterministik kesinlik ve ajansal ekonomi için inşa edilmiş bir Layer-1 blockchain.")}
          </p>
          {/* CTAs */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            <button onClick={()=>onNav("about")}
              style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 22px", borderRadius:9, background:"#00d4aa", color:"#03060d", fontWeight:600, fontSize:"14px", border:"none", cursor:"pointer", boxShadow:"0 0 20px rgba(0,212,170,.18)" }}>
              {T("Explore","Keşfet")} <Icon name="arrow" size={15} color="#03060d"/>
            </button>
            <button onClick={()=>onNav("getting-started")}
              style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 22px", borderRadius:9, border:"1px solid rgba(0,212,170,.25)", color:"#94a3b8", fontSize:"14px", background:"transparent", cursor:"pointer" }}>
              {T("Developer Guide","Geliştirici Kılavuzu")} <Icon name="code" size={13} color="#94a3b8"/>
            </button>
            <a href="https://docs.arc.network" target="_blank" rel="noopener"
              style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 22px", borderRadius:9, border:"1px solid rgba(255,255,255,.08)", color:"#64748b", fontSize:"14px", textDecoration:"none" }}>
              {T("Official Docs","Resmi Docs")} <Icon name="ext" size={12} color="#64748b"/>
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderBottom:"1px solid rgba(0,212,170,.12)", background:"rgba(7,13,26,.7)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)" }}>
          {STATS.map((s,i)=>(
            <div key={i} style={{ padding:"12px 6px", textAlign:"center", borderRight: i<5?"1px solid rgba(0,212,170,.1)":"none" }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, fontSize:"1.1rem", color:s.c }}>{s.v}</div>
              <div style={{ fontSize:"10px", color:"#64748b", marginTop:2 }}>{s.l}</div>
              <div style={{ fontSize:"9px", color:"#334155", marginTop:1 }}>{s.s}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ padding:"clamp(28px,5vw,52px) clamp(20px,6vw,56px) 80px", maxWidth:960, margin:"0 auto" }}>
        {/* FEATURES */}
        <section style={{ marginBottom:56 }}>
          <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:"1.6rem", fontWeight:500, color:"#f1f5f9", marginBottom:6, letterSpacing:".02em" }}>
            {T("Key Features","Temel Özellikler")}
          </h2>
          <p style={{ color:"#64748b", fontSize:".875rem", marginBottom:24 }}>{T("What makes Arc the most capable L1 for financial applications.","Arc'ı finansal uygulamalar için en güçlü L1 yapan özellikler.")}</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:12 }}>
            {FEATURES.map((f,i)=>(
              <button key={i} onClick={()=>onNav(f.id)} className="feature-card">
                <div style={{ width:36, height:36, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", background: i%2===0?"rgba(0,212,170,.1)":"rgba(14,165,233,.1)" }}>
                  <Icon name={f.icon} size={18} color={f.c}/>
                </div>
                <div>
                  <div style={{ fontSize:"13px", fontWeight:600, color:"#e2e8f0", marginBottom:3 }}>{T(f.en,f.tr)}</div>
                  <div style={{ fontSize:"12px", color:"#64748b", lineHeight:1.5 }}>{T(f.den,f.dtr)}</div>
                </div>
                <div style={{ marginTop:"auto", fontSize:"11px", color:"#334155", display:"flex", alignItems:"center", gap:4 }}>
                  {T("Learn more","Daha fazla")} <Icon name="chevR" size={11} color="#334155"/>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* COMPARISON */}
        <section style={{ marginBottom:56 }}>
          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:8 }}>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:"1.4rem", fontWeight:500, color:"#f1f5f9", letterSpacing:".02em" }}>{T("How Arc Compares","Arc Nasıl Karşılaştırılır")}</h2>
            <button onClick={()=>onNav("comparison")} style={{ display:"flex", alignItems:"center", gap:5, fontSize:"12px", color:"#00d4aa", background:"none", border:"none", cursor:"pointer" }}>
              {T("Full comparison","Tam karşılaştırma")} <Icon name="arrow" size={12} color="#00d4aa"/>
            </button>
          </div>
          <CompareTable lang={lang}/>
        </section>

        {/* QUICK LINKS */}
        <section style={{ marginBottom:56 }}>
          <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:"1.25rem", fontWeight:500, color:"#f1f5f9", marginBottom:14, letterSpacing:".02em" }}>{T("Quick Access","Hızlı Erişim")}</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:8 }}>
            {[
              { id:"getting-started", en:"Getting Started",     tr:"Başlangıç",              icon:"zap" },
              { id:"architecture",    en:"Architecture",         tr:"Mimari",                 icon:"cpu" },
              { id:"comparison",      en:"Comparison Table",     tr:"Karşılaştırma Tablosu",  icon:"chart" },
              { id:"glossary",        en:"Glossary",             tr:"Sözlük",                 icon:"book" },
              { id:"arc-house",       en:"Arc House Community",  tr:"Arc House Topluluğu",    icon:"users" },
              { id:"testnet",         en:"Testnet Guide",        tr:"Test Ağı Rehberi",       icon:"clock" },
            ].map(l=>(
              <button key={l.id} onClick={()=>onNav(l.id)} className="quick-btn">
                <Icon name={l.icon} size={14} color="#475569"/>
                <span style={{ fontSize:"13px", color:"#94a3b8", flex:1, textAlign:"left" }}>{T(l.en,l.tr)}</span>
                <Icon name="chevR" size={12} color="#334155"/>
              </button>
            ))}
          </div>
        </section>

        {/* PARTNERS */}
        <section style={{ marginBottom:56 }}>
          <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:"1.25rem", fontWeight:500, color:"#f1f5f9", marginBottom:6, letterSpacing:".02em" }}>{T("Design Partners","Tasarım Ortakları")}</h2>
          <p style={{ color:"#64748b", fontSize:".875rem", marginBottom:20 }}>{T("Global financial institutions shaping Arc's foundation.","Arc'ın temelini şekillendiren küresel finansal kurumlar.")}</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:10 }}>
            {[
              { name:"Visa",         sub:T("Payment Networks","Ödeme Ağları"),     logo:"VISA" },
              { name:"Mastercard",   sub:T("Digital Assets","Dijital Varlıklar"),  logo:"MC" },
              { name:"Goldman Sachs",sub:T("Capital Markets","Sermaye Piyasaları"),logo:"GS" },
              { name:"Circle",       sub:T("USDC Issuer","USDC İhraçcısı"),        logo:"◉" },
            ].map((p,i)=>(
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"16px 12px", borderRadius:10, border:"1px solid rgba(0,212,170,.12)", background:"rgba(7,13,26,.4)", textAlign:"center" }}>
                <div style={{ width:42, height:42, borderRadius:"50%", background:"#0d1525", border:"1px solid rgba(0,212,170,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cinzel',serif", fontWeight:700, color:"#00d4aa", fontSize:".75rem" }}>{p.logo}</div>
                <div>
                  <div style={{ fontSize:"13px", fontWeight:600, color:"#e2e8f0" }}>{p.name}</div>
                  <div style={{ fontSize:"11px", color:"#475569", marginTop:2 }}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMMUNITY CTA */}
        <section style={{ position:"relative", overflow:"hidden", borderRadius:14, border:"1px solid rgba(0,212,170,.2)", background:"rgba(7,13,26,.8)", padding:"clamp(28px,5vw,48px)", textAlign:"center" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 100%,rgba(0,212,170,.12) 0%,transparent 60%)", pointerEvents:"none" }}/>
          <div style={{ position:"relative" }}>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:"1.6rem", fontWeight:500, color:"#f1f5f9", marginBottom:8, letterSpacing:".02em" }}>{T("Join the Community","Topluluğa Katıl")}</h2>
            <p style={{ color:"#64748b", marginBottom:22, fontSize:".875rem", lineHeight:1.7, maxWidth:400, margin:"0 auto 22px" }}>
              {T("Become an Architect on Arc House, join Discord, and build Arc together.","Arc House'da Mimar ol, Discord'a katıl ve Arc'ı birlikte inşa et.")}
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8 }}>
              {[
                { label:"Arc House",  href:"https://community.arc.network" },
                { label:"Discord",    href:"https://discord.com/invite/buildonarc" },
                { label:"@arc on X",  href:"https://x.com/arc" },
              ].map(l=>(
                <a key={l.label} href={l.href} target="_blank" rel="noopener"
                  style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:8, border:"1px solid rgba(0,212,170,.3)", background:"rgba(0,212,170,.06)", color:"#00d4aa", fontSize:"13px", textDecoration:"none" }}>
                  {l.label} <Icon name="ext" size={12} color="#00d4aa"/>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   DOC PAGE
══════════════════════════════════════════════════════════ */
const DocPage = ({ id, lang, onNav }) => {
  const meta = META[id];
  if (!meta) return (
    <div style={{ padding:"56px 48px", textAlign:"center" }}>
      <p style={{ color:"#64748b" }}>Page not found.</p>
      <button onClick={()=>onNav("home")} style={{ marginTop:14, padding:"8px 18px", borderRadius:8, border:"1px solid rgba(0,212,170,.2)", background:"transparent", color:"#00d4aa", cursor:"pointer", fontSize:"14px" }}>← Home</button>
    </div>
  );

  const title = lang==="tr" ? meta.tr : meta.en;
  const desc  = lang==="tr" ? meta.desc?.tr : meta.desc?.en;
  const upd   = lang==="tr" ? meta.upTr : meta.up;
  const T = (en, tr) => lang==="tr" ? tr : en;

  return (
    <div style={{ display:"flex" }} className="fade-up">
      {/* Article */}
      <article style={{ flex:1, minWidth:0, padding:"clamp(24px,4vw,44px) clamp(18px,5vw,52px) 80px", maxWidth:760 }}>
        {/* Breadcrumb */}
        <nav style={{ display:"flex", alignItems:"center", gap:6, marginBottom:22, fontSize:"12px", color:"#475569" }}>
          <button onClick={()=>onNav("home")} style={{ background:"none", border:"none", cursor:"pointer", color:"#475569", padding:0, fontSize:"12px" }}>Home</button>
          <Icon name="chevR" size={11} color="#475569"/>
          <span style={{ color:"#00d4aa" }}>{meta.cat}</span>
          <Icon name="chevR" size={11} color="#475569"/>
          <span style={{ color:"#64748b", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{title}</span>
        </nav>

        {/* Header */}
        <header style={{ marginBottom:28 }}>
          <span style={{ display:"inline-block", padding:"2px 10px", borderRadius:99, fontSize:"11px", fontWeight:500, background:"rgba(0,212,170,.1)", color:"#00d4aa", border:"1px solid rgba(0,212,170,.2)", marginBottom:10 }}>
            {meta.cat}
          </span>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(1.4rem,3vw,2.1rem)", fontWeight:500, color:"#f1f5f9", lineHeight:1.2, marginBottom:8, letterSpacing:".02em" }}>
            {title}
          </h1>
          {desc && <p style={{ fontSize:".9375rem", color:"#64748b", lineHeight:1.7 }}>{desc}</p>}
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:14, marginTop:16, paddingTop:16, borderTop:"1px solid rgba(0,212,170,.1)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:"12px", color:"#475569" }}>
              <Icon name="clock" size={11} color="#475569"/>
              {T("Last updated:","Son güncelleme:")} {upd}
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {meta.tags?.slice(0,4).map(t=><span key={t} className="tag-pill">{t}</span>)}
            </div>
          </div>
        </header>

        {/* Content */}
        {renderPage(id, lang)}

        {/* Sources */}
        {meta.src?.length > 0 && (
          <div style={{ marginTop:44, paddingTop:22, borderTop:"1px solid rgba(0,212,170,.1)" }}>
            <div style={{ fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:".1em", color:"#475569", marginBottom:10 }}>
              {T("Sources","Kaynaklar")}
            </div>
            {meta.src.map(s=>(
              <a key={s.u} href={s.u} target="_blank" rel="noopener"
                style={{ display:"flex", alignItems:"center", gap:8, fontSize:"13px", color:"#64748b", textDecoration:"none", marginBottom:6, transition:"color .15s" }}
                onMouseEnter={e=>e.currentTarget.style.color="#00d4aa"}
                onMouseLeave={e=>e.currentTarget.style.color="#64748b"}>
                <Icon name="ext" size={12} color="currentColor"/>
                <span>{s.l}</span>
                <span style={{ color:"#334155", fontSize:"11px" }}>{s.u}</span>
              </a>
            ))}
          </div>
        )}
      </article>

      {/* TOC */}
      {meta.toc?.length > 0 && (
        <aside style={{ width:204, flexShrink:0, padding:"clamp(24px,4vw,44px) 0 0" }} className="lg-show">
          <TOC items={meta.toc} lang={lang}/>
        </aside>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════ */
const Footer = ({ lang, onNav }) => {
  const T = (en, tr) => lang==="tr" ? tr : en;
  return (
    <footer style={{ borderTop:"1px solid rgba(0,212,170,.12)", background:"rgba(3,6,13,.95)" }}>
      <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(0,212,170,.6),transparent)" }}/>
      <div style={{ padding:"24px clamp(20px,5vw,48px)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <ArcMark size={18}/><Wordmark/>
        </div>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          {[["Docs","https://docs.arc.network"],["arc.network","https://www.arc.network"],[T("Community","Topluluk"),"https://community.arc.network"],["Circle Devs","https://developers.circle.com"],["Explorer","https://testnet.arcscan.app"]].map(([l,u])=>(
            <a key={l} href={u} target="_blank" rel="noopener" className="ext-a">{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:7 }}>
          {[
            { h:"https://www.arc.network",             icon:null, gl:true },
            { h:"https://x.com/arc",                   xlogo:true },
            { h:"https://discord.com/invite/buildonarc",disc:true },
            { h:"https://x.com/0xFatih",               xlogo:true, me:true },
          ].map((s,i)=>(
            <a key={i} href={s.h} target="_blank" rel="noopener"
              className={`soc-btn${s.me?" me":""}`}>
              {s.xlogo ? <XLogo size={13}/> : s.disc ? <DiscordLogo size={13}/> : <Icon name="globe" size={13} color="currentColor"/>}
            </a>
          ))}
        </div>
      </div>
      <div style={{ textAlign:"center", paddingBottom:14, fontSize:"11px", color:"#1e293b" }}>
        made by <a href="https://x.com/0xFatih" target="_blank" rel="noopener" style={{ color:"#d4982a", textDecoration:"none" }}>0xFatih</a> with ♥️ · Community resource, not affiliated with Circle
      </div>
    </footer>
  );
};

/* ═══════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage]   = useState("home");
  const [lang, setLang]   = useState("en");
  const [search, setSearch] = useState(false);
  const [menu, setMenu]   = useState(false);

  // Cmd+K
  useEffect(() => {
    const h = e => { if ((e.metaKey||e.ctrlKey) && e.key==="k") { e.preventDefault(); setSearch(s=>!s); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const nav = id => { setPage(id); setMenu(false); window.scrollTo(0,0); };

  return (
    <div style={{ minHeight:"100vh", background:"#03060d", display:"flex", flexDirection:"column" }}>
      <style>{CSS}</style>

      {search && <SearchModal lang={lang} onClose={()=>setSearch(false)} onNav={nav}/>}

      {/* Mobile sidebar */}
      {menu && (
        <>
          <div onClick={()=>setMenu(false)} style={{ position:"fixed", inset:0, zIndex:48, background:"rgba(3,6,13,.75)", backdropFilter:"blur(4px)" }}/>
          <div style={{ position:"fixed", inset:"0 auto 0 0", width:272, zIndex:49, background:"#070d1a", borderRight:"1px solid rgba(0,212,170,.15)", overflowY:"auto" }} className="fade-up">
            <SidebarContent lang={lang} cur={page} onNav={nav}/>
          </div>
        </>
      )}

      <Header lang={lang} setLang={setLang} onSearch={()=>setSearch(true)} onMenu={()=>setMenu(m=>!m)} menuOpen={menu}/>

      <div style={{ display:"flex", flex:1 }}>
        {/* Desktop sidebar */}
        <aside className="lg-show" style={{ width:256, flexShrink:0, height:"calc(100vh - 58px)", position:"sticky", top:58, overflowY:"auto", background:"rgba(7,13,26,.85)", borderRight:"1px solid rgba(0,212,170,.12)" }}>
          <SidebarContent lang={lang} cur={page} onNav={nav}/>
        </aside>

        <main style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
          {page==="home"
            ? <HomePage lang={lang} onNav={nav}/>
            : <DocPage id={page} lang={lang} onNav={nav}/>
          }
          <Footer lang={lang} onNav={nav}/>
        </main>
      </div>
    </div>
  );
}
