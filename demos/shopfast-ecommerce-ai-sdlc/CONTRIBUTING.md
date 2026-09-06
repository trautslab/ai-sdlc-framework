# Guía de Contribución — ShopFast Platform

## 1. Convención de Ramas
- `feat/task-xxx-descripcion`: Nuevas funcionalidades del MVP.
- `fix/issue-xxx-descripcion`: Corrección de errores.
- `docs/tema-actualizado`: Actualizaciones de diagramas y especificaciones.

## 2. Conventional Commits & SemVer
Cada commit debe seguir la convención: `<tipo>(<módulo>): <descripción>`

- `feat(checkout): add 3-step checkout form validation` *(Bump MINOR)*
- `fix(catalog): resolve cache invalidation on stock update` *(Bump PATCH)*
- `docs(use-cases): add Gherkin scenarios for wishlist`
- `test(orders): add concurrency tests for stock reservation`

## 3. Quality Gates de ShopFast
Antes de abrir un Pull Request:
1. `npm run lint` — Cero advertencias.
2. `npm run typecheck` — TypeScript estricto sin `any`.
3. `node evals/harness.mjs --task task-001` — Eval Harness en 100% PASSED.
4. Actualizar `CHANGELOG.md` en `[Unreleased]` y `HANDOFF.md`.
