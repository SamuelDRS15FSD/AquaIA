/**
 * Register.jsx — AquaIA Página de Registro
 *
 * UX Rural-First:
 *   - Solo email + password + confirmación
 *   - Mensajes claros en español
 *   - Botones grandes (min 48px)
 *   - Redirige a /dashboard tras registro exitoso
 *
 * Lógica: delegada a authService.js
 */

import { useState }              from 'react';
import { Link, useNavigate }     from 'react-router-dom';
import { registerWithEmail }     from '../services/authService';

export default function Register() {
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Validaciones locales antes de llamar a Firebase
    if (!email.trim())            { setError('Ingresa tu correo electrónico.'); return; }
    if (password.length < 6)      { setError('La contraseña debe tener al menos 6 caracteres.'); return; }
    if (password !== confirm)     { setError('Las contraseñas no coinciden.'); return; }

    setLoading(true);
    try {
      await registerWithEmail(email.trim(), password);
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
          <span style={{ fontSize: '3rem' }}>🌱</span>
          <h1 style={{ fontSize: '1.75rem', marginTop: '.5rem' }}>Crear cuenta</h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '.25rem', fontSize: '.9rem' }}>
            Regístrate para empezar a monitorear tus cultivos
          </p>
        </div>

        {/* Error */}
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

          {[
            { id: 'reg-email',    label: 'Correo electrónico', type: 'email',    value: email,    set: setEmail,    placeholder: 'tucorreo@ejemplo.com', auto: 'email' },
            { id: 'reg-password', label: 'Contraseña',         type: 'password', value: password, set: setPassword, placeholder: '••••••••',             auto: 'new-password' },
            { id: 'reg-confirm',  label: 'Confirmar contraseña', type: 'password', value: confirm, set: setConfirm, placeholder: '••••••••',              auto: 'new-password' },
          ].map(({ id, label, type, value, set, placeholder, auto }) => (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '.375rem' }}>
              <label htmlFor={id} style={{ fontWeight: '600', fontSize: '.9rem' }}>{label}</label>
              <input
                id={id}
                type={type}
                autoComplete={auto}
                placeholder={placeholder}
                value={value}
                onChange={(e) => set(e.target.value)}
                disabled={loading}
                style={{
                  padding:      '.875rem 1rem',
                  borderRadius: '.625rem',
                  border:       '1.5px solid var(--color-border)',
                  fontSize:     '1rem',
                  outline:      'none',
                  transition:   'border-color .2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={(e)  => (e.target.style.borderColor = 'var(--color-border)')}
              />
            </div>
          ))}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              marginTop: '.5rem',
              padding:   '1rem',
              fontSize:  '1rem',
              opacity:   loading ? .7 : 1,
              cursor:    loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Creando cuenta...' : '💧 Crear cuenta'}
          </button>
        </form>

        {/* Login link */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.9rem', color: 'var(--color-text-muted)' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
            Ingresar
          </Link>
        </p>
      </div>
    </section>
  );
}
