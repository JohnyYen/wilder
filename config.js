const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { URL } = require('url');
const readline = require('readline');

const DEFAULT_REGISTRY = 'http://nexus.uclv.edu.cu/repository/npm/';
const CONFIG_FILE = '.wilderrc';
const TIMEOUT = 5000;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function readConfig() {
  try {
    const configPath = path.join(process.cwd(), CONFIG_FILE);
    const data = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null;
    }
    console.warn('⚠️ .wilderrc corrupto, usando registry por defecto');
    return null;
  }
}

function writeConfig(registry) {
  try {
    const configPath = path.join(process.cwd(), CONFIG_FILE);
    const config = { registry };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (err) {
    if (err.code === 'EACCES' || err.code === 'EPERM') {
      throw new Error('No tienes permisos para crear/modificar .wilderrc');
    }
    throw err;
  }
}

function getCurrentRegistry() {
  const config = readConfig();
  if (config && config.registry) {
    return config.registry;
  }
  return DEFAULT_REGISTRY;
}

function normalizeRegistryUrl(url) {
  try {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) {
      throw new Error('URL debe comenzar con http:// o https://');
    }
    let normalized = parsed.toString();
    if (!normalized.endsWith('/')) {
      normalized += '/';
    }
    return normalized;
  } catch (err) {
    if (err instanceof TypeError || err instanceof Error) {
      throw new Error('URL inválida: debe ser un URL válido (ej: https://registry.npmjs.org/)');
    }
    throw err;
  }
}

function validateRegistryUrl(url) {
  return new Promise((resolve) => {
    const normalized = normalizeRegistryUrl(url);
    const urlObj = new URL(normalized);
    const protocol = urlObj.protocol === 'https:' ? https : http;

    const req = protocol.request(normalized, { method: 'HEAD', timeout: TIMEOUT }, (res) => {
      req.destroy();
      const isAccessible = res.statusCode >= 200 && res.statusCode < 500;
      resolve(isAccessible);
    });

    req.on('error', () => {
      req.destroy();
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

function askUserConsent(message) {
  return new Promise((resolve) => {
    rl.question(message + ' (y/n): ', (input) => {
      const answer = input.toLowerCase().trim();
      resolve(answer === 'y' || answer === 'yes' || answer === 's' || answer === 'sí');
    });
  });
}

function deleteConfig() {
  try {
    const configPath = path.join(process.cwd(), CONFIG_FILE);
    fs.unlinkSync(configPath);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
}

function resetRegistry() {
  deleteConfig();
  return DEFAULT_REGISTRY;
}

function closeReadline() {
  rl.close();
}

module.exports = {
  DEFAULT_REGISTRY,
  CONFIG_FILE,
  readConfig,
  writeConfig,
  getCurrentRegistry,
  normalizeRegistryUrl,
  validateRegistryUrl,
  askUserConsent,
  deleteConfig,
  resetRegistry,
  closeReadline
};
