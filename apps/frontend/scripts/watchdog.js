#!/usr/bin/env node
/**
 * Watchdog de salud del servidor Next.js (puerto 3010)
 * - Revisa cada 10s si http://localhost:3010 responde 2xx/3xx
 * - Si falla durante 2 minutos (12 intentos consecutivos), reinicia el proceso PM2 "frontend"
 */

const { exec } = require('node:child_process');
const path = require('node:path');
const TARGET_URL = process.env.WATCHDOG_URL || 'http://localhost:3010/';
const INTERVAL_MS = 10_000; // 10 segundos
const MAX_FAILS = 12; // 12 * 10s = 120s = 2 minutos
let failStreak = 0;

async function check() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(TARGET_URL, { signal: controller.signal });
    clearTimeout(timeout);

    // Consideramos cualquier respuesta HTTP como conectividad válida,
    // incluso 3xx/4xx/5xx. Solo se considera fallo si hay error de red/timeout.
    if (typeof res.status === 'number') {
      if (failStreak > 0) {
        console.log(`[watchdog] OK de nuevo. Reset failStreak (era ${failStreak}).`);
      }
      failStreak = 0;
    } else {
      failStreak++;
      console.warn(`[watchdog] Respuesta inesperada. Fallo ${failStreak}/${MAX_FAILS}`);
    }
  } catch (err) {
    failStreak++;
    console.warn(`[watchdog] Error de conexión: ${err?.message || err}. Fallo ${failStreak}/${MAX_FAILS}`);
  }

  if (failStreak >= MAX_FAILS) {
    console.error(`[watchdog] ${MAX_FAILS} fallos consecutivos. Reiniciando app "frontend" con PM2...`);
    const pm2Local = path.resolve(__dirname, '..', 'node_modules', '.bin', process.platform === 'win32' ? 'pm2.cmd' : 'pm2');
    const pm2Cmd = pm2Local;
    exec(`"${pm2Cmd}" restart frontend`, (error, stdout, stderr) => {
      if (error) {
        console.error(`[watchdog] Error al reiniciar con PM2: ${error.message}`);
      }
      if (stderr) {
        console.error(`[watchdog] PM2 stderr: ${stderr}`);
      }
      console.log(`[watchdog] PM2 stdout: ${stdout}`);
    });
    failStreak = 0; // reset después del intento de reinicio
  }
}

console.log(`[watchdog] Iniciado. Monitoreando ${TARGET_URL} cada ${INTERVAL_MS / 1000}s. Reinicio tras ${MAX_FAILS} fallos.`);
setInterval(check, INTERVAL_MS);
check();
