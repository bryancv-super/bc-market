# BC Market Deployment

## Targets

- Frontend: Vercel
- Database: Neon PostgreSQL
- Backend: Node-capable host with persistent filesystem, or object storage if deployed serverless

## Neon Setup

1. Create a Neon PostgreSQL project.
2. Copy the pooled connection string.
3. Set `DATABASE_URL` in the backend environment.
4. Run:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

The seed creates `demo@bcmarket.com` with password `password123`, product categories, products, and one starter shopping list.

## Vercel Frontend Setup

1. Import the repo in Vercel.
2. Set the frontend root directory to `apps/frontend`.
3. Add `NEXT_PUBLIC_API_URL` pointing to the deployed backend API base URL, for example:

```env
NEXT_PUBLIC_API_URL=https://your-backend.example.com/api
```

4. Build with the default Next.js settings.

## Backend Setup

The current backend is an Express app with Multer local avatar uploads.

Required variables:

```env
DATABASE_URL=
JWT_SECRET=
PORT=3001
```

Use a Node hosting target that supports persistent upload storage, or replace avatar storage with object storage before deploying as serverless functions.
