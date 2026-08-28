# [TASK-004] Integración de Logística & Envíos con CourierFast API

**ID:** `TASK-004` | **Módulo:** `src/integrations/shipping/` | **Prioridad:** MEDIUM  
**Branch Aislado:** `feat/task-004-courierfast-shipping`  

## 🎯 1. Objetivo
Implementar el cliente de la API REST de CourierFast para cotización dinámica por ciudad/peso/dimensiones, generación de guías de despacho y consulta de tracking de paquetes.

## 🔒 Invariantes de Aislamiento
- Aislado en `src/integrations/shipping/`.
- Timeout de red de 2.5s con fallback a tarifa plana local si el courier no responde.

## 🧪 Comando de Evaluación
```bash
node evals/harness.mjs --task task-004
```
