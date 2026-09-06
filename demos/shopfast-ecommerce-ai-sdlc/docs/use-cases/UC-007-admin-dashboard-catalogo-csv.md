# 🎯 [UC-007] Panel de Administración, Carga Masiva CSV y Alertas de Inventario

| Campo | Valor / Descripción |
| :--- | :--- |
| **Identificador Único:** | `UC-007` (Formato `UC-XXXX`, inmutable y secuencial) |
| **Módulo / Dominio:** | Panel de Administración (§ 3.9 del PDF de Alcance) |
| **Prioridad de Negocio:** | ALTA (P1) |
| **Estado:** | `VERIFIED 🟢` |
| **Impacto en Negocio:** | Operación masiva del catálogo de 2,500 productos y detección proactiva de quiebres de stock. |
| **Requerimiento Origen:** | [`REQ-007`](../specs/RFC-001-mvp-core-architecture.md) |
| **Contrato de Tarea Agente:**| [`.agents/tasks/TASK-007-admin-dashboard-and-csv-import.md`](../../.agents/tasks/TASK-007-admin-dashboard-and-csv-import.md) |
| **Red de Trazabilidad:** | [`NET-TEMPLATE`](../diagrams/use-case-network/NET-TEMPLATE.md) |

---

## 1. Descripción del Negocio
Proveer al equipo de operaciones de ShopFast un panel administrativo para la importación masiva del catálogo inicial (archivo CSV con 2,500 productos), gestión del ciclo de vida de productos (especificaciones clave-valor, imágenes, visibilidad activo/inactivo), visualización de métricas clave (ventas, pedidos, conversión) y **emisión automática de alertas de inventario crítico para productos con menos de 10 unidades disponibles** (Regla 3.9.4).

---

## 2. Actores y Roles
- **Actor Principal:** Administrador de la Tienda / Equipo de Operaciones (3 personas).
- **Subagente IA Responsable:** `subagent-1` (Admin y Catálogo).

---

## 3. Precondiciones Invariables
1. El usuario debe poseer rol `ADMIN` verificado en sus claims de sesión JWT.
2. El archivo CSV para carga masiva debe contener las cabeceras requeridas: `sku,name,category,price,stock`.
3. El proceso de importación masiva debe ejecutarse en bloques transaccionales (`batchSize: 500`) para evitar bloqueos prolongados en la base de datos.

---

## 4. Flujo Principal (Happy Path)
1. El administrador accede al panel `/admin/products/import` y carga el archivo CSV con 2,500 productos.
2. El sistema parsea y valida cada fila contra el esquema DTO de producto.
3. El sistema realiza inserción masiva (`INSERT ... ON CONFLICT DO UPDATE`), invalidando las claves de caché de catálogo en Redis.
4. El sistema audita los niveles de inventario e identifica todos los productos cuyo stock sea inferior a 10 unidades.
5. El sistema genera un listado de alertas de reabastecimiento en el dashboard principal con badges de advertencia visual.

---

## 5. Reglas de Negocio y Casos Límite
- **5.a Alerta Crítica de Inventario Bajo (Regla 3.9.4):**
  - Cualquier producto activo con `stock < 10` dispara la bandera `lowStockAlert: true` y se destaca en la cola de compras para reordenar a proveedores.
- **5.b Filas Corruptas en CSV:**
  - Si un registro del CSV contiene precios negativos o SKU vacío, el sistema rechaza la fila específica, la agrega al reporte de errores de importación y continúa procesando el resto del archivo sin abortar toda la operación.

---

## 6. Criterios de Aceptación (BDD Gherkin)
```gherkin
Escenario: Importación masiva de 2,500 productos vía CSV
  Dado un archivo CSV válido con 2,500 productos del cliente retail
  Cuando el administrador ejecuta la importación masiva
  Entonces el sistema procesa exitosamente los 2,500 registros
  Y la caché de catálogo en Redis se actualiza de forma atómica

Escenario: Generación de alertas para productos con stock menor a 10
  Dado un catálogo con productos cuyos stocks son 15, 8, 3 y 50 unidades
  Cuando el servicio administrativo audita el inventario
  Entonces se generan alertas de bajo inventario exactamente para los productos con 8 y 3 unidades
  Y los productos con 15 y 50 unidades no generan alertas
```
