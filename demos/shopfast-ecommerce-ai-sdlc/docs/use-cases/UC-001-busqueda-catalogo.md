# 🎯 [UC-001] Búsqueda y Navegación de Catálogo (2,500 Productos)

**Identificador:** `UC-001`  
**Módulo:** Catálogo  
**Actor Principal:** Comprador Online  
**Estado:** `APPROVED`  

---

## 1. Descripción
El usuario busca productos por nombre, categoría (árbol de 3 niveles: ej. *Electrónica > Laptops > Laptops Gaming*) o SKU, aplicando filtros de precio, marca y disponibilidad con respuesta en `< 1.0 segundo`.

## 2. Flujo Principal (Happy Path)
1. El usuario introduce un término en la barra de búsqueda (mínimo 2 caracteres).
2. El sistema muestra autocompletado en tiempo real con sugerencias y miniaturas.
3. El usuario aplica filtros (ej. Rango de precio y marca).
4. El sistema consulta la caché de Redis y retorna la lista paginada de productos con disponibilidad de stock.

## 3. Criterios de Aceptación (Gherkin BDD)
```gherkin
Escenario: Búsqueda con filtros de precio
  Dado que el catálogo tiene 2,500 productos cargados
  Cuando el usuario busca "Laptop" y filtra por precio entre $500 y $1500
  Entonces el sistema responde con la lista de productos coincidentes en menos de 1 segundo
  Y cada producto muestra su SKU, precio regular, precio con descuento y badge de stock.
```
