# 📋 Changelog — AI-SDLC Framework & Starter Kit

Todas las modificaciones notables, evoluciones arquitectónicas, incorporaciones del Estado del Arte (SOTA) y adiciones de plantillas de este proyecto se documentan formalmente en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y sigue [Semantic Versioning (SemVer 2.0.0)](https://semver.org/lang/es/).

---

## [Unreleased]

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
