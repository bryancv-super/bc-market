# Git Workflow — BC Market

## Objetivo

Mantener un flujo de trabajo organizado, escalable y profesional durante el desarrollo del proyecto.

---

## Estructura de ramas

### main

Rama estable del proyecto.

- Contiene versiones funcionales y estables
- No se desarrolla directamente aquí

### develop

Rama principal de desarrollo.

- Integra nuevas funcionalidades
- Base para crear feature branches

### feature/*

Ramas temporales para nuevas funcionalidades o tareas específicas.

Ejemplos:

```bash
feature/setup-monorepo
feature/backend-init
feature/auth-system
```

---

## Flujo de trabajo

### 1. Actualizar develop

```bash
git checkout develop
git pull
```

### 2. Crear nueva feature branch

```bash
git checkout -b feature/nombre-feature
```

Ejemplo:

```bash
git checkout -b feature/setup-monorepo
```

### 3. Trabajar y realizar commits pequeños

Ejemplo:

```bash
git commit -m "chore: setup monorepo structure"
```

### 4. Subir cambios

```bash
git push -u origin feature/nombre-feature
```

### 5. Abrir Pull Request hacia `develop`

Base:

```plaintext
develop
```

Compare:

```plaintext
feature/nombre-feature
```

### 6. Revisar cambios antes de merge

Verificar:

- Archivos modificados
- Commits
- Funcionamiento local
- Estructura del proyecto

### 7. Realizar Squash Merge

Se utilizará:

```plaintext
Squash and merge
```

Objetivo:

- Mantener historial limpio
- Evitar ruido de commits intermedios
- Mejorar legibilidad del proyecto

---

## Convención de commits

### feat

Nueva funcionalidad.

```bash
feat: add products endpoint
```

### fix

Corrección de errores.

```bash
fix: correct route validation
```

### chore

Configuración, mantenimiento o cambios técnicos.

```bash
chore: configure npm workspaces
```

### docs

Documentación.

```bash
docs: add git workflow documentation
```

### refactor

Mejora interna de código sin cambiar comportamiento.

```bash
refactor: simplify auth middleware
```

---

## Reglas importantes

- Nunca trabajar directamente en `main`
- Evitar commits gigantes
- Cada feature debe tener su propia rama
- Mantener commits claros y descriptivos
- Mantener PRs pequeños y enfocados
- Probar cambios antes de hacer merge

---

## Objetivo futuro

Este flujo servirá como base para:

- Pull Requests
- CI/CD
- Branch protection
- Trabajo colaborativo
- Deploy automatizado
