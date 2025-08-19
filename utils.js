const { execSync } = require('child_process');
const path = require('path');

// Busca pnpm global o local
function findPnpmPath() {
  try {
    // Intenta encontrar pnpm global
    const globalPath = execSync('which pnpm', { encoding: 'utf-8' }).trim();
    return globalPath;
  } catch {
    // Si no está global, usa el local
    return path.join(process.cwd(), 'node_modules', '.bin', 'pnpm');
  }
}

module.exports = { findPnpmPath };