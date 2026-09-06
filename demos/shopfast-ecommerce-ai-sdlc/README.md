# 🛍️ ShopFast E-commerce Platform (Demo AI-SDLC)

Bienvenido al proyecto **ShopFast**, la plataforma de comercio digital para retail PYME desarrollada siguiendo rigurosamente el framework **AI-SDLC (AI-Augmented Software Development Life Cycle)** y gobernada mediante **Antigravity**.

---

## 📌 1. Resumen Ejecutivo del Proyecto
- **Cliente:** ShopFast S.A. (Retail con 10 años en el mercado y 5 tiendas físicas).
- **Catálogo:** ~2,500 productos (Electrónica, Hogar, Deportes).
- **Objetivo:** MVP operativo en 4 meses para capturar el 15% de ventas en el canal digital.
- **Documento de Alcance Original:** [`Caso-Práctico-Documento-de-Alcance.pdf`](./Caso-Práctico-Documento-de-Alcance.pdf).

---

## 🧭 2. Navegación del Repositorio (Gobernanza AI-SDLC)

```text
demos/e-commerce-for-pyme/
├── Caso-Práctico-Documento-de-Alcance.pdf  # 📄 Especificación de alcance original
├── AGENTS.md                               # 🤖 Entrypoint para Antigravity / Asistentes IA
├── HANDOFF.md                              # 📍 Bitácora viva de estado de desarrollo
├── CHANGELOG.md                            # 📦 Historial según Keep a Changelog + SemVer
├── CONTRIBUTING.md                         # 🛠️ Convenciones Git y Quality Gates
├── .agents/                                # 🛡️ Invariantes, Tareas y Herramientas MCP
│   ├── rules/invariants.md
│   ├── tasks/TASK-001-core-checkout-flow.md
│   └── mcp/mcp-servers.json
├── .devcontainer/                          # 🐳 Sandbox hermético (Node 22 + Postgres + Redis)
├── evals/                                  # 🧪 Harness de evaluación determinista
├── docs/                                   # 📚 Arquitectura, Casos de Uso y Diagramas
│   ├── INDEX.md                            # 🗺️ Matriz Maestra de Trazabilidad
│   ├── architecture/                       # C4 Model (Contexto, Contenedores, Componentes)
│   ├── use-cases/                          # Casos de uso formales con BDD Gherkin
│   ├── diagrams/                           # Secuencias, Actividades, Estados y ERD
│   ├── adr/                                # Decisiones de Arquitectura
│   └── specs/                              # Especificaciones técnicas RFC
└── src/                                    # 💻 Código en Vertical Slices (Catalog, Orders, Integrations)
```

---

## ⚡ 3. Cómo Ejecutar y Evaluar el Proyecto con Antigravity

```bash
# 1. Iniciar sesión y validar estado
cat HANDOFF.md

# 2. Ejecutar el Eval Harness de Antigravity
node evals/harness.mjs --task task-001

# 3. Comprobar arquitectura y tipos
npm run typecheck && npm run lint
```
