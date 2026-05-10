/**
 * Navbar.jsx — AquaIA Top Navigation Bar
 *
 * Muestra:
 *   - Brand (logo + nombre)
 *   - Links de navegación
 *   - Botón "Cerrar sesión" si hay usuario activo (Phase 1+)
 *   - Link "Ingresar" si no hay sesión
 *
 * Phase 1: auth integrado via useAuth + logout
 * Phase 2: menú hamburguesa móvil
 */

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth }              from '../hooks/useAuth';
import { logout }               from '../services/authService';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch {
      // Error silencioso — no bloquear UX si el logout falla
    }
  }

  return (
    <header className="aquaia-navbar">
      <div className="aquaia-navbar__inner">

        {/* Brand */}
        <NavLink to="/" className="aquaia-navbar__brand">
          <span className="aquaia-navbar__logo">💧</span>
          <span className="aquaia-navbar__title">AquaIA</span>
        </NavLink>

        {/* Navigation */}
        <nav className="aquaia-navbar__nav" aria-label="Navegación principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? 'aquaia-nav-link active' : 'aquaia-nav-link'}
          >
            Inicio
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => isActive ? 'aquaia-nav-link active' : 'aquaia-nav-link'}
            >
              Dashboard
            </NavLink>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="aquaia-nav-logout"
              aria-label="Cerrar sesión"
            >
              Salir
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? 'aquaia-nav-link active' : 'aquaia-nav-link'}
            >
              Ingresar
            </NavLink>
          )}
        </nav>
      </div>

      <style>{`
        .aquaia-navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--color-border);
          height: var(--nav-height);
        }
        .aquaia-navbar__inner {
          max-width: 1200px;
          margin-inline: auto;
          padding-inline: 1rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .aquaia-navbar__brand {
          display: flex;
          align-items: center;
          gap: .5rem;
          text-decoration: none;
        }
        .aquaia-navbar__logo  { font-size: 1.5rem; }
        .aquaia-navbar__title { font-size: 1.25rem; font-weight: 700; color: var(--color-primary-dk); }
        .aquaia-navbar__nav   { display: flex; align-items: center; gap: 1.25rem; }

        .aquaia-nav-link {
          font-weight: 500;
          font-size: .95rem;
          color: var(--color-text-muted);
          transition: color .2s;
          text-decoration: none;
        }
        .aquaia-nav-link:hover,
        .aquaia-nav-link.active { color: var(--color-primary); }

        .aquaia-nav-logout {
          font-weight: 500;
          font-size: .95rem;
          color: var(--color-text-muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color .2s;
        }
        .aquaia-nav-logout:hover { color: #dc2626; }
      `}</style>
    </header>
  );
}
