# BC Market — Análisis de Pantallas y Overlays

> Documento generado a partir de los archivos SVG exportados desde Figma.
> Viewport base: 390×844px (iPhone 14 / mobile-first).
> Fuente: `design-specs.md` del proyecto.

---

## Convenciones

- **Componentes** referenciados según `design-specs.md`.
- **Wireframe ASCII** representa la estructura vertical de la pantalla (de arriba hacia abajo).
- Los **estados** de cada pantalla se listan como sub-secciones.
- Colores de borde en inputs: verde `#16A34A` = focus/activo, rojo `#EF4444` = error, gris `#E6E7EA` = default.

---

## Auth

---

### Login

**Ruta:** `/login`

#### Componentes usados

| Componente | Descripción |
|---|---|
| Logo | Imagen del logo BC Market (144×64px, top-left) |
| `heading-lg` | Título de la pantalla (e.g. "Iniciar sesión") |
| `body-sm` | Subtítulo / texto de apoyo |
| Input (Default) | Campo Email |
| Input (Default) | Campo Contraseña |
| `caption` | Link "¿Olvidaste tu contraseña?" |
| Button — Primary | "Iniciar sesión" (ancho completo) |
| `body-sm` | Link "¿No tienes cuenta? Regístrate" |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│  [Logo BC Market 144×64]             │
│                                      │
│  Iniciar sesión                      │  ← heading-lg
│  Ingresa tus credenciales            │  ← body-sm
│                                      │
│ ┌────────────────────────────────┐   │
│ │  Email                         │   │  ← Input default
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │  Contraseña                    │   │  ← Input default
│ └────────────────────────────────┘   │
│                                      │
│  ¿Olvidaste tu contraseña?           │  ← caption / link
│                                      │
│ ┌────────────────────────────────┐   │
│ │       Iniciar sesión           │   │  ← Button Primary
│ └────────────────────────────────┘   │
│                                      │
│  ¿No tienes cuenta? Regístrate       │  ← body-sm / link
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Inputs con borde gris `#E6E7EA` |
| **Loading** | Botón reemplazado por skeleton (loading spinner, fondo blanco) |
| **Invalid Credentials** | Ambos inputs con borde rojo `#EF4444` + mensaje de error inline |
| **Validation Error** | Inputs individuales con borde rojo según campo inválido + mensajes de error debajo de cada campo |

---

### Signup

**Ruta:** `/signup`

#### Componentes usados

| Componente | Descripción |
|---|---|
| Logo | Imagen del logo BC Market |
| `heading-lg` | Título "Crear cuenta" |
| `body-sm` | Subtítulo / descripción |
| Input (Default) | Campo Nombre |
| Input (Default) | Campo Email |
| Input (Default) | Campo Contraseña |
| Input (Default) | Campo Confirmar Contraseña |
| Button — Primary | "Crear cuenta" (ancho completo) |
| `body-sm` | Link "¿Ya tienes cuenta? Inicia sesión" |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│  [Logo BC Market 144×64]             │
│                                      │
│  Crear cuenta                        │  ← heading-lg
│  Completa tus datos                  │  ← body-sm
│                                      │
│ ┌────────────────────────────────┐   │
│ │  Nombre                        │   │  ← Input default
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │  Email                         │   │  ← Input default
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │  Contraseña                    │   │  ← Input default
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │  Confirmar Contraseña          │   │  ← Input default
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │         Crear cuenta           │   │  ← Button Primary
│ └────────────────────────────────┘   │
│                                      │
│  ¿Ya tienes cuenta? Inicia sesión    │  ← body-sm / link
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Todos los inputs con borde gris |
| **Loading** | Botón reemplazado por skeleton |
| **Email Exists** | Input Email con borde rojo + mensaje "Email ya registrado" |
| **Validation Error** | Inputs inválidos con borde rojo + mensajes de error por campo |
| **Success** | Toast/banner verde en parte superior ("Cuenta creada"), inputs limpios, redirige a login o home |

---

### Recover Password

**Ruta:** `/recover-password`

#### Componentes usados

| Componente | Descripción |
|---|---|
| Logo | Imagen del logo BC Market |
| `heading-lg` | "Recuperar contraseña" |
| `body-md` | Instrucción (ej. "Ingresa tu email...") |
| Input (Default) | Campo Email |
| Button — Primary | "Enviar enlace" (ancho completo) |
| `body-sm` | Link "Volver a iniciar sesión" |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│  [Logo BC Market 144×64]             │
│                                      │
│  Recuperar contraseña                │  ← heading-lg
│  Ingresa tu email para recibir       │  ← body-md
│  un enlace de recuperación           │
│                                      │
│ ┌────────────────────────────────┐   │
│ │  Email                         │   │  ← Input default
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │       Enviar enlace            │   │  ← Button Primary
│ └────────────────────────────────┘   │
│                                      │
│  Volver a iniciar sesión             │  ← body-sm / link
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Input Email con borde gris |
| **Loading** | Botón reemplazado por skeleton |
| **Validation Error** | Input Email con borde rojo + mensaje de error |
| **Error** | Mensaje de error genérico (e.g. "No encontramos ese email") + botón Outline "Intentar de nuevo" |
| **Sent** | Banner/toast verde de confirmación ("Email enviado"), botón primario visible |

---

### Reset Password

**Ruta:** `/reset-password` (accedida desde link en email)

#### Componentes usados

| Componente | Descripción |
|---|---|
| Logo | Imagen del logo BC Market |
| `heading-lg` | "Nueva contraseña" |
| `body-md` | Instrucción |
| Input (Default) | Campo Nueva Contraseña |
| Input (Default) | Campo Confirmar Nueva Contraseña |
| Button — Primary | "Guardar contraseña" (ancho completo) |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│  [Logo BC Market 144×64]             │
│                                      │
│  Nueva contraseña                    │  ← heading-lg
│  Ingresa tu nueva contraseña         │  ← body-md
│                                      │
│ ┌────────────────────────────────┐   │
│ │  Nueva contraseña              │   │  ← Input default
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │  Confirmar contraseña          │   │  ← Input default
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │      Guardar contraseña        │   │  ← Button Primary
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Inputs con borde gris |
| **Loading** | Botón reemplazado por skeleton |
| **Validation Error** | Inputs inválidos con borde rojo + mensajes de error |
| **Expired Token** | Botón Outline "Solicitar nuevo enlace" centrado, sin inputs |
| **Error** | Mensaje de error genérico + botón Outline de reintentar |
| **Success** | Banner verde en top ("Contraseña actualizada"), inputs visibles, botón primario para ir al login |

---

## Shopping

---

### Catalog (Home)

**Ruta:** `/home`

#### Componentes usados

| Componente | Descripción |
|---|---|
| Logo | Logo BC Market (top-left) |
| Avatar / Foto de Perfil | Círculo 40×40px (top-right) |
| Input (Search) | Barra de búsqueda de productos |
| Button — Primary | "Filtrar" o acción principal (full-width) |
| Tags / Chips | Tags de categorías (amber, filtros activos en verde) |
| Cards — Producto Item | Lista de productos resultantes |
| Button — Primary (small) | "Agregar a lista" en cada card |

#### Wireframe ASCII — Home (Default)

```
┌──────────────────────────────────────┐
│  [Logo 144×64]           [Avatar 40] │  ← Header
│                                      │
│ ┌──────────────────────────┐         │
│ │  🔍 Buscar productos...  │         │  ← Input Search
│ └──────────────────────────┘         │
│                                      │
│ ┌────────────────────────────────┐   │
│ │      Categorías / Filtrar      │   │  ← Button Primary
│ └────────────────────────────────┘   │
│                                      │
│ [Tag: Lacteos] [Tag: Carnes] ...     │  ← Tags/Chips (amber border)
│                                      │
│ ┌────────────────────────────────┐   │  ← Card Producto
│ │  Nombre Producto               │   │
│ │  Categoría          [Agregar]  │   │  ← Button Outline (verde)
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │  ← Card Producto
│ │  Nombre Producto               │   │
│ │  Categoría          [Agregar]  │   │
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │  ← Card Producto
│ │  Nombre Producto               │   │
│ │  Categoría          [Agregar]  │   │
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Home (Default)** | Lista de producto cards con botón "Agregar" outline verde |
| **Loading** | Cards reemplazadas por skeletons (rect blanco, sin borde, pulse) |
| **Empty Search** | Sin cards, empty state centrado + botón primario "Limpiar búsqueda" |
| **Error** | Mensaje de error + botón Outline "Reintentar" centrado |

---

### Overlay: Select List

**Contexto:** Se muestra sobre la pantalla de Catalog cuando el usuario toca "Agregar" en un producto.

#### Componentes usados

| Componente | Descripción |
|---|---|
| Overlay (dim) | Fondo `slate-50` (`#F8FAFC`) — ocupa pantalla completa |
| Cards — Lista | Lista de listas del usuario (rows de 60px, rx=16) |
| Button — Primary | "Confirmar" / "Agregar a lista" |
| Button — Outline | "Cancelar" (en estados Default-2) |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│  (Fondo slate-50, sin header)        │
│                                      │
│  Selecciona una lista                │  ← heading-md
│                                      │
│ ┌────────────────────────────────┐   │  ← Card Lista
│ │  Lista del supermercado        │   │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │  ← Card Lista
│ │  Lista de la semana            │   │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │  ← Card Lista
│ │  Compras del mes               │   │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │  ← Card Lista
│ │  Otra lista                    │   │
│ └────────────────────────────────┘   │
│                                      │
│ ┌──────────────────────────────┐     │
│ │         Confirmar            │     │  ← Button Primary
│ └──────────────────────────────┘     │
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Lista de cards de listas disponibles + botón Primary |
| **Default-1** | Estado vacío (sin listas) + botón Primary "Crear lista" |
| **Default-2** | Lista seleccionada resaltada + botón Outline "Cancelar" visible |
| **Loading** | Cards reemplazadas por skeletons |
| **Success** | Transición a la vista del catálogo (Catalog Home) con el producto agregado |

---

### Lists

**Ruta:** `/listas`

#### Componentes usados

| Componente | Descripción |
|---|---|
| Logo | Logo BC Market (top-left) |
| Avatar / Foto de Perfil | Círculo 40×40px (top-right) |
| Button — Outline (verde) | "Nueva lista" (ancho completo, borde verde) |
| Cards — Lista | Lista de shopping lists del usuario (158×156px aprox, rx=16) |
| Tags / Chips | Estado de la lista (borde amber `#F59E0B`) |
| Button — Outline (verde small) | "Ver lista" dentro de cada card |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│  [Logo 144×64]           [Avatar 40] │  ← Header
│                                      │
│ ┌────────────────────────────────┐   │
│ │         + Nueva lista          │   │  ← Button Outline verde
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │  ← Card Lista
│ │  [Tag: Categoría]              │   │
│ │                                │   │
│ │  Nombre de la lista            │   │  ← heading-md
│ │  N productos                   │   │  ← body-sm
│ │                      [Ver →]   │   │  ← Button Outline small
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │  ← Card Lista
│ │  [Tag: Categoría]              │   │
│ │  Nombre de la lista            │   │
│ │  N productos         [Ver →]   │   │
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │  ← Card Lista
│ │  [Tag: Categoría]              │   │
│ │  Nombre de la lista            │   │
│ │  N productos         [Ver →]   │   │
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Cards de listas con tags amber + botón "Ver lista" outline |
| **Loading** | Cards reemplazadas por skeletons (rect blanco, sin borde) |
| **Empty** | Sin cards, empty state + botón Primary "Crear mi primera lista" centrado |
| **Error** | Mensaje de error + botón Outline "Reintentar" |

---

### Overlay: Create List

**Contexto:** Se muestra sobre `/listas` cuando el usuario toca "+ Nueva lista".

#### Componentes usados

| Componente | Descripción |
|---|---|
| Logo | Logo BC Market (top-left) |
| Avatar | Círculo 40×40px |
| `heading-md` | "Nueva lista" |
| Input (Default) | Campo "Nombre de la lista" |
| Button — Primary | "Crear lista" |
| Button — Outline | "Cancelar" |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│  [Logo 144×64]           [Avatar 40] │  ← Header
│                                      │
│  Nueva lista                         │  ← heading-md
│                                      │
│ ┌────────────────────────────────┐   │
│ │  Nombre de la lista            │   │  ← Input default
│ └────────────────────────────────┘   │
│                                      │
│         ┌─────────────┐              │
│         │ Crear lista │              │  ← Button Primary (centrado)
│         └─────────────┘              │
│         ┌─────────────┐              │
│         │   Cancelar  │              │  ← Button Outline (centrado)
│         └─────────────┘              │
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Input con borde gris, botones centrados |
| **Loading** | Botón Primary reemplazado por skeleton (rect blanco) |
| **Validation Error** | Input con borde rojo + mensaje de error |
| **Error** | Mensaje de error de API + botón Outline "Reintentar" |
| **Success** | Toast/banner verde "Lista creada", regresa a `/listas` con nueva lista visible |

---

### List Detail

**Ruta:** `/listas/[ID]`

#### Componentes usados

| Componente | Descripción |
|---|---|
| Logo | Logo BC Market (top-left) |
| Avatar | Círculo 40×40px (top-right) |
| `heading-lg` | Nombre de la lista |
| Button — Primary | "Agregar producto" (izquierda, ~158px) |
| Button — Outline | "Editar lista" (derecha, ~108px) |
| Cards — Producto Item | Items de la lista (358×108px, rx=16) |
| Checkbox | 16×16px, borde verde, marcado verde `#15803D` |
| `body-md` | Nombre del producto |
| `body-sm` | Cantidad y unidad |
| Ícono `Trash2` | Botón eliminar (rojo) |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│  [Logo 144×64]           [Avatar 40] │  ← Header
│                                      │
│  Nombre de la lista                  │  ← heading-lg
│  N productos                         │  ← body-sm
│                                      │
│  [+ Agregar producto]  [Editar lista]│  ← Button Primary + Outline
│                                      │
│ ┌────────────────────────────────┐   │  ← Card Producto
│ │ ○ Leche entera      2 litros   │   │  ← Checkbox + nombre + cantidad
│ │                           🗑️  │   │  ← Trash2 icon (rojo)
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │  ← Card Producto
│ │ ○ Pan integral      1 unidad   │   │
│ │                           🗑️  │   │
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │  ← Card Producto
│ │ ○ Arroz             1 kg       │   │
│ │                           🗑️  │   │
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Checkboxes con borde verde (sin marcar) |
| **Item Checked** | Primer checkbox marcado (relleno verde `#15803D`, texto tachado) |
| **Loading** | Cards reemplazadas por skeletons más estrechos (272px) |
| **Empty** | Sin cards, empty state + botón Primary "Agregar primer producto" centrado |
| **Error** | Mensaje de error + botón Outline "Reintentar" |

---

### Edit List

**Ruta:** (Overlay sobre `/listas/[ID]`)

#### Componentes usados

| Componente | Descripción |
|---|---|
| Logo | Logo BC Market |
| Avatar | Círculo 40×40px |
| `heading-md` | "Editar lista" |
| Input (Default) | Campo nombre de la lista |
| Cards — Producto Item | Items con checkboxes editables (100px alto) |
| Checkbox | 24×24px, verde `#16A34A` |
| Button — Destructive (Outline) | Botón eliminar item (69×67px, borde rojo) |
| Button — Primary | "Guardar" |
| Button — Outline | "Cancelar" |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│  [Logo 144×64]           [Avatar 40] │  ← Header
│                                      │
│  Editar lista                        │  ← heading-md
│                                      │
│ ┌────────────────────────────────┐   │
│ │  Nombre de la lista            │   │  ← Input default
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │  ← Card item (editable)
│ │ ☑ Leche  [Qty]     [✓] [🗑 ]  │   │  ← Checkbox + controles + Btn Destructive
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ ☑ Pan    [Qty]     [✓] [🗑 ]  │   │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ ☑ Arroz  [Qty]     [✓] [🗑 ]  │   │
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Items con checkboxes verde + botón destructive (outline rojo) por item |
| **Delete Confirmation** | Modal/overlay de confirmación sobre los items (misma estructura base) |
| **Loading** | Cards reemplazadas por skeletons + botón Primary al fondo |
| **Error** | Mensaje de error + botón Outline "Reintentar" |
| **Success** | Toast/banner verde "Lista actualizada", regresa a List Detail |

---

## User

---

### Profile

**Ruta:** `/cuenta`

#### Componentes usados

| Componente | Descripción |
|---|---|
| Avatar / Foto de Perfil | Círculo 60×60px, fondo `#E6E7EA` |
| `heading-md` | Nombre del usuario |
| `body-sm` | Email del usuario |
| Button — Outline (verde) | "Editar perfil" (ancho completo) |
| Button — Primary | "Cambiar contraseña" (ancho completo) |
| Button — Destructive (Outline) | "Cerrar sesión" (ancho completo, borde rojo) |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│                                      │
│           [Avatar 60×60]             │  ← Foto circular (center)
│                                      │
│           Nombre Usuario             │  ← heading-md (center)
│           usuario@email.com          │  ← body-sm (center)
│                                      │
│  (espacio / separador)               │
│                                      │
│ ┌────────────────────────────────┐   │
│ │         Editar perfil          │   │  ← Button Outline verde
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │       Cambiar contraseña       │   │  ← Button Primary
│ └────────────────────────────────┘   │
│                                      │
│  (espacio / separador)               │
│                                      │
│ ┌────────────────────────────────┐   │
│ │         Cerrar sesión          │   │  ← Button Destructive Outline
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Estructura descrita arriba |
| **Loading** | Avatar con fondo `#64748B`, filas de botones reemplazadas por skeletons |
| **Logout Confirmation** | Overlay semitransparente (fondo `#64748B` con opacidad 0.3) + modal centrado (224×192px, rx=12, fondo slate-50) con botón Destructive "Confirmar" + botón Outline "Cancelar" |
| **Error** | Solo botón Outline "Reintentar" visible |

---

### Edit Profile

**Ruta:** (Overlay / sub-pantalla desde `/cuenta`)

#### Componentes usados

| Componente | Descripción |
|---|---|
| Avatar / Foto de Perfil | Círculo 60×60px (con opción de cambio foto) |
| Button — Outline (verde) | "Cambiar foto" (ancho completo, debajo del avatar) |
| `label` | Labels de los campos |
| Input (Default) | Campo Nombre |
| Input (Default/Disabled) | Campo Email (deshabilitado) |
| Button — Primary | "Guardar cambios" (ancho completo) |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│                                      │
│           [Avatar 60×60]             │  ← Foto circular (center)
│                                      │
│ ┌────────────────────────────────┐   │
│ │         Cambiar foto           │   │  ← Button Outline verde
│ └────────────────────────────────┘   │
│                                      │
│  Nombre                              │  ← label
│ ┌────────────────────────────────┐   │
│ │  Juan Pérez                    │   │  ← Input default (focus verde)
│ └────────────────────────────────┘   │
│                                      │
│  Email                               │  ← label
│ ┌────────────────────────────────┐   │
│ │  usuario@email.com             │   │  ← Input disabled
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │        Guardar cambios         │   │  ← Button Primary
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Input Nombre con foco verde, Email disabled |
| **Loading** | Botón Primary reemplazado por skeleton |
| **Validation Error** | Inputs inválidos con borde rojo + mensajes de error |
| **Error** | Mensaje de error de API |
| **Success** | Toast/banner verde "Perfil actualizado" + botones de navegación (Outline verde + Destructive) |

---

### Change Password

**Ruta:** (Overlay / sub-pantalla desde `/cuenta`)

#### Componentes usados

| Componente | Descripción |
|---|---|
| `heading-md` | "Cambiar contraseña" |
| `body-sm` | Instrucción |
| Input (Default) | Campo Contraseña Actual |
| Input (Default) | Campo Nueva Contraseña |
| Input (Default) | Campo Confirmar Nueva Contraseña |
| Button — Primary | "Guardar contraseña" (ancho completo) |

#### Wireframe ASCII — Default

```
┌──────────────────────────────────────┐
│                                      │
│  Cambiar contraseña                  │  ← heading-md
│  Ingresa tu contraseña actual...     │  ← body-sm
│                                      │
│ ┌────────────────────────────────┐   │
│ │  Contraseña actual             │   │  ← Input default
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │  Nueva contraseña              │   │  ← Input default
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │  Confirmar nueva contraseña    │   │  ← Input default
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │       Guardar contraseña       │   │  ← Button Primary
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
```

#### Estados

| Estado | Cambios respecto a Default |
|---|---|
| **Default** | Los 3 inputs con borde gris |
| **Loading** | Botón Primary reemplazado por skeleton centrado |
| **Validation Error** | Inputs inválidos con borde rojo (ej. nueva contraseña y confirmación no coinciden) |
| **Invalid Current Password** | Solo el primer input (contraseña actual) con borde rojo |
| **Error** | Mensaje de error genérico |
| **Success** | Toast/banner verde "Contraseña actualizada" + botón Outline verde "Ir a perfil" + botón Destructive outline "Cerrar sesión" |

---

## Resumen de Componentes por Pantalla

| Pantalla | Input | Button Primary | Button Outline | Button Destructive | Card | Checkbox | Tag | Avatar |
|---|---|---|---|---|---|---|---|---|
| Login | 2 | ✓ | — | — | — | — | — | — |
| Signup | 4 | ✓ | — | — | — | — | — | — |
| Recover Password | 1 | ✓ | ✓* | — | — | — | — | — |
| Reset Password | 2 | ✓ | ✓* | — | — | — | — | — |
| Catalog / Home | 1 (search) | ✓ | ✓ (en cards) | — | Producto | — | ✓ (chips) | ✓ |
| Select List (overlay) | — | ✓ | ✓* | — | Lista | — | — | — |
| Lists | — | — | ✓ (nueva lista) | — | Lista | — | ✓ (amber) | ✓ |
| Create List (overlay) | 1 | ✓ | ✓ | — | — | — | — | — |
| List Detail | — | ✓ | ✓ | — | Producto | ✓ | — | ✓ |
| Edit List | 1 | ✓* | ✓* | ✓ (por item) | Producto | ✓ | — | ✓ |
| Profile | — | ✓ | ✓ | ✓ | — | — | — | ✓ |
| Edit Profile | 2 | ✓ | ✓ | — | — | — | — | ✓ |
| Change Password | 3 | ✓ | ✓* | ✓* | — | — | — | — |

> \* Aparece solo en ciertos estados.

---

*Generado a partir de los SVGs exportados desde Figma del proyecto BC Market.*
*Stack de referencia: Next.js 16 · Tailwind CSS v4 · Lucide React*
