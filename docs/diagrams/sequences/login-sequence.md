# Login Sequence Diagram

This diagram represents the authentication sequence in BC Market, including frontend interaction, backend validation, JWT generation, and authenticated session handling.

## Diagram

```mermaid
sequenceDiagram

    actor User

    participant Frontend
    participant AuthController
    participant AuthService
    participant Prisma
    participant PostgreSQL


    User->>Frontend: Enter credentials

    Frontend->>AuthController: POST /auth/login

    AuthController->>AuthService: validateCredentials()

    AuthService->>Prisma: findUserByEmail()

    Prisma->>PostgreSQL: Query user

    PostgreSQL-->>Prisma: Return user data

    Prisma-->>AuthService: User data

    AuthService->>AuthService: Compare password hash

    alt Valid credentials

        AuthService->>AuthService: Generate JWT

        AuthService-->>AuthController: Return JWT

        AuthController-->>Frontend: 200 OK + Token

        Frontend->>Frontend: Store auth state

        Frontend-->>User: Redirect to Home

    else Invalid credentials

        AuthService-->>AuthController: Authentication error

        AuthController-->>Frontend: 401 Unauthorized

        Frontend-->>User: Display login error

    end
```
