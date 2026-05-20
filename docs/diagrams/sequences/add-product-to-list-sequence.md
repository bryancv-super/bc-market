# Add Product To List Sequence Diagram

This diagram represents the process of adding a product from the catalog into a shopping list in BC Market, including frontend interaction, backend validation, duplicate item handling, and database persistence.

## Diagram

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant ShoppingListController
    participant ShoppingListService
    participant Prisma
    participant PostgreSQL

    User->>Frontend: Select product from catalog
    User->>Frontend: Choose shopping list and quantity

    Frontend->>ShoppingListController: POST /shopping-lists/:id/items

    ShoppingListController->>ShoppingListService: addProductToList(listId, productId, quantity)

    ShoppingListService->>Prisma: Verify shopping list exists
    Prisma->>PostgreSQL: SELECT shopping_list

    PostgreSQL-->>Prisma: Shopping list data
    Prisma-->>ShoppingListService: Shopping list found

    ShoppingListService->>Prisma: Verify product exists
    Prisma->>PostgreSQL: SELECT product

    PostgreSQL-->>Prisma: Product data
    Prisma-->>ShoppingListService: Product found

    ShoppingListService->>Prisma: Check if product already exists in list
    Prisma->>PostgreSQL: SELECT shopping_list_item

    PostgreSQL-->>Prisma: Existing item / null
    Prisma-->>ShoppingListService: Query result

    alt Product already exists
        ShoppingListService->>Prisma: Update quantity
        Prisma->>PostgreSQL: UPDATE shopping_list_item
    else Product does not exist
        ShoppingListService->>Prisma: Create shopping list item
        Prisma->>PostgreSQL: INSERT shopping_list_item
    end

    PostgreSQL-->>Prisma: Updated list item
    Prisma-->>ShoppingListService: Persisted item

    ShoppingListService-->>ShoppingListController: Success response

    ShoppingListController-->>Frontend: 201 Created

    Frontend-->>User: Product added successfully
```
