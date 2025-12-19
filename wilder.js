// index.js
const { spawn } = require('child_process');
const { closeReadline, findPackageManagerPath } = require('./utils');

// 🔧 Registry personalizado definido en código
const CUSTOM_REGISTRY = 'http://nexus.uclv.edu.cu/repository/npm/'; // Cambia esto por tu registry

// Obtener los argumentos de la línea de comandos (sin "node script.js")
const args = process.argv.slice(2);

(
  async () => {
    try {
      pmPath = findPackageManagerPath('npm')
      if (pmPath === null) {
        throw new Error('npm no está instalado o no se encuentra en el PATH del sistema.');
      }
      pmArgs = [`--registry=${CUSTOM_REGISTRY}`, ...args]

      const child = spawn(pmPath, pmArgs, {
        stdio: "inherit",
        env: process.env,
      })

      child.on('error', (err) => {
        console.error(`❌ Error al ejecutar ${selectedPM.name}:`, err.message);
        closeReadline(); // Cerrar readline antes de salir
        process.exit(1);
      });

      child.on('exit', (code) => {
        closeReadline(); // Cerrar readline antes de salir
        process.exit(code);
      });
    }
    catch (err) {
      console.error('❌', err.message);
      closeReadline(); // Asegurar que readline se cierra en caso de error
      process.exit(1);
    }
  }
)();