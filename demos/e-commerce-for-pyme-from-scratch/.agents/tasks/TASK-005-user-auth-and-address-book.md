# [TASK-005] Módulo de Autenticación, Perfil & Libreta de Direcciones

**ID:** `TASK-005` | **Módulo:** `src/modules/auth/` | **Prioridad:** HIGH  
**Branch Aislado:** `feat/task-005-user-auth`  

## 🎯 1. Objetivo
Implementar el registro tradicional (email/password con hash Bcrypt) y OAuth 2.0 (Google/Facebook), recuperación de contraseñas por enlace temporal de 1 hora y libreta de direcciones de envío (CRUD, máximo 5 direcciones por usuario con dirección predeterminada).

## 🔒 Invariantes de Aislamiento
- Aislado en `src/modules/auth/`.
- Passwords nunca en texto plano.
- Rate limiting en login (máximo 5 intentos por minuto por IP).

## 🧪 Comando de Evaluación
```bash
node evals/harness.mjs --task task-005
```
