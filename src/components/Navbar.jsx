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

import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth }              from '../hooks/useAuth';
import { logout }               from '../services/authService';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Sincronización responsive: Cerrar menú si el viewport pasa a desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    const handleMediaChange = (e) => {
      if (e.matches) setIsOpen(false);
    };

    // Listener moderno para cambios de media query
    mediaQuery.addEventListener('change', handleMediaChange);
    
    // Verificación inicial por si ya estamos en desktop
    if (mediaQuery.matches) setIsOpen(false);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch {
      // Error silencioso
    }
  }

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="aquaia-navbar">
      <div className="aquaia-navbar__inner">

        {/* Brand */}
        <NavLink to="/" className="aquaia-navbar__brand" onClick={closeMenu}>
          <span className="aquaia-navbar__logo">💧</span>
          <span className="aquaia-navbar__title">AquaIA</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="aquaia-navbar__nav desktop-only" aria-label="Navegación principal">
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

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Abrir menú">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`mobile-sidebar ${isOpen ? 'open' : ''}`} 
        aria-hidden={!isOpen}
      >
        <nav className="mobile-sidebar__nav">
          <NavLink to="/" end className="mobile-nav-link" onClick={closeMenu}>Inicio</NavLink>
          {user && <NavLink to="/dashboard" className="mobile-nav-link" onClick={closeMenu}>Dashboard</NavLink>}
          {user && <NavLink to="/add-crop" className="mobile-nav-link" onClick={closeMenu}>Crear Lote</NavLink>}
          {user ? (
            <button onClick={() => { handleLogout(); closeMenu(); }} className="mobile-nav-link logout">Cerrar Sesión</button>
          ) : (
            <NavLink to="/login" className="mobile-nav-link" onClick={closeMenu}>Ingresar</NavLink>
          )}
        </nav>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={closeMenu} />}

      <style>{`
        .aquaia-navbar {
          position: sticky;
          top: 0;
          width: 100%;
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
          z-index: 102;
        }
        .aquaia-navbar__logo  { font-size: 1.5rem; }
        .aquaia-navbar__title { font-size: 1.25rem; font-weight: 700; color: var(--color-primary-dk); }
        
        .desktop-only { display: none; }
        @media (min-width: 768px) {
          .desktop-only { display: flex; align-items: center; gap: 1.25rem; }
          .mobile-toggle { display: none; }
        }

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

        .mobile-toggle {
          background: none;
          border: none;
          font-size: 1.75rem;
          color: var(--color-primary-dk);
          cursor: pointer;
          z-index: 102;
        }

        .mobile-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 280px;
          height: 100dvh;
          background: white;
          z-index: 101;
          transform: translateX(100%);
          visibility: hidden;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
          padding: 5rem 1.5rem 2rem;
          box-shadow: -4px 0 10px rgba(0,0,0,0.1);
          pointer-events: none;
        }
        .mobile-sidebar.open { 
          transform: translateX(0); 
          visibility: visible;
          pointer-events: auto;
        }
        .mobile-sidebar__nav { display: flex; flex-direction: column; gap: 1rem; }
        .mobile-nav-link {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text);
          text-decoration: none;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          transition: background 0.2s;
        }
        .mobile-nav-link:active { background: var(--color-bg); }
        .mobile-nav-link.logout { color: #dc2626; background: none; border: none; text-align: left; cursor: pointer; }
        
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.3);
          z-index: 100;
        }
      `}</style>
    </header>
  );
}
