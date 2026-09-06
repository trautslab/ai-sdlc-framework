# 🎯 [UC-002] Gestión del Carrito de Compras & Validación de Stock

**Identificador:** `UC-002`  
**Módulo:** Carrito  
**Actor Principal:** Comprador Online  
**Estado:** `APPROVED`  

---

## 1. Descripción
Permite agregar, modificar cantidades y eliminar items del carrito, calculando subtotales, costo de envío (gratis si subtotal > $50,000) y validando la existencia de stock en tiempo real.

## 2. Reglas de Persistencia
- **Usuario Anónimo:** El carrito se guarda en `LocalStorage` con expiración de 30 días.
- **Usuario Logueado:** El carrito se sincroniza y almacena en el servidor (PostgreSQL + Redis).

## 3. Criterios de Aceptación (Gherkin BDD)
```gherkin
Escenario: Aplicación de envío gratis
  Dado que el usuario tiene productos en el carrito por un subtotal de $55,000
  Cuando visualiza el resumen del carrito
  Entonces el costo de envío se muestra en $0 (Gratis)
  Y el total a pagar equivale al subtotal menos descuentos promocionales.

Escenario: Stock insuficiente
  Dado que un producto solo tiene 2 unidades disponibles
  Cuando el usuario intenta agregar 3 unidades
  Entonces el sistema impide la acción y muestra "Solo 2 unidades disponibles".
```
