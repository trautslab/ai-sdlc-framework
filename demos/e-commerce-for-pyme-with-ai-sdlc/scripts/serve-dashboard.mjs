#!/usr/bin/env node
/**
 * 📡 ShopFast Mission Control Telemetry Server
 * Servidor HTTP ligero y sin dependencias externas para el Dashboard de Observabilidad.
 * Sirve el HTML y expone el endpoint /api/telemetry leyendo .agents/telemetry/events.jsonl.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = 3333;
const htmlPath = resolve(process.cwd(), 'observability', 'index.html');
const eventsPath = resolve(process.cwd(), '.agents', 'telemetry', 'events.jsonl');

const server = createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    if (!existsSync(htmlPath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Dashboard HTML no encontrado');
    }
    const html = readFileSync(htmlPath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  if (req.url === '/api/telemetry') {
    if (!existsSync(eventsPath)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end('[]');
    }

    const lines = readFileSync(eventsPath, 'utf-8').trim().split('\n');
    const events = lines
      .filter((l) => l.trim().length > 0)
      .map((l) => {
        try {
          return JSON.parse(l);
        } catch (_) {
          return null;
        }
      })
      .filter(Boolean);

    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(JSON.stringify(events));
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`\n📡 [ShopFast Mission Control] Dashboard de Observabilidad Agéntica activo:`);
  console.log(`   👉 URL: http://localhost:${PORT}\n`);
});
