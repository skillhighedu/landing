export default function CertificatesSkeleton() {
  return (
    <section className="bg-neutral-900 py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-60 rounded-xl bg-neutral-800 animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}
