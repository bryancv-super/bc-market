# Shopping Session Sequence Diagram

This diagram represents the shopping session process in BC Market, where the user interacts with a shopping list during a physical store visit, including list retrieval, item checking, quantity updates, and persistence of shopping progress in the database.

## Diagram

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant ShoppingSessionController
    participant ShoppingSessionService
    participant Prisma
    participant PostgreSQL

    User->>Frontend: Open shopping list

    Frontend->>ShoppingSessionController: GET /shopping-lists/:id

    ShoppingSessionController->>ShoppingSessionService: getShoppingList(id)

    ShoppingSessionService->>Prisma: Retrieve shopping list with items
    Prisma->>PostgreSQL: SELECT shopping_list + items

    PostgreSQL-->>Prisma: Shopping list data
    Prisma-->>ShoppingSessionService: List with items

    ShoppingSessionService-->>ShoppingSessionController: Return shopping list

    ShoppingSessionController-->>Frontend: 200 OK + list data

    Frontend-->>User: Display shopping session

    loop During shopping session

        alt Mark item as checked

            User->>Frontend: Mark item as checked

            Frontend->>ShoppingSessionController: PATCH /shopping-list-items/:id/check

            ShoppingSessionController->>ShoppingSessionService: checkItem(itemId)

            ShoppingSessionService->>Prisma: Update checked status
            Prisma->>PostgreSQL: UPDATE shopping_list_item

            PostgreSQL-->>Prisma: Updated item
            Prisma-->>ShoppingSessionService: Persisted changes

            ShoppingSessionService-->>ShoppingSessionController: Success response

            ShoppingSessionController-->>Frontend: 200 OK

            Frontend-->>User: Update progress visually

        else Update item quantity

            User->>Frontend: Update item quantity

            Frontend->>ShoppingSessionController: PATCH /shopping-list-items/:id/quantity

            ShoppingSessionController->>ShoppingSessionService: updateQuantity(itemId, quantity)

            ShoppingSessionService->>Prisma: Update item quantity
            Prisma->>PostgreSQL: UPDATE shopping_list_item

            PostgreSQL-->>Prisma: Updated quantity
            Prisma-->>ShoppingSessionService: Persisted changes

            ShoppingSessionService-->>ShoppingSessionController: Success response

            ShoppingSessionController-->>Frontend: 200 OK

            Frontend-->>User: Display updated quantity

        end

    end

    User->>Frontend: Finish shopping session

    Frontend-->>User: Shopping list completed
```
