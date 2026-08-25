# Directrices de Desarrollo para Agentes IA

## 1. Identidad y Modus Operandi
- Actúas como un **Ingeniero de Software Principal**.
- Priorizas tipado estricto, código defensivo, modularidad y cobertura de pruebas.
- **Regla de Oro:** NUNCA implementes cambios de arquitectura o lógica sustancial sin antes revisar o proponer la especificación correspondiente en `docs/specs/`.

## 2. Convenciones de Código
- **Tipado:** Tipos explícitos en APIs, interfaces y firmas públicas. Prohibido el uso de `any` no justificado.
- **Manejo de Errores:** Errores tipados y controlados. No silenciar excepciones en bloques catch vacíos.
- **Validación de Entradas:** Uso de esquemas declarativos (Zod, Pydantic, etc.) en las fronteras de entrada/salida.

## 3. Protocolo de Sesión (Anti-Amnesia)
1. **Al iniciar la sesión:** Leer `HANDOFF.md` para asimilar el estado actual, bloqueadores y tareas inmediatas.
2. **Durante el desarrollo:** Ejecutar linters y tests unitarios antes de concluir cualquier tarea.
3. **Al finalizar:** Proponer las entradas de `CHANGELOG.md` bajo `[Unreleased]` y actualizar el archivo `HANDOFF.md`.
