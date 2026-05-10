/**
 * OfflineIndicator.jsx — AquaIA Connectivity Status
 * 
 * Muestra un indicador visual discreto cuando el usuario está offline.
 */

import { useOfflineStatus } from '../hooks/useOfflineStatus';

export default function OfflineIndicator() {
  const isOnline = useOfflineStatus();

  if (isOnline) return (
    <div className="connectivity-status online">
      <span className="dot"></span> Conectado
      <style>{`
        .connectivity-status.online {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #16a34a;
          background: #f0fdf4;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
        }
        .dot {
          width: 8px;
          height: 8px;
          background: #16a34a;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );

  return (
    <div className="connectivity-status offline">
      <span className="dot pulse"></span> Sin internet
      <style>{`
        .connectivity-status.offline {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #dc2626;
          background: #fef2f2;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          border: 1px solid #fee2e2;
        }
        .dot {
          width: 8px;
          height: 8px;
          background: #dc2626;
          border-radius: 50%;
        }
        .pulse {
          animation: pulse-animation 2s infinite;
        }
        @keyframes pulse-animation {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
