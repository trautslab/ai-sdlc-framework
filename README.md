# 🚀 AI-SDLC Starter Kit & Framework

Repositorio central con la guía metodológica y las plantillas oficiales del **AI-Augmented Software Development Life Cycle**.

## 📂 Contenido del Directorio

- [`AI-SDLC-GUIDELINES.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/AI-SDLC-GUIDELINES.md) — Documento maestro con los principios, fases de desarrollo, estándares de versionado y automatizaciones recomendadas.
- **`templates/`** — Catálogo modular listo para copiar a nuevos repositorios:
  - [`templates/AGENTS.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/AGENTS.md) — Reglas y directrices para agentes IA.
  - [`templates/HANDOFF.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/HANDOFF.md) — Snapshot vivo de estado y continuidad.
  - [`templates/CHANGELOG.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/CHANGELOG.md) — Keep a Changelog + SemVer.
  - [`templates/CONTRIBUTING.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/CONTRIBUTING.md) — Convenciones Git y Quality Gates.
  - [`templates/docs/INDEX.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/INDEX.md) — Matriz de trazabilidad y navegación documental.
  - [`templates/docs/architecture/c4-model-template.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/architecture/c4-model-template.md) — Arquitectura C4 (Contexto, Contenedores, Componentes).
  - [`templates/docs/use-cases/UC-001-template.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/use-cases/UC-001-template.md) — Especificación formal de Caso de Uso (BDD Gherkin).
  - [`templates/docs/diagrams/sequences/SEQ-001-template.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/diagrams/sequences/SEQ-001-template.md) — Diagrama de Secuencia Mermaid.
  - [`templates/docs/diagrams/activities/ACT-001-template.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/diagrams/activities/ACT-001-template.md) — Diagrama de Actividad / Flujo lógico Mermaid.
  - [`templates/docs/diagrams/state-machines/STM-001-template.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/diagrams/state-machines/STM-001-template.md) — Diagrama de Máquinas de Estados Mermaid.
  - [`templates/docs/diagrams/entity-relationship/ERD-001-template.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/diagrams/entity-relationship/ERD-001-template.md) — Diagrama Entidad-Relación BD Mermaid.
  - [`templates/docs/adr/ADR-0001-template.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/adr/ADR-0001-template.md) — Registro de Decisiones de Arquitectura.
  - [`templates/docs/specs/RFC-001-template.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/specs/RFC-001-template.md) — Especificación técnica RFC.

---

## ⚡ Cómo inicializar un nuevo proyecto con estas plantillas

Para aplicar este framework en cualquier proyecto nuevo, ejecuta desde la raíz de tu nuevo repositorio:

```bash
# Crear estructura de carpetas
mkdir -p docs/{architecture,use-cases,diagrams/{sequences,activities,state-machines,entity-relationship},adr,specs,qa} .agents/rules

# Copiar plantillas base
cp -R /Users/jlorenzor/Documents/ai-sdlc-framework/templates/* ./
```
