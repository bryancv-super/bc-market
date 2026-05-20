# Application Navigation Flow

This diagram represents the main navigation structure and user journey through the BC Market application.

## Diagram

```mermaid
flowchart TD

    A[Login]

    B[Register]

    C[Recover Password]

    D[Home / Product Catalog]

    E[Product Details]

    F[Add Product To List]

    G[Shopping Lists]

    H[List Details]

    I[Profile]


    A --> D

    B --> A

    C --> A


    D --> E

    E --> F

    D --> G

    D --> I


    G --> H

    H --> D


    I --> D

    F --> D
```
