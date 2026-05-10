/**
 * Login.jsx — AquaIA Página de Inicio de Sesión
 *
 * UX Rural-First:
 *   - Botones grandes (min 48px)
 *   - Texto claro, sin tecnicismos
 *   - Mensajes de error en español simple
 *   - Sin formularios complejos
 *
 * Lógica: delegada a authService.js
 * Estado: local únicamente (email, password, error, loading)
 */

import { useState }      from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithEmail }    from '../services/authService';

export default function Login() {
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Validación básica antes de llamar a Firebase
    if (!email.trim())    { setError('Ingresa tu correo electrónico.'); return; }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return; }

    setLoading(true);
    try {
      await loginWithEmail(email.trim(), password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ display: 'flex', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>💧</span>
          <h1 style={{ fontSize: '1.75rem', marginTop: '.5rem' }}>Bienvenido a AquaIA</h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '.25rem', fontSize: '.9rem' }}>
            Ingresa para ver el estado de tus cultivos
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div role="alert" style={{
            background:   '#fef2f2',
            border:       '1px solid #fecaca',
            borderRadius: '.5rem',
            padding:      '.75rem 1rem',
            marginBottom: '1rem',
            color:        '#b91c1c',
            fontSize:     '.9rem',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '.375rem' }}>
            <label htmlFor="login-email" style={{ fontWeight: '600', fontSize: '.9rem' }}>
              Correo electrónico
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                padding:      '.875rem 1rem',
                borderRadius: '.625rem',
                border:       '1.5px solid var(--color-border)',
                fontSize:     '1rem',
                outline:      'none',
                transition:   'border-color .2s',
              }}
              onFocus={(e)  => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={(e)   => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '.375rem' }}>
            <label htmlFor="login-password" style={{ fontWeight: '600', fontSize: '.9rem' }}>
              Contraseña
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                padding:      '.875rem 1rem',
                borderRadius: '.625rem',
                border:       '1.5px solid var(--color-border)',
                fontSize:     '1rem',
                outline:      'none',
                transition:   'border-color .2s',
              }}
              onFocus={(e)  => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={(e)   => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              marginTop:  '.5rem',
              padding:    '1rem',
              fontSize:   '1rem',
              opacity:    loading ? .7 : 1,
              cursor:     loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Ingresando...' : '🌱 Ingresar'}
          </button>
        </form>

        {/* Register link */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.9rem', color: 'var(--color-text-muted)' }}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
            Crear cuenta
          </Link>
        </p>
      </div>
    </section>
  );
}
