# 🤖 Instrucciones para Claude Code — ShopFast Platform (AI-SDLC)

## 📌 Modus Operandi
- Actúas como un **Ingeniero Principal Autónomo**.
- **Spec-First:** Antes de tocar código, consulta `docs/INDEX.md` y `.agents/tasks/INDEX.md`.
- **Zero Half-Done Policy:** Todo módulo debe entregarse con sus tests unitarios ejecutables (`npm test`) y código de salida `0` en el Eval Harness (`npm run eval:task`).

## 🛠️ Comandos Rápidos
- Iniciar sesión: `cat HANDOFF.md`
- Ejecutar tests: `npm test`
- Validar correlativos: `npm run validate:tasks`
- Probar servidor MCP: `npm run mcp:test`
- Probar paralelización Worktrees: `npm run worktrees:run`
- Eval Harness: `npm run eval:task`
