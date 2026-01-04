# 🐺 Wilder – Wrapper de npm con registry personalizado

> Un wrapper ligero para `npm` que inyecta automáticamente un registry personalizado en todos los comandos, con la capacidad de cambiar el registry dinámicamente.

🚀 Ejecuta tus comandos de npm como siempre, pero con el registry que necesites — sin configuraciones manuales ni recordar flags.

---

## 🌟 ¿Qué hace?

Este wrapper inyecta automáticamente un registry personalizado en todos los comandos de `npm`. El registry se puede cambiar dinámicamente mediante comandos específicos y se guarda en un archivo de configuración local `.wilderrc`.

✅ No necesitas modificar `.npmrc`
✅ No necesitas recordar `--registry=...`
✅ Cambia el registry dinámicamente con comandos simples
✅ Valida URLs antes de guardarlas
✅ Ideal para entornos corporativos, CI o desarrollo en regiones con acceso lento a npm

---

## 🔧 Características

- Inyección automática de registry en todos los comandos npm
- Sistema de configuración local mediante archivo `.wilderrc`
- Comandos para gestionar el registry:
  - `set-registry <url>` - Configura un nuevo registry
  - `get-registry` - Muestra el registry actual
  - `reset-registry` - Resetea al registry por defecto
- Validación de formato y accesibilidad de URLs
- Normalización automática de URLs (agrega `/` al final)
- Prompt de confirmación si el URL no es accesible
- Registry por defecto configurable

---

## 🚀 Instalación

### Opción 1: Instalar globalmente (recomendado)

```bash
npm install -g wilder-pnpm
```

### Opción 2: Usar directamente con `npx` (sin instalar)

```bash
npx wilder-pnpm install
npx wilder-pnpm add lodash
```

---

## 🛠️ Uso

### Gestionar el Registry

```bash
# Ver el registry actual
wilder get-registry

# Configurar un nuevo registry (valida formato y accesibilidad)
wilder set-registry https://registry.npmjs.org/

# Resetear al registry por defecto
wilder reset-registry
```

### Ejecutar Comandos de npm

Todos los comandos de npm funcionan normalmente, con el registry inyectado automáticamente:

```bash
# Instalar dependencias
wilder install

# Agregar un paquete
wilder add react

# Agregar con flags
wilder add axios --save-dev

# Actualizar paquetes
wilder update

# Listar paquetes
wilder list

# Cualquier comando de npm
wilder <comando>
```

---

## 🔐 Registry Predeterminado

El registry por defecto es:

```
http://nexus.uclv.edu.cu/repository/npm/
```

Este valor está definido en el código (`config.js`) y se usa cuando no hay un archivo `.wilderrc` en el proyecto.

---

## 🧩 Archivo de Configuración (.wilderrc)

El wrapper crea un archivo `.wilderrc` en el directorio del proyecto cuando configuras un registry personalizado:

```json
{
  "registry": "https://registry.npmjs.org/"
}
```

Este archivo es local al proyecto, por lo que diferentes proyectos pueden usar diferentes registries.

**Nota:** Este archivo no debe ser commiteado al repositorio (agregado a `.gitignore` si no está).

---

## 🔍 Validación de URLs

Cuando configuras un nuevo registry, el wrapper realiza dos validaciones:

1. **Validación de formato:** Verifica que sea un URL válido (comience con `http://` o `https://`).

2. **Validación de accesibilidad:** Intenta hacer una petición al URL para verificar que es accesible.

Si el URL no es accesible, te preguntará si quieres guardarlo de todas formas:

```
⚠️ URL no es accesible. ¿Quieres guardarlo de todas formas? (y/n): y
```

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
wilder install
```

---

## 📝 Ejemplos de Uso

```bash
# 1. Ver registry por defecto
wilder get-registry
# → ✅ Registry actual: http://nexus.uclv.edu.cu/repository/npm/

# 2. Cambiar a npmjs
wilder set-registry https://registry.npmjs.org/
# → ✅ Registry configurado a: https://registry.npmjs.org/

# 3. Verificar que cambió
wilder get-registry
# → ✅ Registry actual: https://registry.npmjs.org/

# 4. Instalar paquetes (usa el nuevo registry)
wilder install

# 5. Intentar URL inválida
wilder set-registry not-a-url
# → ❌ URL inválida: debe ser un URL válido (ej: https://registry.npmjs.org/)

# 6. Resetear a default
wilder reset-registry
# → ✅ Registry reseteado al valor por defecto: http://nexus.uclv.edu.cu/repository/npm/

# 7. Instalar usando registry local (verdaccio)
wilder set-registry http://localhost:4873/
# → ✅ Registry configurado a: http://localhost:4873/

# 8. Agregar paquete con banderas
wilder add lodash --save-exact
```

---

## 🔧 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `wilder set-registry <url>` | Configura un nuevo registry. Valida formato y accesibilidad. |
| `wilder get-registry` | Muestra el registry actual configurado. |
| `wilder reset-registry` | Elimina `.wilderrc` y usa el registry por defecto. |
| `wilder <npm-comando>` | Ejecuta cualquier comando de npm con el registry inyectado. |

---

## ⚠️ Consideraciones

- El archivo `.wilderrc` se crea en el directorio actual donde ejecutas el comando `set-registry`.
- Si ejecutas `wilder` en un subdirectorio, buscará `.wilderrc` en ese subdirectorio.
- El wrapper solo funciona con `npm` por ahora (no soporta yarn, pnpm, o bun).
- La validación de accesibilidad tiene un timeout de 5 segundos.

---

## 📄 Licencia

ISC
