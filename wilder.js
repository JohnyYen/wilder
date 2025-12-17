// index.js
const { spawn } = require('child_process');
const { detectAndSelectPackageManager, getPackageManagerInfo, closeReadline } = require('./utils');

// 🔧 Registry personalizado definido en código
const CUSTOM_REGISTRY = 'http://nexus.uclv.edu.cu/repository/npm/'; // Cambia esto por tu registry

// Obtener los argumentos de la línea de comandos (sin "node script.js")
const args = process.argv.slice(2);

(async () => {
  try {
    // Detecta y permite al usuario seleccionar el paquete manager
    const selectedPM = await detectAndSelectPackageManager();
    const pmInfo = getPackageManagerInfo(selectedPM.name);

    let pmArgs = [];

    // Solo añade el registry si el paquete manager lo soporta
    if (pmInfo.usesRegistry) {
      if (selectedPM.name === 'bun') {
        // Para bun, la sintaxis es un poco diferente
        pmArgs = [pmInfo.registryFlag.split('=')[0], CUSTOM_REGISTRY, ...args];
      } else {
        // Para npm, yarn, pnpm
        pmArgs = [`${pmInfo.registryFlag}${CUSTOM_REGISTRY}`, ...args];
      }
      console.log(`📦 ${selectedPM.name} (con registry: ${CUSTOM_REGISTRY})`);
    } else {
      // Si no usa registry, solo pasamos los argumentos originales
      pmArgs = [...args];
      console.log(`📦 ${selectedPM.name} (no utiliza registry)`);
    }

    // Ejecutar el paquete manager seleccionado con los argumentos apropiados
    const child = spawn(selectedPM.path, pmArgs, {
      stdio: 'inherit', // Muestra salida en consola
      env: process.env,  // Hereda variables de entorno
    });

    child.on('error', (err) => {
      console.error(`❌ Error al ejecutar ${selectedPM.name}:`, err.message);
      closeReadline(); // Cerrar readline antes de salir
      process.exit(1);
    });

    child.on('exit', (code) => {
      closeReadline(); // Cerrar readline antes de salir
      process.exit(code);
    });
  } catch (err) {
    console.error('❌', err.message);
    closeReadline(); // Asegurar que readline se cierra en caso de error
    process.exit(1);
  }
})();