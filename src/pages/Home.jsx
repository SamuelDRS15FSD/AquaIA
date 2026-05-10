/**
 * Home.jsx — AquaIA Landing / Home Page
 *
 * Phase 0: Static placeholder.
 * Phase 2+: Will feature hero section, feature cards, and CTA.
 */

export default function Home() {
  return (
    <section className="page-container">
      <h1>🌱 Welcome to AquaIA</h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: '.5rem' }}>
        Smart irrigation intelligence for rural farmers.
      </p>

      <div className="card" style={{ marginTop: '2rem', maxWidth: '480px' }}>
        <p style={{ fontSize: '.875rem', color: 'var(--color-text-muted)' }}>
          📡 Phase 0 — Foundation scaffold. Full UI coming in Phase 2.
        </p>
      </div>
    </section>
  );
}
