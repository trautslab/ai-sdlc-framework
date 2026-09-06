#!/usr/bin/env node
/**
 * 🔌 ShopFast MCP Server (Model Context Protocol)
 * Servidor MCP ejecutable sobre stdio (JSON-RPC 2.0).
 * Expone herramientas estructuradas para que los agentes de IA interactúen
 * de forma segura y determinista sin recurrir a comandos bash caóticos.
 */

import { createInterface } from 'node:readline';
import { execSync } from 'node:child_process';

const TOOLS = [
  {
    name: 'simulate_stripe_webhook',
    description: 'Simula el disparo y verificación de un webhook payment_intent.succeeded de Stripe',
    inputSchema: {
      type: 'object',
      properties: {
        orderNumber: { type: 'string', description: 'Número de orden (ej. SF-123456)' },
        amount: { type: 'number', description: 'Monto pagado en centavos' }
      },
      required: ['orderNumber', 'amount']
    }
  },
  {
    name: 'query_product_stock',
    description: 'Consulta el inventario disponible y estado de un SKU específico',
    inputSchema: {
      type: 'object',
      properties: {
        sku: { type: 'string', description: 'SKU del producto a consultar' }
      },
      required: ['sku']
    }
  },
  {
    name: 'run_eval_harness',
    description: 'Ejecuta el evaluador determinista de tareas de ShopFast',
    inputSchema: {
      type: 'object',
      properties: {
        taskId: { type: 'string', description: 'ID de la tarea a evaluar (ej. task-001 o all-tasks)' }
      }
    }
  }
];

function handleToolCall(name, args) {
  if (name === 'simulate_stripe_webhook') {
    const eventId = `evt_${Date.now()}`;
    return {
      status: 'success',
      eventId,
      eventType: 'payment_intent.succeeded',
      orderNumber: args.orderNumber,
      amountReceived: args.amount,
      signatureVerified: true,
      timestamp: new Date().toISOString()
    };
  }

  if (name === 'query_product_stock') {
    const mockStock = {
      'LAP-GAM-001': { name: 'Laptop Gaming Pro 16"', stock: 15, status: 'IN_STOCK' },
      'MOU-002': { name: 'Mouse Inalámbrico', stock: 50, status: 'IN_STOCK' },
      'TEA-003': { name: 'Teclado Mecánico', stock: 8, status: 'LOW_STOCK' }
    };

    const item = mockStock[args.sku] || { name: 'Producto Genérico', stock: 25, status: 'IN_STOCK' };
    return { sku: args.sku, ...item };
  }

  if (name === 'run_eval_harness') {
    const target = args.taskId || 'all-tasks';
    try {
      const output = execSync(`node evals/harness.mjs --task ${target}`, { encoding: 'utf-8' });
      return { status: 'PASSED', output };
    } catch (err) {
      return { status: 'FAILED', output: err.stdout || err.message };
    }
  }

  throw new Error(`Herramienta desconocida: ${name}`);
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (!line.trim()) return;

  try {
    const req = JSON.parse(line);

    if (req.method === 'tools/list') {
      const res = {
        jsonrpc: '2.0',
        id: req.id,
        result: { tools: TOOLS }
      };
      process.stdout.write(JSON.stringify(res) + '\n');
    } else if (req.method === 'tools/call') {
      const toolResult = handleToolCall(req.params.name, req.params.arguments || {});
      const res = {
        jsonrpc: '2.0',
        id: req.id,
        result: { content: [{ type: 'text', text: JSON.stringify(toolResult, null, 2) }] }
      };
      process.stdout.write(JSON.stringify(res) + '\n');
    } else {
      // Manejo básico de initialize / ping
      const res = {
        jsonrpc: '2.0',
        id: req.id,
        result: { capabilities: { tools: {} }, serverInfo: { name: 'shopfast-mcp', version: '1.0.0' } }
      };
      process.stdout.write(JSON.stringify(res) + '\n');
    }
  } catch (err) {
    const errRes = {
      jsonrpc: '2.0',
      id: null,
      error: { code: -32603, message: err.message }
    };
    process.stdout.write(JSON.stringify(errRes) + '\n');
  }
});
