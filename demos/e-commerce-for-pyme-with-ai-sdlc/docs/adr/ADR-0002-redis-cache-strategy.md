# ADR-0002: Estrategia de Caché en Redis para Búsqueda de Catálogo < 1.0s

**Estado:** Aceptado  
**Fecha:** 2026-08-27  

---

## 1. Contexto y Problema
El requisito 4.1 del documento de alcance exige que la búsqueda en el catálogo de 2,500 productos responda en menos de 1 segundo bajo una concurrencia normal de 500 usuarios y hasta 2,000 en promociones.

## 2. Decisión
Se implementa una capa de caché de dos niveles:
1. **L1 In-Memory:** Caché de árbol de categorías (3 niveles).
2. **L2 Redis:** Resultados de búsqueda y fichas de producto cacheadas con TTL de 15 minutos e invalidación reactiva ante cambios de stock o precio.

## 3. Consecuencias
- **Positivas:** Latencia de consulta reducida a `< 20ms`, protegiendo la base de datos PostgreSQL de sobrecarga.
