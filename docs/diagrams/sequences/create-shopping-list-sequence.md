# Create Shopping List Sequence Diagram

This diagram represents the process of creating a new shopping list in BC Market, including frontend interaction, backend validation, and database persistence.

## Diagram

```mermaid
sequenceDiagram

    actor User

    participant Frontend
    participant ShoppingListController
    participant ShoppingListService
    participant Prisma
    participant PostgreSQL


    User->>Frontend: Open create list form

    User->>Frontend: Enter list name

    User->>Frontend: Submit shopping list

    Frontend->>ShoppingListController: POST /shopping-lists

    ShoppingListController->>ShoppingListService: createShoppingList()

    ShoppingListService->>ShoppingListService: Validate list data

    alt Valid data

        ShoppingListService->>Prisma: createShoppingList()

        Prisma->>PostgreSQL: Insert shopping list

        PostgreSQL-->>Prisma: Shopping list created

        Prisma-->>ShoppingListService: Return shopping list

        ShoppingListService-->>ShoppingListController: Return created list

        ShoppingListController-->>Frontend: 201 Created

        Frontend-->>User: Display success feedback

    else Invalid data

        ShoppingListService-->>ShoppingListController: Validation error

        ShoppingListController-->>Frontend: 400 Bad Request

        Frontend-->>User: Display validation error

    end
```
