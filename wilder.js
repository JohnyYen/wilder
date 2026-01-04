#!/usr/bin/env node
const { spawn } = require('child_process');
const {
  getCurrentRegistry,
  writeConfig,
  resetRegistry,
  normalizeRegistryUrl,
  validateRegistryUrl,
  askUserConsent,
  closeReadline
} = require('./config');
const { findPackageManagerPath } = require('./utils');

const args = process.argv.slice(2);

async function handleSetRegistry(url) {
  if (!url) {
    console.error('❌ Uso: wilder set-registry <url>');
    closeReadline();
    process.exit(1);
  }

  try {
    const normalized = normalizeRegistryUrl(url);
    const isAccessible = await validateRegistryUrl(normalized);

    if (isAccessible) {
      writeConfig(normalized);
      console.log(`✅ Registry configurado a: ${normalized}`);
    } else {
      const consent = await askUserConsent('⚠️ URL no es accesible. ¿Quieres guardarlo de todas formas?');
      if (consent) {
        writeConfig(normalized);
        console.log(`✅ Registry configurado a: ${normalized}`);
      } else {
        console.log('❌ Operación cancelada');
        closeReadline();
        process.exit(1);
      }
    }
    closeReadline();
    process.exit(0);
  } catch (err) {
    console.error(`❌ ${err.message}`);
    closeReadline();
    process.exit(1);
  }
}

function handleGetRegistry() {
  const registry = getCurrentRegistry();
  console.log(`✅ Registry actual: ${registry}`);
  closeReadline();
  process.exit(0);
}

function handleResetRegistry() {
  const defaultRegistry = resetRegistry();
  console.log(`✅ Registry reseteado al valor por defecto: ${defaultRegistry}`);
  closeReadline();
  process.exit(0);
}

function showWilderHelp() {
  console.log('🐺 Wilder - Wrapper de npm con registry personalizado\n');
  console.log('Comandos especiales de Wilder:');
  console.log('  ❯ wilder set-registry <url>    Configura un nuevo registry (valida formato y accesibilidad)');
  console.log('  ❯ wilder get-registry          Muestra el registry actual configurado');
  console.log('  ❯ wilder reset-registry        Resetea .wilderrc y usa el registry por defecto');
  console.log('\nPara más información, visita: https://github.com/JohnyYen/wilder-pnpm\n');
  console.log('------------------------------\n');
}

async function executeNpmCommand(commandArgs) {
  try {
    const pmPath = findPackageManagerPath('npm');
    if (pmPath === null) {
      throw new Error('npm no está instalado o no se encuentra en el PATH del sistema.');
    }

    const registry = getCurrentRegistry();
    const argsToUse = commandArgs || args;
    const pmArgs = [`--registry=${registry}`, ...argsToUse];

    const child = spawn(pmPath, pmArgs, {
      stdio: 'inherit',
      env: process.env
    });

    child.on('error', (err) => {
      console.error(`❌ Error al ejecutar npm:`, err.message);
      closeReadline();
      process.exit(1);
    });

    child.on('exit', (code) => {
      closeReadline();
      process.exit(code);
    });
  } catch (err) {
    console.error(`❌ ${err.message}`);
    closeReadline();
    process.exit(1);
  }
}

(async () => {
  try {
    if (args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
      showWilderHelp();
      const npmArgs = args.slice(1);
      if (npmArgs.length === 0) {
        await executeNpmCommand(['--help']);
      } else {
        await executeNpmCommand(npmArgs);
      }
      return;
    }

    if (args[0] === 'set-registry') {
      await handleSetRegistry(args[1]);
      return;
    }

    if (args[0] === 'get-registry') {
      handleGetRegistry();
      return;
    }

    if (args[0] === 'reset-registry') {
      handleResetRegistry();
      return;
    }

    await executeNpmCommand();
  } catch (err) {
    console.error(`❌ ${err.message}`);
    closeReadline();
    process.exit(1);
  }
})();
