# 🦁 PridePN – Wrapper de pnpm con registry personalizado

> Un wrapper ligero y poderoso de `pnpm` que ejecuta todos los comandos con un **registry predefinido**, ideal para equipos, CI/CD o usuarios que usan mirrors o registries privados.

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
npm install -g pridepn
```

> 💡 Puedes cambiar el nombre a `roar`, `mypnpm`, `aquila`, etc.

### Opción 2: Usar directamente con `npx` (sin instalar)

```bash
npx pridepn install
npx pridepn add lodash
```

---

## 🛠️ Uso

Una vez instalado, usa `pridepn` como si fuera `pnpm`:

```bash
pridepn install
pridepn add react
pridepn remove axios
pridepn update
pridepn list
```

Todos los comandos se ejecutarán automáticamente con el registry configurado (por ejemplo: `https://registry.npmmirror.com`).

---

## 🔐 Registry predeterminado

El registry usado es:

```
https://registry.npmmirror.com
```

> 📌 Este valor está definido en el código (`CUSTOM_REGISTRY`) y puede cambiarse fácilmente antes de publicar.

---

## 🧩 ¿Quieres usar tu propio registry?

Edita el archivo `index.js` y cambia:

```js
const CUSTOM_REGISTRY = 'https://tu-registry.com';
```

Luego vuelve a publicar o usa localmente con `npm link`.

---

## 🛠️ Desarrollo

Clona el repositorio y enlázalo globalmente:

```bash
git clone https://github.com/tu-usuario/pridepn.git
cd pridepn
npm link
```

Ahora puedes probarlo en cualquier proyecto:

```bash
pridepn install
```

---

## 📦 Publicación (para mantenedores)

```bash
npm version patch
npm publish
```

Asegúrate de tener acceso al nombre del paquete en [npmjs.com](https://npmjs.com).

---

## 📎 Licencia

MIT © [Tu Nombre]

---

> Creado con ❤️ y orgullo de manada.


---

### ✅ ¿Cómo personalizarlo?

1. **Cambia el nombre**: Reemplaza `pridepn` por el que quieras: `roar`, `mane`, `aquila`, `pnpm-mirror`, etc.
2. **Cambia el registry**: Edita `CUSTOM_REGISTRY` en `index.js`
3. **Cambia el logo**: Puedes agregar un ícono o banner en la cabecera

---

### 🎁 Bonus: Agrega un badge de versión

Si lo publicas en NPM, añade esto bajo el título:


![npm](https://img.shields.io/npm/v/pridepn?label=version)
```

---

¿Quieres que te genere también un `package.json` completo, un `LICENSE`, o un `CHANGELOG.md` para este proyecto? Puedo darte todo listo para publicar.