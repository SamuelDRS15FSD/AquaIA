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
