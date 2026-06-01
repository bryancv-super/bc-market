# BC Market

BC Market is a fullstack MVP for supermarket shopping lists. It lets users browse a catalog, filter products, create shopping lists, manage quantities, and handle account flows such as signup, login, password recovery, profile editing, and password changes.

The project is demo-friendly while still being prepared for PostgreSQL persistence through Prisma.

## Stack

- Next.js App Router and React
- Express API
- Prisma and PostgreSQL
- JWT authentication with hashed passwords
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

Install dependencies:

```bash
npm install
```

Create local environment files from the examples when needed:

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

Default local URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

## Useful Commands

```bash
npm run lint --workspace=frontend
npm run build --workspace=frontend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Seeded demo credentials:

- Email: `demo@bcmarket.com`
- Password: `Password123!`

## Environment

Common variables:

- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: Secret used to sign auth tokens.
- `NEXT_PUBLIC_API_URL`: Frontend API base URL.
- `PORT`: Backend server port.

## Documentation

More detail lives in `docs/`:

- Architecture: `docs/architecture/ARCHITECTURE.md`
- Deployment: `docs/deployment.md`
- Git workflow: `docs/git-workflow.md`
- Design specs and flows: `docs/design/` and `docs/diagrams/`
