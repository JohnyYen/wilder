const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// Función para verificar si un comando existe
function commandExists(command) {
  try {
    // Usamos diferentes comandos según el sistema operativo
    const platform = process.platform;
    if (platform === 'win32') {
      execSync(`where ${command}`, { stdio: 'pipe' });
    } else {
      execSync(`command -v ${command}`, { stdio: 'pipe' });
    }
    return true;
  } catch {
    return false;
  }
}

// Busca un paquete manager específico global o local
function findPackageManagerPath(pm) {
  try {
    // Intenta encontrar el paquete manager global
    const globalPath = execSync(`which ${pm}`, { encoding: 'utf-8' }).trim();
    if (globalPath && globalPath !== '') {
      return globalPath;
    }
  } catch {
    // Si no está global, intenta usar el local
    const localPath = path.join(process.cwd(), 'node_modules', '.bin', pm);
    try {
      // Chequea si el archivo existe
      fs.accessSync(localPath);
      return localPath;
    } catch {
      // Si no existe local, devuelve null
      return null;
    }
  }
}

// Crea una interfaz de lectura para entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// Detecta qué paquete manager está disponible y lo selecciona
async function detectAndSelectPackageManager() {
  const availablePMs = [];

  // Verifica cada paquete manager
  const packageManagers = ['npm', 'yarn', 'pnpm', 'bun'];

  for (const pm of packageManagers) {
    if (commandExists(pm)) {
      availablePMs.push(pm);
    }
  }

  if (availablePMs.length === 0) {
    throw new Error('No package manager found (npm, yarn, pnpm, bun)');
  }

  // Si hay múltiples disponibles, pregunta al usuario cuál usar
  if (availablePMs.length > 1) {
    console.log('Paquetes managers disponibles:');
    availablePMs.forEach((pm, i) => {
      console.log(`${i + 1}. ${pm}`);
    });

    // Pregunta al usuario qué paquete manager quiere usar
    const answer = await new Promise((resolve) => {
      rl.question(`¿Qué paquete manager deseas usar? (1-${availablePMs.length}): `, (input) => {
        const index = parseInt(input) - 1;
        if (index >= 0 && index < availablePMs.length) {
          resolve(availablePMs[index]);
        } else {
          console.log(`Por favor selecciona una opción válida entre 1 y ${availablePMs.length}`);
          resolve(availablePMs[0]); // Devuelve el primer paquete manager como fallback
        }
      });
    });

    return {
      name: answer,
      path: findPackageManagerPath(answer)
    };
  } else {
    // Solo uno disponible
    return {
      name: availablePMs[0],
      path: findPackageManagerPath(availablePMs[0])
    };
  }
}

// Cierra la interfaz de readline cuando ya no se necesita
function closeReadline() {
  rl.close();
}

// Obtiene información sobre si un paquete manager usa registry o no
function getPackageManagerInfo(pmName) {
  const registryInfo = {
    npm: { usesRegistry: true, registryFlag: '--registry=' },
    yarn: { usesRegistry: true, registryFlag: '--registry=' },     // Yarn Classic and newer versions
    pnpm: { usesRegistry: true, registryFlag: '--registry=' },
    bun: { usesRegistry: true, registryFlag: '--config registry=' }  // Bun uses different syntax
  };

  return registryInfo[pmName] || { usesRegistry: true, registryFlag: '--registry=' };
}

// Funciones antiguas mantenidas por compatibilidad
function findPnpmPath() {
  return findPackageManagerPath('pnpm');
}

module.exports = {
  findPnpmPath,
  findPackageManagerPath,
  detectAndSelectPackageManager,
  getPackageManagerInfo,
  commandExists,
  closeReadline
};