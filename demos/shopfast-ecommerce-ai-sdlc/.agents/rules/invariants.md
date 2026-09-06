# 🛡️ Invariantes Arquitectónicos y Límites Inviolables

Estos invariantes son **reglas duras no negociables** para cualquier agente de IA o desarrollador humano. Cualquier PR o commit que viole uno de estos invariantes debe ser rechazado automáticamente.

---

## 1. Límites de Capas y Dependencias
- **Aislamiento de Controladores:** Los controladores HTTP / Handlers NUNCA deben interactuar directamente con la capa de persistencia SQL o drivers de base de datos. Toda consulta debe encapsularse en un `Repository` o `DomainService`.
- **Independencia del Dominio:** La capa de entidades y reglas de negocio no debe depender de frameworks externos (Express, Nest, FastAPI, React).
- **Cero Consultas N+1:** Las consultas a colecciones de datos deben utilizar `JOIN`, `DataLoader` o batching explícito.

---

## 2. Seguridad & Secretos
- **Cero Secretos en Código:** Prohibido hardcodear API Keys, tokens JWT, contraseñas o URIs de base de datos. Todo debe cargarse vía variables de entorno validadas con schema.
- **Validación en Fronteras:** Toda entrada externa (query params, body, headers, webhooks) debe validarse estrictamente contra un esquema declarativo (Zod, Pydantic, etc.) antes de ingresar a la lógica de negocio.
- **Principio de Mínimo Privilegio:** Ningún endpoint debe exponer campos de entidades internas sensibles (e.g. `password_hash`, `internal_roles`) en sus DTOs de respuesta.

---

## 3. Integridad de Datos y Transacciones
- **Atomicidad Obligatoria:** Toda operación que modifique dos o más entidades relacionadas debe ejecutarse dentro de un bloque transaccional (`BEGIN ... COMMIT / ROLLBACK`).
- **Idempotencia en Operaciones Críticas:** Los endpoints que procesen pagos, transferencias o generación de órdenes deben exigir y validar cabeceras de idempotencia (`Idempotency-Key`).

---

## 4. Pruebas y Cobertura
- **No Test, No Merge:** Ningún nuevo endpoint, función de negocio o bugfix se considera terminado sin una prueba unitaria o de integración que reproduzca el caso de uso y sus escenarios de error.
- **Prohibido Modificar Tests para "Hacerlos Pasar":** Si un test falla tras un refactor, la implementación debe ajustarse para cumplir el contrato del test, nunca relajar las aserciones a menos que el RFC explícitamente cambie la regla de negocio.

---

## 5. Correlatividad e Inmutabilidad de Identificadores (Anti-Alucinación)
- **Prefijos Estrictos por Categoría:** Todo artefacto debe utilizar su prefijo unívoco inmutable con formato de 3 a 4 dígitos:
  - Requerimientos: `REQ-001`, `REQ-002`...
  - Casos de Uso: `UC-001`, `UC-002`...
  - Tareas Agénticas: `TASK-001`, `TASK-002`...
  - Registros de Arquitectura: `ADR-0001`, `ADR-0002`...
  - Diagramas de Despliegue: `DEP-001`, `DEP-002`...
  - Diagramas de Seguridad y Red: `SEC-001`, `SEC-002`...
  - Matrices de Ambiente: `ENV-001`, `ENV-002`...
  - Modelos FinOps: `FIN-001`, `FIN-002`...
  - Diagramas de Componentes: `CMP-001`, `CMP-002`...
  - Diagramas de Robustez: `ROB-001`, `ROB-002`...
  - Redes de Trazabilidad: `NET-001`, `NET-002`...
- **Prohibición Estricta de Duplicación y Reciclaje de IDs:** Queda estrictamente prohibido que un LLM o desarrollador asigne el mismo ID a dos archivos distintos o invente secuencias no correlativas.
- **Verificación en Pre-Commit:** El guardián determinista `npm run precommit:audit` escanea todo el repositorio y aborta el commit con `exit code 1` si detecta colisiones de IDs intra o inter-categoría.

