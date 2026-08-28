# [TASK-007] Panel de Administración, Importación Masiva CSV & Métricas

**ID:** `TASK-007` | **Módulo:** `src/modules/admin/` | **Prioridad:** HIGH  
**Branch Aislado:** `feat/task-007-admin-dashboard`  

## 🎯 1. Objetivo
Implementar las operaciones del panel de administración: CRUD de productos, parser de importación masiva en CSV (2,500 items del cliente), gestión de estados de pedidos (actualización y generación de etiquetas de envío) y dashboard de KPIs (ventas, alertas de stock $< 10$ uds).

## 🔒 Invariantes de Aislamiento
- Aislado en `src/modules/admin/`.
- Requiere autenticación de rol `ADMIN`.
- Carga de CSV validada por streaming para no saturar memoria.

## 🧪 Comando de Evaluación
```bash
node evals/harness.mjs --task task-007
```
