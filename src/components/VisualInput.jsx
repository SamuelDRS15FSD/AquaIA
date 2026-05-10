/**
 * VisualInput.jsx — AquaIA Rural-First Input
 *
 * Minimiza la escritura manual usando selectores visuales grandes.
 * Diseñado para ser usable con manos sucias o bajo luz solar intensa.
 *
 * Props:
 *   label: Título del input
 *   options: Array de objetos { value, label, icon }
 *   value: Valor actual
 *   onChange: Callback al cambiar
 */

export default function VisualInput({ label, options, value, onChange }) {
  return (
    <div className="visual-input">
      <label className="visual-input__label">{label}</label>
      <div className="visual-input__grid">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`visual-input__btn ${value === opt.value ? 'active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            <span className="visual-input__icon">{opt.icon}</span>
            <span className="visual-input__btn-label">{opt.label}</span>
          </button>
        ))}
      </div>

      <style>{`
        .visual-input {
          margin-bottom: 1.5rem;
        }
        .visual-input__label {
          display: block;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--color-text);
          font-size: 1rem;
        }
        .visual-input__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          gap: 0.75rem;
        }
        .visual-input__btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 0.5rem;
          background: white;
          border: 2px solid var(--color-border);
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 100px;
        }
        .visual-input__btn:hover {
          border-color: var(--color-primary);
          background: var(--color-bg);
        }
        .visual-input__btn.active {
          border-color: var(--color-primary);
          background: #e0f2fe; /* sky-100 */
          box-shadow: 0 0 0 2px var(--color-primary);
        }
        .visual-input__icon {
          font-size: 2rem;
        }
        .visual-input__btn-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-align: center;
          color: var(--color-text-muted);
        }
        .visual-input__btn.active .visual-input__btn-label {
          color: var(--color-primary-dk);
        }
      `}</style>
    </div>
  );
}
