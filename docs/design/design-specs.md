# BC Market — Design Specifications

> Documento de especificaciones de diseño para el sistema de listas de supermercados BC Market.
> Basado en los archivos de Figma exportados como SVG.

---

## 1. Color

### Paleta Principal

| Token | Hex | Uso |
|---|---|---|
| `green-600` | `#16A34A` | Color primario, botón principal, íconos activos |
| `green-700` | `#15803D` | Variante oscura del primario (hover) |
| `green-100` | `#D1FAE5` | Fondo suave verde, estado pressed del primario |
| `amber-400` | `#F59E0B` | Advertencia, indicadores secundarios |
| `red-500` | `#EF4444` | Error, botón destructivo |
| `red-300` | `#EF9E9E` | Estado pressed del botón destructivo |
| `blue-600` | `#2563EB` | Acento informativo |

### Paleta Neutra

| Token | Hex | Uso |
|---|---|---|
| `slate-950` | `#0F172A` | Texto principal, fondo oscuro |
| `slate-500` | `#64748B` | Texto secundario, íconos deshabilitados |
| `slate-100` | `#E6E7EA` | Fondo del botón deshabilitado |
| `slate-50` | `#F8FAFC` | Fondo general de la app |
| `white` | `#FFFFFF` | Superficies de cards, modales, inputs |

### Tokens Semánticos

| Nombre | Valor | Descripción |
|---|---|---|
| `color-primary` | `#16A34A` | Acción principal |
| `color-primary-dark` | `#15803D` | Hover del primario |
| `color-primary-light` | `#D1FAE5` | Fondo sutil / pressed |
| `color-danger` | `#EF4444` | Acciones destructivas |
| `color-warning` | `#F59E0B` | Advertencias |
| `color-background` | `#F8FAFC` | Fondo general |
| `color-surface` | `#FFFFFF` | Cards, paneles |
| `color-border` | `#E6E7EA` | Bordes de componentes |
| `color-text-primary` | `#0F172A` | Texto principal |
| `color-text-secondary` | `#64748B` | Texto auxiliar |
| `color-text-disabled` | `#64748B` | Texto en estado deshabilitado |

---

## 2. Tipografía

La aplicación usa la familia **Geist Sans** como fuente principal (sans-serif) y **Geist Mono** para código. Ambas están configuradas como variables CSS en el layout raíz de Next.js.

### Escala Tipográfica

| Nivel | Tamaño | Peso | Uso típico |
|---|---|---|---|
| `display` | 30px / 1.875rem | 700 (Bold) | Títulos de página (`h1`) |
| `heading-lg` | 24px / 1.5rem | 600 (SemiBold) | Secciones principales (`h2`) |
| `heading-md` | 20px / 1.25rem | 600 (SemiBold) | Subtítulos de tarjeta (`h3`) |
| `body-lg` | 18px / 1.125rem | 400 (Regular) | Texto de párrafo grande |
| `body-md` | 16px / 1rem | 400 (Regular) | Texto de párrafo estándar |
| `body-sm` | 14px / 0.875rem | 400 (Regular) | Etiquetas, descripciones |
| `caption` | 12px / 0.75rem | 400 (Regular) | Timestamps, metadatos |
| `label` | 14px / 0.875rem | 500 (Medium) | Labels de formulario |
| `button` | 14px / 0.875rem | 600 (SemiBold) | Texto dentro de botones |

### Variables CSS

```css
:root {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

### Notas de Uso

- El tamaño mínimo de fuente para texto legible en móvil es **16px**.
- Los botones usan siempre peso `SemiBold (600)`.
- Los labels de inputs usan peso `Medium (500)`.
- El color de texto principal es `#0F172A` sobre fondo blanco.
- El color de texto secundario es `#64748B` para información de apoyo.

---

## 3. Espaciamiento

El sistema de espaciamiento sigue una escala base de **8px**, aplicada con múltiplos consistentes en toda la interfaz.

### Escala Base

| Token | Valor | Píxeles |
|---|---|---|
| `spacing-1` | 0.25rem | 4px |
| `spacing-2` | 0.5rem | 8px |
| `spacing-3` | 0.75rem | 12px |
| `spacing-4` | 1rem | 16px |
| `spacing-5` | 1.25rem | 20px |
| `spacing-6` | 1.5rem | 24px |
| `spacing-8` | 2rem | 32px |
| `spacing-10` | 2.5rem | 40px |
| `spacing-12` | 3rem | 48px |
| `spacing-16` | 4rem | 64px |

### Reglas de Aplicación

| Contexto | Valor recomendado |
|---|---|
| Padding interno de botones (vertical) | `12px` (`spacing-3`) |
| Padding interno de botones (horizontal) | `20px` (`spacing-5`) |
| Padding interno de cards | `24px` (`spacing-6`) |
| Padding interno de inputs | `12px` vertical / `16px` horizontal |
| Gap entre elementos de lista | `8px` (`spacing-2`) |
| Gap entre secciones de página | `24px` (`spacing-6`) |
| Margen entre páginas (container) | `16px` (`spacing-4`) |
| Padding de página en desktop | `32px` (`spacing-8`) |

### Border Radius

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | `6px` | Inputs pequeños, badges |
| `radius-md` | `8px` | Inputs estándar |
| `radius-lg` | `12px` | Botones, cards |
| `radius-xl` | `16px` | Modales, paneles grandes |
| `radius-full` | `9999px` | Avatares, chips |

---

## 4. Componentes

---

### 4.1 Buttons

Los botones tienen texto "Text" visible en el diseño (T, e, x, t). El tamaño base es `57×44px` con `border-radius: 12px`. Están organizados en cuatro variantes.

#### Variante: Primary (Filled)

```
Fondo:       #16A34A  (green-600)
Texto:       #FFFFFF
Radio:       12px
Padding:     12px 20px
Tamaño:      57×44px
```

**Pressed state:** Fondo cambia a `#D1FAE5` (green-100), texto a `#0F172A` (slate-950).

#### Variante: Outline

```
Fondo:       #FFFFFF
Borde:       1px solid #16A34A
Texto:       #16A34A
Radio:       12px
Padding:     12px 20px
```

**Pressed state:** Fondo cambia a `#0F172A`, borde a `#D1FAE5`, texto a `#D1FAE5`.

#### Variante: Disabled

```
Fondo:       #E6E7EA  (slate-100)
Texto:       #64748B  (slate-500)
Radio:       12px
Padding:     12px 20px
Sin borde
```

No tiene pressed state (no interactivo).

#### Variante: Destructive

```
Fondo:       #EF4444  (red-500)
Texto:       #FFFFFF
Radio:       12px
Padding:     12px 20px
```

**Pressed state:** Fondo cambia a `#EF9E9E` (red-300), texto a `#0F172A` (slate-950).

#### Resumen de Estados

| Variante | Default | Pressed |
|---|---|---|
| Primary | `bg: #16A34A` / `text: white` | `bg: #D1FAE5` / `text: #0F172A` |
| Outline | `bg: white` / `border: #16A34A` / `text: #16A34A` | `bg: #0F172A` / `border: #D1FAE5` / `text: #D1FAE5` |
| Disabled | `bg: #E6E7EA` / `text: #64748B` | — |
| Destructive | `bg: #EF4444` / `text: white` | `bg: #EF9E9E` / `text: #0F172A` |

---

### 4.2 Inputs

Los inputs son campos de texto estándar para formularios (login, signup, listas, búsqueda de productos).

#### Default

```
Fondo:       #FFFFFF
Borde:       1px solid #E6E7EA
Radio:       8px
Padding:     12px 16px
Texto:       #0F172A
Placeholder: #64748B
```

#### Focus

```
Borde:       1px solid #16A34A  (green-600)
Ring:        2px ring #16A34A con opacity 0.2
```

#### Error

```
Borde:       1px solid #EF4444  (red-500)
Texto error: #EF4444, 12px, debajo del input
```

#### Disabled

```
Fondo:       #F8FAFC
Texto:       #64748B
Cursor:      not-allowed
```

---

### 4.3 Tags / Chips

Los tags agrupan etiquetas de categoría, filtros y estados de productos.

#### Tag de Categoría (Default)

```
Fondo:       #F8FAFC  (slate-50)
Borde:       1px solid #E6E7EA
Texto:       #64748B  (slate-500)
Radio:       999px (pill)
Padding:     4px 12px
Font-size:   12px / caption
```

#### Tag Activo / Seleccionado

```
Fondo:       #D1FAE5  (green-100)
Borde:       1px solid #16A34A
Texto:       #16A34A  (green-600)
```

---

### 4.4 Cards

Las cards son el contenedor principal de listas de compras y productos.

#### Lista Card (Shopping List)

```
Fondo:          #FFFFFF
Borde:          1px solid #E6E7EA
Radio:          12px
Padding:        24px
Sombra hover:   0 4px 12px rgba(0,0,0,0.08)
Cursor:         pointer
```

Estructura interna:

```
Título (h3):        font-size 18px / weight 600 / color #0F172A
Descripción:        font-size 14px / color #64748B / mb-3
Contador productos: font-size 14px / color #64748B
```

#### Producto Item (dentro de lista)

```
Fondo:       #FFFFFF
Borde:       1px solid #E6E7EA
Radio:       8px
Padding:     12px 16px
Display:     flex, items-center, gap 12px
```

Estructura interna:

```
Checkbox:          w-5 h-5 / color #16A34A cuando checked
Nombre producto:   font-size 16px / weight 500 / color #0F172A
  (tachado si comprado: line-through / color #64748B)
Cantidad y unidad: font-size 14px / color #64748B
Botón eliminar:    ícono Trash2 / color #EF4444 / 18px
```

---

### 4.5 Modales

Los modales se usan para crear listas, añadir productos y confirmar acciones.

#### Overlay

```
Fondo:       rgba(0, 0, 0, 0.5)
Z-index:     40
```

#### Panel del Modal

```
Fondo:       #FFFFFF
Radio:       16px
Padding:     24px
Max-width:   448px (max-w-md)
Z-index:     50
Sombra:      0 20px 60px rgba(0,0,0,0.15)
```

#### Título del Modal

```
Font-size:   20px / SemiBold / color #0F172A
Margin-bottom: 16px
```

---

### 4.6 Navigation / Header

El header es una barra horizontal fija en la parte superior.

```
Fondo:       #FFFFFF
Borde inf.:  1px solid #E6E7EA
Padding:     16px 24px
Height:      64px
```

Elementos:

```
Logo "BC Market":   font-size 20px / Bold / color #0F172A
Links nav:          font-size 16px / color #64748B / hover: #0F172A
Botón Salir:        font-size 16px / color #EF4444 / hover: #DC2626
```

---

### 4.7 Avatar / Foto de Perfil

```
Tamaño:      96×96px
Radio:       full (círculo)
Borde:       2px solid #E6E7EA
Fondo vacío: #E6E7EA con ícono usuario
```

#### Botón Cambiar Foto

```
Fondo:       #2563EB  (blue-600)
Texto:       #FFFFFF
Ícono:       Camera 18px
Padding:     8px 16px
Radio:       8px
```

---

### 4.8 Checkboxes

Los checkboxes se usan en los ítems de lista para marcar productos como comprados.

```
Tamaño:         20×20px
Color default:  borde #E6E7EA / fondo #FFFFFF
Color checked:  fondo #16A34A / check blanco
Radio:          4px
```

---

### 4.9 Select / Dropdown

Usado en el formulario de añadir producto (campo "Unidad").

```
Fondo:       #FFFFFF
Borde:       1px solid #E6E7EA
Radio:       8px
Padding:     8px 12px
Texto:       #0F172A / 16px
```

---

### 4.10 Empty States

Pantallas cuando no hay datos disponibles (sin listas, sin productos).

```
Contenedor:  text-center / py-48px
Texto:       font-size 16px / color #64748B
Botón:       Primary button, centrado, mt-16px
```

Texto de ejemplo: "No tienes listas aún" / "Crear mi primera lista"

---

### 4.11 Loading States

Los skeletons reemplazan el texto "Cargando..." en toda la app.

```
Fondo base:     #E6E7EA
Animación:      pulse
Radio:          mismo que el elemento que reemplaza
```

---

## 5. Iconografía

La librería de íconos usada es **Lucide React** (`lucide-react@0.383.0`).

| Ícono | Nombre Lucide | Uso |
|---|---|---|
| Basura / eliminar | `Trash2` | Eliminar producto de lista |
| Cámara | `Camera` | Cambiar foto de perfil |
| Más / agregar | `Plus` | Crear nueva lista / añadir producto |

### Tamaños Estándar

| Contexto | Tamaño |
|---|---|
| Íconos en botones | `16px` |
| Íconos de acción en lista | `18px` |
| Íconos de navegación | `20px` |
| Íconos decorativos grandes | `24px` |

---

## 6. Grids y Layout

### Container

```
max-width:    1280px
margin:       0 auto
padding-x:    16px (móvil) / 32px (desktop)
```

### Grid de Listas

```
mobile:   grid-cols-1
tablet:   grid-cols-2 (md:)
desktop:  grid-cols-3 (lg:)
gap:      16px
```

### Página de Lista Detallada

```
max-width:   672px (max-w-2xl)
margin:      0 auto
```

---

## 7. Responsive Breakpoints

Siguiendo los breakpoints de Tailwind CSS:

| Nombre | Breakpoint | Descripción |
|---|---|---|
| `mobile` | `< 640px` | Touch-first, 1 columna, nav simplificada |
| `sm` | `≥ 640px` | Small tablets, layouts 2 columnas |
| `md` | `≥ 768px` | Tablets, grid 2 columnas para listas |
| `lg` | `≥ 1024px` | Desktop, grid 3 columnas |
| `xl` | `≥ 1280px` | Large desktop, max-width container activo |

---

## 8. Sombras

| Token | Valor CSS | Uso |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.06)` | Cards en reposo |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Cards en hover |
| `shadow-lg` | `0 20px 60px rgba(0,0,0,0.15)` | Modales y dropdowns |

---

## 9. Animaciones y Transiciones

| Elemento | Propiedad | Duración | Easing |
|---|---|---|---|
| Hover en card | `box-shadow` | `150ms` | `ease-in-out` |
| Hover en botón | `background-color` | `150ms` | `ease-in-out` |
| Aparición de modal | `opacity`, `scale`, `translateY` | `200ms` | `ease-out` |
| Checkbox al marcar | `background-color` | `100ms` | `ease-in` |
| Toast notification | `opacity`, `translateY` | `300ms` | `spring` |

---

*Especificaciones generadas desde los archivos de diseño Figma del proyecto BC Market.*
*Stack: Next.js 16 · Tailwind CSS v4 · Lucide React*
