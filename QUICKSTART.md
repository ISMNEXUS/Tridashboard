# 🚀 Guía de Inicio Rápido - TRIANGLAIS

## Inicio Rápido en 5 Pasos

### 1️⃣ Instalar Dependencias
```bash
pnpm install
```

### 2️⃣ Configurar Base de Datos

Asegúrate de tener PostgreSQL 16 corriendo. Luego actualiza el archivo `.env`:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/trianglais?schema=public"
```

### 3️⃣ Generar Cliente Prisma y Migrar
```bash
pnpm db:generate
pnpm db:push
pnpm db:seed
```

### 4️⃣ Iniciar Desarrollo
```bash
pnpm dev
```

### 5️⃣ Acceder a la Aplicación

Abre tu navegador en: `http://localhost:3000`

**Credenciales de prueba:**
- Email: `admin@trianglais.com`
- Contraseña: `admin123`

---

## Comandos Útiles

```bash
# Desarrollo
pnpm dev                  # Iniciar servidor de desarrollo
pnpm dev:frontend         # Solo frontend
pnpm build                # Construir para producción

# Base de Datos
pnpm db:studio            # Abrir Prisma Studio (UI visual)
pnpm db:migrate           # Crear nueva migración
pnpm db:push              # Sincronizar schema sin migración
pnpm db:seed              # Poblar con datos de prueba

# Utilidades
pnpm lint                 # Ejecutar linter
pnpm clean                # Limpiar archivos build
```

---

## Estructura de Módulos

### 🤝 CRM - Customer Relationship Management
- `/dashboard/crm` - Dashboard de CRM
- Gestión de Leads
- Sistema de Chat
- Email integrado
- Actividades y seguimiento

### 💼 ERP - Enterprise Resource Planning
- `/dashboard/erp` - Dashboard de ERP
- Ventas y facturación
- Compras y gastos
- Reportes financieros

### 👥 Administración
- `/dashboard/admin` - Panel de administración
- Gestión de usuarios
- Roles y permisos
- Cursos y horarios

### ⚙️ Configuración
- `/dashboard/config` - Configuración del sistema
- Parámetros generales
- Personalización

---

## Solución de Problemas

### Error: "Can't reach database server"
```bash
# Verifica que PostgreSQL esté corriendo
sudo service postgresql status

# Inicia PostgreSQL si está detenido
sudo service postgresql start
```

### Error: "Prisma Client not generated"
```bash
pnpm db:generate
```

### Error en dependencias
```bash
# Limpia e instala de nuevo
rm -rf node_modules
pnpm install
```

---

## Próximos Pasos

1. ✅ Familiarízate con el Dashboard
2. ✅ Explora el módulo CRM
3. ✅ Revisa la gestión de usuarios en Admin
4. ✅ Personaliza la configuración
5. ✅ Consulta el README principal para más detalles

---

¿Necesitas ayuda? Consulta el [README.md](./README.md) completo o contacta al equipo de desarrollo.
