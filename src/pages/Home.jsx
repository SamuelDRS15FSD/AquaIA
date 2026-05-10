import { Link } from 'react-router-dom';

/**
 * Home.jsx — AquaIA Welcome & Educational Hub
 *
 * Pantalla de inicio rediseñada para ser útil y educativa desde el primer momento.
 * Enfocada en el usuario rural con consejos estáticos y acceso rápido.
 */

const EDUCATIONAL_TIPS = [
  {
    id: 'nino',
    title: 'Fenómeno del Niño',
    icon: '☀️',
    desc: 'Días de mucho calor. Riega temprano en la mañana o al atardecer para que el agua no se evapore rápido.'
  },
  {
    id: 'nina',
    title: 'Fenómeno de La Niña',
    icon: '🌧️',
    desc: 'Mucha lluvia y humedad. Revisa que el agua no se encharque en tus plantas para evitar que las raíces se pudran.'
  },
  {
    id: 'humedad',
    title: 'Humedad del Suelo',
    icon: '🌱',
    desc: 'Tocar la tierra te dice mucho. Si se siente fresca y se pega un poco a los dedos, el nivel de agua es bueno.'
  },
  {
    id: 'ahorro',
    title: 'Cosecha de Agua',
    icon: '🌧️',
    desc: 'Recoge agua de lluvia en tanques o canecas. Es la mejor reserva para los días de sol intenso.'
  },
  {
    id: 'salud',
    title: 'Salud del Cultivo',
    icon: '🍂',
    desc: 'Si las hojas están caídas o amarillas, el cultivo tiene sed. No esperes a que la tierra esté totalmente seca.'
  }
];

export default function Home() {
  return (
    <div className="home-container">
      {/* Sección Hero / Bienvenida */}
      <section className="hero-section">
        <div className="hero-badge">Tecnología para el Campo</div>
        <h1 className="hero-title">Riego inteligente para tus cultivos</h1>
        <p className="hero-subtitle">
          AquaIA te ayuda a monitorear la humedad de tu lote y te da consejos prácticos para cuidar mejor tus plantas y ahorrar agua.
        </p>
        
        <div className="hero-actions">
          <Link to="/dashboard" className="btn-primary">
            🌱 Mis cultivos
          </Link>
          <Link to="/register" className="btn-secondary">
            Crear cuenta nueva
          </Link>
        </div>
      </section>

      {/* Sección Educativa */}
      <section className="educational-section">
        <h2 className="section-title">💡 Consejos para tu día a día</h2>
        <div className="tips-grid">
          {EDUCATIONAL_TIPS.map(tip => (
            <div key={tip.id} className="tip-card">
              <div className="tip-card__icon">{tip.icon}</div>
              <div className="tip-card__content">
                <h3 className="tip-card__title">{tip.title}</h3>
                <p className="tip-card__desc">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .home-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem 0 4rem;
        }
        .hero-section {
          text-align: center;
          padding: 3rem 1.5rem;
          background: white;
          border-radius: 2rem;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
          margin-bottom: 3rem;
          border: 1px solid var(--color-border);
        }
        .hero-badge {
          display: inline-block;
          background: #ecfdf5;
          color: #059669;
          font-weight: 800;
          font-size: 0.75rem;
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }
        .hero-title {
          font-size: 2.5rem;
          line-height: 1.1;
          color: var(--color-text);
          margin-bottom: 1.25rem;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
          font-weight: 500;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-secondary {
          padding: 1rem 2rem;
          background: #f1f5f9;
          color: var(--color-text);
          border-radius: 1rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background: #e2e8f0;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          padding-left: 0.5rem;
          color: var(--color-text);
        }
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .tip-card {
          background: white;
          padding: 1.5rem;
          border-radius: 1.5rem;
          border: 1px solid var(--color-border);
          display: flex;
          gap: 1.25rem;
          transition: transform 0.2s;
        }
        .tip-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
        }
        .tip-card__icon {
          font-size: 2rem;
          flex-shrink: 0;
        }
        .tip-card__title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: var(--color-text);
        }
        .tip-card__desc {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin: 0;
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2rem;
          }
          .hero-section {
            padding: 2rem 1rem;
          }
          .hero-actions .btn-primary,
          .hero-actions .btn-secondary {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
