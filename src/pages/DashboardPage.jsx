/**
 * DashboardPage.jsx — AquaIA Irrigation Dashboard
 *
 * Phase 0: Static placeholder.
 * Phase 2: Will display sensor cards, irrigation schedules, status indicators.
 * Phase 3: Will include full irrigation engine controls.
 * Phase 6: Charts & historical data.
 */

export default function DashboardPage() {
  return (
    <section className="page-container">
      <h1>📊 Dashboard</h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: '.5rem' }}>
        Irrigation control center.
      </p>

      <div className="card" style={{ marginTop: '2rem', maxWidth: '480px' }}>
        <p style={{ fontSize: '.875rem', color: 'var(--color-text-muted)' }}>
          🔧 Phase 0 — Dashboard UI coming in Phase 2. Irrigation logic in Phase 3.
        </p>
      </div>
    </section>
  );
}
