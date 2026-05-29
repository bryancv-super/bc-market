# BC Market

BC Market is a demo-first fullstack MVP for supermarket shopping lists. It includes a Next.js frontend, an Express API, mock/in-memory data for reliable demos, and a Prisma schema prepared for PostgreSQL persistence.

## Stack

- Next.js App Router
- React
- Express
- JWT authentication
- Multer avatar uploads
- Prisma schema for PostgreSQL
- npm workspaces

## Project Structure

```plaintext
apps/
  frontend/
  backend/
docs/
prisma/
```

## Getting Started

```bash
npm install
```

Create local env files from the examples when needed:

```bash
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

Run both apps:

```bash
npm run dev
```

Run each app separately:

```bash
npm run dev:frontend
npm run dev:backend
```

Default URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

## MVP Features

- Auth screens for login, signup, recover password, reset password, profile, edit profile, and change password.
- Shopping catalog with search, category filtering, loading and empty states.
- Shopping list flows for creating lists, adding products, checking items, editing quantities, removing items, and delete confirmations.
- Express API skeleton for health, auth, profile, products, lists, and avatar upload.
- Frontend API service layer using `NEXT_PUBLIC_API_URL` with mock fallback for demo stability.

## Backend API

Base path: `http://localhost:3001/api`

- `GET /health`
- `GET /products`
- `GET /products/:id`
- `GET /lists`
- `POST /lists`
- `GET /lists/:id`
- `POST /lists/:id/items`
- `PATCH /lists/:id/items/:itemId`
- `DELETE /lists/:id/items/:itemId`
- `DELETE /lists/:id`
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/recover-password`
- `POST /auth/reset-password`
- `GET /auth/me`
- `POST /auth/change-password`
- `GET /profile`
- `PATCH /profile`
- `POST /profile/avatar` with field name `avatar`

## Validation

```bash
npm run lint --workspace=frontend
npm run build --workspace=frontend
```

## Database Setup

BC Market is prepared for Neon PostgreSQL through Prisma.

```bash
set DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Seeded demo credentials:

- Email: `demo@bcmarket.com`
- Password: `password123`

Backend smoke checks can be run against:

```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/products
curl http://localhost:3001/api/lists
```

## Hosting Notes

- Frontend target: Vercel.
- Database target: Neon PostgreSQL.
- Backend target: Node-capable hosting while avatar uploads use local filesystem storage.
- Required frontend variable: `NEXT_PUBLIC_API_URL`.
- Required backend variables: `DATABASE_URL`, `JWT_SECRET`, `PORT`.

## Delivery Notes

The MVP now supports PostgreSQL persistence through Prisma. Avatar uploads still use backend local filesystem storage, so backend hosting should provide persistent disk or be paired with object storage before serverless deployment.

Git workflow documentation is available in `docs/git-workflow.md`.
