# AquaIA Business Logic

This folder holds all non-UI business logic (pure JS functions).

## Planned modules (by phase):

| File                       | Phase | Purpose                                              |
|----------------------------|-------|------------------------------------------------------|
| `irrigationCalculator.js`  | 3     | Compute irrigation volumes from sensor readings      |
| `scheduleEngine.js`        | 3     | Generate and validate irrigation schedules           |
| `alertRules.js`            | 7     | Define threshold rules for moisture / temp alerts    |
| `climateAdapter.js`        | 7     | Adjust schedules based on climate mode               |
| `dataTransformers.js`      | 6     | Normalize sensor data for charts                     |

## Rules:
- No React imports — pure functions only
- Each function is independently testable
- No direct API calls — those belong in `services/`
