# BC Market Architecture

## Overview

**BC Market uses a modern full-stack monorepo architecture based on:**

- Next.js frontend application
- Express.js backend API
- PostgreSQL database
- npm workspaces monorepo structure

The project follows a layered architecture approach focused on scalability, maintainability, and clear separation of responsibilities.

---

## Monorepo Structure

BC Market uses a monorepo architecture managed with npm workspaces.

**The repository is organized as follows:**

```plaintext
bc-market/
│
├── apps/
│   ├── frontend/
│   └── backend/
│
├── docs/
│
├── package.json
├── package-lock.json
└── README.md
```

### apps/frontend

Contains the Next.js frontend application.

**Responsibilities:**

- User interface
- Client-side logic
- Authentication state
- API communication
- Pages and layouts

### apps/backend

Contains the Express.js backend API.

**Responsibilities:**

-Business logic
-Authentication
-Database access
-API endpoints
-Validation and middleware

### docs

Contains technical documentation related to the project architecture, workflows, and decisions.
