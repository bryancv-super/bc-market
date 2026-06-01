# Recover Password Sequence Diagram

This diagram represents the password recovery process in BC Market, including email verification, reset token generation, email delivery, password update, and database persistence.

## Diagram

```mermaid id="jjm8vf"
sequenceDiagram
    actor User
    participant Frontend
    participant AuthController
    participant AuthService
    participant Prisma
    participant PostgreSQL
    participant EmailService

    User->>Frontend: Request password recovery

    Frontend->>AuthController: POST /auth/recover-password

    AuthController->>AuthService: recoverPassword(email)

    AuthService->>Prisma: Verify user exists
    Prisma->>PostgreSQL: SELECT user

    PostgreSQL-->>Prisma: User data / null
    Prisma-->>AuthService: Query result

    alt User exists

        AuthService->>AuthService: Generate reset token

        AuthService->>Prisma: Store reset token
        Prisma->>PostgreSQL: INSERT password_reset_token

        PostgreSQL-->>Prisma: Token persisted
        Prisma-->>AuthService: Success

        AuthService->>EmailService: Send recovery email

        EmailService-->>User: Password reset link

        AuthService-->>AuthController: Recovery email sent

        AuthController-->>Frontend: 200 OK

        Frontend-->>User: Show confirmation message

    else User does not exist

        AuthService-->>AuthController: User not found

        AuthController-->>Frontend: 404 Not Found

        Frontend-->>User: Display error message

    end

    User->>Frontend: Open password reset link

    Frontend->>AuthController: POST /auth/reset-password

    AuthController->>AuthService: resetPassword(token, newPassword)

    AuthService->>Prisma: Validate token
    Prisma->>PostgreSQL: SELECT password_reset_token

    PostgreSQL-->>Prisma: Token data
    Prisma-->>AuthService: Token validation result

    alt Valid token

        AuthService->>Prisma: Update user password
        Prisma->>PostgreSQL: UPDATE user

        PostgreSQL-->>Prisma: Password updated
        Prisma-->>AuthService: Success

        AuthService->>Prisma: Delete used token
        Prisma->>PostgreSQL: DELETE password_reset_token

        PostgreSQL-->>Prisma: Token deleted
        Prisma-->>AuthService: Success

        AuthService-->>AuthController: Password updated successfully

        AuthController-->>Frontend: 200 OK

        Frontend-->>User: Display success message

    else Invalid or expired token

        AuthService-->>AuthController: Invalid token error

        AuthController-->>Frontend: 400 Bad Request

        Frontend-->>User: Display token error message

    end
```
