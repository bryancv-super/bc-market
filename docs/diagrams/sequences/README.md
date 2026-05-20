# Sequence Diagrams

This directory contains the backend sequence diagrams for BC Market.

Sequence diagrams are used to represent the interaction between frontend, backend layers, and database operations during critical system processes.

## Purpose

These diagrams help visualize:

- Request lifecycle
- Backend architecture flow
- Service communication
- Database interaction
- Authentication handling
- Error handling

## Architecture Pattern

BC Market follows the following backend architecture:

```plaintext
Routes → Controllers → Services → Prisma ORM → PostgreSQL
```

## Included Sequences

- Login Sequence
- Create Shopping List Sequence
- Add Product To List Sequence
- Recover Password Sequence
- Shopping Session Sequence

## Notes

Sequence diagrams focus on technical execution flow rather than user interaction flow.

They are primarily intended to document backend behavior and API request processing.
