#!/usr/bin/env node
/**
 * 🧪 Test Runner para el Servidor MCP de ShopFast
 * Envía peticiones JSON-RPC 2.0 por stdio y verifica las respuestas.
 */

import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

console.log('🔌 [Test MCP] Iniciando servidor MCP y enviando peticiones JSON-RPC...\n');

const mcpProcess = spawn('node', ['scripts/mcp-shopfast.mjs'], {
  stdio: ['pipe', 'pipe', 'inherit']
});

let outputBuffer = '';

mcpProcess.stdout.on('data', (chunk) => {
  outputBuffer += chunk.toString();
  const lines = outputBuffer.split('\n');
  outputBuffer = lines.pop(); // Mantener remanente incompleto

  for (const line of lines) {
    if (!line.trim()) continue;
    const res = JSON.parse(line);

    if (res.id === 1) {
      console.log('✅ [1/3] tools/list respondido correctamente con', res.result.tools.length, 'herramientas');
      assert.strictEqual(res.result.tools.length, 3);

      // Paso 2: Invocar query_product_stock
      const req2 = {
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: { name: 'query_product_stock', arguments: { sku: 'LAP-GAM-001' } }
      };
      mcpProcess.stdin.write(JSON.stringify(req2) + '\n');
    } else if (res.id === 2) {
      const data = JSON.parse(res.result.content[0].text);
      console.log('✅ [2/3] query_product_stock retornó:', data.name, '| Stock:', data.stock, 'uds');
      assert.strictEqual(data.sku, 'LAP-GAM-001');
      assert.strictEqual(data.stock, 15);

      // Paso 3: Invocar simulate_stripe_webhook
      const req3 = {
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: { name: 'simulate_stripe_webhook', arguments: { orderNumber: 'SF-999', amount: 5500000 } }
      };
      mcpProcess.stdin.write(JSON.stringify(req3) + '\n');
    } else if (res.id === 3) {
      const data = JSON.parse(res.result.content[0].text);
      console.log('✅ [3/3] simulate_stripe_webhook retornó:', data.eventType, '| Firma Verificada:', data.signatureVerified);
      assert.strictEqual(data.signatureVerified, true);
      assert.strictEqual(data.orderNumber, 'SF-999');

      console.log('\n🎉 [MCP Server] 100% OPERATIVO Y VALIDADO VÍA STDIO JSON-RPC 2.0\n');
      mcpProcess.kill();
      process.exit(0);
    }
  }
});

// Enviar primera petición: Listar Herramientas
const req1 = { jsonrpc: '2.0', id: 1, method: 'tools/list' };
mcpProcess.stdin.write(JSON.stringify(req1) + '\n');
