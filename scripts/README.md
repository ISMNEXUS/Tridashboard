# 🔧 Scripts de Desarrollo - TRIANGLAIS

Esta carpeta contiene scripts de utilidad para gestionar el entorno de desarrollo.

## 📋 Scripts Disponibles

### 1. `dev.sh` - Script Maestro de Desarrollo

**Propósito:** Script principal que orquesta todo el proceso de inicio de desarrollo.

**Qué hace:**
1. ✅ Limpia puertos 3010 (principal), 3000 y 3001 (legacy)
2. ✅ Genera Prisma Client
3. ✅ Verifica y crea archivos .env
4. ✅ Genera NEXTAUTH_SECRET si no existe
5. ✅ Inicia el servidor en puerto 3010

**Uso:**
```bash
# Desde la raíz del proyecto
pnpm dev

# O directamente
bash scripts/dev.sh
```

**Características:**
- 🎨 Output con colores y ASCII art
- 🔄 Proceso automatizado completo
- ⚠️ Manejo de errores en cada paso
- 🚀 Siempre inicia en puerto 3010
- 🔄 Autoreinicio con PM2 + Watchdog en producción

---

### 2. `clean-ports.sh` - Limpiador de Puertos

**Propósito:** Libera los puertos 3010, 3000 y 3001 de manera inteligente.

**Qué hace:**
1. 🔍 Detecta procesos usando los puertos
2. 📊 Muestra información del proceso
3. 🛑 Detiene gracefully primero
4. ⚡ Fuerza cierre si es necesario
5. ✅ Verifica que los puertos estén libres

**Uso:**
```bash
# Desde la raíz del proyecto
pnpm port:clean

# O directamente
bash scripts/clean-ports.sh
```

**Características:**
- 🎯 Detección inteligente de procesos
- 🔒 Cierre graceful primero, forzado después
- 📝 Información detallada de cada paso
- ✅ Verificación final

---

### 3. `dev-restart.sh` - Reinicio Rápido

**Propósito:** Reinicia el servidor de desarrollo sin pasos adicionales.

**Qué hace:**
1. 🛑 Detiene todos los procesos de Next.js
2. 🔓 Libera puertos 3010, 3000 y 3001
3. ⏱️ Espera 2 segundos
4. 🚀 Inicia el servidor en puerto 3010

**Uso:**
```bash
# Desde la raíz del proyecto
pnpm dev:restart

# O directamente
bash scripts/dev-restart.sh
```

**Características:**
- ⚡ Más rápido que el script maestro
- 🎯 Solo reinicia sin verificaciones
- 🔄 Útil durante el desarrollo activo

---

## 🎯 Casos de Uso

### Inicio Normal de Desarrollo
```bash
pnpm dev
```
Usa esto al comenzar tu día de trabajo. Hace todas las verificaciones necesarias.

### Cambio de Puertos Bloqueados
```bash
pnpm port:clean
pnpm dev:frontend
```
Usa esto si el puerto 3010 está ocupado por otro proceso.

### Reinicio Rápido Durante Desarrollo
```bash
pnpm dev:restart
```
Usa esto cuando solo necesites reiniciar el servidor rápidamente.

### Limpiar Solo los Puertos
```bash
pnpm port:clean
```
Usa esto para liberar los puertos sin iniciar el servidor.

---

## 🔍 Solución de Problemas

### Error: "Port is in use"

**Problema:** El puerto 3010 está siendo usado por otro proceso.

**Solución:**
```bash
# Opción 1: Usar el limpiador de puertos
pnpm port:clean

# Opción 2: Manual
lsof -ti:3010,3000,3001 | xargs kill -9

# Luego iniciar normalmente
pnpm dev
```

### Error: "NEXTAUTH_SECRET missing"

**Problema:** No hay secret configurado para NextAuth.

**Solución:**
El script `dev.sh` lo genera automáticamente, o puedes agregarlo manualmente:
```bash
# Generar un secret
openssl rand -base64 32

# Agregarlo al archivo .env
echo 'NEXTAUTH_SECRET="tu-secret-generado"' >> .env
```

### Error: "Prisma Client not generated"

**Problema:** El Prisma Client no está generado o está desactualizado.

**Solución:**
```bash
pnpm db:generate
```
El script `dev.sh` también lo hace automáticamente.

---

## 📝 Comandos NPM Relacionados

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia desarrollo (script maestro) |
| `pnpm dev:frontend` | Solo frontend en puerto 3010 |
| `pnpm dev:restart` | Reinicio rápido |
| `pnpm dev:clean` | Limpia procesos e inicia |
| `pnpm port:clean` | Solo limpia puertos |
| `pnpm clean:ports` | Alias de port:clean |

---

## ⚙️ Variables de Entorno

Los scripts verifican y crean automáticamente:

- `.env` (raíz del proyecto)
- `apps/frontend/.env.local`

Variables clave:
- `DATABASE_URL` - Conexión a PostgreSQL
- `NEXTAUTH_URL` - URL del sitio (http://localhost:3010)
- `NEXTAUTH_SECRET` - Secret para NextAuth (generado automáticamente)
- `PORT` - Puerto del servidor (3010)

---

## 🚀 Mejores Prácticas

### ✅ DO
- Usa `pnpm dev` para iniciar el día
- Ejecuta `pnpm port:clean` si el puerto 3010 está ocupado
- Reinicia con `pnpm dev:restart` durante desarrollo activo
- Verifica que el servidor corra en puerto 3010
- Usa PM2 en producción para autoreinicio

### ❌ DON'T
- No ejecutes múltiples instancias del servidor
- No ignores los warnings de puerto ocupado
- No modifiques manualmente los archivos .env.local sin respaldar

---

## 🔄 Flujo de Trabajo Recomendado

```bash
# 1. Inicio del día
pnpm dev

# 2. Durante desarrollo (si necesitas reiniciar)
pnpm dev:restart

# 3. Si hay problemas de puerto
pnpm port:clean
pnpm dev

# 4. Al terminar
Ctrl+C  # Detiene el servidor
```

---

## 📊 Arquitectura de Scripts

```
scripts/
├── dev.sh              # Script maestro (orquesta todo)
│   ├── Llama a: clean-ports.sh
│   ├── Ejecuta: pnpm db:generate
│   ├── Verifica: .env files
│   └── Inicia: servidor en puerto 3010
│
├── clean-ports.sh      # Limpieza inteligente de puertos
│   ├── Detecta procesos en 3010/3000/3001
│   ├── Cierre graceful + forzado
│   └── Verificación final
│
└── dev-restart.sh      # Reinicio rápido
    ├── Mata procesos Next.js
    ├── Libera puertos
    └── Inicia servidor
```

---

## 🎨 Características Visuales

Todos los scripts incluyen:
- ✅ Colores en la terminal (verde, amarillo, rojo, azul)
- 📊 Indicadores de progreso
- 🎯 Mensajes claros de estado
- ⚠️ Advertencias visibles
- ✅ Confirmaciones de éxito

---

## 🛠️ Mantenimiento

### Actualizar Scripts

Si necesitas modificar los scripts:

1. Edita el archivo en `scripts/`
2. Asegúrate de que tenga permisos de ejecución:
   ```bash
   chmod +x scripts/nombre-script.sh
   ```
3. Prueba el script:
   ```bash
   bash scripts/nombre-script.sh
   ```
4. Documenta cambios en este README

### Agregar Nuevos Scripts

1. Crea el archivo en `scripts/`
2. Dale permisos de ejecución
3. Agrega un comando en `package.json`
4. Documenta en este README

---

**Última actualización:** Octubre 24, 2025  
**Versión:** 1.0.0
