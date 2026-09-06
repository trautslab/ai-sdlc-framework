#!/usr/bin/env node
/**
 * 🧪 ShopFast Eval Harness
 * Evaluador determinista de tareas para ShopFast E-commerce Platform.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const taskIndex = args.indexOf('--task');
const taskId = taskIndex !== -1 ? args[taskIndex + 1] : 'task-001';

console.log(`\n🛍️ [ShopFast Eval Harness] Ejecutando validación para: ${taskId}\n`);

const taskFilePath = resolve(process.cwd(), 'evals', 'tasks', `${taskId}.json`);

if (!existsSync(taskFilePath)) {
  console.error(`❌ Error: No se encontró la definición de la tarea en: ${taskFilePath}`);
  process.exit(1);
}

const taskDef = JSON.parse(readFileSync(taskFilePath, 'utf-8'));
let totalChecks = 0;
let passedChecks = 0;

for (const check of taskDef.checks) {
  totalChecks++;
  process.stdout.write(`⏳ Evaluando check: [${check.id}] ${check.description}... `);

  try {
    if (check.type === 'file_exists') {
      const target = resolve(process.cwd(), check.path);
      if (existsSync(target)) {
        console.log('✅ PASÓ');
        passedChecks++;
      } else {
        console.log(`❌ FALLÓ (Archivo ausente: ${check.path})`);
      }
    } else if (check.type === 'command') {
      execSync(check.command, { stdio: 'pipe', encoding: 'utf-8' });
      console.log('✅ PASÓ');
      passedChecks++;
    }
  } catch (err) {
    console.log(`❌ FALLÓ (${err.message})`);
  }
}

const successRate = ((passedChecks / totalChecks) * 100).toFixed(1);
console.log(`\n📊 [Resultado ShopFast] ${passedChecks}/${totalChecks} verificaciones superadas (${successRate}% éxito)`);

if (passedChecks === totalChecks) {
  console.log('🎉 STATUS: PASSED — Todos los invariantes y contratos de la tarea se cumplen con éxito.\n');
  process.exit(0);
} else {
  console.log('⚠️ STATUS: FAILED — Corrige los fallos antes de proceder.\n');
  process.exit(1);
}
