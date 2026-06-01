# Git Workflow — BC Market

## Objective

Maintain an organized, scalable, and professional development workflow.

---

## Branch Structure

### main

Stable production-ready branch.

- Contains stable versions of the project
- Direct development is not allowed

### develop

Main development branch.

- Integrates completed features
- Base branch for feature branches

### feature/*

Temporary branches for specific features or tasks.

Examples:

```bash
feature/setup-monorepo
feature/backend-init
feature/auth-system
```

---

## Workflow

### 1. Update develop

```bash
git checkout develop
git pull
```

### 2. Create a feature branch

```bash
git checkout -b feature/feature-name
```

Example:

```bash
git checkout -b feature/setup-monorepo
```

### 3. Work and create small commits

Example:

```bash
git commit -m "chore: setup monorepo structure"
```

### 4. Push changes

```bash
git push -u origin feature/feature-name
```

### 5. Open Pull Request into develop

Base branch:

```plaintext
develop
```

Compare branch:

```plaintext
feature/feature-name
```

### 6. Review changes before merging

Verify:

- Modified files
- Commit history
- Local functionality
- Project structure

### 7. Use Squash and Merge

Strategy:

```plaintext
Squash and merge
```

Purpose:

- Keep commit history clean
- Avoid noisy intermediate commits
- Improve repository readability

---

## Commit Convention

### feat

New feature.

```plaintext
feat: add authentication routes
```

### fix

Bug fix.

```plaintext
fix: correct route validation
```

### chore

Maintenance or configuration changes.

```plaintext
chore: configure npm workspaces
```

### docs

Documentation updates.

```plaintext
docs: add git workflow documentation
```

### refactor

Internal code improvements without changing behavior.

```plaintext
refactor: simplify auth middleware
```

---

## Rules

- Never work directly on `main`
- Avoid large commits
- One feature per branch
- Keep commits descriptive
- Test changes before merging

---

## Future Goals

This workflow will support:

- Pull Requests
- CI/CD
- Branch protection
- Team collaboration
- Automated deployments
