# 🎯 [UC-005] Autenticación, Gestión de Sesiones y Libreta de Direcciones

| Campo | Valor / Descripción |
| :--- | :--- |
| **Identificador Único:** | `UC-005` (Formato `UC-XXXX`, inmutable y secuencial) |
| **Módulo / Dominio:** | Usuario y Autenticación (§ 3.2 del PDF de Alcance) |
| **Prioridad de Negocio:** | CRÍTICA (P0) |
| **Estado:** | `VERIFIED 🟢` |
| **Impacto en Negocio:** | Registro seguro de compradores, reducción de fricción en recompra y control de hasta 5 direcciones. |
| **Requerimiento Origen:** | [`REQ-005`](../specs/RFC-001-mvp-core-architecture.md) |
| **Contrato de Tarea Agente:**| [`.agents/tasks/TASK-005-user-auth-and-address-book.md`](../../.agents/tasks/TASK-005-user-auth-and-address-book.md) |
| **Red de Trazabilidad:** | [`NET-001`](../diagrams/use-case-network/NET-001-template.md) |

---

## 1. Descripción del Negocio
Permitir a los compradores registrarse mediante correo/contraseña o inicio de sesión social (Google, Facebook), gestionar sus sesiones con expiración de 7 días de inactividad y administrar una libreta de direcciones de envío (CRUD) con un límite estricto de **hasta 5 direcciones por usuario** y selección de una dirección predeterminada para agilizar el checkout.

---

## 2. Actores y Roles
- **Actor Principal:** Comprador Registrado.
- **Actor Secundario:** Visitante No Registrado (Prospecto).
- **Subagente IA Responsable:** `subagent-1` (Auth y Seguridad).

---

## 3. Precondiciones Invariables
1. El correo electrónico debe ser unívoco en el sistema (sin duplicados).
2. La contraseña debe tener al menos 8 caracteres, incluyendo al menos 1 letra mayúscula y 1 número (Regla 3.2.1).
3. Las contraseñas deben persistirse hasheadas con bcrypt (salt factor $\ge 12$).

---

## 4. Flujo Principal (Happy Path)
1. El usuario se registra con nombre, email y contraseña segura.
2. El sistema valida la unicidad del email, almacena el hash y genera un token JWT de sesión válido por 7 días.
3. El usuario ingresa a su perfil e introduce una nueva dirección de despacho (calle, ciudad, receptor y teléfono).
4. El sistema asigna la dirección como predeterminada (`isDefault: true`) y la almacena en PostgreSQL.
5. Durante compras futuras, el sistema precarga automáticamente la dirección predeterminada en el Checkout.

---

## 5. Casos Límite y Reglas de Negocio
- **5.a Límite Estricto de 5 Direcciones (Regla 3.2.3):**
  - Si un usuario con 5 direcciones intenta registrar una sexta, el sistema rechaza la operación con `HTTP 422 Unprocessable Entity`: *"Has alcanzado el límite máximo de 5 direcciones. Edita o elimina una existente"*.
- **5.b Recuperación de Contraseña con Token Temporal (Regla 3.2.2):**
  - El enlace de restablecimiento emitido por email expira deterministamente tras 60 minutos (1 hora).

---

## 6. Criterios de Aceptación (BDD Gherkin)
```gherkin
Escenario: Registro de dirección predeterminada
  Dado un usuario autenticado con 2 direcciones registradas
  Cuando registra una nueva dirección en "Medellín" marcada como predeterminada
  Entonces la nueva dirección se guarda exitosamente
  Y las otras 2 direcciones pasan automáticamente a isDefault: false

Escenario: Rechazo al superar el límite de 5 direcciones
  Dado un usuario que ya posee 5 direcciones en su libreta
  Cuando intenta agregar una sexta dirección
  Entonces el sistema rechaza la solicitud con error de validación
  Y el número total de direcciones se mantiene en exactamente 5
```
