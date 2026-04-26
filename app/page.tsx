import FeaturedDapps from '@/components/ecosystem/featured-dapps';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#030712] px-4 py-12 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <section>
          <h1 className="text-4xl font-semibold text-white">Arcipedia</h1>
          <p className="mt-2 text-slate-300">
            The knowledge base for Arc builders and ecosystem participants.
          </p>
        </section>

        <FeaturedDapps />
      </div>
    </main>
  );
}
