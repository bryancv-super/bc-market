# BC Market Design System Specifications

This document summarizes the frontend visual system extracted from the SVG files in `docs/design/design-system`.

Source files:

- `Color.svg`
- `Typography.svg`
- `Spacing.svg`
- `Buttons.svg`
- `Pressed.svg`
- `General.svg`
- Component folders: `Card`, `Input`, `SearchBar`, `Skeleton`

## Design Principles

BC Market uses a clean grocery-list interface with strong white surfaces, dark navy text, green actions, amber category accents, and red destructive/error states. Components are rounded, compact, and mobile-first. The visual language should feel practical, simple, and clear for supermarket list management.

## Color

### Core Palette

| Token | Hex | Usage |
| --- | --- | --- |
| `primary` | `#16A34A` | Main CTA buttons, success actions, add/open controls |
| `primary-dark` | `#15803D` | Checked states, stronger green outlines/icons |
| `primary-soft` | `#D1FAE5` | Pressed primary background, soft success surfaces |
| `warning` | `#F59E0B` | Category tags, warning icon, category outline |
| `danger` | `#EF4444` | Error inputs, destructive buttons, error icons |
| `danger-soft` | `#EF9E9E` | Pressed danger background |
| `text-primary` | `#0F172A` | Main headings, labels, body text |
| `text-secondary` | `#64748B` | Subtitles, metadata, placeholders, secondary values |
| `info` | `#2563EB` | Spinner accent |
| `surface` | `#FFFFFF` | Cards, inputs, modals, buttons |
| `surface-muted` | `#F8FAFC` | Confirmation modal background |
| `border-muted` | `#E6E7EA` | Input/search/skeleton borders, disabled fills |
| `icon-dark` | `#1E1E1E` | Filter icon and neutral utility icons |

### Recommended Semantic Mapping

Use semantic names in code instead of raw color names:

```css
--color-primary: #16A34A;
--color-primary-dark: #15803D;
--color-primary-soft: #D1FAE5;
--color-warning: #F59E0B;
--color-danger: #EF4444;
--color-danger-soft: #EF9E9E;
--color-text-primary: #0F172A;
--color-text-secondary: #64748B;
--color-info: #2563EB;
--color-surface: #FFFFFF;
--color-surface-muted: #F8FAFC;
--color-border-muted: #E6E7EA;
```

## Typography

The SVG does not preserve font-family metadata because text is converted to paths. The current frontend already uses Geist, and its shape matches the exported sans-serif style closely enough. Use Geist as the implementation font.

| Style | Size | Weight | Color | Usage |
| --- | ---: | ---: | --- | --- |
| `heading-xl` | `32px` | `700` | `#0F172A` | Main page or section headings |
| `heading-lg` | `24px` | `700` | `#0F172A` | Important screen/card headings |
| `heading-md` | `20px` | `700` | `#0F172A` | Card titles, product/list titles |
| `body` | `16px` | `400` | `#0F172A` | Prices, descriptions, normal content |
| `small` | `14px` | `400` | `#64748B` | Subtitles, metadata, helper text |
| `label-small` | `12px` | `400` | Contextual | Tags, buttons, compact labels |

Implementation notes:

- Use `text-primary` for all major titles.
- Use `text-secondary` for metadata like `0 items · 0 comprados`, email, placeholders, and product units.
- Button and tag labels use `label-small` or `small` depending on available width.
- Keep letter spacing at `0`.

## Spacing

The spacing SVG defines a strict 8px scale.

| Token | Value |
| --- | ---: |
| `space-1` | `8px` |
| `space-2` | `16px` |
| `space-3` | `24px` |
| `space-4` | `32px` |
| `space-5` | `40px` |

Usage guidance:

- Use `8px` for tight internal icon/text gaps.
- Use `16px` for card padding and standard component gaps.
- Use `24px` for vertical spacing between related sections.
- Use `32px` or `40px` for larger page separation.
- Keep component dimensions stable; avoid content-driven resizing for cards, buttons, inputs, tags, and toolbar controls.

## Shape And Elevation

| Element | Radius | Notes |
| --- | ---: | --- |
| Buttons | `12px` | Primary, outline, disabled, danger |
| Inputs/Search | `12.5px` | Figma export uses half-pixel stroke alignment |
| Cards | `16px` | Product, list, item, user summary |
| Tags | `12px` | Category pill |
| Icon buttons | `4px` | Quantity plus/minus buttons |
| Avatar | `999px` | Circular |
| Modal | `12px` | Confirmation modal |

Cards use a visible drop shadow with a dark navy/green-tinted stack. In CSS, approximate with:

```css
box-shadow:
  0 20px 28px rgba(15, 23, 42, 0.22),
  0 12px 18px rgba(21, 128, 61, 0.16);
```

## Buttons

Source: `Buttons.svg` and `Pressed.svg`.

### Primary Button

- Size in design token sample: `57px x 44px`
- General CTA sample: `110px x 44px`
- Radius: `12px`
- Background: `#16A34A`
- Text: `#FFFFFF`
- Usage: main actions like `Agregar a lista`, `Completed action`, CTA buttons.

Pressed state:

- Background: `#D1FAE5`
- Text: `#0F172A`

### Outline Button

- Size in sample: `56px x 43px`
- Radius: `12px`
- Background: `#FFFFFF`
- Border: `1px solid #16A34A`
- Text: `#16A34A`
- Usage: secondary actions like `Abrir`, `Cancel`, retry-style actions.

Pressed state:

- Background: `#0F172A`
- Border: `#D1FAE5`
- Text: `#D1FAE5`

### Disabled Button

- Background: `#E6E7EA`
- Text: `#64748B`
- No strong border
- Usage: unavailable actions.

### Danger Button

- Background: `#EF4444`
- Text: `#FFFFFF`
- Radius: `12px`
- Usage: destructive confirmations.

Pressed state:

- Background: `#EF9E9E`
- Text: `#0F172A`

### Destructive Outline Button

- Used in editable product item card.
- Background: `#FFFFFF`
- Border: `1px solid #EF4444`
- Text: `#EF4444`
- Size in component: `69px x 67px`
- Radius: `12px`

## Components

### Header

Source: `General.svg`.

Variants visible:

- Brand header with BC Market logo on the left and user/avatar icon on the right.
- Detail header with back arrow, title, and metadata.
- Section header with centered/standalone heading and subtitle.

Specifications:

- Header should use `text-primary` for main title.
- Metadata/subtitle should use `small` with `text-secondary`.
- Back control uses a left arrow icon and `Back` label in `text-primary`.
- Avatar icon uses a `40px x 40px` muted circle with `#E6E7EA` background and dark icon.

Use cases:

- `/home`: logo + account shortcut.
- `/listas/[id]`: back arrow + list name + progress metadata.
- Section blocks: title + subtitle.

### Card

#### Product Card

Source: `Card/ Product.svg`.

- Container: `358px x 146px`
- Radius: `16px`
- Background: `#FFFFFF`
- Padding: `16px`
- Shadow: elevated card shadow
- Category tag: `133px x 29px`, warning outline
- Title: `Producto`, `heading-md`, `#0F172A`
- Price: `RD$ 0.00`, `body`, `#0F172A`
- Action: outline green button, `106px x 39px`, label `Agregar a lista`

#### List Card

Source: `Card/ List.svg`.

- Container: `358px x 156px`
- Radius: `16px`
- Background: `#FFFFFF`
- Padding: `16px`
- Title: `Lista`, `heading-md`
- Metadata: `0 items · 0 comprados`, `small`, `#64748B`
- Action button: outline green, `92px x 43px`, label `Abrir`, arrow icon.

#### Product Item Card

Source: `Card/ Product Item.svg`.

- Container: `277px x 108px`
- Radius: `16px`
- Background: `#FFFFFF`
- Checkbox: `16px x 16px`, green border `#15803D`
- Title: `Producto`, `heading-md`
- Quantity: `0 uds`, secondary text
- Price: `RD$ 0.00`, secondary text
- Use inside shopping list detail/session.

#### Editable Item Card

Source: `Card/ Editable Item.svg`.

- Container: `358px x 100px`
- Radius: `16px`
- Background: `#FFFFFF`
- Title row: `Producto` + `RD$ 0.00`
- Quantity controls: plus/minus icon buttons, each `24px x 24px`, radius `4px`, background `#16A34A`
- Quantity label: centered, e.g. `1 unidad`
- Delete button: `69px x 67px`, outline danger

#### User Summary Card

Source: `Card/ User Summary.svg`.

- Container width follows card system, visually around `358px`
- Radius: `16px`
- Background: `#FFFFFF`
- Avatar: `60px x 60px`, circular, `#E6E7EA`
- Username: `heading-md`
- Email: `small`, `#64748B`
- Layout: centered vertical stack.

### Input

Sources: `Input/ Default.svg`, `Input/ Error.svg`.

#### Default Input

- Outer component: `360px x 73px`
- Field: `359px x 49px`
- Radius: `12.5px`
- Background: `#FFFFFF`
- Border: `1px solid #E6E7EA`
- Placeholder: `#64748B`
- Label above field: `label-small`, `#0F172A`

#### Error Input

- Same size as default input.
- Border: `1px solid #EF4444`
- Error icon: red X on the right.
- Error message: `#EF4444`, below input.

### SearchBar

Source: `SearchBar/ Catalog.svg`.

- Input container: `156px x 49px`
- Radius: `12.5px`
- Background: `#FFFFFF`
- Border: `1px solid #E6E7EA`
- Placeholder: `Busca productos...`, `#64748B`
- Filter icon sits to the right, dark neutral `#1E1E1E`.
- Use in catalog/home product browsing.

### Skeleton

Sources: `Skeleton/ Input.svg`, `Skeleton/ List.svg`, `General.svg`.

#### Input Skeleton

- Size: `359px x 49px`
- Radius: `12.5px`
- Background: `#FFFFFF`
- Border: `#E6E7EA`
- Internal loading line: `#64748B`

#### List/Text Skeleton

- Size: `136px x 56px` in exported component.
- Radius: `12px`
- Background: `#FFFFFF`
- Loading bars: `#64748B`

General skeleton pattern:

- White rounded container.
- Slate loading bars.
- Keep bars at stable widths to avoid layout jump.

### ConfirmationModal

Source: `General.svg`.

- Container: `224px x 192px`
- Radius: `12px`
- Background: `#F8FAFC`
- Title: centered, `heading-md`
- Description: centered, `body` or `small`
- Buttons:
  - Confirm: danger filled, `84px x 44px`
  - Cancel: green outline, `76px x 43px`
- Use for destructive or irreversible actions, especially delete list/product item.

### Toast

Source: `General.svg`.

- Size: `188px x 56px`
- Radius: `12px`
- Background: `#16A34A`
- Text: white
- Icon: check icon, white
- Example label: `Completed action`
- Position recommendation: bottom or top floating notification with short duration.

### Spinner

Source: `General.svg`.

- Container: `128px x 40px`
- Radius: `12px`
- Background: `#FFFFFF`
- Spinner icon: circular two-color mark using `#2563EB` and white.
- Label: placeholder/loading text in `#64748B`.
- Use for loading inline actions or compact loading states.

### Tag

Source: `General.svg`, `Card/ Product.svg`.

- Size: `133px x 29px`
- Radius: `12px`
- Background: `#FFFFFF`
- Border: `1px solid #F59E0B`
- Text: `#F59E0B`, `label-small`
- Example label: `Categoría`
- Use for product category labels.

### EmptyState

Source: `General.svg`.

- Icon: bookmark outline in `#64748B`
- Title: `Title`, centered, `body` or `heading-md`
- CTA: primary button, `110px x 44px`
- Use when a list/catalog/profile section has no content yet.

### ErrorState

Source: `General.svg`.

Error variant:

- Icon: red circle alert, `#EF4444`
- Title: `Title`, centered
- Retry button: green outline button, `118px x 43px`

Warning variant:

- Icon: amber outline alert, `#F59E0B`
- Title: `Title`, centered
- Retry button: green outline button, `118px x 43px`

Use the red variant for failures and the amber variant for recoverable warnings or empty data that needs attention.

## Page-Level Application

Map the components to the planned BC Market routes:

| Route | Components |
| --- | --- |
| `/login` | Input, Button, ErrorState/Toast |
| `/signup` | Input, Button, ErrorState/Toast |
| `/home` | Header, SearchBar, Tag, Product Card, EmptyState, Skeleton |
| `/listas` | Header, List Card, EmptyState, Skeleton, ConfirmationModal |
| `/listas/[id]` | Detail Header, Product Item Card, Editable Item Card, Toast, ConfirmationModal |
| `/cuenta` | Header, User Summary Card, Input, Button, Toast |

## Implementation Notes

- Prefer lucide icons for arrows, check, X, alert, bookmark, user, filter, plus, and minus.
- Preserve the rounded compact style from the SVGs.
- Use the 8px spacing scale consistently.
- Cards should use fixed min-heights matching the SVG proportions.
- Inputs and buttons should keep stable heights so states do not shift layout.
- Use semantic colors in code and centralize them in Tailwind/theme variables.
