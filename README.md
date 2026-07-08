# Memory-Pendant

Frontend prototype for the Zentro Memory Pendant, a dementia care AI pendant system.

## What Is Included

- Landing page at `/memory-pendant`
- Staff dashboard at `/memory-pendant/dashboard`
- Patient detail pages at `/memory-pendant/patient/[id]`
- Simulator at `/memory-pendant/simulator`
- Mock API adapter layer in `lib/memory-pendant/api.ts`
- Typed mock data for patients, pendant devices, alerts, memory modules, reminders, and voice responses

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/memory-pendant`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Backend Integration

The frontend does not connect directly to the real backend yet. API calls are routed through `lib/memory-pendant/api.ts`, which currently uses mock data and includes TODO comments for future Zentro backend fetch calls.
