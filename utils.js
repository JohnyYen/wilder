const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function commandExists(command) {
  try {
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

function findPackageManagerPath(pm) {
  try {
    const globalPath = execSync(`which ${pm}`, { encoding: 'utf-8' }).trim();
    if (globalPath && globalPath !== '') {
      return globalPath;
    }
  } catch {
    const localPath = path.join(process.cwd(), 'node_modules', '.bin', pm);
    try {
      fs.accessSync(localPath);
      return localPath;
    } catch {
      return null;
    }
  }
}

module.exports = {
  commandExists,
  findPackageManagerPath
};
