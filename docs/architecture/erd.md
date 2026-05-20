# Entity Relationship Diagram (ERD)

This diagram represents the core database structure of BC Market, including users, shopping lists, products, categories, and their relationships.

## Diagram

```mermaid
erDiagram

    User ||--o{ ShoppingList : owns

    Category ||--o{ Product : contains

    ShoppingList ||--o{ ShoppingListItem : includes

    Product ||--o{ ShoppingListItem : referenced_by


    User {
        uuid id
        string username
        string email
        string passwordHash
        string profileImage
        datetime createdAt
        datetime updatedAt
    }

    Category {
        uuid id
        string name
        string slug
    }

    Product {
        uuid id
        string name
        string description
        decimal price
        string unit
        string imageUrl
        boolean isActive
        uuid categoryId
        datetime createdAt
        datetime updatedAt
    }

    ShoppingList {
        uuid id
        uuid userId
        string name
        datetime createdAt
        datetime updatedAt
    }

    ShoppingListItem {
        uuid id
        uuid shoppingListId
        uuid productId
        int quantity
        boolean checked
        datetime createdAt
    }
```

## Notes

- Shopping lists are the core domain entity of the application.
- Product prices are reference-based and not tied to real-time inventory.
- Shopping list totals are calculated dynamically.
