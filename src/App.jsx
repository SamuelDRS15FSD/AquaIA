/**
 * App.jsx — AquaIA Root Application Component
 *
 * Árbol de rutas con React Router v6.
 *
 * Estructura:
 *   /           → Home (público)
 *   /login      → Login (público — redirige a /dashboard si ya hay sesión)
 *   /register   → Register (público)
 *   /dashboard  → DashboardPage (protegida — requiere sesión)
 *
 * ProtectedRoute actúa como guard — redirige a /login si no hay sesión.
 */

import { Routes, Route, Navigate } from 'react-router-dom';

import Layout          from './components/Layout';
import ProtectedRoute  from './components/ProtectedRoute';

import Home            from './pages/Home';
import Login           from './pages/Login';
import Register        from './pages/Register';
import DashboardPage   from './pages/DashboardPage';

export default function App() {
  return (
    <Routes>
      {/* Layout envuelve todas las rutas — Navbar + main */}
      <Route path="/" element={<Layout />}>

        {/* Rutas públicas */}
        <Route index              element={<Home />} />
        <Route path="login"       element={<Login />} />
        <Route path="register"    element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>

        {/* Fallback — ruta no encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
