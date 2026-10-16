# Code architecture

The project retains its original Next.js-compatible App Router, Vinext/Cloudflare runtime, React, TypeScript, Motion and Tailwind stack. The refactor introduces feature boundaries without changing routes, DOM wrappers, styling rules or the booking contract.

## Directory responsibilities

| Location                           | Responsibility                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `src/app/page.tsx`                 | Thin route that renders the home page.                                                                              |
| `src/app/layout.tsx`               | Document shell and search metadata.                                                                                 |
| `src/app/globals.css`              | Original theme, component rules and responsive breakpoints, reformatted for readability. Cascade order is retained. |
| `src/app/api/`                     | HTTP entry points: `/api/status` and `/api/chat`, which delegates to the consultation guide handler.                |
| `src/features/home/`               | Page composition, individual marketing sections and service/FAQ content.                                            |
| `src/features/booking/components/` | Booking introduction, two form steps, date label and request summary dialog.                                        |
| `src/features/booking/hooks/`      | Booking state, step navigation, WhatsApp message building and copy-summary text.                                    |
| `src/features/booking/schema.ts`   | Booking input validation.                                                                                           |
| `src/features/consultation-guide/` | Guide dialog, static responses, streaming chat state, AI status hook, server handler and AI instructions.           |
| `src/components/layout/`           | Brand, header, footer and mobile booking bar.                                                                       |
| `src/components/shared/`           | Reveal animation.                                                                                                   |
| `src/components/ui/`               | shadcn UI primitives used by the site (`button`, `dialog`) and the vendored shadcn stylesheet.                      |
| `src/lib/server/`                  | ChatGPT auth, connector adapters, Cloudflare env types and the optional D1 database (`db/`).                        |
| `src/lib/utils.ts`                 | Shared utilities.                                                                                                   |
| `public/`                          | Static images and icons; the supplied wedding photograph is `images/wedding.png`.                                   |
| `scripts/`, `.openai/`             | Runtime, hosting and build integration. `scripts/build/` contains source files, not generated output.               |
| `tests/`                           | Booking validation regression tests.                                                                                |
| `docs/`                            | Architecture and verification notes.                                                                                |

## Component and data flow

1. The route renders `HomePage`.
2. `useServiceStatus` loads the `/api/status` response once to learn whether AI chat is enabled.
3. `useBooking` owns the booking state shared by service CTAs, form steps and summary dialog, and builds the WhatsApp request message. Keeping this state at the page level preserves the original state when users navigate between sections.
4. Marketing sections receive only the actions they need. They retain the original HTML structure, class names, text and animation settings.
5. `ConsultationGuide` owns its dialog and chat state. Static answers remain available when AI is disabled.
6. API route files delegate to server handlers. Validation, environment flags, authentication, throttling, HTTP statuses and response wording are unchanged.

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

The hosting adapter, connector infrastructure, optional D1 database scaffolding and lockfile remain because the build and Sites runtime depend on them. Supabase, Razorpay, the server booking endpoint and unused UI primitives and images have been removed. Changing the hosting framework or adding checkout would be a separate task.
