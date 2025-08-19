// index.js
const { spawn } = require('child_process');
const { findPnpmPath } = require('./utils');

// 🔧 Registry personalizado definido en código
const CUSTOM_REGISTRY = 'http://nexus.uclv.edu.cu/repository/npm/'; // Cambia esto por tu registry

// Obtener los argumentos de la línea de comandos (sin "node script.js")
const args = process.argv.slice(2);

(async () => {
  try {
    const pnpmPath = await findPnpmPath();

    // Añadir el registry automáticamente al inicio de los argumentos
    const pnpmArgs = [`--registry=${CUSTOM_REGISTRY}`, ...args];

    console.log(`📦 pnpm (con registry: ${CUSTOM_REGISTRY})`);

    // Ejecutar pnpm con el registry inyectado
    const child = spawn(pnpmPath, pnpmArgs, {
      stdio: 'inherit', // Muestra salida en consola
      env: process.env,  // Hereda variables de entorno
    });

    child.on('error', (err) => {
      console.error('❌ Error al ejecutar pnpm:', err.message);
      process.exit(1);
    });

    child.on('exit', (code) => {
      process.exit(code);
    });
  } catch (err) {
    console.error('❌', err.message);
    process.exit(1);
  }
})();