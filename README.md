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

### ☁️ Despliegue, Infraestructura & Gobernanza de Ambientes
- [`templates/docs/diagrams/deployment/DEP-TEMPLATE.md`](templates/docs/diagrams/deployment/DEP-TEMPLATE.md) — Diagrama de Despliegue Multi-Cloud Agnóstico (AWS, GCP, Azure, OCI, Cloudflare, Supabase, Vercel).
- [`templates/docs/diagrams/network-topology/SEC-NET-TEMPLATE.md`](templates/docs/diagrams/network-topology/SEC-NET-TEMPLATE.md) — Topología de Red, Subnets DMZ, WAF y Seguridad Zero-Trust.
- [`templates/docs/environments/ENV-MATRIX-TEMPLATE.md`](templates/docs/environments/ENV-MATRIX-TEMPLATE.md) — Matriz de 4 Ambientes (DEV / QA / UAT / PROD) y Gestión de Secretos en Vaults/KMS.
- [`templates/docs/finops/FINOPS-TEMPLATE.md`](templates/docs/finops/FINOPS-TEMPLATE.md) — Modelo FinOps, Bill of Materials (BOM), Presupuesto Cloud y Tokenomics.

### 🏢 Arquitectura, Negocio & Diagramas (3ra Capa)
- [`templates/docs/INDEX.md`](templates/docs/INDEX.md) — Matriz de trazabilidad y navegación documental.
- [`templates/docs/use-cases/UC-TEMPLATE.md`](templates/docs/use-cases/UC-TEMPLATE.md) — Caso de Uso formal exhaustivo (Happy Path, Alternativos, Edge Cases, Boundary, Negativos, BDD Gherkin).
- [`templates/docs/diagrams/use-case-network/NET-TEMPLATE.md`](templates/docs/diagrams/use-case-network/NET-TEMPLATE.md) — Red de Trazabilidad: Requerimiento $\rightarrow$ Caso de Uso $\rightarrow$ Tarea $\rightarrow$ Subagente.
- [`templates/docs/diagrams/components/CMP-TEMPLATE.md`](templates/docs/diagrams/components/CMP-TEMPLATE.md) — Diagrama de Componentes e Interfaces con Ownership por Subagente.
- [`templates/docs/diagrams/robustness/ROB-TEMPLATE.md`](templates/docs/diagrams/robustness/ROB-TEMPLATE.md) — Diagrama de Robustez BCE (Frontera $\rightarrow$ Control $\rightarrow$ Entidad).
- [`templates/docs/architecture/c4-model-TEMPLATE.md`](templates/docs/architecture/c4-model-TEMPLATE.md) — Arquitectura C4 (Contexto, Contenedores, Componentes).
- [`templates/docs/diagrams/sequences/SEQ-TEMPLATE.md`](templates/docs/diagrams/sequences/SEQ-TEMPLATE.md) — Diagrama de Secuencia Mermaid.
- [`templates/docs/diagrams/activities/ACT-TEMPLATE.md`](templates/docs/diagrams/activities/ACT-TEMPLATE.md) — Diagrama de Actividad / Flujo lógico Mermaid.
- [`templates/docs/diagrams/state-machines/STM-TEMPLATE.md`](templates/docs/diagrams/state-machines/STM-TEMPLATE.md) — Máquina de Estados de Entidades Mermaid.
- [`templates/docs/diagrams/entity-relationship/ERD-TEMPLATE.md`](templates/docs/diagrams/entity-relationship/ERD-TEMPLATE.md) — Diagrama Entidad-Relación BD Mermaid.
- [`templates/docs/diagrams/gantt/GANTT-TEMPLATE.md`](templates/docs/diagrams/gantt/GANTT-TEMPLATE.md) — Cronograma Dinámico Humano-IA, RACI y Protocolo de Rollback/Post-Mortem.
- [`templates/docs/adr/ADR-TEMPLATE.md`](templates/docs/adr/ADR-TEMPLATE.md) — Registro de Decisiones de Arquitectura (ADR).
- [`templates/docs/specs/RFC-TEMPLATE.md`](templates/docs/specs/RFC-TEMPLATE.md) — Especificación técnica RFC.

### 📦 Gobernanza, Release & Continuidad
- [`CHANGELOG.md`](CHANGELOG.md) — Registro formal de versiones y cambios del framework (SemVer + Keep a Changelog).
- [`templates/HANDOFF.md`](templates/HANDOFF.md) — Snapshot vivo de estado y continuidad entre sesiones.
- [`templates/CHANGELOG.md`](templates/CHANGELOG.md) — Plantilla de Changelog para proyectos derivados.
- [`templates/CONTRIBUTING.md`](templates/CONTRIBUTING.md) — Convenciones Git, Commits y Quality Gates.

---

## 🏆 Proyecto de Referencia Definitivo: ShopFast E-Commerce (`demos/shopfast-ecommerce-ai-sdlc`)

El repositorio incluye un proyecto de referencia **100% completo, ejecutable y auditado**, generado a partir de la especificación real en PDF ([`Caso-Práctico-Documento-de-Alcance.pdf`](demos/shopfast-ecommerce-ai-sdlc/Caso-Práctico-Documento-de-Alcance.pdf)):

- **Stack**: TypeScript estricto, Node.js, Vitest, PostgreSQL, Redis, Stripe Checkout SDK, CourierFast Shipping API.
- **Trazabilidad 3-Capas**: Requerimientos $\rightarrow$ Casos de Uso formales (`UC-001` a `UC-003`) $\rightarrow$ Tareas (`TASK-001` a `TASK-007`) $\rightarrow$ Diagramas Mermaid (`C4`, `NET-001`, `CMP-001`, `ROB-001`, `SEQ-001`, `ACT-001`, `STM-001`, `ERD-001`, `DEP-001`, `SEC-NET-001`, `GANTT-001`).
- **RSI (Recursive Self-Improvement)**: 6 scripts autónomos de auto-fuzzing, auto-perf, compactación de contexto, sync de ADRs y micro-SWE-bench.
- **Mission Control**: Dashboard DevTools visual con apertura automática en navegador (`http://localhost:3333`).

### 🚀 Comandos Rápidos del Framework:

```bash
# 1. Ejecutar la suite completa de tests de la demo ShopFast
npm run demo:test

# 2. Correr la auditoría de los 7 Quality Gates Pre-Commit
npm run precommit:audit

# 3. Ejecutar los 6 bucles de Recursive Self-Improvement (RSI)
npm run rsi:suite

# 4. Iniciar el Mission Control con apertura automática del navegador
npm run demo:live
# O simular un ciclo agéntico en vivo con telemetría en tiempo real:
npm run simulate:live
```

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
