# Yogi Astro

A responsive Vedic consultation website built with React, TypeScript, Next.js-compatible App Router source, Tailwind CSS 4, Motion, Supabase and Vercel AI SDK. The original Vinext/Cloudflare adapter and hosting integration are retained.

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

See [Architecture](docs/ARCHITECTURE.md) for folder responsibilities and [Verification](docs/VERIFICATION.md) for checks and limitations.

## Booking and optional integrations

Bookings are requests, not confirmed appointments. Without configuration, visitors can review and copy their details; nothing is submitted. With Supabase enabled, the server returns a reference only after a successful database write.

1. Run `supabase/schema.sql` in your own Supabase project.
2. Set the Supabase server variables in `.env.example`. Enable `BOOKINGS_ENABLED` only when an operator can monitor and respond to requests. The existing code does not send notifications.
3. For optional AI, set `AI_ENABLED`, `GOOGLE_GENERATIVE_AI_API_KEY` and `AI_MODEL`. AI calls retain the existing Sites identity requirement. Current AI throttling is in-memory per worker.
4. Razorpay helpers remain inactive: there is no checkout, payment collection or booking confirmation flow.

Fees, actual availability, contact details and business policies must be supplied separately. No admin dashboard or new authentication provider has been introduced. A deployment outside the existing hosting environment requires its own identity and hosting adaptation.

## Source package

The ZIP contains application source, public assets, environment example, configuration, dependency lockfile, database SQL, runtime adapters, tests and documentation. Generated dependencies, build output, caches and local credentials are excluded. Run `pnpm install --frozen-lockfile` after extraction.
