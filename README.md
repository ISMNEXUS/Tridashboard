# 🎓 TRIANGLAIS - Sistema Integral para Academia de Idiomas

Sistema completo de gestión empresarial para academias de inglés que integra CRM, ERP, Administración y Configuración en una plataforma moderna y escalable.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.17.0-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-UNLICENSED-red)](LICENSE)

## 🚀 Estado del Proyecto

- ✅ **100% Funcional** - Todas las rutas y funcionalidades operativas
- ✅ **Actualizado** - Next.js 15 + React 19 + Node.js 22
- ✅ **Probado** - Pruebas automáticas pasando exitosamente
- ✅ **Listo para Producción** - Build optimizado y sin errores

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Instalación Rápida](#-instalación-rápida)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Módulos del Sistema](#-módulos-del-sistema)
- [Scripts Disponibles](#-scripts-disponibles)
- [Despliegue en Producción](#-despliegue-en-producción)
- [Desarrollo](#-desarrollo)

## 🎯 Descripción General

TRIANGLAIS es una aplicación web diseñada para administrar de manera integral una academia de inglés. Incluye gestión de leads, ventas, facturación, usuarios, roles, cursos y mucho más, todo en una interfaz moderna, intuitiva y responsive.

### Objetivos del Proyecto

- ✅ Centralizar la gestión operativa de la academia
- ✅ Automatizar procesos de ventas y seguimiento de leads
- ✅ Facilitar la administración de usuarios y roles
- ✅ Proporcionar métricas y reportes en tiempo real
- ✅ Ofrecer una experiencia de usuario moderna y profesional
- ✅ Garantizar escalabilidad y mantenibilidad del código

## ✨ Características Principales

### 🔐 Autenticación y Seguridad
- Sistema de login seguro con NextAuth.js v5
- Gestión de roles y permisos (RBAC)
- Protección de rutas basada en roles
- Sesiones JWT para alto rendimiento
- Hash de contraseñas con bcryptjs

### 📊 Dashboard Principal
- Vista general de métricas clave
- Acceso rápido a todos los módulos
- Navegación intuitiva con menú desplegable
- Diseño responsive (Desktop, Tablet, Mobile)

### 🤝 Módulo CRM
- **Gestión de Leads**: Captura, seguimiento y conversión
- **Sistema de Actividades**: Llamadas, emails, reuniones
- **Chat en Tiempo Real**: Comunicación interna
- **Email Integrado**: Envío y recepción de correos
- **Tags y Categorización**: Organización avanzada
- **Pipeline de Ventas**: Visualización del embudo

### 💼 Módulo ERP
- **Ventas**: Registro y seguimiento de transacciones
- **Compras**: Gestión de proveedores y órdenes
- **Gastos**: Categorización y control de egresos
- **Facturación**: Generación automática de facturas
- **Reportes Financieros**: Análisis de ingresos/egresos
- **Dashboard Financiero**: Métricas en tiempo real

### 👥 Módulo de Administración
- **Gestión de Usuarios**: CRUD completo
- **Asignación de Roles**: Control granular de permisos
- **Gestión de Cursos**: Catálogo de programas
- **Inscripciones**: Registro de estudiantes
- **Horarios**: Programación de clases
- **Plataformas de Aprendizaje**: Integración educativa

### ⚙️ Módulo de Configuración
- **Configuración del Sistema**: Ajustes generales
- **Parámetros por Módulo**: CRM, ERP, Admin
- **Personalización**: Adaptación automática
- **Preferencias**: Configuración de usuario

## 🛠 Stack Tecnológico

### Frontend
- **Framework**: Next.js 15.5.6 (App Router)
- **UI Library**: React 19.0.0
- **Lenguaje**: TypeScript 5.7.3
- **Estilos**: TailwindCSS 3.4.17
- **Componentes**: Shadcn/ui + Radix UI
- **Formularios**: React Hook Form 7.54.2 + Zod 3.24.1
- **Iconos**: Lucide React 0.469.0
- **Gráficos**: Recharts 2.15.0
- **Gráficos**: Recharts

### Backend
- **ORM**: Prisma 5.22.0
- **Base de Datos**: PostgreSQL 16
- **Autenticación**: NextAuth.js v5.0.0-beta.29
- **Validación**: Zod 3.24.1
- **Password Hashing**: bcryptjs 2.4.3

### Infraestructura
- **Monorepo**: pnpm workspaces
- **Package Manager**: pnpm 10.13.1+
- **Node.js**: 22.17.0+ (Requerido)
- **Control de Versiones**: Git

### Herramientas de Desarrollo
- **Linting**: ESLint 9.18.0
- **Testing**: Playwright 1.56.1
- **Database UI**: Prisma Studio
- **Build Tool**: Next.js Compiler (SWC)
- **Development**: Hot Reload / Fast Refresh

## 📁 Estructura del Proyecto

```
Tridashboard/
├── apps/
│   └── frontend/              # Aplicación Next.js 15
│       ├── src/
│       │   ├── app/          # App Router
│       │   │   ├── login/    # Autenticación
│       │   │   ├── dashboard/# Dashboard + módulos
│       │   │   └── api/      # API routes (NextAuth)
│       │   ├── components/   # Componentes React
│       │   │   ├── ui/       # UI base (Shadcn/Radix)
│       │   │   ├── auth/     # Login/Auth
│       │   │   └── dashboard/# Dashboard específicos
│       │   └── lib/          # Utilidades
│       ├── tests/            # Pruebas E2E (Playwright)
│       └── package.json
│
├── packages/
│   ├── database/             # Prisma + PostgreSQL
│   │   ├── prisma/
│   │   │   ├── schema.prisma # Esquema de BD
│   │   │   └── seed.ts       # Datos iniciales
│   │   └── package.json
│   │
│   └── shared/               # Código compartido
│       ├── schemas.ts        # Validaciones Zod
│       ├── types.ts          # TypeScript types
│       └── package.json
│
├── scripts/                  # Scripts de utilidad
│   ├── dev.sh               # Iniciar desarrollo
│   ├── test-routes.sh       # Probar rutas
│   ├── verify-all.sh        # Verificación completa
│   └── deploy.sh            # Despliegue rápido
│
├── .env                      # Variables de entorno
├── playwright.config.ts      # Config de Playwright
├── pnpm-workspace.yaml       # Workspace config
├── package.json              # Dependencias raíz
└── README.md                 # Este archivo
```

## ⚡ Instalación Rápida

### Prerrequisitos

- **Node.js**: v22.17.0 o superior (REQUERIDO)
- **pnpm**: v8.0.0 o superior
- **PostgreSQL**: v16 (ya configurado en servidor remoto)
- **Git**: Para clonar el repositorio

### Instalación Automática

```bash
# 1. Clonar el repositorio
git clone https://github.com/ISMNEXUS/Tridashboard.git
cd Tridashboard

# 2. Ejecutar script de despliegue (hace todo automáticamente)
bash scripts/deploy.sh
```

### Instalación Manual

```bash
# 1. Clonar el repositorio
git clone https://github.com/ISMNEXUS/Tridashboard.git
cd Tridashboard
```

2. **Instalar dependencias**
```bash
pnpm install
```
cd Tridashboard

# 2. Instalar dependencias
pnpm install

# 3. Generar Prisma Client
pnpm db:generate

# 4. Compilar para producción (opcional)
pnpm build:frontend

# 5. Iniciar servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:3010`

**Credenciales de prueba:**
- Email: `admin@trianglais.com`
- Contraseña: `admin123`

## ⚙️ Configuración

### Variables de Entorno

El proyecto ya viene configurado con las variables necesarias para el servidor remoto de PostgreSQL.

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `DATABASE_URL` | Ya configurada | PostgreSQL remoto (72.60.30.253:5432) |
| `NEXTAUTH_URL` | `http://localhost:3010` | URL de la aplicación |
| `NEXTAUTH_SECRET` | Ya configurada | Clave secreta para JWT |

> **⚠️ IMPORTANTE**: En producción, cambiar `NEXTAUTH_SECRET` por un valor único y seguro.

### Archivos de Configuración

- `.env` - Variables de entorno raíz
- `.env.local` - Variables de entorno locales
- `apps/frontend/.env.local` - Variables específicas del frontend
- `packages/database/.env` - Variables de Prisma

## 📜 Scripts Disponibles

### Desarrollo
```bash
pnpm dev                 # Iniciar servidor de desarrollo (puerto 3010)
pnpm dev:frontend        # Solo frontend
pnpm dev:clean           # Limpiar y reiniciar
pnpm dev:restart         # Reiniciar servidor
```

### Build y Producción
```bash
pnpm build              # Build completo
pnpm build:frontend     # Build solo frontend
pnpm start              # Iniciar en modo producción
```

### Base de Datos
```bash
pnpm db:generate        # Generar Prisma Client
pnpm db:push            # Sincronizar schema con BD
pnpm db:migrate         # Crear nueva migración
pnpm db:studio          # Abrir Prisma Studio (GUI)
pnpm db:seed            # Poblar datos iniciales
```

### Pruebas y Verificación
```bash
bash scripts/test-routes.sh    # Probar todas las rutas
bash scripts/verify-all.sh     # Verificación completa
pnpm exec playwright test      # Pruebas E2E
```

### Utilidades
```bash
pnpm clean              # Limpiar builds
pnpm clean:ports        # Liberar puertos 3010/3001
bash scripts/deploy.sh  # Despliegue rápido
```
| `SMTP_HOST` | Servidor SMTP para emails | ❌ |
| `SMTP_PORT` | Puerto SMTP | ❌ |
| `SMTP_USER` | Usuario SMTP | ❌ |
| `SMTP_PASSWORD` | Contraseña SMTP | ❌ |
| `API_URL` | URL del backend API | ❌ |

### Base de Datos PostgreSQL

Asegúrate de tener PostgreSQL 16 instalado. Para crear la base de datos:

```sql
CREATE DATABASE trianglais;
CREATE USER trianglais_user WITH ENCRYPTED PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE trianglais TO trianglais_user;
```

## 📖 Uso

### Credenciales de Acceso Iniciales

Después de ejecutar el seed, usa estas credenciales:

- **Email**: `admin@trianglais.com`
- **Contraseña**: `admin123`

⚠️ **Importante**: Cambia estas credenciales en producción.

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev                    # Inicia todos los servicios
pnpm dev:frontend           # Solo frontend
pnpm dev:backend            # Solo backend (cuando esté disponible)

# Build
pnpm build                  # Construir todos los proyectos
pnpm build:frontend         # Solo frontend
pnpm build:backend          # Solo backend

# Base de datos
pnpm db:generate            # Generar cliente Prisma
pnpm db:push                # Sincronizar schema (desarrollo)
pnpm db:migrate             # Crear migración
pnpm db:studio              # Abrir Prisma Studio

# Otros
pnpm lint                   # Ejecutar linter
pnpm clean                  # Limpiar archivos build
```

## 🎯 Módulos del Sistema

### 1. CRM (Customer Relationship Management)

**Características:**
- Dashboard de métricas de leads
- Gestión completa del ciclo de vida del lead
- Sistema de actividades y seguimiento
- Chat en tiempo real
- Integración de email
- Reportes y analíticas

**Estados de Lead:**
- NEW (Nuevo)
- CONTACTED (Contactado)
- QUALIFIED (Calificado)
- PROPOSAL (Propuesta enviada)
- NEGOTIATION (En negociación)
- CONVERTED (Convertido)
- LOST (Perdido)

### 2. ERP (Enterprise Resource Planning)

**Características:**
- Gestión de ventas y facturación
- Control de compras
- Seguimiento de gastos
- Reportes financieros
- Dashboard de métricas

**Módulos:**
- Ventas
- Compras
- Gastos
- Facturación
- Reportes

### 3. Administración

**Características:**
- CRUD de usuarios
- Gestión de roles y permisos
- Catálogo de cursos
- Inscripciones de estudiantes
- Programación de horarios

**Roles Disponibles:**
- SUPER_ADMIN
- ADMIN
- MANAGER
- SALES
- TEACHER
- STUDENT
- SUPPORT

### 4. Configuración

**Características:**
- Configuración del sistema
- Parámetros por módulo
- Personalización de la plataforma
- Ajustes de usuario

## 🗄️ Base de Datos

### Esquema Principal

El esquema de la base de datos está diseñado para ser:
- **Normalizado**: Evita redundancia de datos
- **Escalable**: Preparado para crecimiento
- **Flexible**: Permite extensiones futuras
- **Seguro**: Implementa mejores prácticas

### Tablas Principales

**Autenticación:**
- `users` - Usuarios del sistema
- `accounts` - Cuentas de OAuth
- `sessions` - Sesiones activas
- `verification_tokens` - Tokens de verificación

**Roles y Permisos:**
- `roles` - Roles del sistema
- `user_roles` - Relación usuario-rol
- `permissions` - Permisos disponibles
- `role_permissions` - Relación rol-permiso

**CRM:**
- `leads` - Prospectos
- `activities` - Actividades de seguimiento
- `tags` - Etiquetas
- `emails` - Correos electrónicos
- `chat_rooms` - Salas de chat
- `chat_messages` - Mensajes de chat

**ERP:**
- `sales` - Ventas
- `sale_items` - Detalles de venta
- `purchases` - Compras
- `purchase_items` - Detalles de compra
- `expenses` - Gastos
- `invoices` - Facturas

**Administración:**
- `courses` - Cursos disponibles
- `enrollments` - Inscripciones
- `schedules` - Horarios de clases

**Configuración:**
- `system_configs` - Configuraciones del sistema
- `tasks` - Tareas y recordatorios

## 🔧 Desarrollo

### Convenciones de Código

- **TypeScript**: Tipos estrictos en todo el código
- **Naming**: camelCase para variables, PascalCase para componentes
- **Imports**: Orden alfabético, separados por tipo
- **Components**: Componentes funcionales con TypeScript
- **Hooks**: Custom hooks con prefijo `use`

### Estructura de Componentes

```tsx
// Imports
import { useState } from 'react';
import { ComponentProps } from './types';

// Types
interface Props extends ComponentProps {
  // ...
}

// Component
export function Component({ prop1, prop2 }: Props) {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleAction = () => {
    // ...
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Añadir Nuevas Características

1. **Crear branch**
```bash
git checkout -b feature/nueva-caracteristica
```

2. **Desarrollar**
- Añade los archivos necesarios
- Actualiza tests si es necesario
- Documenta los cambios

3. **Commit**
```bash
git add .
git commit -m "feat: descripción de la característica"
```

4. **Push y PR**
```bash
git push origin feature/nueva-caracteristica
```

### Prisma Migrations

```bash
# Crear una nueva migración
pnpm db:migrate

# Aplicar migraciones pendientes
pnpm db:push

# Resetear base de datos (⚠️ borra todos los datos)
pnpm dlx prisma migrate reset
```

## 🎨 Diseño

### Principios de Diseño

- **Minimalista**: Interfaz limpia y enfocada
- **Intuitivo**: Navegación clara y predecible
- **Moderno**: Uso de las últimas tendencias de UI/UX
- **Professional**: Apariencia empresarial y confiable
- **Responsive**: Adaptable a todos los dispositivos

### Paleta de Colores

La paleta está definida en `globals.css` usando variables CSS:
- Primary: Azul corporativo
- Secondary: Gris claro
- Destructive: Rojo para acciones destructivas
- Muted: Colores atenuados para elementos secundarios

### Componentes UI

Todos los componentes UI están basados en Shadcn/ui:
- Totalmente personalizables
- Accesibles (WAI-ARIA)
- Con tipos TypeScript
- Testeados y documentados

## 📝 Próximas Características

- [ ] Backend NestJS completo
- [x] Dashboard con métricas en tiempo real
- [x] Sistema de autenticación robusto
- [x] Pruebas automatizadas E2E
- [ ] API RESTful documentada
- [ ] Reportes en PDF
- [ ] Notificaciones en tiempo real
- [ ] Integración con plataformas de pago
- [ ] App móvil (React Native)
- [ ] Sistema de backup automático

## 🚀 Despliegue en Producción

### Requisitos del Servidor

- **Node.js**: v22.x o superior (REQUERIDO)
- **PostgreSQL**: v16 (ya configurado)
- **RAM**: Mínimo 2 GB
- **CPU**: Mínimo 2 cores

### Despliegue Rápido

```bash
# En el servidor de producción
bash scripts/deploy.sh
```

### Despliegue con PM2 (Recomendado)

```bash
# Instalar PM2
npm install -g pm2

# Compilar para producción
pnpm build:frontend

# Iniciar con PM2
pm2 start ecosystem.config.js

# Configurar inicio automático
pm2 startup
pm2 save
```

### Configurar Nginx

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL con Certbot

```bash
sudo certbot --nginx -d tu-dominio.com
```

**📘 Documentación Completa**: Ver `DESPLIEGUE_PRODUCCION.md`

## 📚 Documentación Adicional

- **[ACTUALIZACION_NEXTJS15.md](ACTUALIZACION_NEXTJS15.md)** - Detalles de la actualización a Next.js 15
- **[RESUMEN_EJECUTIVO.md](RESUMEN_EJECUTIVO.md)** - Resumen ejecutivo del proyecto
- **[DESPLIEGUE_PRODUCCION.md](DESPLIEGUE_PRODUCCION.md)** - Guía completa de despliegue

## 🧪 Estado de Pruebas

```
✅ 15/15 verificaciones pasadas
✅ 7/7 rutas principales funcionando
✅ 0 errores de TypeScript
✅ 0 errores de compilación
✅ Build de producción exitoso
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y propietario. Todos los derechos reservados © 2025 ISMNEXUS.

## 👨‍💻 Autor

**ISMNEXUS**  
Sistema desarrollado para TRIANGLAIS - Academia de Idiomas

## 🙏 Agradecimientos

- Next.js team por el excelente framework
- Vercel por las herramientas de desarrollo
- Shadcn por los componentes UI
- Prisma por el ORM excepcional
- Toda la comunidad open source

---

<div align="center">

**Versión**: 2.0.0  
**Última actualización**: 24 de Octubre, 2025  
**Estado**: ✅ **LISTO PARA PRODUCCIÓN**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.17.0-green)](https://nodejs.org/)

Para más información o soporte, contacta al equipo de desarrollo.

</div>
