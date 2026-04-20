# AGENTS.md

## Repo shape
- This repo has two separate apps: `frontend/` and `backend/`.
- The active UI work is in `frontend/` (React 19 + Vite 8 + Tailwind v4).
- `backend/` is a separate .NET 8 Web API solution (`backend/Bara-bara-watch.sln`) and is still the default weather-forecast scaffold with Swagger enabled in development.
- There is no root `package.json`. Run Node commands from `frontend/`, not the repo root.

## Frontend commands
- Install deps: `npm install` in `frontend/`
- Dev server: `npm run dev` in `frontend/`
- Lint: `npm run lint` in `frontend/`
- Build/typecheck: `npm run build` in `frontend/` (`tsc -b && vite build`)

## Frontend gotchas
- Keep Vite/Tailwind packages installed in `frontend/` only. Mixing a root-level `package.json` with `frontend/` causes duplicate Vite type resolution and breaks `frontend/vite.config.ts` typings.
- TypeScript is strict about unused code: `frontend/tsconfig.app.json` and `frontend/tsconfig.node.json` enable `noUnusedLocals` and `noUnusedParameters`. Unused vars fail `npm run build`, not just lint.
- Current verified frontend failures are in `frontend/src/App.tsx`: unused `streams`, `handleSearch`, and `handleAddStreams` block both `npm run lint` and `npm run build`.

## Frontend structure
- Frontend entrypoint is `frontend/src/main.tsx`, which imports the single global stylesheet `frontend/src/index.css`.
- `frontend/src/App.tsx` is the shared state entrypoint for the watch UI.
- `frontend/src/components/Watchroom.tsx` owns watchroom-level UI such as fullscreen and overlay controls.
- `frontend/src/components/StreamSlotGrid.tsx` is where stream-count-dependent layout logic belongs (`0/1/2/3/4` cases).
- `frontend/src/components/StreamSlot.tsx` should stay simple and fill the wrapper it is given; layout sizing belongs in the grid/wrapper components.
- Stream data shape currently lives in `frontend/src/types/stream.ts` as `StreamInfo` with `id`, `title`, and `url`.

## Backend commands
- Run API from `backend/`: `dotnet run --project src/Barabara.Api`
- Dev launch settings expose Swagger at `http://localhost:5091/swagger` or `https://localhost:7296/swagger`.

## What is not here yet
- No tests, CI workflows, formatter config, or pre-commit config were found.
- Search/add-stream flow is still scaffold-stage; some components exist as placeholders (`SearchResultModal`, layout/settings flows) and may not be wired into `App.tsx` yet.
