# BC Market Wireframes And States Specifications

This document summarizes the SVG wireframes in `docs/design/wireframes-states`.

The folder contains 63 SVG files:

- 13 main screens / overlays.
- 50 secondary state screens.

Note: `Catalog` does not include a `Default.svg`; its main/default screen is `Home.svg`.

Component names are based on `docs/design/design-system-spec.md`.

## Screen Map

| Module | Screen / Overlay | Main SVG |
| --- | --- | --- |
| Auth | Login | `Login/ Default.svg` |
| Auth | Signup | `Signup/ Default.svg` |
| Auth | Recover Password | `Recover Password/ Default.svg` |
| Auth | Reset Password | `Reset Password/ Default.svg` |
| Shopping | Catalog | `Catalog/ Home.svg` |
| Shopping | Select List | `Select List/ Default.svg` |
| Shopping | Lists | `Lists/ Default.svg` |
| Shopping | Create List | `Create List/ Default.svg` |
| Shopping | List Detail | `List Detail/ Default.svg` |
| Shopping | Edit List | `Edit List/ Default.svg` |
| User | Profile | `Profile/ Default.svg` |
| User | Edit Profile | `Edit Profile/ Default.svg` |
| User | Change Password | `Change Password/ Default.svg` |

## Auth

### Login

Components used:

- Header / brand logo
- Section title and subtitle
- Input: email
- Input: password
- Primary Button
- Text link: recover password
- Text link: signup

Layout:

```txt
+--------------------------------+
| BC Market                      |
|                                |
|          Inicia sesion         |
|   Accede a tu cuenta...        |
|                                |
| Correo electronico             |
| [ ejemplo@correo.com        ]  |
|                                |
| Contrasena                     |
| [ **********************    ]  |
|                                |
|          Olvidaste...?         |
|                                |
| [        Iniciar sesion      ] |
|                                |
|     No tienes cuenta? Registro |
+--------------------------------+
```

### Signup

Components used:

- Header / brand logo
- Section title and subtitle
- Input: full name
- Input: email
- Input: password
- Input: confirm password
- Primary Button
- Text link: login

Layout:

```txt
+--------------------------------+
| BC Market                      |
|                                |
|          Crea tu cuenta        |
| Para acceder a la plataforma   |
|                                |
| Nombre completo                |
| [                            ] |
|                                |
| Correo electronico             |
| [ ejemplo@correo.com        ]  |
|                                |
| Contrasena                     |
| [ ****************          ]  |
|                                |
| Confirmar contrasena           |
| [ ****************          ]  |
|                                |
| [          Crear cuenta      ] |
|                                |
|    Ya tienes cuenta? Login     |
+--------------------------------+
```

### Recover Password

Components used:

- Header / brand logo
- Section title and subtitle
- Input: email
- Primary Button
- Text link: back to login

Layout:

```txt
+--------------------------------+
| BC Market                      |
|                                |
|       Recuperar contrasena     |
| Ingresa tu correo para enlace  |
|                                |
| Correo                         |
| [ ejemplo@correo.com        ]  |
|                                |
| [         Enviar enlace      ] |
|                                |
|      Volver al inicio sesion   |
+--------------------------------+
```

### Reset Password

Components used:

- Header / brand logo
- Section title and subtitle
- Input: new password
- Input: confirm password
- Primary Button

Layout:

```txt
+--------------------------------+
| BC Market                      |
|                                |
|        Nueva contrasena        |
|  Crea una nueva contrasena     |
|                                |
| Nueva contrasena               |
| [ **********************    ]  |
|                                |
| Confirmar contrasena           |
| [ **********************    ]  |
|                                |
| [     Actualizar contrasena  ] |
+--------------------------------+
```

## Shopping

### Catalog

Main file: `Catalog/ Home.svg`.

Components used:

- Header: brand logo + avatar/account icon
- SearchBar
- Filter icon
- Primary Button: `Mis Listas`
- Section title
- Product Card
- Tag
- Outline Button: `Agregar a lista`

Layout:

```txt
+--------------------------------+
| BC Market                  (u) |
|                                |
| [ Busca productos...      ] F  |
|                                |
| [          Mis Listas       ]  |
|                                |
|            Productos           |
|                                |
| +----------------------------+ |
| | [Categoria]                | |
| | Producto                   | |
| | RD$ 0.00      [Agregar]    | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | [Categoria]                | |
| | Producto                   | |
| | RD$ 0.00      [Agregar]    | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | [Categoria]                | |
| | Producto                   | |
| | RD$ 0.00      [Agregar]    | |
| +----------------------------+ |
+--------------------------------+
```

### Select List

Overlay of Catalog.

Components used:

- Overlay container / modal-like screen
- Section title
- List selection rows
- Arrow icon action
- Primary Button: create new list

Layout:

```txt
+--------------------------------+
|                                |
|      Agregar producto a lista  |
|                                |
| +----------------------------+ |
| | Lista1                  -> | |
| +----------------------------+ |
| | Lista2                  -> | |
| +----------------------------+ |
| | Lista3                  -> | |
| +----------------------------+ |
| | Lista4                  -> | |
| +----------------------------+ |
|                                |
|        [ Crear nueva lista ]   |
+--------------------------------+
```

### Lists

Components used:

- Header: brand logo + avatar/account icon
- Section title
- Outline Button: `Nueva Lista`
- List Card
- Outline Button: `Abrir`
- Arrow icon

Layout:

```txt
+--------------------------------+
| BC Market                  (u) |
|                                |
|             Mis Listas         |
|                                |
| [        Nueva Lista        ]  |
|                                |
| +----------------------------+ |
| | Lista                      | |
| | 0 items - 0 comprados      | |
| | [ Abrir -> ]               | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | Lista                      | |
| | 0 items - 0 comprados      | |
| | [ Abrir -> ]               | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | Lista                      | |
| | 0 items - 0 comprados      | |
| | [ Abrir -> ]               | |
| +----------------------------+ |
+--------------------------------+
```

### Create List

Overlay of Lists.

Components used:

- Header: brand logo + avatar/account icon
- Section title
- Input: list name
- Primary Button
- Outline Button

Layout:

```txt
+--------------------------------+
| BC Market                  (u) |
|                                |
|             Nueva lista        |
|                                |
| Nombre de la lista             |
| [ Lista1                    ]  |
|                                |
|          [ Crear lista ]       |
|                                |
|          [   Cancelar  ]       |
+--------------------------------+
```

### List Detail

Components used:

- Header: brand logo + avatar/account icon
- Detail Header: back icon, list title, metadata
- Primary Button: add product
- Outline Button: edit list
- Product Item Card
- Checkbox

Layout:

```txt
+--------------------------------+
| BC Market                  (u) |
|                                |
| <-  Nombre de la lista         |
|     0 items - 0 comprados      |
|                                |
| [ Agregar Producto ] [Editar]  |
|                                |
| +----------------------------+ |
| | [ ] Producto        0 uds  | |
| |     RD$ 0.00               | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | [ ] Producto        0 uds  | |
| |     RD$ 0.00               | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | [ ] Producto        0 uds  | |
| |     RD$ 0.00               | |
| +----------------------------+ |
+--------------------------------+
```

### Edit List

Components used:

- Header: brand logo + avatar/account icon
- Header: back link + title
- Input: list name
- Editable Item Card
- Icon Button: plus
- Icon Button: minus
- Destructive Outline Button: delete
- Primary Button: save changes

Layout:

```txt
+--------------------------------+
| BC Market                  (u) |
|                                |
| <- Volver          Editar Lista|
|                                |
| Nombre de la lista             |
| [ Lista1                    ]  |
|                                |
| +----------------------------+ |
| | Producto RD$ 0.00 [Eliminar]|
| | [+]    1 unidad       [-]  | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | Producto RD$ 0.00 [Eliminar]|
| | [+]    1 unidad       [-]  | |
| +----------------------------+ |
|                                |
| +----------------------------+ |
| | Producto RD$ 0.00 [Eliminar]|
| | [+]    1 unidad       [-]  | |
| +----------------------------+ |
|                                |
|       [ Guardar Cambios ]      |
+--------------------------------+
```

## User

### Profile

Components used:

- Header: back link + title
- User Summary Card
- Outline Button: edit profile
- Primary Button: change password
- Danger Outline Button: logout

Layout:

```txt
+--------------------------------+
| <- Volver                Perfil|
|                                |
| +----------------------------+ |
| |            (avatar)        | |
| |        Nombre completo     | |
| |       ejemplo@correo.com   | |
| +----------------------------+ |
|                                |
| [        Editar perfil       ] |
| [      Cambiar contrasena    ] |
|                                |
| [         Cerrar sesion      ] |
+--------------------------------+
```

### Edit Profile

Components used:

- Header: back link + title
- Avatar
- Outline Button: change profile photo
- Input: name
- Input: email
- Primary Button

Layout:

```txt
+--------------------------------+
| <- Volver         Editar perfil|
|                                |
|              (avatar)          |
|                                |
| [    Cambiar foto de perfil  ] |
|                                |
| Nombre                         |
| [ Juan Perez                ]  |
|                                |
| Correo electronico             |
| [ ejemplo@correo.com        ]  |
|                                |
| [       Guardar cambios      ] |
+--------------------------------+
```

### Change Password

Components used:

- Header: back link + title
- Input: current password
- Input: new password
- Input: confirm password
- Primary Button

Layout:

```txt
+--------------------------------+
| <- Volver    Cambiar contrasena|
|                                |
| Contrasena actual              |
| [ **********************    ]  |
|                                |
| Nueva contrasena               |
| [ **********************    ]  |
|                                |
| Confirmar contrasena           |
| [ **********************    ]  |
|                                |
| [     Actualizar contrasena  ] |
+--------------------------------+
```

## Secondary States

No ASCII wireframe is required for these states. Each row lists the state type and the components visible in that state.

### Auth States

| Screen | SVG | State type | Components used |
| --- | --- | --- | --- |
| Login | `Invalid Credentials.svg` | Domain error | Header, Input Error email, Input Error password, error message, Primary Button, text links |
| Login | `Loading.svg` | Loading / submitting | Header, default inputs, Spinner, disabled/submitting primary action area, text links |
| Login | `Validation Error.svg` | Validation error | Header, Input Error email, Input Error password, field error messages, Primary Button, text links |
| Signup | `Email Exists.svg` | Domain error | Header, default name input, Input Error email, password inputs, error message, Primary Button |
| Signup | `Loading.svg` | Loading / submitting | Header, inputs, Spinner with `Creando cuenta...` style text |
| Signup | `Success.svg` | Success redirect/state | Header, Toast success, login form components |
| Signup | `Validation error.svg` | Validation error | Header, default name input, Input Error email, Input Error password, Input Error confirm password, field messages, Primary Button |
| Recover Password | `Error.svg` | Domain error | Header, input, inline error message, Primary Button, back link |
| Recover Password | `Loading.svg` | Loading / submitting | Header, input, Spinner, back link |
| Recover Password | `Sent.svg` | Success / sent | Header, success text, Primary Button back to login |
| Recover Password | `Validation Error.svg` | Validation error | Header, Input Error email, field error message, Primary Button, back link |
| Reset Password | `Error.svg` | Error state | Header, ErrorState with red icon, Retry outline button |
| Reset Password | `Expired Token.svg` | Warning / expired link | Header, ErrorState warning variant, Outline Button request new link |
| Reset Password | `Loading.svg` | Loading / submitting | Header, password inputs, Spinner |
| Reset Password | `Success.svg` | Success redirect/state | Header, Toast success, login form components |
| Reset Password | `Validation Error.svg` | Validation error | Header, Input Error password, Input Error confirm password, field messages, Primary Button |

### Shopping States

| Screen | SVG | State type | Components used |
| --- | --- | --- | --- |
| Catalog | `Empty Search.svg` | Empty search result | Header, SearchBar with query, Filter icon, Primary Button, EmptyState search variant, action button to clear search |
| Catalog | `Error.svg` | Error state | Header, SearchBar, Filter icon, Primary Button, ErrorState red variant, Retry outline button |
| Catalog | `Loading.svg` | Loading | Header, SearchBar Skeleton, Primary Button, section title, Product Card Skeleton list |
| Select List | `Empty.svg` | Empty list collection | Overlay title, EmptyState bookmark variant, Primary Button create list |
| Select List | `Error.svg` | Error state | Overlay title, ErrorState red variant, Retry outline button |
| Select List | `Loading.svg` | Loading | Overlay title, List Skeleton rows, Primary Button create list |
| Select List | `Success.svg` | Success / return to catalog | Header, SearchBar, Filter icon, Primary Button, Product Cards, Toast implied by success context |
| Lists | `Empty.svg` | Empty list collection | Header, section title, EmptyState bookmark variant, Primary Button create new list |
| Lists | `Error.svg` | Error state | Header, section title, ErrorState red variant, Retry outline button |
| Lists | `Loading.svg` | Loading | Header, section title, Outline Button, List Skeleton rows |
| Create List | `Error.svg` | Domain error | Header, title, input, inline error message, Primary Button, Outline Button cancel |
| Create List | `Loading.svg` | Loading / submitting | Header, title, input, Spinner, Outline Button cancel |
| Create List | `Success.svg` | Success / list created | Header, title, Outline Button, Toast success, List Cards |
| Create List | `Validation Error.svg` | Validation error | Header, title, Input Error list name, field message, Primary Button, Outline Button cancel |
| List Detail | `Empty.svg` | Empty list detail | Header, Detail Header, EmptyState, Primary Button explore/add products |
| List Detail | `Error.svg` | Error state | Header, Detail Header, ErrorState red variant, Retry outline button |
| List Detail | `Item Checked.svg` | Interactive checked item state | Header, Detail Header, Primary Button, Outline Button, Product Item Cards, checked checkbox state |
| List Detail | `Loading.svg` | Loading | Header, Detail Header, action buttons, Product Item Skeleton list |
| Edit List | `Delete Confirmation.svg` | Confirmation modal overlay | Dimmed Edit List screen, ConfirmationModal, Confirm danger button, Cancel outline button |
| Edit List | `Error.svg` | Error state | Header, back/title header, ErrorState red variant, Retry outline button |
| Edit List | `Loading.svg` | Loading | Header, back/title header, Input Skeleton, Editable Item Skeleton list |
| Edit List | `Success.svg` | Success / saved | Header, Toast success, Detail Header, action buttons, Product Item Cards |

### User States

| Screen | SVG | State type | Components used |
| --- | --- | --- | --- |
| Profile | `Error.svg` | Error state | Header back/title, ErrorState red variant, Retry outline button |
| Profile | `Loading.svg` | Loading | Header back/title, User Summary Skeleton, form/action Skeleton bars |
| Profile | `Logout Confirmation.svg` | Confirmation modal overlay | Dimmed Profile screen, User Summary Card, ConfirmationModal, Confirm danger button, Cancel outline button |
| Edit Profile | `Error.svg` | Domain error | Header back/title, Avatar, photo Outline Button, inputs, inline error message, Primary Button |
| Edit Profile | `Loading.svg` | Loading / submitting | Header back/title, Avatar, photo Outline Button, inputs, Spinner, Primary Button area |
| Edit Profile | `Success.svg` | Success / saved | Header back/title, Toast success, User Summary Card, action buttons |
| Edit Profile | `Validation Error.svg` | Validation error | Header back/title, Avatar, photo Outline Button, Input Error email, field message, Primary Button |
| Change Password | `Error.svg` | Domain error | Header back/title, password inputs, inline error message, Primary Button |
| Change Password | `Invalid Current Password.svg` | Domain error | Header back/title, Input Error current password, field message, password inputs, Primary Button |
| Change Password | `Loading.svg` | Loading / submitting | Header back/title, password inputs, Spinner |
| Change Password | `Success.svg` | Success / return profile | Header back/title, Toast success, User Summary Card, profile action buttons |
| Change Password | `Validation Error.svg` | Validation error | Header back/title, Input Error new password, Input Error confirm password, field messages, Primary Button |

## Implementation Notes

- Use the same component primitives across all screens; state variants should swap only component state, text, and content.
- Auth screens are centered forms with brand at the top.
- Shopping screens use a light page background, brand/account header, and card stacks.
- User screens use a back/title header and centered profile/account actions.
- Loading states should preserve the default layout height by replacing content with Skeleton components.
- Validation states use `Input Error` on the exact field and field-level red messages.
- Domain/API errors use either inline error messages for forms or `ErrorState` for full-screen content failure.
- Success states use `Toast` when the user remains in context, or a success confirmation screen when the flow ends.
