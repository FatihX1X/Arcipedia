import Link from 'next/link';
import { ecosystemProjects } from './ecosystem-data';

const featured = ecosystemProjects.slice(0, 6);

export default function FeaturedDapps() {
  return (
    <section className="rounded-2xl border border-cyan-200/10 bg-[#071124]/80 p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Featured dApps</h2>
          <p className="text-sm text-slate-300">
            A snapshot of live builders on Arc Public Testnet.
          </p>
        </div>
        <Link
          href="/ecosystem"
          className="rounded-lg border border-cyan-300/40 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-400/20"
        >
          View ecosystem
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <Link
            key={project.name}
            href="/ecosystem"
            className="rounded-xl border border-cyan-200/10 bg-[#0b1426]/70 p-4 transition hover:border-cyan-300/30"
          >
            <div className="mb-2 flex items-center gap-2">
              <img
                src={project.logoUrl}
                alt={`${project.name} logo`}
                className="h-8 w-8 rounded-md border border-cyan-200/20"
              />
              <p className="font-medium text-slate-100">{project.name}</p>
            </div>
            <p className="text-sm text-slate-300">{project.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
