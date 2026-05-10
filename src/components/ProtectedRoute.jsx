/**
 * ProtectedRoute.jsx — AquaIA Route Guard
 *
 * Protege rutas que requieren sesión activa.
 *
 * Comportamiento:
 *   loading = true  → muestra spinner (Firebase verificando sesión)
 *   user = null     → redirige a /login
 *   user presente  → renderiza la ruta hija via <Outlet />
 *
 * Usado en App.jsx para envolver /dashboard (y rutas futuras protegidas).
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth }          from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Firebase tarda un tick en resolver la sesión inicial — mostrar spinner
  if (loading) {
    return (
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        minHeight:      '100dvh',
        flexDirection:  'column',
        gap:            '1rem',
        color:          'var(--color-text-muted)',
      }}>
        <div className="aquaia-spinner" aria-label="Cargando..." />
        <p style={{ fontSize: '.875rem' }}>Verificando sesión...</p>

        <style>{`
          .aquaia-spinner {
            width: 2.5rem;
            height: 2.5rem;
            border: 3px solid var(--color-border);
            border-top-color: var(--color-primary);
            border-radius: 50%;
            animation: spin .7s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  // Sin sesión → redirigir a login (replace para no romper el historial)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Sesión válida → renderizar contenido de la ruta protegida
  return <Outlet />;
}
