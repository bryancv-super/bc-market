# BC Market Fast Delivery Plan

## Summary
Build a **faithful demo-first MVP** in phases, optimized for less than one day and safe to continue across accounts. The current repo already has docs, architecture, diagrams, design-system specs, and wireframe specs; implementation is still mostly starter Next.js + minimal Express.

Default strategy: **frontend fidelity first with mock/local data**, then a thin backend/API skeleton to satisfy project architecture. Each phase ends with commits, a PR, and a filled PR template for squash merge into `develop`.

## Phase Plan

### Phase 0: Freeze Documentation Baseline
Goal: commit the design/workflow docs already generated so future accounts can use them as source of truth.

Key changes:
- Commit `docs/design/design-system-spec.md`.
- Commit `docs/design/wireframes-states-spec.md`.
- Keep SVGs as design references.

Commit series:
- `docs: add design system specifications`
- `docs: add wireframe states implementation guide`

PR title:
- `docs: add frontend design implementation specs`

PR template body:
```md
# Pull Request

## Description
Adds design-system and wireframe/state documentation extracted from the Figma SVG exports. These docs become the implementation contract for the frontend MVP.

## Type of Change
- [ ] Feature
- [ ] Fix
- [ ] Refactor
- [x] Documentation
- [ ] Chore

## Changes Made
- Added color, typography, spacing, button, and component specifications.
- Added screen-by-screen wireframe and state documentation.
- Documented the 13 main screens and 50 secondary states.

## Verification Checklist
- [x] Project runs correctly
- [x] No unnecessary files were added
- [x] Changes were tested locally
- [x] Project structure remains consistent

## Additional Notes
Catalog uses `Home.svg` as its default screen because no `Default.svg` exists for that folder.
```

### Phase 1: Frontend Foundation And Components
Goal: replace the default Next page with a real BC Market frontend shell and reusable components.

Key changes:
- Configure Tailwind/theme tokens from `design-system-spec.md`.
- Add reusable UI primitives: Button, Input, SearchBar, Card variants, Header, Toast, Spinner, Skeleton, EmptyState, ErrorState, ConfirmationModal.
- Add mock data and lightweight client-side state store for users, products, lists, list items, loading/error/success states.
- Add route structure for `/login`, `/signup`, `/recover-password`, `/reset-password`, `/home`, `/listas`, `/listas/[id]`, `/listas/[id]/editar`, `/cuenta`, `/cuenta/editar`, `/cuenta/cambiar-contrasena`.

Commit series:
- `feat: add design tokens and app shell`
- `feat: add reusable UI components`
- `feat: add mock data and route structure`

PR title:
- `feat: add frontend foundation and design system components`

PR template body:
```md
# Pull Request

## Description
Implements the shared frontend foundation for BC Market using the documented Figma-derived design system.

## Type of Change
- [x] Feature
- [ ] Fix
- [ ] Refactor
- [ ] Documentation
- [ ] Chore

## Changes Made
- Added design tokens for colors, spacing, typography, radius, and shadows.
- Added reusable UI components for buttons, inputs, cards, headers, loading, empty, error, toast, and modal states.
- Added route structure and mock data layer for the MVP.

## Verification Checklist
- [x] Project runs correctly
- [x] No unnecessary files were added
- [x] Changes were tested locally
- [x] Project structure remains consistent

## Additional Notes
This PR intentionally uses mock/local data so visual implementation can move quickly and remain faithful to the SVGs.
```

### Phase 2: Auth And User Screens
Goal: implement all Auth and User screens with default, loading, validation, error, and success states.

Key changes:
- Implement Login, Signup, Recover Password, Reset Password.
- Implement Profile, Edit Profile, Change Password.
- Add client-side validation matching the wireframe states.
- Add fake async loading, success toast, inline errors, logout confirmation, and profile photo preview placeholder.

Commit series:
- `feat: implement auth screens`
- `feat: implement user profile screens`
- `feat: add auth and profile UI states`

PR title:
- `feat: implement auth and user flows`

PR template body:
```md
# Pull Request

## Description
Adds the Auth and User flows using the documented wireframes and state screens.

## Type of Change
- [x] Feature
- [ ] Fix
- [ ] Refactor
- [ ] Documentation
- [ ] Chore

## Changes Made
- Added login, signup, recover password, and reset password screens.
- Added profile, edit profile, and change password screens.
- Added validation, loading, success, error, and confirmation states.

## Verification Checklist
- [x] Project runs correctly
- [x] No unnecessary files were added
- [x] Changes were tested locally
- [x] Project structure remains consistent

## Additional Notes
Auth is simulated for MVP delivery; backend integration is reserved for the backend/API phase.
```

### Phase 3: Shopping Screens
Goal: implement the core supermarket-list workflow.

Key changes:
- Implement Catalog/Home with search, filter icon, product cards, empty search, loading, and error states.
- Implement Select List overlay flow from product cards.
- Implement Lists, Create List overlay, List Detail, and Edit List.
- Support local interactions: create list, add product to list, check item, update quantity, remove item, delete confirmation.

Commit series:
- `feat: implement catalog screen`
- `feat: implement shopping list screens`
- `feat: add shopping flow states and overlays`

PR title:
- `feat: implement shopping list flows`

PR template body:
```md
# Pull Request

## Description
Implements the main shopping flows for catalog browsing, list management, and list editing.

## Type of Change
- [x] Feature
- [ ] Fix
- [ ] Refactor
- [ ] Documentation
- [ ] Chore

## Changes Made
- Added catalog screen with product cards, search, empty, loading, and error states.
- Added select-list and create-list overlays.
- Added lists, list detail, edit list, item checked, quantity edit, and delete confirmation flows.

## Verification Checklist
- [x] Project runs correctly
- [x] No unnecessary files were added
- [x] Changes were tested locally
- [x] Project structure remains consistent

## Additional Notes
Shopping data is local/mock for demo reliability and speed.
```

### Phase 4: Backend Skeleton, Integration Polish, And Delivery
Goal: make the project look fullstack and submission-ready without derailing the frontend demo.

Key changes:
- Expand Express backend into `/api/health`, `/api/products`, `/api/lists`, `/api/auth/login`, `/api/auth/signup`, `/api/profile`.
- Use mock JSON/in-memory data for fast delivery.
- Add Multer/FS avatar upload endpoint and local `uploads/avatars` handling.
- Add Prisma schema matching ERD and `.env.example`; do not require live DB for demo unless time remains.
- Add frontend API service layer that can use `NEXT_PUBLIC_API_URL`, with mock fallback.
- Update README with run instructions, feature list, and phase status.
- Run `npm run lint --workspace=frontend`, `npm run build --workspace=frontend`, and backend smoke check.

Commit series:
- `feat: add backend api skeleton`
- `feat: add avatar upload handling`
- `chore: add prisma schema and env examples`
- `docs: update readme for mvp delivery`

PR title:
- `feat: add backend skeleton and delivery polish`

PR template body:
```md
# Pull Request

## Description
Adds a minimal backend API skeleton, upload handling, Prisma schema, and final delivery documentation for the BC Market MVP.

## Type of Change
- [x] Feature
- [ ] Fix
- [ ] Refactor
- [x] Documentation
- [x] Chore

## Changes Made
- Added Express API endpoints for auth, profile, products, lists, and health checks.
- Added Multer/FS avatar upload handling.
- Added Prisma schema and environment examples aligned with the ERD.
- Updated README with setup and MVP delivery notes.

## Verification Checklist
- [x] Project runs correctly
- [x] No unnecessary files were added
- [x] Changes were tested locally
- [x] Project structure remains consistent

## Additional Notes
Backend persists mock/in-memory data for the fast MVP. PostgreSQL/Prisma are prepared structurally but full database wiring is a follow-up.
```

## Public Interfaces
- Frontend routes must match the documented project modules: `/login`, `/signup`, `/recover-password`, `/reset-password`, `/home`, `/listas`, `/listas/[id]`, `/listas/[id]/editar`, `/cuenta`, `/cuenta/editar`, `/cuenta/cambiar-contrasena`.
- Backend MVP endpoints use `/api/...` JSON routes with mock responses.
- Environment variables: `NEXT_PUBLIC_API_URL`, `PORT`, `DATABASE_URL`, `JWT_SECRET`.
- File upload field name: `avatar`.

## Test Plan
- Frontend: run lint/build after each frontend PR.
- Visual: compare each implemented screen against `wireframes-states-spec.md`.
- Interaction: manually verify login/signup simulated flow, list creation, add product to list, check item, edit quantity, delete confirmation, profile edit, password change.
- Backend: smoke test `/api/health`, `/api/products`, `/api/lists`, and avatar upload route.
- Final: run full app with `npm run dev`, verify frontend and backend start together.

## Assumptions
- Priority is **demo fidelity**, not production backend completeness.
- Work happens from `develop`; each phase uses a short feature branch and merges back with squash.
- Each phase stops after commits and PR body are ready, so the user can open the PR, squash merge, then continue with the next phase.
- PostgreSQL/Prisma are included as structure and schema in the fast plan; full persistent database integration is a post-delivery enhancement.
