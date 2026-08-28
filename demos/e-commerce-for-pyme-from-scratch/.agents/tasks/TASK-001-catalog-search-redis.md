# [TASK-001] Módulo de Catálogo & Búsqueda con Caché Redis L2

**ID:** `TASK-001` | **Módulo:** `src/modules/catalog/` | **Prioridad:** HIGH  
**Caso de Uso Asociado:** [`docs/use-cases/UC-001-busqueda-catalogo.md`](../../docs/use-cases/UC-001-busqueda-catalogo.md)  
**Branch Aislado:** `feat/task-001-catalog`  

## 🎯 1. Objetivo
Implementar el motor de catálogo con navegación a 3 niveles de categoría (Categoría > Subcategoría > Producto), búsqueda por nombre/SKU y almacenamiento en caché en Redis con respuesta `< 1.0s` para 2,500 items.

## 🔒 Invariantes de Aislamiento
- Aislado exclusivamente en `src/modules/catalog/`.
- No debe importar lógica de órdenes ni pagos.
- Caché reactiva con TTL de 15 minutos e invalidación por evento `catalog.product_updated`.

## 🧪 Comando de Evaluación
```bash
node evals/harness.mjs --task task-001
```
