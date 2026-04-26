import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Arc' },
  { href: '/developers', label: 'Developers' },
  { href: '/ecosystem', label: 'Ecosystem' },
  { href: '/glossary', label: 'Glossary' },
];

export default function SidebarNav() {
  return (
    <aside className="w-64 border-r border-cyan-200/10 bg-[#070d1a] p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
