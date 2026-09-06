# ⚡ Catálogo de Slash Commands para el Framework AI-SDLC

Este documento define los **Slash Commands** disponibles para los desarrolladores y Tech Leads al interactuar con **Google Antigravity, Claude Code, Cursor o Codex**. 

Al invocar cualquiera de estos comandos con sus argumentos, la IA ejecuta automáticamente el flujo estructurado y sus comprobaciones deterministas correspondientes, sin necesidad de escribir prompts largos ni repetir los invariantes.

---

## 📋 Tabla de Comandos Rápidos

| Slash Command | Parámetros | Skill Asociado | Qué ejecuta internamente |
| :--- | :--- | :--- | :--- |
| `/auto-perf` | `[modulo] [--threshold 15]` | `auto-perf` | Medición baseline, mutación en Git Worktree, benchmark p95 y Fast-Forward merge si $\Delta p95 \ge 15\%$. |
| `/adversarial` | `[endpoint_o_servicio]` | `adversarial-fuzzer` | Inyección de SQLi, overflow, enteros negativos y race conditions con validación Zod. |
| `/drift-check` | `[directorio_src]` | `arch-drift-guard` | Linter AST de Clean Architecture y emisión de prompt de Reflexion ante violaciones. |
| `/frugal-compact`| `[ruta_tareas_o_reglas]` | `frugal-compactor` | Minificación semántica de contratos asegurando 100% Pass@1 en Evals con $\ge 30\%$ ahorro de tokens. |
| `/swe-eval` | `[nombre_caso_uso]` | `micro-swebench` | Transpilación BDD Gherkin a arnés determinista y validación Red $\rightarrow$ Green Stage. |
| `/adr-sync` | `[directorio_adr]` | `living-adr-sync` | Auditoría estática de enlaces a archivos, esquemas y correlatividad de IDs de ADRs. |
| `/traceability-sync` | *(sin argumentos)* | `traceability-sync` | Sincronización del grafo de red `NET-001` entre Requerimientos, Casos de Uso y Tareas. |
| `/precommit-audit` | *(sin argumentos)* | `pre-commit-guard` | Ejecución secuencial de los 7 Quality Gates deterministas antes de hacer commit. |

---

## 💡 Ejemplos de Invocación en Chat

### Ejemplo 1: Optimización de Rendimiento
```text
/auto-perf CatalogService --threshold 20
```

### Ejemplo 2: Auditoría de Seguridad de Endpoint
```text
/adversarial POST /api/v1/orders/checkout
```

### Ejemplo 3: Verificación Previa a Commit
```text
/precommit-audit
```
