# 🎯 [UC-004] Cotización de Fletes y Despacho Logístico con CourierFast API

| Campo | Valor / Descripción |
| :--- | :--- |
| **Identificador Único:** | `UC-004` (Formato `UC-XXXX`, inmutable y secuencial) |
| **Módulo / Dominio:** | Envíos y Logística (§ 3.7 del PDF de Alcance) |
| **Prioridad de Negocio:** | ALTA (P1) |
| **Estado:** | `VERIFIED 🟢` |
| **Impacto en Negocio:** | Cálculo exacto de costos de flete por ciudad/peso y asignación automática de guías de tracking. |
| **Requerimiento Origen:** | [`REQ-004`](../specs/RFC-001-mvp-core-architecture.md) |
| **Contrato de Tarea Agente:**| [`.agents/tasks/TASK-004-courierfast-shipping-integration.md`](../../.agents/tasks/TASK-004-courierfast-shipping-integration.md) |
| **Red de Trazabilidad:** | [`NET-TEMPLATE`](../diagrams/use-case-network/NET-TEMPLATE.md) |

---

## 1. Descripción del Negocio
Permitir a los compradores cotizar el costo y tiempo estimado de entrega (2 a 7 días hábiles) en función de la ciudad de destino, peso y dimensiones del paquete, integrando la API REST de CourierFast. Aplica la regla de **Envío Gratuito** cuando el subtotal de la compra supera los $50,000 COP/MXN y contempla mensajes explicativos para zonas rurales sin cobertura.

---

## 2. Actores y Roles
- **Actor Principal:** Comprador en proceso de Checkout.
- **Sistema Externo:** API REST de CourierFast.
- **Subagente IA Responsable:** `subagent-2` (Envíos y Checkout).

---

## 3. Precondiciones Invariables
1. La dirección de envío debe tener una ciudad de destino válida seleccionada.
2. El paquete debe poseer dimensiones y peso volumétrico calculados a partir de los items del carrito.
3. Las credenciales de la API de CourierFast deben estar configuradas vía variables de entorno.

---

## 4. Flujo Principal (Happy Path)
1. El comprador ingresa su dirección de destino en el Paso 1 del Checkout.
2. El sistema envía una petición a la API de CourierFast con la ciudad, peso total y dimensiones.
3. CourierFast retorna la tarifa ($8,500 COP para ciudades principales / $14,200 para regionales) y el tiempo estimado (2-4 días hábiles).
4. El sistema evalúa el subtotal: si es $\ge \$50,000$, sobrescribe la tarifa con `$0` (Envío Gratis) e informa al usuario.
5. Al confirmarse el pago de la orden, el sistema invoca `createShipment()` para generar el número de guía de despacho (`trackingCode`) e imprimir la etiqueta.

---

## 5. Flujos Alternativos y Excepciones
- **5.a Zonas Rurales sin Cobertura Directa (Regla 3.7.2):**
  - Si la ciudad o código postal no cuenta con cobertura de CourierFast, el sistema muestra: *"Zona rural con cobertura especial vía reexpedición. Plazo estimado: 7-10 días hábiles"*.
- **5.b Timeout o Caída de la API de CourierFast (Circuit Breaker):**
  - Si la API tarda más de 2.5s, se activa el fallback determinista aplicando la tarifa plana de contingencia ($8,500 COP) sin bloquear la compra.

---

## 6. Criterios de Aceptación (BDD Gherkin)
```gherkin
Escenario: Cotización exitosa con tarifa preferencial local
  Dado que el comprador selecciona como destino "Bogotá" o "Medellín"
  Y el subtotal del carrito es menor a $50,000 COP
  Cuando el sistema consulta la API de CourierFast
  Entonces el costo de envío devuelto es exactamente $8,500 COP
  Y el tiempo estimado es de "2 a 4 días hábiles"

Escenario: Aplicación de Envío Gratis por monto superior a $50,000
  Dado que el comprador tiene un carrito con subtotal de $75,000 COP
  Cuando se cotiza el flete con destino a cualquier ciudad con cobertura
  Entonces el costo de envío final para el comprador es $0 COP
  Y se muestra la etiqueta "¡Envío Gratis Aplicado!"
```
