# ADR-0001: Delegación de PCI-DSS mediante Stripe Elements & Checkout

**Estado:** Aceptado  
**Fecha:** 2026-08-27  
**Decisores:** Equipo de Arquitectura & Seguridad TechSolutions  

---

## 1. Contexto y Problema
ShopFast S.A. requiere aceptar pagos online con tarjetas de crédito y débito sin incurrir en los altos costos de certificación y auditoría PCI-DSS Nivel 1.

## 2. Decisión
Se decide integrar **Stripe Elements y Payment Intents API**. Los datos de tarjeta viajan directamente desde el navegador del cliente a los servidores de Stripe tokenizados (`client_secret`), sin tocar la base de datos de ShopFast.

## 3. Consecuencias
- **Positivas:** Alcance PCI-DSS reducido a SAQ A-EP (máxima seguridad), soporte de autenticación 3D Secure automático y webhooks idempotentes.
- **Negativas:** Dependencia de la disponibilidad de la API de Stripe (mitigado con transferencias bancarias como fallback).
