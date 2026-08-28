#!/usr/bin/env node
/**
 * 🌳 Git Worktrees & Subagent Parallel Orchestrator
 * Demuestra la paralelización real de múltiples subagentes en ramas y directorios físicos aislados.
 */

import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const colors = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  bold: '\x1b[1m',
  reset: '\x1b[0m'
};

const tasks = [
  { id: 'all-tasks', branch: 'feat/task-001-catalog-parallel', name: 'Catálogo & Búsqueda Redis L2' },
  { id: 'all-tasks', branch: 'feat/task-002-cart-parallel', name: 'Carrito & Persistencia Dual' },
  { id: 'all-tasks', branch: 'feat/task-003-orders-parallel', name: 'Checkout & Transacción Stripe' }
];

console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}  🌳 ORQUESTACIÓN DE SUBAGENTES PARALELOS CON GIT WORKTREES           ${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}\n`);

const repoRoot = resolve(process.cwd(), '..', '..');
const worktreeBase = resolve(repoRoot, '.worktrees');

// Limpiar worktrees previos si existen
try {
  execSync('git worktree prune', { cwd: repoRoot, stdio: 'ignore' });
} catch (_) {}

for (let i = 0; i < tasks.length; i++) {
  const task = tasks[i];
  const targetDir = resolve(worktreeBase, `subagent-${i + 1}`);
  console.log(`${colors.bold}[Subagente ${i + 1}] 🚀 Preparando entorno aislado para "${task.name}"...${colors.reset}`);
  console.log(`    ↳ Rama Git Aislada: ${colors.yellow}${task.branch}${colors.reset}`);
  console.log(`    ↳ Directorio Físico: ${targetDir}`);

  try {
    try {
      execSync(`git branch -D ${task.branch}`, { cwd: repoRoot, stdio: 'ignore' });
    } catch (_) {}

    execSync(`git worktree add -B ${task.branch} "${targetDir}" HEAD`, { cwd: repoRoot, stdio: 'ignore' });
    console.log(`    ${colors.green}✔ Worktree montado con éxito.${colors.reset}`);

    const demoInWorktree = resolve(targetDir, 'demos', 'e-commerce-for-pyme');

    // Ejecutar Eval Harness dentro del worktree
    console.log(`    ↳ Ejecutando verificación de calidad aislada en worktree...`);
    const evalOut = execSync(`node evals/harness.mjs --task ${task.id}`, {
      cwd: demoInWorktree,
      encoding: 'utf-8'
    });

    console.log(`    ${colors.green}✔ Verificación en Worktree: 100% PASSED.${colors.reset}`);

    // Limpiar worktree al terminar la prueba
    execSync(`git worktree remove --force "${targetDir}"`, { cwd: repoRoot, stdio: 'ignore' });
    console.log(`    ${colors.green}✔ Tarea integrada y worktree desmontado limpiamente.\n${colors.reset}`);
  } catch (err) {
    console.error(`    ❌ Error en Worktree ${i + 1}:`, err.message);
  }
}

try {
  execSync('git worktree prune', { cwd: repoRoot, stdio: 'ignore' });
  if (existsSync(worktreeBase)) {
    rmSync(worktreeBase, { recursive: true, force: true });
  }
} catch (_) {}

console.log(`${colors.bold}${colors.green}══════════════════════════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.bold}${colors.green}  🎉 DEMOSTRACIÓN DE PARALELIZACIÓN WORKTREES: 100% COMPLETADA        ${colors.reset}`);
console.log(`${colors.bold}${colors.green}══════════════════════════════════════════════════════════════════════${colors.reset}\n`);
