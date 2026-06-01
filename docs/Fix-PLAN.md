# Plan: Stabilize Auth/Profile UX, Then Deploy With Neon PostgreSQL

## Summary

Prioridad 1 será corregir los flujos que afectan navegación, sesión y perfil. Prioridad 2 será conectar Prisma a PostgreSQL real en Neon, poblar datos iniciales y reemplazar el backend in-memory. Prioridad 3 será preparar hosting en Vercel con variables de entorno y documentación de despliegue.

## Key Changes

### Priority 1: App UX And Auth Session Fixes

- Change root route `/` to redirect to `/login`, not `/home`.
- Add a client-side auth session helper for:
  - `getStoredUser()`
  - `getStoredToken()`
  - `updateStoredUser(user)`
  - `clearAuthSession()`
  - optional `isAuthenticated()`
- Update `/cuenta` to use the logged-in user from `localStorage` first, then `/api/profile` when token exists, instead of `mockUser`.
- Make `Cerrar sesion` clear auth session and redirect to `/login`.
- Make `/cuenta/editar` a real client form:
  - load current user from stored session/API
  - save name changes through `PATCH /api/profile`
  - update `localStorage` after success
  - show loading/error/success feedback
- Make `Cambiar foto de perfil` open a hidden file input and upload with `POST /api/profile/avatar` using field name `avatar`.
- After avatar upload, update visible profile avatar and stored user.
- Remove the unnecessary `Actualizar` button from `/listas`.
- Make the brand/logo in the header link to `/home`.
- Make the brand/profile header behave like a sticky navbar on app pages:
  - use `position: sticky; top: 0; z-index`
  - ensure content spacing still looks right under the navbar
  - keep auth pages unchanged unless they use the same app header.

### Priority 2: Real Database With Neon And Prisma

- Use Neon PostgreSQL as the hosted database.
- Add Prisma client dependency and generate client.
- Create Prisma migrations from the existing schema.
- Replace backend in-memory auth/profile/products/lists services with Prisma-backed services.
- Keep the same public API contracts currently exposed:
  - `/api/auth/signup`
  - `/api/auth/login`
  - `/api/profile`
  - `/api/profile/avatar`
  - `/api/products`
  - `/api/lists`
- Add a Prisma seed script using current mock catalog/list data.
- Seed:
  - product categories
  - products
  - one demo user: `demo@bcmarket.com`
  - password: `password123`
  - one starter shopping list for that user
- Store password hashes with `bcryptjs`.
- Keep avatar files local for now if backend is hosted as a Node service; if using Vercel serverless for backend, switch avatar storage plan before implementation because local filesystem uploads are not durable there.

### Priority 3: Hosting On Vercel + Neon

- Host the frontend on Vercel.
- Use Neon for `DATABASE_URL`.
- Configure environment variables:
  - `NEXT_PUBLIC_API_URL`
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `PORT` only for local/backend runtime where applicable
- Because the backend is Express, use one of these implementation defaults:
  - Preferred: deploy backend as a separate Vercel serverless API project only if Express routing and avatar upload are adapted for serverless limits.
  - Safer default: deploy frontend on Vercel and backend on a Node-friendly host later if avatar persistence must remain file-based.
- For this implementation pass, prepare Vercel docs/config for frontend + Neon, and clearly document backend hosting requirements if the Express server remains separate.

## Test Plan

- Frontend:
  - `npm run lint --workspace=frontend`
  - `npm run build --workspace=frontend`
  - verify `/` opens login
  - login redirects to `/home`
  - account page shows logged-in user, not default mock user
  - edit profile saves and persists after refresh
  - logout clears session and returns to login
  - logo routes to `/home`
  - lists page no longer shows `Actualizar`
- Backend:
  - `npx prisma validate`
  - run migration against Neon/local Postgres
  - run seed script
  - smoke test signup, login, profile update, avatar upload, products, lists
- Deployment:
  - verify Vercel build succeeds
  - verify frontend can call backend API via `NEXT_PUBLIC_API_URL`
  - verify Neon data appears through API responses

## Assumptions

- Hosting choice is Vercel + Neon.
- Database work should fully connect Prisma to PostgreSQL, not merely create a populated database.
- Demo seed credentials will be `demo@bcmarket.com` / `password123`.
- No custom domain is required in this pass.
- `docs/PLAN.md` remains untracked unless explicitly requested later.
