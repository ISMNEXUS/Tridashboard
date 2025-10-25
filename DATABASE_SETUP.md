# 🗄️ Configuración de PostgreSQL para TRIANGLAIS

## Instalación de PostgreSQL 16 (Ubuntu/Debian)

```bash
# Actualizar el sistema
sudo apt update

# Instalar PostgreSQL 16
sudo apt install postgresql-16 postgresql-contrib-16

# Verificar instalación
psql --version
```

## Configuración Inicial

### 1. Acceder a PostgreSQL
```bash
sudo -u postgres psql
```

### 2. Crear Usuario y Base de Datos

Dentro de la consola de PostgreSQL:

```sql
-- Crear usuario
CREATE USER trianglais_user WITH PASSWORD 'trianglais2025';

-- Crear base de datos
CREATE DATABASE trianglais OWNER trianglais_user;

-- Otorgar privilegios
GRANT ALL PRIVILEGES ON DATABASE trianglais TO trianglais_user;

-- Conectar a la base de datos
\c trianglais

-- Otorgar privilegios en el schema public
GRANT ALL ON SCHEMA public TO trianglais_user;

-- Salir
\q
```

### 3. Configurar Variables de Entorno

Edita el archivo `.env` en la raíz del proyecto:

```env
# DATABASE_URL para PostgreSQL externo
DATABASE_URL="postgresql://postgres:password@72.60.30.253:5432/dashtrian?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3010"
NEXTAUTH_SECRET="your-secret-key-here"
```

**⚠️ IMPORTANTE**: En producción, usa contraseñas seguras y únicas.

## Inicializar Base de Datos

### 1. Generar Cliente Prisma
```bash
cd /workspaces/Tridashboard
pnpm db:generate
```

### 2. Crear Tablas
```bash
# Opción 1: Push directo (desarrollo)
pnpm db:push

# Opción 2: Migraciones (producción)
pnpm db:migrate
```

### 3. Poblar con Datos Iniciales
```bash
pnpm db:seed
```

Esto creará:
- ✅ Roles del sistema (SUPER_ADMIN, ADMIN, MANAGER, SALES, TEACHER, STUDENT)
- ✅ Usuario administrador (admin@trianglais.com / admin123)
- ✅ Permisos básicos
- ✅ Configuraciones del sistema

## Verificar la Instalación

### Opción 1: Prisma Studio (Recomendado)
```bash
pnpm db:studio
```

Se abrirá una interfaz web en `http://localhost:5555` donde podrás:
- Ver todas las tablas
- Explorar datos
- Editar registros
- Ejecutar consultas

### Opción 2: Cliente psql
```bash
psql -U trianglais_user -d trianglais -h localhost
```

Consultas de verificación:
```sql
-- Ver todas las tablas
\dt

-- Verificar usuarios
SELECT id, email, name, "isActive" FROM users;

-- Verificar roles
SELECT id, name, description FROM roles;

-- Contar registros
SELECT 
  (SELECT COUNT(*) FROM users) as usuarios,
  (SELECT COUNT(*) FROM roles) as roles,
  (SELECT COUNT(*) FROM permissions) as permisos;
```

## Comandos Útiles de PostgreSQL

```bash
# Ver estado del servicio
sudo systemctl status postgresql

# Iniciar servicio
sudo systemctl start postgresql

# Detener servicio
sudo systemctl stop postgresql

# Reiniciar servicio
sudo systemctl restart postgresql

# Habilitar inicio automático
sudo systemctl enable postgresql

# Ver logs
sudo tail -f /var/log/postgresql/postgresql-16-main.log
```

## Comandos Útiles de Prisma

```bash
# Generar cliente Prisma
pnpm db:generate

# Sincronizar schema (sin migraciones)
pnpm db:push

# Crear migración
pnpm db:migrate

# Ejecutar seed
pnpm db:seed

# Abrir Prisma Studio
pnpm db:studio

# Formatear schema
npx prisma format

# Validar schema
npx prisma validate

# Resetear base de datos (⚠️ BORRA TODOS LOS DATOS)
npx prisma migrate reset
```

## Conexión desde el Código

La conexión se maneja automáticamente a través de Prisma. Ejemplo:

```typescript
import { prisma } from '@/lib/prisma';

// Consulta de ejemplo
const users = await prisma.user.findMany({
  include: {
    roles: {
      include: {
        role: true,
      },
    },
  },
});
```

## Respaldos (Backup)

### Crear Respaldo
```bash
# Respaldo completo
pg_dump -U trianglais_user -h localhost trianglais > backup_$(date +%Y%m%d).sql

# Respaldo comprimido
pg_dump -U trianglais_user -h localhost trianglais | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Restaurar Respaldo
```bash
# Desde archivo SQL
psql -U trianglais_user -h localhost -d trianglais < backup_20251024.sql

# Desde archivo comprimido
gunzip -c backup_20251024.sql.gz | psql -U trianglais_user -h localhost -d trianglais
```

## Solución de Problemas

### Error: "FATAL: Peer authentication failed"
Edita `/etc/postgresql/16/main/pg_hba.conf`:
```
# Cambiar de "peer" a "md5"
local   all             all                                     md5
host    all             all             127.0.0.1/32            md5
```

Luego reinicia PostgreSQL:
```bash
sudo systemctl restart postgresql
```

### Error: "Connection refused"
```bash
# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql

# Verificar el puerto
sudo netstat -plunt | grep postgres

# Verificar archivo de configuración
sudo nano /etc/postgresql/16/main/postgresql.conf
# Buscar: listen_addresses = 'localhost'
```

### Error: "Database does not exist"
```bash
# Crear la base de datos
createdb -U postgres trianglais

# O desde psql
sudo -u postgres psql -c "CREATE DATABASE trianglais;"
```

### Error: Prisma genera error de conexión
1. Verifica que PostgreSQL esté corriendo
2. Verifica las credenciales en `.env`
3. Regenera el cliente Prisma: `pnpm db:generate`
4. Intenta conectar con psql para confirmar credenciales

## Migrar a Producción

### 1. Usar Migraciones en lugar de Push
```bash
# Crear migración inicial
pnpm dlx prisma migrate dev --name init

# Aplicar migraciones en producción
pnpm dlx prisma migrate deploy
```

### 2. Variables de Entorno Seguras
```env
# Usar URL de base de datos de producción
DATABASE_URL="postgresql://user:password@prod-host:5432/trianglais?sslmode=require"

# Clave secreta única
NEXTAUTH_SECRET="generar-con-openssl-rand-base64-32"
```

### 3. SSL/TLS
Para producción, siempre usa SSL:
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

## Monitoreo

### Ver Conexiones Activas
```sql
SELECT 
  pid,
  usename,
  application_name,
  client_addr,
  backend_start,
  state
FROM pg_stat_activity
WHERE datname = 'trianglais';
```

### Ver Tamaño de la Base de Datos
```sql
SELECT 
  pg_database.datname,
  pg_size_pretty(pg_database_size(pg_database.datname)) AS size
FROM pg_database
WHERE datname = 'trianglais';
```

### Ver Tamaño de Tablas
```sql
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 🎯 Checklist de Configuración

- [ ] PostgreSQL 16 instalado
- [ ] Servicio PostgreSQL corriendo
- [ ] Usuario `trianglais_user` creado
- [ ] Base de datos `trianglais` creada
- [ ] Privilegios otorgados
- [ ] Archivo `.env` configurado
- [ ] Cliente Prisma generado (`pnpm db:generate`)
- [ ] Tablas creadas (`pnpm db:push`)
- [ ] Datos iniciales cargados (`pnpm db:seed`)
- [ ] Prisma Studio funciona (`pnpm db:studio`)
- [ ] Conexión verificada desde la aplicación

---

¿Problemas? Revisa los logs de PostgreSQL y Prisma para más detalles.
