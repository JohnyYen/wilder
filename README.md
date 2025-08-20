# 🐺 Wilder – Wrapper de pnpm con registry personalizado

> Un wrapper ligero y poderoso de `pnpm` que no gasta datos, que ejecuta todos los comandos con un **registry predefinido**, ideal para equipos, CI/CD o usuarios que usan mirrors o registries privados. 

🚀 Ejecuta `pnpm` como siempre, pero con el registry que necesitas — sin configuraciones manuales.

---

## 🌟 ¿Qué hace?

Este wrapper ejecuta cualquier comando de `pnpm` (como `install`, `add`, `update`, etc.) **inyectando automáticamente un registry personalizado**, definido directamente en el código.

✅ No necesitas modificar `.npmrc`  
✅ No necesitas recordar `--registry=...`  
✅ Ideal para entornos corporativos, CI o desarrollo en regiones con acceso lento a npm

---

## 🔧 Características

- Usa el mismo motor de `pnpm` (100% compatible)
- Registry preconfigurado (ej: mirror chino, registry privado, Nexus, etc.)
- Fácil de instalar y usar
- Transparente: los comandos son idénticos a `pnpm`
- Extensible: puedes personalizarlo con más lógica (logging, validación, etc.)

---

## 🚀 Instalación

### Opción 1: Instalar globalmente (recomendado)

```bash
npm install -g wilder
```

> 💡 Puedes cambiar el nombre a `roar`, `mypnpm`, `aquila`, etc.

### Opción 2: Usar directamente con `npx` (sin instalar)

```bash
npx wilder install
npx wilder add lodash
```

---

## 🛠️ Uso

Una vez instalado, usa `pridepn` como si fuera `pnpm`:

```bash
wilder install
wilder add react
wilder remove axios
wilder update
wilder list
```

Todos los comandos se ejecutarán automáticamente con el registry configurado (por ejemplo: `http://nexus.uclv.edu.cu/repository/npm/'`).

---

## 🔐 Registry predeterminado

El registry usado es:

```
http://nexus.uclv.edu.cu/repository/npm/'
```

> 📌 Este valor está definido en el código (`CUSTOM_REGISTRY`) y puede cambiarse fácilmente antes de publicar.

---

## 🧩 ¿Quieres usar tu propio registry?

Edita el archivo `wilder.js` y cambia:

```js
const CUSTOM_REGISTRY = 'http://nexus.uclv.edu.cu/repository/npm/'';
```

Luego vuelve a publicar o usa localmente con `npm link`.

---

## 🛠️ Desarrollo

Clona el repositorio y enlázalo globalmente:

```bash
git clone https://github.com/JohnyYen/wilder
cd wilder
npm link
```

Ahora puedes probarlo en cualquier proyecto:

```bash
wilder install
```

