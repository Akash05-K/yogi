# Code architecture

The project retains its original Next.js-compatible App Router, Vinext/Cloudflare runtime, React, TypeScript, Motion and Tailwind stack. The refactor introduces feature boundaries without changing routes, DOM wrappers, styling rules or the booking contract.

## Directory responsibilities

| Location                           | Responsibility                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `src/app/page.tsx`                 | Thin route that renders the home page.                                                                              |
| `src/app/layout.tsx`               | Document shell and search metadata.                                                                                 |
| `src/app/globals.css`              | Original theme, component rules and responsive breakpoints, reformatted for readability. Cascade order is retained. |
| `src/app/api/`                     | HTTP entry points; booking and chat delegate to feature handlers.                                                   |
| `src/features/home/`               | Page composition, individual marketing sections and service/FAQ content.                                            |
| `src/features/booking/components/` | Booking introduction, two form steps, date label and request summary dialog.                                        |
| `src/features/booking/hooks/`      | Booking state, step navigation, request submission and copy-summary text.                                           |
| `src/features/booking/schema.ts`   | Shared server-side booking input validation.                                                                        |
| `src/features/booking/server/`     | Origin checks, date validation and database request handling.                                                       |
| `src/features/consultation-guide/` | Guide dialog, static responses, streaming chat state, server handler and AI instructions.                           |
| `src/components/layout/`           | Brand, header, footer and mobile booking bar.                                                                       |
| `src/components/shared/`           | Reveal animation and connector error UI.                                                                            |
| `src/components/ui/`               | Existing shadcn UI primitives, retained for compatibility.                                                          |
| `src/hooks/use-service-status.ts`  | One status request shared by booking and chat.                                                                      |
| `src/lib/server/`                  | Supabase, inactive Razorpay, ChatGPT auth and connector adapters.                                                   |
| `src/lib/utils.ts`                 | Shared utilities.                                                                                                   |
| `public/`                          | Static images and icons; the supplied wedding photograph is `images/wedding.png`.                                   |
| `supabase/`                        | Existing database SQL, policies and request throttling.                                                             |
| `build/`, `scripts/`, `.openai/`   | Existing runtime, hosting and build integration. `build/` contains source files, not generated output.              |
| `tests/`                           | Booking validation regression tests.                                                                                |
| `docs/`                            | Architecture and verification notes.                                                                                |

## Component and data flow

1. The route renders `HomePage`.
2. `useServiceStatus` loads the original `/api/status` response once.
3. `useBooking` owns the booking state shared by service CTAs, form steps and summary dialog. Keeping this state at the page level preserves the original state when users navigate between sections.
4. Marketing sections receive only the actions they need. They retain the original HTML structure, class names, text and animation settings.
5. `ConsultationGuide` owns its dialog and chat state. Static answers remain available when AI is disabled.
6. API route files delegate to server handlers. Validation, environment flags, authentication, throttling, database RPC parameters, HTTP statuses and response wording are unchanged.

## Contributor conventions

- Keep route files small and put domain behavior in the relevant feature.
- Use named exports for reusable components and hooks; framework route components retain default exports.
- Keep server handlers under `server/`; never import them from client components.
- Prefer existing UI primitives and global classes when extending a feature.
- Use `@/` for cross-feature imports and relative paths within a feature.
- Run type checking, linting, tests, formatting checks and the build before delivery.
- Preserve the CSS cascade when changing style organization. The current global stylesheet is deliberately kept together to avoid cascade regressions.
- Keep secrets in local environment files. Include `.env.example`, not credentials.

## Intentional compatibility decisions

The hosting adapter, connector infrastructure, database examples, lockfile, original image assets and existing UI primitives remain available. They have not been removed merely because the landing page does not import all of them. Changing the hosting framework, enabling checkout, or redesigning the booking flow would be a separate task.
