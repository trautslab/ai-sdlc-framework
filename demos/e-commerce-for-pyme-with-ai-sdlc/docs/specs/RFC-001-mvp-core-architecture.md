# [RFC-001] Arquitectura del MVP Core de ShopFast E-commerce

**Estado:** `APPROVED`  
**Autor:** Equipo de Ingeniería TechSolutions & Antigravity AI  
**Documento Fuente:** [`Caso-Práctico-Documento-de-Alcance.pdf`](../../Caso-Práctico-Documento-de-Alcance.pdf)  

---

## 1. Alcance Funcional del MVP
- **Catálogo:** Navegación por 3 niveles de categoría, búsqueda con autocompletado en `< 1.0s` para 2,500 productos.
- **Carrito:** Persistencia local/servidor y validación de stock en tiempo real.
- **Checkout en 3 Pasos:** Envío, Pago con Stripe Elements / Transferencia y Confirmación.
- **Órdenes:** Ciclo de vida completo desde `PENDIENTE_PAGO` hasta `ENTREGADO`.
- **Panel Admin:** CRUD de catálogo, importación CSV y actualización de estados de pedidos.

---

## 2. Invariantes de Seguridad y Performance
- Cero almacenamiento de datos de tarjeta (PCI-DSS delegado).
- Transacciones ACID obligatorias en creación de órdenes con reserva de stock.
- Límite de carga de páginas: Home `< 2s`, Producto `< 3s`.
