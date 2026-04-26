import EcosystemPageClient from '@/components/ecosystem/ecosystem-page-client';

export const metadata = {
  title: 'Ecosystem — Projects on Arc Testnet',
};

export default function EcosystemPage() {
  return (
    <main className="min-h-screen bg-[#030712] px-4 py-14 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-10">
          <h1 className="mb-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Ecosystem
          </h1>
          <p className="mb-2 text-base text-cyan-100/90 sm:text-lg">
            Live projects and infrastructure building on Arc Public Testnet
          </p>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Updated April 2026 • Data from official Arc sources
          </p>
        </header>

        <EcosystemPageClient />
      </div>
    </main>
  );
}
