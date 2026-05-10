# AquaIA PWA

This folder will hold Progressive Web App configuration files.

## Planned for Phase 4 (Offline & Sync):

- `manifest.json`     — PWA manifest (name, icons, theme color, display mode)
- `sw.js`             — Service Worker (cache strategies, background sync)
- `offlineStore.js`   — IndexedDB abstraction for local-first data persistence
- `syncQueue.js`      — Sync queue manager for offline mutation replay

## Architecture notes:

- Strategy: Cache-first for static assets, Network-first for sensor data
- Offline fallback: serve last known dashboard data from IndexedDB
- Sync: Firestore writes queued locally and replayed when connection is restored
