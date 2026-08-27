# 🛡️ Invariantes Arquitectónicos de ShopFast S.A.

Estos invariantes son **reglas de oro duras y no negociables** para cualquier agente de IA o desarrollador:

---

## 1. Pagos & PCI-DSS (Seguridad Financiera)
- **Cero Datos de Tarjeta en BD:** Queda terminantemente prohibido almacenar números de tarjeta (`PAN`), códigos de seguridad (`CVV/CVC`) o fechas de expiración en PostgreSQL.
- **Validación de Webhooks:** Todo evento entrante de Stripe debe validar la firma criptográfica (`stripe-signature`) antes de procesar el cambio de estado.

---

## 2. Inventario y Consistencia Transaccional (ACID)
- **Reserva Atómica de Stock:** La creación de una orden debe descontar o reservar stock dentro de una transacción `BEGIN ... COMMIT` para evitar sobreventa en promociones como Black Friday.
- **Idempotencia en Órdenes:** Las peticiones de checkout deben enviar una cabecera `Idempotency-Key` única para prevenir cobros dobles si el usuario hace doble clic.

---

## 3. Catálogo & Performance
- **Búsqueda < 1.0s para 2,500 productos:** Toda consulta de catálogo debe usar paginación por cursor y caché en Redis con TTL de 15 minutos.
- **Imágenes:** Las imágenes deben cargarse vía CDN (S3) con optimización de formato WebP.
