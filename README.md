# 🚀 AI-SDLC Starter Kit & Framework

Repositorio central con la guía metodológica y las plantillas oficiales del **AI-Augmented Software Development Life Cycle**.

## 📂 Contenido del Directorio

- [`AI-SDLC-GUIDELINES.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/AI-SDLC-GUIDELINES.md) — Documento maestro con los principios, fases de desarrollo, estándares de versionado y automatizaciones recomendadas.
- **`templates/`** — Plantillas listas para copiar a nuevos repositorios:
  - [`templates/AGENTS.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/AGENTS.md)
  - [`templates/HANDOFF.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/HANDOFF.md)
  - [`templates/CHANGELOG.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/CHANGELOG.md)
  - [`templates/CONTRIBUTING.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/CONTRIBUTING.md)
  - [`templates/docs/specs/RFC-001-template.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/specs/RFC-001-template.md)
  - [`templates/docs/adr/ADR-0001-template.md`](file:///Users/jlorenzor/Documents/ai-sdlc-framework/templates/docs/adr/ADR-0001-template.md)

---

## ⚡ Cómo inicializar un nuevo proyecto con estas plantillas

Para aplicar este framework en cualquier proyecto nuevo, ejecuta desde la raíz de tu nuevo repositorio:

```bash
# Crear estructura de carpetas
mkdir -p docs/specs docs/adr docs/diagrams docs/qa .agents/rules

# Copiar plantillas base
cp -R /Users/jlorenzor/Documents/ai-sdlc-framework/templates/* ./
```
