# 📋 Registro Central de Tareas (Task Correlative Registry)

Este archivo es la **fuente única de verdad** para la asignación de identificadores correlativos `TASK-XXX`.

> ⚠️ **INVARIANTE DE CORRELATIVOS:** Ningún agente de IA puede crear un archivo en `.agents/tasks/` sin consultar este índice, verificar el último correlativo usado y registrar aquí la nueva tarea antes de iniciar.

---

## 📊 Matriz de Asignación de Tareas

| ID Correlativo | Título de la Tarea | Módulo Afectado | Prioridad | Estado | Rama Git |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `TASK-001` | Tarea de Inicialización del Proyecto | `src/` | HIGH | `COMPLETED` | `feat/task-001-init` |

---

## 🔒 Próximo Correlativo Disponible: `TASK-002`
Cualquier nuevo requerimiento debe reclamar estrictamente el siguiente correlativo secuencial disponible.
