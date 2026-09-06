# 🚀 AI-SDLC Starter Kit & Agentic-Native Framework

Repositorio central con la guía metodológica y las plantillas oficiales del **AI-Augmented Software Development Life Cycle (AI-SDLC)** y arquitectura **Agentic-Native** (inspirada en *Stripe Minions*).

---

## 📂 Catálogo Modular de Plantillas (`templates/`)

### 🤖 Módulos de Inteligencia Agéntica & Sandbox
- [`templates/AGENTS.md`](templates/AGENTS.md) — Entrypoint y directrices maestras para agentes IA.
- [`templates/.agents/rules/invariants.md`](templates/.agents/rules/invariants.md) — Límites arquitectónicos y de seguridad inviolables.
- [`templates/.agents/rules/commands.md`](templates/.agents/rules/commands.md) — Catálogo de Slash Commands (`/auto-perf`, `/adversarial`, `/precommit-audit`...).
- [`templates/.agents/rules/style-guide.md`](templates/.agents/rules/style-guide.md) — Estándares de tipado, código y tests.
- [`templates/.agents/skills/`](templates/.agents/skills/) — Habilidades agénticas nativas (`rsi-workflow`, `auto-perf`, `adversarial-fuzz`, `traceability-sync`).
- [`templates/.agents/tasks/TASK_TEMPLATE.md`](templates/.agents/tasks/TASK_TEMPLATE.md) — Contrato de tarea con comando de evaluación.
- [`templates/.agents/mcp/mcp-servers.json`](templates/.agents/mcp/mcp-servers.json) — Catálogo de herramientas MCP locales para el agente.
- [`templates/.agents/workflows/autonomous-pr.md`](templates/.agents/workflows/autonomous-pr.md) — Protocolo de empaquetado de PRs autónomos.
- [`templates/.devcontainer/devcontainer.json`](templates/.devcontainer/devcontainer.json) — Sandbox hermético para ejecución aislada.
- [`templates/evals/harness.mjs`](templates/evals/harness.mjs) — Script ejecutor del Eval Harness (Self-Healing Loop).

### 🏢 Arquitectura, Negocio & Diagramas (3ra Capa)
- [`templates/docs/INDEX.md`](templates/docs/INDEX.md) — Matriz de trazabilidad y navegación documental.
- [`templates/docs/use-cases/UC-001-template.md`](templates/docs/use-cases/UC-001-template.md) — Caso de Uso formal exhaustivo (Happy Path, Alternativos, Edge Cases, Boundary, Negativos, BDD Gherkin).
- [`templates/docs/diagrams/use-case-network/NET-001-template.md`](templates/docs/diagrams/use-case-network/NET-001-template.md) — Red de Trazabilidad: Requerimiento $\rightarrow$ Caso de Uso $\rightarrow$ Tarea $\rightarrow$ Subagente.
- [`templates/docs/diagrams/components/CMP-001-template.md`](templates/docs/diagrams/components/CMP-001-template.md) — Diagrama de Componentes e Interfaces con Ownership por Subagente.
- [`templates/docs/diagrams/robustness/ROB-001-template.md`](templates/docs/diagrams/robustness/ROB-001-template.md) — Diagrama de Robustez BCE (Frontera $\rightarrow$ Control $\rightarrow$ Entidad).
- [`templates/docs/architecture/c4-model-template.md`](templates/docs/architecture/c4-model-template.md) — Arquitectura C4 (Contexto, Contenedores, Componentes).
- [`templates/docs/diagrams/sequences/SEQ-001-template.md`](templates/docs/diagrams/sequences/SEQ-001-template.md) — Diagrama de Secuencia Mermaid.
- [`templates/docs/diagrams/activities/ACT-001-template.md`](templates/docs/diagrams/activities/ACT-001-template.md) — Diagrama de Actividad / Flujo lógico Mermaid.
- [`templates/docs/diagrams/state-machines/STM-001-template.md`](templates/docs/diagrams/state-machines/STM-001-template.md) — Máquina de Estados de Entidades Mermaid.
- [`templates/docs/diagrams/entity-relationship/ERD-001-template.md`](templates/docs/diagrams/entity-relationship/ERD-001-template.md) — Diagrama Entidad-Relación BD Mermaid.
- [`templates/docs/adr/ADR-0001-template.md`](templates/docs/adr/ADR-0001-template.md) — Registro de Decisiones de Arquitectura (ADR).
- [`templates/docs/specs/RFC-001-template.md`](templates/docs/specs/RFC-001-template.md) — Especificación técnica RFC.

### 📦 Gobernanza, Release & Continuidad
- [`CHANGELOG.md`](CHANGELOG.md) — Registro formal de versiones y cambios del framework (SemVer + Keep a Changelog).
- [`templates/HANDOFF.md`](templates/HANDOFF.md) — Snapshot vivo de estado y continuidad entre sesiones.
- [`templates/CHANGELOG.md`](templates/CHANGELOG.md) — Plantilla de Changelog para proyectos derivados.
- [`templates/CONTRIBUTING.md`](templates/CONTRIBUTING.md) — Convenciones Git, Commits y Quality Gates.

---

## ⚡ Cómo inicializar un nuevo proyecto con estas plantillas

Para aplicar este framework en cualquier repositorio nuevo, ejecuta desde la raíz:

```bash
# 1. Crear el árbol completo de directorios
mkdir -p .agents/{rules,tasks,mcp,workflows} .devcontainer evals/tasks docs/{architecture,use-cases,diagrams/{sequences,activities,state-machines,entity-relationship},adr,specs,qa}

# 2. Copiar todo el catálogo de plantillas
cp -R /Users/jlorenzor/Documents/ai-sdlc-framework/templates/* ./
cp -R /Users/jlorenzor/Documents/ai-sdlc-framework/templates/.agents ./
cp -R /Users/jlorenzor/Documents/ai-sdlc-framework/templates/.devcontainer ./
```
