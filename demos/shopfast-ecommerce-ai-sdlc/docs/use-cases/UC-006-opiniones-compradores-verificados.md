# 🎯 [UC-006] Calificaciones y Reseñas de Compradores Verificados

| Campo | Valor / Descripción |
| :--- | :--- |
| **Identificador Único:** | `UC-006` (Formato `UC-XXXX`, inmutable y secuencial) |
| **Módulo / Dominio:** | Opiniones y Calificaciones (§ 3.8 del PDF de Alcance) |
| **Prioridad de Negocio:** | MEDIA (P2) |
| **Estado:** | `VERIFIED 🟢` |
| **Impacto en Negocio:** | Generación de prueba social auténtica y prevención de spam o reseñas falsas. |
| **Requerimiento Origen:** | [`REQ-006`](../specs/RFC-001-mvp-core-architecture.md) |
| **Contrato de Tarea Agente:**| [`.agents/tasks/TASK-006-verified-product-reviews.md`](../../.agents/tasks/TASK-006-verified-product-reviews.md) |
| **Red de Trazabilidad:** | [`NET-001`](../diagrams/use-case-network/NET-001-template.md) |

---

## 1. Descripción del Negocio
Permitir a los clientes que hayan adquirido efectivamente un producto dejar una valoración cuantitativa de 1 a 5 estrellas y un comentario de texto (máximo 500 caracteres). El sistema garantiza la veracidad mediante la insignia de **"Comprador Verificado"** y previene la manipulación de reputación restringiendo la acción a **una única reseña por producto por usuario**.

---

## 2. Actores y Roles
- **Actor Principal:** Comprador con orden entregada o pagada.
- **Actor Secundario:** Administrador de la Tienda (moderación de contenido ofensivo).
- **Subagente IA Responsable:** `subagent-3` (Reviews y Catálogo).

---

## 3. Precondiciones Invariables
1. El usuario debe estar autenticado con sesión válida.
2. Debe existir al menos una orden en estado `PAGO_CONFIRMADO`, `ENVIADO` o `ENTREGADO` que contenga el `productId` a calificar.
3. El usuario no debe haber emitido una calificación previa para dicho producto.

---

## 4. Flujo Principal (Happy Path)
1. El comprador navega a la página del producto que adquirió previamente.
2. El sistema verifica en la base de datos relacional si existe un pedido completado por este usuario para dicho SKU.
3. Al comprobar que es **Comprador Verificado**, habilita el formulario de opinión.
4. El cliente selecciona 5 estrellas e introduce un comentario de 120 caracteres.
5. El sistema guarda la reseña con estado `ACTIVA`, asocia el badge de verificación y actualiza el promedio de valoración del producto en la caché de Redis.

---

## 5. Reglas de Negocio y Rechazo Defensivo
- **5.a Usuario No Comprador (Fraude de Reseñas):**
  - Si un usuario registrado intenta enviar una reseña sobre un producto que no ha comprado, el sistema rechaza la petición con `HTTP 403 Forbidden`: *"Solo los compradores verificados que hayan adquirido este producto pueden calificarlo"*.
- **5.b Segunda Reseña para el Mismo Producto (Duplicado):**
  - Si el comprador intenta emitir una segunda reseña para el mismo producto, el sistema responde con `HTTP 409 Conflict`: *"Ya has publicado una valoración para este producto"*.
- **5.c Límite de Longitud de Comentario (Regla 3.8):**
  - Textos mayores a 500 caracteres son rechazados por validación de esquema Zod con `HTTP 400 Bad Request`.

---

## 6. Criterios de Aceptación (BDD Gherkin)
```gherkin
Escenario: Publicación exitosa por comprador verificado
  Dado un usuario que compró exitosamente el producto "Laptop Pro"
  Cuando envía una calificación de 5 estrellas con comentario de 150 caracteres
  Entonces la reseña es almacenada y publicada con la insignia "Comprador Verificado"
  Y el promedio del producto se recalcula automáticamente

Escenario: Rechazo de reseña por usuario que no ha comprado el producto
  Dado un usuario registrado que nunca ha adquirido el producto "Monitor 4K"
  Cuando intenta publicar una calificación de 1 estrella
  Entonces el sistema rechaza la solicitud con código HTTP 403
  Y la reseña no se almacena en la base de datos
```
