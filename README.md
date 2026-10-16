# Yogi Astro

A responsive Vedic consultation website built with React, TypeScript, Next.js-compatible App Router source, Tailwind CSS 4, Motion and Vercel AI SDK. The original Vinext/Cloudflare adapter and hosting integration are retained.

## Start locally

Requires Node.js **22.13.0 or later** and **pnpm 11.25.0**.

```sh
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Open the local address printed in the terminal (normally `http://localhost:5173`). Run these commands from the extracted `yogi-astro` folder. They also apply in Windows PowerShell; the Linux-specific `install:ci` helper is not needed for ordinary Windows installation.

The website works in preview mode without credentials. To configure integrations, copy `.env.example` to `.env` and populate only the services you use. Never put server keys into browser code.

## Commands

| Command             | Purpose                                                         |
| ------------------- | --------------------------------------------------------------- |
| `pnpm dev`          | Run the development server.                                     |
| `pnpm build`        | Create the production build with the existing runtime.          |
| `pnpm start`        | Serve the built Cloudflare worker locally; run the build first. |
| `pnpm typecheck`    | Check TypeScript without emitting files.                        |
| `pnpm lint`         | Run the existing ESLint rules.                                  |
| `pnpm test`         | Run booking input validation regression tests.                  |
| `pnpm format`       | Format application code and project documentation.              |
| `pnpm format:check` | Check application formatting.                                   |
| `pnpm db:generate`  | Run the existing Drizzle generation command.                    |

## Refactor and requested visual changes

- Replaced the single compressed page with section components, feature folders, hooks, typed interfaces, booking validation and server handlers.
- Split booking preferences, contact details and summary into separate components.
- Added formatting conventions, regression tests and maintenance documentation.
- Replaced the left photograph in **Thirumana Porutham** with the supplied `wedding.png`, preserving the frame, crop rules and dimensions.
- Replaced that section's three numbered markers with **🪔**.
- Replaced the three numbered markers in **A Simple Way to Begin** with **🪷**.

The remaining content, class names, palette, responsive breakpoints, animations, API routes and request behavior are preserved. Emoji appearance depends on the operating system's emoji font.

See [Architecture](docs/ARCHITECTURE.md) for folder responsibilities.

## Booking and optional integrations

Bookings are requests, not confirmed appointments. The booking form validates the visitor's details and opens WhatsApp with a pre-filled message to the number in `src/features/booking/config.ts`. Nothing is stored on the server.

For optional AI, set `AI_ENABLED`, `GOOGLE_GENERATIVE_AI_API_KEY` and `AI_MODEL`. AI calls retain the existing Sites identity requirement. Current AI throttling is in-memory per worker.

Fees, actual availability and business policies must be supplied separately. No admin dashboard, database, payment flow or new authentication provider is included. A deployment outside the existing hosting environment requires its own identity and hosting adaptation.

## Source package

The ZIP contains application source, public assets, environment example, configuration, dependency lockfile, runtime adapters, tests and documentation. Generated dependencies, build output, caches and local credentials are excluded. Run `pnpm install --frozen-lockfile` after extraction.
