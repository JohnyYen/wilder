# 🐺 Wilder – Wrapper de gestores de paquetes con registry personalizado

> Un wrapper ligero y poderoso que permite usar `npm`, `yarn`, `pnpm` o `bun` con un **registry predefinido**, ideal para equipos, CI/CD o usuarios que usan mirrors o registries privados.

🚀 Ejecuta tus comandos de gestión de paquetes como siempre, pero con el registry que necesitas — sin configuraciones manuales.

---

## 🌟 ¿Qué hace?

Este wrapper detecta los gestores de paquetes disponibles (`npm`, `yarn`, `pnpm`, `bun`) y al ejecutarlos, **inyecta automáticamente un registry personalizado**, definido directamente en el código.

✅ No necesitas modificar `.npmrc`
✅ No necesitas recordar `--registry=...`
✅ Compatible con todos los principales gestores de paquetes
✅ Interfaz interactiva para seleccionar gestor de paquetes
✅ Ideal para entornos corporativos, CI o desarrollo en regiones con acceso lento a npm

---

## 🔧 Características

- Compatible con `npm`, `yarn`, `pnpm`, y `bun`
- Registry preconfigurado (ej: mirror chino, registry privado, Nexus, etc.)
- Sistema interactivo para seleccionar gestor de paquetes
- Fácil de instalar y usar
- Transparente: los comandos son idénticos a los originales
- Extensible: puedes personalizarlo con más lógica (logging, validación, etc.)

---

## 🚀 Instalación

### Opción 1: Instalar globalmente (recomendado)

```bash
npm install -g wilder-pnpm
```

> 💡 Puedes cambiar el nombre a `wilder`, `roar`, `mypackages`, etc.

### Opción 2: Usar directamente con `npx` (sin instalar)

```bash
npx wilder-pnpm install
npx wilder-pnpm add lodash
```

---

## 🛠️ Uso

Una vez instalado, ejecuta `wilder-pnpm` y selecciona el gestor de paquetes que deseas usar:

```bash
wilder-pnpm
```

El programa detectará los gestores disponibles y te permitirá elegir:
```
Paquetes managers disponibles:
1. npm
2. yarn
3. pnpm
¿Qué paquete manager deseas usar? (1-3): 1
```

Luego puedes usar cualquier comando como harías normalmente:
```bash
wilder-pnpm install
wilder-pnpm add react
wilder-pnpm remove axios
wilder-pnpm update
wilder-pnpm list
```

Todos los comandos se ejecutarán automáticamente con el registry configurado (por ejemplo: `http://nexus.uclv.edu.cu/repository/npm/`).

---

## 🔐 Registry predeterminado

El registry usado es:

```
http://nexus.uclv.edu.cu/repository/npm/
```

> 📌 Este valor está definido en el código (`CUSTOM_REGISTRY`) y puede cambiarse fácilmente antes de publicar.

---

## 🧩 ¿Quieres usar tu propio registry?

Edita el archivo `wilder.js` y cambia:

```js
const CUSTOM_REGISTRY = 'http://nexus.uclv.edu.cu/repository/npm/';
```

Luego vuelve a publicar o usa localmente con `npm link`.

---

## 🛠️ Desarrollo

Clona el repositorio y enlázalo globalmente:

```bash
git clone https://github.com/JohnyYen/wilder-pnpm
cd wilder-pnpm
npm link
```

Ahora puedes probarlo en cualquier proyecto:

```bash
wilder-pnpm install
```

