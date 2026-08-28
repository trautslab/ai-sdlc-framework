# [TASK-006] Módulo de Opiniones, Calificaciones & Moderación

**ID:** `TASK-006` | **Módulo:** `src/modules/reviews/` | **Prioridad:** LOW  
**Branch Aislado:** `feat/task-006-verified-reviews`  

## 🎯 1. Objetivo
Implementar el sistema de opiniones (1-5 estrellas y comentarios hasta 500 caracteres), validando que ÚNICAMENTE usuarios con compra verificada puedan calificar un producto (máximo una calificación por producto por usuario) y permitiendo moderación por administradores.

## 🔒 Invariantes de Aislamiento
- Aislado en `src/modules/reviews/`.
- Sanitización estricta de inputs para prevenir XSS.

## 🧪 Comando de Evaluación
```bash
node evals/harness.mjs --task task-006
```
