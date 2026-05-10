/**
 * Layout.jsx — AquaIA Base Page Layout
 *
 * Wraps all pages with:
 *   - <Navbar /> at the top
 *   - <main> content area with proper spacing
 *   - (footer placeholder for Phase 2)
 *
 * All routes render their page inside this Layout via React Router's <Outlet />.
 */

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="aquaia-layout">
      <Navbar />
      <main className="aquaia-layout__main">
        <Outlet />
      </main>
      {/* Footer — Phase 2 */}
    </div>
  );
}

// Scoped styles
const style = document.createElement('style');
style.textContent = `
  .aquaia-layout {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }
  .aquaia-layout__main {
    flex: 1;
    padding-block: 2rem;
    padding-inline: 1rem;
    max-width: 1200px;
    margin-inline: auto;
    width: 100%;
  }
`;
document.head.appendChild(style);
