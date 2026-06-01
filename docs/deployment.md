# BC Market Deployment

## Targets

- Frontend + API: Vercel
- Database: Neon PostgreSQL
- Avatar storage: Vercel Blob
- Email delivery: Resend

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

## Vercel Setup

1. Import the repo in Vercel.
2. Set the frontend root directory to `apps/frontend`.
3. Add the environment variables:

```env
DATABASE_URL=
JWT_SECRET=
NEXT_PUBLIC_API_URL=/api
APP_URL=https://your-production-domain.vercel.app
NEXT_PUBLIC_APP_URL=https://your-production-domain.vercel.app
BLOB_READ_WRITE_TOKEN=
RESEND_API_KEY=
RESEND_FROM_EMAIL="BC Market <onboarding@resend.dev>"
```

4. Build with the default Next.js settings.

The Next.js app exposes the backend through same-origin route handlers under `/api/*`.

Use `APP_URL` as the canonical public site URL for emails such as password recovery. Avoid branch or preview deployment URLs here, because reset links can outlive those deployments.

## Storage And Email

- Avatar uploads use Vercel Blob. Local filesystem uploads are not used in Vercel.
- Password recovery emails use Resend.
- `onboarding@resend.dev` is acceptable for initial testing. Use a verified Resend domain for production-like delivery.

## Verification

1. Open `/api/health` on the Vercel deployment.
2. Log in with `demo@bcmarket.com` / `Password123!`.
3. Upload a profile avatar and confirm it persists after refresh.
4. Request password recovery and confirm Resend sends the reset email.
