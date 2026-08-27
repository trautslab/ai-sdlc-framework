# 🎯 [UC-003] Checkout en 3 Pasos y Procesamiento Seguro con Stripe

**Identificador:** `UC-003`  
**Módulo:** Checkout / Pagos  
**Actor Principal:** Comprador Online  
**Estado:** `APPROVED`  

---

## 1. Descripción
El usuario completa su compra en máximo 3 pasos: (1) Dirección de Envío, (2) Método de Pago (Stripe Tarjetas o Transferencia), (3) Confirmación, reservando stock de manera atómica y recibiendo confirmación inmediata por pantalla y correo.

## 2. Flujo Principal (Happy Path)
1. **Paso 1 (Envío):** Selecciona o ingresa dirección de entrega y teléfono.
2. **Paso 2 (Pago):** Selecciona Tarjeta de Crédito/Débito. Se inicializa el `PaymentIntent` con Stripe Elements.
3. **Paso 3 (Confirmación):** Revisa el resumen final, acepta Términos y Condiciones y pulsa "Confirmar Compra".
4. El sistema reserva el stock dentro de una transacción ACID, procesa el cargo con Stripe y devuelve la pantalla de éxito con el número de orden generado.
5. El webhook `payment_intent.succeeded` de Stripe confirma el pedido en segundo plano.

## 3. Criterios de Aceptación (Gherkin BDD)
```gherkin
Escenario: Pago exitoso con tarjeta
  Dado que el usuario tiene un carrito con stock válido
  Y completa los 3 pasos de checkout pagando con Stripe
  Cuando Stripe confirma la transacción
  Entonces el sistema genera la orden con estado "Pago confirmado"
  Y el stock de los productos comprados se descuenta atómicamente
  Y se envía un email de confirmación con el detalle de la orden.
```
