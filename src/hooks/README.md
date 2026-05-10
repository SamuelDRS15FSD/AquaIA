# AquaIA Hooks

This folder holds all custom React hooks.

## Planned hooks (by phase):

| Hook                    | Phase | Purpose                                          |
|-------------------------|-------|--------------------------------------------------|
| `useAuth.js`            | 1     | Firebase Auth state (user, loading, error)       |
| `useSensorData.js`      | 3     | Real-time sensor data from Firestore             |
| `useIrrigationSchedule.js` | 3  | Irrigation schedule CRUD                         |
| `useOfflineSync.js`     | 4     | Monitor connectivity, replay queued mutations    |
| `useAIRecommendation.js`| 5     | Fetch and cache AI irrigation recommendations    |

## Rules:
- Hooks are pure logic — no JSX
- Each hook has a single responsibility
- Hooks never import from `pages/`
