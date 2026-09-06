# 📋 Changelog — AI-SDLC Framework & Starter Kit

Todas las modificaciones notables, evoluciones arquitectónicas, incorporaciones del Estado del Arte (SOTA) y adiciones de plantillas de este proyecto se documentan formalmente en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y sigue [Semantic Versioning (SemVer 2.0.0)](https://semver.org/lang/es/).

---

## [Unreleased]

---

## [1.5.0] - 2026-09-05

### 🧹 Refactored (Desduplicación Canónica & Arquitectura Híbrida Limpia)
- **Eliminación de Redundancia en Raíz:** Eliminada la carpeta duplicada `scripts/` de la raíz del framework; el `package.json` de la raíz ahora enruta directamente a la única fuente canónica en `templates/scripts/`.
- **Symlink Canónico `.agents`:** La carpeta `.agents/` en la raíz se convirtió en un enlace simbólico canónico a `templates/.agents`, garantizando que cualquier agente o CLI que opere en la raíz lea y escriba directamente en la plantilla maestra con **cero desincronización y cero duplicación en disco**.

### 🏆 Added (Consolidación de Demo Única Oficial)
- **Creación de `demos/shopfast-ecommerce-ai-sdlc/`:** Demo única, autosuficiente y canónica que reemplaza y unifica las 3 demos anteriores (`e-commerce-for-pyme`, `e-commerce-for-pyme-from-scratch`, `e-commerce-for-pyme-with-ai-sdlc`), incorporando:
  - Requerimientos originales en PDF (`Caso-Práctico-Documento-de-Alcance.pdf`).
  - Todas las especificaciones de la 3ra Capa de Negocio (`UC-001`, `NET-001`, `CMP-001`, `ROB-001`, `GANTT-001`).
  - Toda la infraestructura Multi-Cloud (`DEP-001`, `SEC-NET-001`, `ENV-MATRIX`, `FINOPS-001`).
  - Implementación TypeScript funcional con 16 tests pasando (`npm test`) y 7/7 Quality Gates en pre-commit.
  - Servidor de telemetría en tiempo real (`observability/` y SSE streaming).

### ⏱️ Added (Cronograma Dinámico Humano-IA & Protocolo de Rollback)
- **Diagrama de Gantt Humano-IA (`GANTT-001`):** [`templates/docs/diagrams/gantt/GANTT-001-template.md`](templates/docs/diagrams/gantt/GANTT-001-template.md) con desglose de responsabilidades RACI entre Agente IA, Tech Lead y Product Owner.
- **Protocolo de Auditoría y Rollback Ante Alucinaciones:** Guía técnica para inspeccionar `events.jsonl`, aislar o descartar worktrees corruptos y aplicar `git revert` atómico con inyección de stack trace en el prompt de Reflexion.
- **Auto-Apertura de Navegador en Observabilidad:** Actualizado `templates/scripts/serve-dashboard.mjs` para lanzar automáticamente el navegador web en `http://localhost:3333` al iniciar el dashboard.

---

## [1.4.0] - 2026-09-05

### ☁️ Added (Topología de Despliegue Multi-Cloud & Gobernanza de Ambientes)
- **Diagrama de Despliegue Multi-Cloud Agnóstico (`DEP-001`):** [`templates/docs/diagrams/deployment/DEP-001-template.md`](templates/docs/diagrams/deployment/DEP-001-template.md) con modelado C4/UML y tabla de equivalencias técnicas para **AWS, GCP, Azure, Oracle OCI, Cloudflare, Supabase y Vercel**.
- **Topología de Red & Seguridad Zero-Trust (`SEC-NET-001`):** [`templates/docs/diagrams/network-topology/SEC-NET-001-template.md`](templates/docs/diagrams/network-topology/SEC-NET-001-template.md) con segmentación en Subnets (DMZ Pública, App Privada, Datos Aislados), WAF, NAT Gateways, Security Groups y Políticas IAM de Mínimo Privilegio.
- **Matriz de Gobernanza de 4 Ambientes (`ENV-MATRIX`):** [`templates/docs/environments/ENV-MATRIX-template.md`](templates/docs/environments/ENV-MATRIX-template.md) formalizando el ciclo `DEV` $\rightarrow$ `QA` $\rightarrow$ `UAT` $\rightarrow$ `PROD`, gestión de secretos en Vaults/KMS y Quality Gates deterministas de promoción.
- **Modelo FinOps & Presupuesto Cloud (`FINOPS-001`):** [`templates/docs/finops/FINOPS-001-template.md`](templates/docs/finops/FINOPS-001-template.md) con Bill of Materials (BOM), costos fijos mensuales por ambiente, consumo elástico variable, tokenomics agénticos de IA y comisiones de pasarela Stripe.

### 🛡️ Added (Invariante Universal Anti-Alucinación de Identificadores)
- **Regla Inviolable en `invariants.md` (Sección 5):** Prefijos formales obligatorios (`DEP-XXXX`, `SEC-XXXX`, `ENV-XXXX`, `FIN-XXXX`, `UC-XXXX`, `TASK-XXXX`, `ADR-XXXX`), prohibición de duplicación y reciclaje de IDs entre archivos.
- **Validación Multi-Categoría en Pre-Commit:** Escaneo estático en `pre-commit-guard.mjs` que aborta commits si detecta colisiones de identificadores en todo el árbol de documentación.

### 🚀 Added (Habilidad de Despliegue Agéntico & Comandos)
- **Deployer Skill (`.agents/skills/deploy-pipeline/SKILL.md`):** Protocolo para que los agentes orquesten despliegues automáticos consultando secretos de Vaults/MCPs y verificando health checks post-despliegue.
- **Slash Commands (`commands.md`):** Inclusión de `/deploy [ambiente]` y `/finops-estimate`.

---

## [1.3.0] - 2026-09-05

### 🏢 Added (3ra Capa: Negocio, Product Owners & Funcionales)
- **Plantilla Exhaustiva de Casos de Uso Formales:** [`templates/docs/use-cases/UC-001-template.md`](templates/docs/use-cases/UC-001-template.md) con desglose estricto de:
  - Happy Path (Flujo Nominal).
  - Alternate Paths (Flujos Alternativos).
  - Edge Cases & Lateral Scenarios (Concurrencia, Timeouts, Circuit Breakers).
  - Boundary Cases (Umbrales Numéricos y Valores Frontera).
  - Negative Cases & Error Testing (Inyecciones SQL/NoSQL, Zod Schema Rejection, HTTP 400/409).
  - Criterios de Aceptación Formales en BDD Gherkin (`Given/When/Then`).
  - Matriz de Trazabilidad Bidireccional.
- **Red de Trazabilidad de Casos de Uso (`NET-001`):** [`templates/docs/diagrams/use-case-network/NET-001-template.md`](templates/docs/diagrams/use-case-network/NET-001-template.md) conectando Requerimientos $\rightarrow$ Casos de Uso $\rightarrow$ Tareas Agénticas $\rightarrow$ Worktrees $\rightarrow$ Commits Atómicos.
- **Diagrama de Componentes e Interfaces (`CMP-001`):** [`templates/docs/diagrams/components/CMP-001-template.md`](templates/docs/diagrams/components/CMP-001-template.md) modelando puertos e interfaces y asignando **ownership por subagente** para prevenir colisiones en ejecuciones paralelas.
- **Diagrama de Robustez BCE (`ROB-001`):** [`templates/docs/diagrams/robustness/ROB-001-template.md`](templates/docs/diagrams/robustness/ROB-001-template.md) validando el desacoplamiento estricto Frontera (UI/API) $\rightarrow$ Control (Caso de Uso) $\rightarrow$ Entidad (Dominio).

### ⚡ Added (Skills Agénticos & Slash Commands para Antigravity / Claude Code / Codex)
- **Habilidades Agénticas (`.agents/skills/`):**
  - `rsi-workflow/SKILL.md`: Protocolo maestro de ciclo cerrado (Ingestión $\rightarrow$ Worktree $\rightarrow$ Riel Duro $\rightarrow$ Merge).
  - `auto-perf/SKILL.md`: Automatización de optimización de rendimiento.
  - `adversarial-fuzz/SKILL.md`: Fuzzing y red-teaming de seguridad.
  - `traceability-sync/SKILL.md`: Sincronización del grafo de dependencias de 3 capas.
- **Catálogo de Slash Commands:** [`templates/.agents/rules/commands.md`](templates/.agents/rules/commands.md) con comandos rápidos (`/auto-perf`, `/adversarial`, `/drift-check`, `/frugal-compact`, `/swe-eval`, `/adr-sync`, `/traceability-sync`, `/precommit-audit`).

### 🛡️ Added (Nivel 2: Guardián Pre-Commit Ultra-Robusto)
- **Script Guardián Determinista:** [`scripts/pre-commit-guard.mjs`](scripts/pre-commit-guard.mjs) ejecutando secuencialmente los 7 Quality Gates deterministas (Correlatividad de Tareas, Clean Architecture Drift, Living ADRs, Secret Scanner, TypeScript Typecheck, Test Suite y Eval Harness).
- **Integración con Lefthook:** [`templates/lefthook.yml`](templates/lefthook.yml) y script `"precommit:audit"` en `package.json`.

---

## [1.2.0] - 2026-09-05

### 🧠 Added (Research & State of the Art)
- **SOTA-001 Research Knowledge Base:** Creación del módulo formal de investigación en [`docs/research/2026-05-28-RSI-RECURSIVE-SELF-IMPROVEMENT-AND-AI-SDLC.md`](docs/research/2026-05-28-RSI-RECURSIVE-SELF-IMPROVEMENT-AND-AI-SDLC.md) e indexación en [`docs/research/INDEX.md`](docs/research/INDEX.md).
- **Formalización de los 6 Patrones Autónomos RSI (Recursive Self-Improvement):**
  1. *Patrón 1: Bucle Autónomo de Auto-Optimización de Rendimiento (`Auto-Perf Worktree Loop`)* — Fundamentado en Karpathy *Auto-Research* [^2] y Doris Xin [^6].
  2. *Patrón 2: Subagente de Red-Teaming y Fuzzing Semántico (`Adversarial Hardening`)* — Fundamentado en Anthropic *Mythos Report* [^4] y CSET *When AI Builds AI* [^5].
  3. *Patrón 3: Auto-Curación de Deriva Arquitectónica (`Reflexion on Architecture Drift`)* — Fundamentado en Shinn et al. (*Reflexion / NeurIPS 2023*) [^7] y AST Linters.
  4. *Patrón 4: Optimizador de Tokenomics y Compactación de Prompts (`Frugal Engine`)* — Fundamentado en Chen et al. (*FrugalGPT / TMLR 2024*) [^8].
  5. *Patrón 5: Generador Sintético de Evals (`Micro SWE-bench Harness`)* — Fundamentado en Jimenez et al. (*SWE-bench / ICLR 2024*) [^9] y Cotra (*METR Milestones*) [^3].
  6. *Patrón 6: Cronista y Generador Autónomo de ADRs (`Living Architecture Records`)* — Fundamentado en Michael Nygard (*ADRs*) [^10].
- **Matriz Comparativa de Doble Riel (*Dual-Rail Matrix*):** Mapeo exhaustivo de capacidades cognitivas del LLM (*Riel Suave*) contra guardianes deterministas (*Riel Duro*) con métricas de aceptación objetivas.

### 🛠️ Added (Executable RSI Scripts & Master CLI Runner)
- **Implementación de Scripts Ejecutables en `scripts/rsi/` y `templates/scripts/rsi/`:**
  - `auto-perf-loop.mjs`: Medición de baseline, aislamiento en Git Worktree, benchmark y fast-forward merge condicional ($\Delta p95 \ge 15\%$).
  - `adversarial-fuzzer.mjs`: Inyección de vectores de ataque sintéticos (SQLi, prototype pollution, bajo desbordamiento, concurrencia) con validación estricta Zod.
  - `arch-drift-guard.mjs`: Linter AST de Clean Architecture y generador de prompts de Reflexion verbal.
  - `frugal-compactor.mjs`: Auditoría de tokens, compactación semántica y suite de evals sintéticos ($100\%$ Pass@1).
  - `micro-swebench.mjs`: Transpilador de BDD Gherkin a arnés de evaluación Red-to-Green determinista.
  - `living-adr-sync.mjs`: Auditor estático de consistencia de enlaces, esquemas y correlatividad de ADRs.
  - `run-rsi-suite.mjs`: Orquestador CLI unificado para ejecución interactiva o en lote con scoreboard y telemetría SSE.
- **Integración de Comandos NPM (`package.json`):** Scripts `npm run rsi:suite`, `npm run rsi:perf`, `npm run rsi:adversarial`, `npm run rsi:drift`, `npm run rsi:frugal`, `npm run rsi:swebench`, `npm run rsi:adr`.

### 📚 Changed
- **Gobernanza de Contexto & Tokenomics:** Enlace de citas académicas `[^15]` (*Karpathy Auto-Research*) y `[^16]` (*Cotra METR*) en [`docs/deep-dives/02-CONTEXT-GOVERNANCE-TOKENOMICS-AND-PLATFORMS.md`](docs/deep-dives/02-CONTEXT-GOVERNANCE-TOKENOMICS-AND-PLATFORMS.md).

---

## [1.1.0] - 2026-08-28

### 📡 Added (Observability & Telemetry)
- **Mission Control Real-Time Telemetry Dashboard:** Dashboard web interactivo con streaming de eventos vía SSE (*Server-Sent Events*) y servidor ligero en Node.js (`scripts/serve-dashboard.mjs`).
- **Timeline DevTools Waterfall:** Visualización en tiempo de ejecución de las fases agénticas con tooltips, duraciones reales y filtrado temporal dinámico.
- **Log Stream JSONL Estructurado:** Formato `.agents/telemetry/events.jsonl` con tipos de evento tipados (`STEP_START`, `TOOL_CALL`, `EVAL_RESULT`, `COMMIT`, `ALERT`).

### 📦 Added (Templates & Scaffolding)
- Inclusión del módulo de observabilidad en `templates/observability` y scripts de servidor en `templates/scripts/serve-dashboard.mjs`.
- Suite de simulación en vivo `npm run simulate:live` para pruebas de estrés de telemetría.

---

## [1.0.0] - 2026-08-20

### 🚀 Added (Initial Release)
- **AI-SDLC Framework Core:** Publicación de las directrices maestras en [`AI-SDLC-GUIDELINES.md`](AI-SDLC-GUIDELINES.md) y [`README.md`](README.md).
- **Catálogo Integral de Plantillas (`templates/`):**
  - Directrices de Agentes: `AGENTS.md`, `.agents/rules/invariants.md`, `.agents/rules/style-guide.md`.
  - Contratos de Tareas: `.agents/tasks/TASK_TEMPLATE.md` e índice correlativo `.agents/tasks/INDEX.md`.
  - Herramientas MCP y Flujos: `.agents/mcp/mcp-servers.json` y `.agents/workflows/autonomous-pr.md`.
  - Eval Harness Determinista: `evals/harness.mjs` y tareas de evaluación iniciales.
  - Documentación Técnica: Plantillas C4, Casos de Uso (BDD), Diagramas de Secuencia, Actividad, Estados, ERD, ADRs y RFCs.
  - Handoff y Continuidad: `HANDOFF.md` y `CONTRIBUTING.md`.
- **Deep Dives Técnicos:**
  - `01-ENTERPRISE-NFRS-AND-ISOLATION-100-TOOLS.md`: Arquitectura para 100+ herramientas MCP con bulkheading y sandboxing.
  - `02-CONTEXT-GOVERNANCE-TOKENOMICS-AND-PLATFORMS.md`: Gobernanza contra saturación de contexto (*Lost-in-the-Middle*), enrutamiento en cascada y semantic caching.

---

## 📚 Referencias & Justificación Académica del Framework

- [^1] **Brandom, R. (2026).** *RSI is the new AGI — and it's just as hard to pin down.* TechCrunch.
- [^2] **Karpathy, A. (2026).** *Auto-Research: Autonomous Agent Swarms for Model Iteration.* GitHub.
- [^3] **Cotra, A. (2026).** *Six Milestones for AI Automation: From Adequacy to Supremacy.* METR.
- [^4] **Anthropic Research (2026).** *Mythos Preview & L4 Autonomous Capability Assessment Report.*
- [^5] **Toner, H., et al. (2025/2026).** *When AI Builds AI: Governance and Trajectories of Recursive Systems.* CSET, Georgetown University.
- [^6] **Xin, D. (2026).** *When an MLE Agent Beats Humans: What Does That Actually Mean?* Disarray AI Research.
- [^7] **Shinn, N., et al. (2023).** *Reflexion: Language Agents with Verbal Reinforcement Learning.* NeurIPS 2023. [arXiv:2303.11366](https://arxiv.org/abs/2303.11366).
- [^8] **Chen, L., Zaharia, M., & Zou, J. (2024).** *FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance.* TMLR 2024. [arXiv:2305.05176](https://arxiv.org/abs/2305.05176).
- [^9] **Jimenez, C. E., et al. (2024).** *SWE-bench: Can Language Models Resolve Real-World GitHub Issues?* ICLR 2024. [arXiv:2310.06770](https://arxiv.org/abs/2310.06770).
- [^10] **Nygard, M. (2011).** *Documenting Architecture Decisions.* Cognitect Technical Blogs.
- [^11] **Zaharia, M., Chen, L., et al. (2024).** *The Shift from Models to Compound AI Systems.* BAIR / CACM.
