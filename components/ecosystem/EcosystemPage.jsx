// Full Ecosystem Page component with filters and scrollable cards

import React, { useState } from 'react';

export const EcosystemPage = ({ lang = 'en' }) => {
  const T = (en, tr) => lang === 'tr' ? tr : en;

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'DeFi', 'Payments', 'Infrastructure', 'Trading', 'Wallets', 'Tools'];

  const projects = [
    {
      name: 'Aave',
      desc: 'Open Source Protocol for Non-Custodial Liquidity Markets',
      logo: 'https://assets.coingecko.com/coins/images/12645/large/AAVE.png',
      url: 'https://aave.com',
      category: 'DeFi'
    },
    {
      name: 'Axelar',
      desc: 'Decentralized network connecting blockchains',
      logo: 'https://assets.coingecko.com/coins/images/27277/large/V-65_xQ1_400x400.jpeg',
      url: 'https://axelar.network',
      category: 'Infrastructure'
    },
    // Add more projects from data
    {
      name: 'Copperx',
      desc: 'Stablecoin payments and global money movement',
      logo: '',
      url: 'https://copperx.io',
      category: 'Payments'
    },
    // ... (full list)
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: '2.5rem', color: '#f1f5f9', marginBottom: '8px' }}>
        {T('Ekosistem', 'Ecosystem')}
      </h1>
      <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '1.1rem' }}>
        {T('Projects building on Arc Network', 'Arc Network üzerinde geliştirilen projeler')}
      </p>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              border: activeCategory === cat ? '1px solid #00d4aa' : '1px solid #334155',
              background: activeCategory === cat ? 'rgba(0,212,170,0.1)' : 'transparent',
              color: activeCategory === cat ? '#00d4aa' : '#94a3b8',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scrollable Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredProjects.map((project, index) => (
          <div key={index} style={{
            border: '1px solid rgba(0,212,170,0.2)',
            borderRadius: '16px',
            background: 'rgba(7,13,26,0.8)',
            padding: '20px',
            transition: 'all 0.2s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              {project.logo ? (
                <img src={project.logo} alt={project.name} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'contain' }} />
              ) : (
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#00d4aa' }}>
                  {project.name[0]}
                </div>
              )}
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#f1f5f9' }}>{project.name}</h3>
                <span style={{ fontSize: '12px', color: '#00d4aa', background: 'rgba(0,212,170,0.1)', padding: '2px 10px', borderRadius: '999px' }}>
                  {project.category}
                </span>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px' }}>
              {project.desc}
            </p>
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#00d4aa',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}>
              Visit Website <span style={{ fontSize: '18px' }}>→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcosystemPage;
