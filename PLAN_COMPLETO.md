# 📋 PLAN COMPLETO PARA TRIANGLAIS - 100% FUNCIONAL

## ✅ PROBLEMAS SOLUCIONADOS

### 🔧 Errores Críticos Resueltos

1. **❌ NextAuth v5 - Imports incorrectos**
   - ✅ **Solucionado**: Actualizado a usar `auth()` en lugar de `getServerSession()`
   - ✅ Exportado correctamente: `{ handlers, auth, signIn, signOut }`

2. **❌ bcrypt - Error de compilación nativa**
   - ✅ **Solucionado**: Reemplazado `bcrypt` por `bcryptjs` (JavaScript puro, sin dependencias nativas)
   - ✅ Actualizado en: `frontend/package.json`, `database/package.json`, `seed.ts`, `auth.ts`

3. **❌ Prisma Client - No generado**
   - ✅ **Solucionado**: Cliente Prisma generado correctamente
   - ✅ Disponible en: `node_modules/@prisma/client`

4. **✅ Servidor ejecutándose sin errores**
   - ✅ Next.js 14.2.33 corriendo en http://localhost:3000
   - ✅ Sin errores de compilación
   - ✅ Listo para desarrollo

---

## 📊 ANÁLISIS COMPLETO DEL PROYECTO

### Estado Actual: ~40% Completado

| Componente | Estado | Completado |
|------------|--------|-----------|
| **Arquitectura Base** | ✅ | 100% |
| **Base de Datos** | ✅ | 100% |
| **Autenticación** | ✅ | 100% |
| **UI Base & Dashboard** | ✅ | 90% |
| **Módulo CRM** | ⏳ | 5% |
| **Módulo ERP** | ⏳ | 0% |
| **Módulo Admin** | ⏳ | 0% |
| **Módulo Config** | ⏳ | 0% |
| **Backend API (NestJS)** | ⏳ | 0% |
| **Tests** | ⏳ | 0% |

---

## 🎯 PLAN DE DESARROLLO - 60 TAREAS

### FASE 1: BASE Y CORRECCIONES ✅ (COMPLETADA)

#### ✅ Tarea 1.1: Configuración del Proyecto
- [x] Monorepo con pnpm workspaces
- [x] TypeScript configurado
- [x] ESLint y Prettier
- [x] Estructura de carpetas

#### ✅ Tarea 1.2: Base de Datos
- [x] Prisma schema completo (25+ modelos)
- [x] Script de seed con datos iniciales
- [x] Cliente Prisma generado

#### ✅ Tarea 1.3: Autenticación
- [x] NextAuth.js v5 configurado
- [x] Login con credenciales
- [x] Sesiones JWT
- [x] Hash de passwords con bcryptjs

#### ✅ Tarea 1.4: UI Base
- [x] TailwindCSS configurado
- [x] Componentes Shadcn/ui base
- [x] Página de login responsive
- [x] Dashboard layout

---

### FASE 2: CONFIGURACIÓN DE ENTORNO (PENDIENTE)

#### ⏳ Tarea 2.1: PostgreSQL Setup
- [ ] Crear base de datos `trianglais`
- [ ] Ejecutar `pnpm db:push`
- [ ] Ejecutar `pnpm db:seed`
- [ ] Verificar en Prisma Studio

**Scripts:**
```bash
# Crear BD
sudo -u postgres psql -c "CREATE DATABASE trianglais;"

# Migrar y poblar
pnpm db:push
pnpm db:seed

# Verificar
pnpm db:studio
```

#### ⏳ Tarea 2.2: Variables de Entorno
- [ ] Configurar DATABASE_URL
- [ ] Configurar NEXTAUTH_SECRET
- [ ] Verificar conexión

---

### FASE 3: MÓDULO CRM (12 TAREAS)

#### ⏳ Tarea 3.1: Dashboard CRM
**Archivo:** `apps/frontend/src/app/dashboard/crm/page.tsx`
- [ ] Métricas de leads (total, convertidos, pendientes)
- [ ] Gráfico de conversión
- [ ] Tabla de leads recientes
- [ ] Accesos rápidos

#### ⏳ Tarea 3.2: Lista de Leads
**Archivo:** `apps/frontend/src/app/dashboard/crm/leads/page.tsx`
- [ ] Tabla con paginación
- [ ] Filtros (estado, fuente, fecha)
- [ ] Búsqueda
- [ ] Acciones (ver, editar, eliminar)
- [ ] Componente: `<LeadsTable>`

#### ⏳ Tarea 3.3: Crear Lead
**Archivo:** `apps/frontend/src/app/dashboard/crm/leads/new/page.tsx`
- [ ] Formulario con validación (Zod)
- [ ] Campos: nombre, apellido, email, teléfono, fuente, notas
- [ ] Server Action para crear
- [ ] Redirección después de crear

#### ⏳ Tarea 3.4: Editar Lead
**Archivo:** `apps/frontend/src/app/dashboard/crm/leads/[id]/edit/page.tsx`
- [ ] Formulario precargado
- [ ] Actualización optimista
- [ ] Validación
- [ ] Server Action para actualizar

#### ⏳ Tarea 3.5: Ver Detalles de Lead
**Archivo:** `apps/frontend/src/app/dashboard/crm/leads/[id]/page.tsx`
- [ ] Información del lead
- [ ] Historial de actividades
- [ ] Botones de acción
- [ ] Timeline de eventos

#### ⏳ Tarea 3.6: Actividades
**Archivo:** `apps/frontend/src/app/dashboard/crm/activities/page.tsx`
- [ ] Lista de actividades
- [ ] Crear actividad (llamada, email, reunión, nota)
- [ ] Asociar a lead
- [ ] Marcar como completada

#### ⏳ Tarea 3.7: Chat en Tiempo Real
**Archivo:** `apps/frontend/src/app/dashboard/crm/chat/page.tsx`
- [ ] Lista de salas de chat
- [ ] Vista de mensajes
- [ ] Enviar mensaje
- [ ] WebSockets o polling

#### ⏳ Tarea 3.8: Sistema de Email
**Archivo:** `apps/frontend/src/app/dashboard/crm/email/page.tsx`
- [ ] Bandeja de entrada
- [ ] Enviar email
- [ ] Ver email
- [ ] Búsqueda

#### ⏳ Tarea 3.9: Componentes Compartidos CRM
- [ ] `<LeadCard>` - Tarjeta de lead
- [ ] `<LeadStatusBadge>` - Badge de estado
- [ ] `<ActivityItem>` - Item de actividad
- [ ] `<LeadFilters>` - Filtros de leads

#### ⏳ Tarea 3.10: Server Actions CRM
**Archivo:** `apps/frontend/src/app/actions/crm.ts`
- [ ] `createLead()`
- [ ] `updateLead()`
- [ ] `deleteLead()`
- [ ] `getLeads()`
- [ ] `convertLead()`

#### ⏳ Tarea 3.11: API Routes CRM
- [ ] `GET /api/crm/leads`
- [ ] `POST /api/crm/leads`
- [ ] `PUT /api/crm/leads/[id]`
- [ ] `DELETE /api/crm/leads/[id]`
- [ ] `POST /api/crm/activities`

#### ⏳ Tarea 3.12: Validaciones y Tipos CRM
**Archivo:** `packages/shared/schemas.ts`
- [ ] Schemas Zod para CRM
- [ ] TypeScript types
- [ ] Validaciones de formularios

---

### FASE 4: MÓDULO ERP (15 TAREAS)

#### ⏳ Tarea 4.1: Dashboard ERP
**Archivo:** `apps/frontend/src/app/dashboard/erp/page.tsx`
- [ ] Métricas financieras
- [ ] Gráfico de ingresos vs gastos
- [ ] Ventas del mes
- [ ] Facturas pendientes

#### ⏳ Tarea 4.2: Gestión de Ventas - Lista
**Archivo:** `apps/frontend/src/app/dashboard/erp/sales/page.tsx`
- [ ] Tabla de ventas
- [ ] Filtros (fecha, estado, cliente)
- [ ] Búsqueda
- [ ] Paginación

#### ⏳ Tarea 4.3: Crear Venta
**Archivo:** `apps/frontend/src/app/dashboard/erp/sales/new/page.tsx`
- [ ] Formulario multi-paso
- [ ] Agregar items (productos/servicios)
- [ ] Calcular subtotal, tax, descuento, total
- [ ] Guardar como borrador o completar

#### ⏳ Tarea 4.4: Editar Venta
**Archivo:** `apps/frontend/src/app/dashboard/erp/sales/[id]/edit/page.tsx`
- [ ] Editar venta existente
- [ ] Modificar items
- [ ] Recalcular totales

#### ⏳ Tarea 4.5: Ver Detalles de Venta
**Archivo:** `apps/frontend/src/app/dashboard/erp/sales/[id]/page.tsx`
- [ ] Información completa
- [ ] Items de la venta
- [ ] Botón para generar factura
- [ ] Acciones (imprimir, enviar)

#### ⏳ Tarea 4.6: Gestión de Compras
**Archivo:** `apps/frontend/src/app/dashboard/erp/purchases/page.tsx`
- [ ] Lista de compras
- [ ] Crear compra
- [ ] Editar compra
- [ ] Ver detalles

#### ⏳ Tarea 4.7: Gestión de Gastos
**Archivo:** `apps/frontend/src/app/dashboard/erp/expenses/page.tsx`
- [ ] Lista de gastos
- [ ] Filtrar por categoría
- [ ] Crear gasto
- [ ] Subir recibo

#### ⏳ Tarea 4.8: Sistema de Facturación - Lista
**Archivo:** `apps/frontend/src/app/dashboard/erp/invoices/page.tsx`
- [ ] Lista de facturas
- [ ] Filtros por estado
- [ ] Búsqueda
- [ ] Indicador de vencimiento

#### ⏳ Tarea 4.9: Crear Factura
**Archivo:** `apps/frontend/src/app/dashboard/erp/invoices/new/page.tsx`
- [ ] Generar desde venta
- [ ] O crear manual
- [ ] Configurar fecha de vencimiento
- [ ] Enviar por email

#### ⏳ Tarea 4.10: Ver Factura
**Archivo:** `apps/frontend/src/app/dashboard/erp/invoices/[id]/page.tsx`
- [ ] Vista de factura
- [ ] Marcar como pagada
- [ ] Descargar PDF
- [ ] Enviar por email

#### ⏳ Tarea 4.11: Reportes Financieros
**Archivo:** `apps/frontend/src/app/dashboard/erp/reports/page.tsx`
- [ ] Reporte de ventas
- [ ] Reporte de gastos
- [ ] Balance general
- [ ] Exportar a Excel/PDF

#### ⏳ Tarea 4.12: Componentes ERP
- [ ] `<SaleForm>` - Formulario de venta
- [ ] `<ItemsTable>` - Tabla de items
- [ ] `<InvoicePreview>` - Preview de factura
- [ ] `<FinancialChart>` - Gráfico financiero

#### ⏳ Tarea 4.13: Server Actions ERP
**Archivo:** `apps/frontend/src/app/actions/erp.ts`
- [ ] `createSale()`
- [ ] `createPurchase()`
- [ ] `createExpense()`
- [ ] `generateInvoice()`
- [ ] `markInvoiceAsPaid()`

#### ⏳ Tarea 4.14: API Routes ERP
- [ ] `/api/erp/sales`
- [ ] `/api/erp/purchases`
- [ ] `/api/erp/expenses`
- [ ] `/api/erp/invoices`
- [ ] `/api/erp/reports`

#### ⏳ Tarea 4.15: Generación de PDF
**Librería:** `react-pdf` o `pdfmake`
- [ ] Template de factura
- [ ] Generar PDF
- [ ] Enviar por email

---

### FASE 5: MÓDULO ADMIN (12 TAREAS)

#### ⏳ Tarea 5.1: Gestión de Usuarios - Lista
**Archivo:** `apps/frontend/src/app/dashboard/admin/users/page.tsx`
- [ ] Tabla de usuarios
- [ ] Filtros (rol, estado)
- [ ] Búsqueda
- [ ] Acciones (editar, desactivar)

#### ⏳ Tarea 5.2: Crear Usuario
**Archivo:** `apps/frontend/src/app/dashboard/admin/users/new/page.tsx`
- [ ] Formulario de usuario
- [ ] Asignar roles
- [ ] Validación de email único
- [ ] Hash de password

#### ⏳ Tarea 5.3: Editar Usuario
**Archivo:** `apps/frontend/src/app/dashboard/admin/users/[id]/edit/page.tsx`
- [ ] Editar información
- [ ] Cambiar roles
- [ ] Resetear password
- [ ] Activar/Desactivar

#### ⏳ Tarea 5.4: Ver Perfil de Usuario
**Archivo:** `apps/frontend/src/app/dashboard/admin/users/[id]/page.tsx`
- [ ] Información del usuario
- [ ] Roles asignados
- [ ] Historial de actividad
- [ ] Permisos

#### ⏳ Tarea 5.5: Gestión de Roles
**Archivo:** `apps/frontend/src/app/dashboard/admin/roles/page.tsx`
- [ ] Lista de roles
- [ ] Crear rol personalizado
- [ ] Asignar permisos
- [ ] Ver usuarios con rol

#### ⏳ Tarea 5.6: Gestión de Cursos - Lista
**Archivo:** `apps/frontend/src/app/dashboard/admin/courses/page.tsx`
- [ ] Lista de cursos
- [ ] Filtros (nivel, activo)
- [ ] Crear curso
- [ ] Editar curso

#### ⏳ Tarea 5.7: Crear/Editar Curso
**Archivo:** `apps/frontend/src/app/dashboard/admin/courses/[id]/page.tsx`
- [ ] Formulario de curso
- [ ] Nivel (A1, A2, B1, B2, C1, C2)
- [ ] Duración y precio
- [ ] Estado (activo/inactivo)

#### ⏳ Tarea 5.8: Inscripciones
**Archivo:** `apps/frontend/src/app/dashboard/admin/enrollments/page.tsx`
- [ ] Lista de inscripciones
- [ ] Inscribir estudiante
- [ ] Ver progreso
- [ ] Marcar como completado

#### ⏳ Tarea 5.9: Horarios
**Archivo:** `apps/frontend/src/app/dashboard/admin/schedules/page.tsx`
- [ ] Vista de calendario
- [ ] Crear horario
- [ ] Asignar profesor
- [ ] Asignar aula

#### ⏳ Tarea 5.10: Componentes Admin
- [ ] `<UserTable>` - Tabla de usuarios
- [ ] `<RoleSelect>` - Selector de roles
- [ ] `<CourseCard>` - Tarjeta de curso
- [ ] `<ScheduleCalendar>` - Calendario

#### ⏳ Tarea 5.11: Server Actions Admin
**Archivo:** `apps/frontend/src/app/actions/admin.ts`
- [ ] `createUser()`
- [ ] `updateUser()`
- [ ] `createCourse()`
- [ ] `enrollStudent()`
- [ ] `createSchedule()`

#### ⏳ Tarea 5.12: Sistema de Permisos
**Archivo:** `apps/frontend/src/lib/permissions.ts`
- [ ] Función `hasPermission()`
- [ ] Función `hasRole()`
- [ ] Hook `usePermissions()`
- [ ] Componente `<ProtectedRoute>`

---

### FASE 6: MÓDULO CONFIGURACIÓN (5 TAREAS)

#### ⏳ Tarea 6.1: Configuración General
**Archivo:** `apps/frontend/src/app/dashboard/config/page.tsx`
- [ ] Nombre de la aplicación
- [ ] Logo
- [ ] Zona horaria
- [ ] Idioma

#### ⏳ Tarea 6.2: Configuración de CRM
**Archivo:** `apps/frontend/src/app/dashboard/config/crm/page.tsx`
- [ ] Auto-asignación de leads
- [ ] Estados personalizados
- [ ] Fuentes de leads
- [ ] Email templates

#### ⏳ Tarea 6.3: Configuración de ERP
**Archivo:** `apps/frontend/src/app/dashboard/config/erp/page.tsx`
- [ ] Moneda
- [ ] Impuestos
- [ ] Numeración de facturas
- [ ] Términos y condiciones

#### ⏳ Tarea 6.4: Configuración de Email
**Archivo:** `apps/frontend/src/app/dashboard/config/email/page.tsx`
- [ ] Servidor SMTP
- [ ] Email de remitente
- [ ] Templates de email

#### ⏳ Tarea 6.5: Server Actions Config
- [ ] `updateConfig()`
- [ ] `getConfig()`
- [ ] Validaciones

---

### FASE 7: COMPONENTES GLOBALES (8 TAREAS)

#### ⏳ Tarea 7.1: Sistema de Notificaciones
**Archivos:**
- `components/notifications/notification-bell.tsx`
- `components/notifications/notification-panel.tsx`
- [ ] Campana de notificaciones
- [ ] Panel desplegable
- [ ] Marcar como leída
- [ ] Tipos de notificaciones

#### ⏳ Tarea 7.2: Menú Móvil
**Archivo:** `components/dashboard/mobile-nav.tsx`
- [ ] Hamburger menu
- [ ] Drawer lateral
- [ ] Navegación responsive
- [ ] Cerrar al navegar

#### ⏳ Tarea 7.3: Breadcrumbs
**Archivo:** `components/ui/breadcrumbs.tsx`
- [ ] Componente de breadcrumbs
- [ ] Generación automática desde ruta
- [ ] Clickeable

#### ⏳ Tarea 7.4: Loading States
**Archivos:**
- `components/ui/skeleton.tsx`
- `components/ui/spinner.tsx`
- [ ] Skeleton loaders
- [ ] Spinners
- [ ] Loading pages

#### ⏳ Tarea 7.5: Error Boundaries
**Archivo:** `components/error-boundary.tsx`
- [ ] Captura de errores
- [ ] UI de error amigable
- [ ] Botón de retry
- [ ] Logging de errores

#### ⏳ Tarea 7.6: Componentes de Datos
- [ ] `<DataTable>` - Tabla con paginación
- [ ] `<SearchBar>` - Barra de búsqueda
- [ ] `<DateRangePicker>` - Selector de fechas
- [ ] `<ExportButton>` - Botón de exportar

#### ⏳ Tarea 7.7: Componentes de Visualización
**Librería:** Recharts
- [ ] `<LineChart>` - Gráfico de líneas
- [ ] `<BarChart>` - Gráfico de barras
- [ ] `<PieChart>` - Gráfico circular
- [ ] `<StatsCard>` - Tarjeta de estadísticas

#### ⏳ Tarea 7.8: Middleware de Autenticación
**Archivo:** `middleware.ts`
- [ ] Proteger rutas de dashboard
- [ ] Verificar sesión
- [ ] Redireccionar a login
- [ ] Verificar permisos

---

### FASE 8: OPTIMIZACIÓN Y PERFORMANCE (5 TAREAS)

#### ⏳ Tarea 8.1: Optimización de Imágenes
- [ ] Usar `next/image`
- [ ] Lazy loading
- [ ] Placeholder blur
- [ ] Formatos WebP

#### ⏳ Tarea 8.2: Code Splitting
- [ ] Dynamic imports
- [ ] Route-based splitting
- [ ] Component lazy loading

#### ⏳ Tarea 8.3: Caching
- [ ] React Query setup
- [ ] Cache de API calls
- [ ] Revalidación automática
- [ ] Optimistic updates

#### ⏳ Tarea 8.4: SEO
- [ ] Metadata en cada página
- [ ] Sitemap
- [ ] robots.txt
- [ ] Open Graph tags

#### ⏳ Tarea 8.5: Analytics
- [ ] Google Analytics
- [ ] Event tracking
- [ ] Error tracking (Sentry)

---

### FASE 9: TESTING (OPCIONAL - 3 TAREAS)

#### ⏳ Tarea 9.1: Unit Tests
**Librería:** Jest + Testing Library
- [ ] Tests de componentes
- [ ] Tests de utilidades
- [ ] Tests de validaciones

#### ⏳ Tarea 9.2: Integration Tests
- [ ] Tests de forms
- [ ] Tests de Server Actions
- [ ] Tests de API routes

#### ⏳ Tarea 9.3: E2E Tests
**Librería:** Playwright
- [ ] Test de login
- [ ] Test de crear lead
- [ ] Test de crear venta

---

## 📈 CRONOGRAMA ESTIMADO

| Fase | Tareas | Tiempo Estimado | Prioridad |
|------|--------|-----------------|-----------|
| Fase 1 | 4 | ✅ Completado | ⭐⭐⭐⭐⭐ |
| Fase 2 | 2 | 30 minutos | ⭐⭐⭐⭐⭐ |
| Fase 3 (CRM) | 12 | 2-3 días | ⭐⭐⭐⭐⭐ |
| Fase 4 (ERP) | 15 | 3-4 días | ⭐⭐⭐⭐ |
| Fase 5 (Admin) | 12 | 2-3 días | ⭐⭐⭐⭐ |
| Fase 6 (Config) | 5 | 1 día | ⭐⭐⭐ |
| Fase 7 (Globales) | 8 | 2 días | ⭐⭐⭐⭐ |
| Fase 8 (Optimización) | 5 | 1-2 días | ⭐⭐⭐ |
| Fase 9 (Testing) | 3 | 2-3 días | ⭐⭐ |

**Total Estimado: 14-20 días de desarrollo**

---

## 🚀 PASOS INMEDIATOS

### 1. Configurar Base de Datos (AHORA)
```bash
# Terminal 1 - Configurar PostgreSQL
sudo -u postgres psql -c "CREATE DATABASE trianglais;"

# Terminal 2 - Migrar y seed
cd /workspaces/Tridashboard
pnpm db:push
pnpm db:seed

# Verificar
pnpm db:studio
```

### 2. Probar Login (DESPUÉS DEL SEED)
- URL: http://localhost:3000
- Email: admin@trianglais.com
- Password: admin123

### 3. Comenzar con Fase 3 (Módulo CRM)
El CRM es el módulo más crítico para el negocio.

---

## 📝 CHECKLIST DE VALIDACIÓN

### ✅ Pre-requisitos
- [x] Node.js 18+
- [x] pnpm instalado
- [x] PostgreSQL 16 instalado
- [ ] PostgreSQL corriendo
- [ ] Base de datos creada
- [ ] Migraciones ejecutadas
- [ ] Seed ejecutado

### ✅ Desarrollo
- [x] Servidor Next.js corriendo
- [x] Sin errores de compilación
- [ ] Login funcional
- [ ] Dashboard accesible
- [ ] Base de datos conectada

### ✅ Por Implementar
- [ ] Todos los módulos CRM
- [ ] Todos los módulos ERP
- [ ] Todos los módulos Admin
- [ ] Todos los módulos Config
- [ ] Componentes globales
- [ ] Optimizaciones
- [ ] Tests (opcional)

---

## 💡 RECOMENDACIONES

### Orden de Desarrollo Sugerido:

1. **URGENTE** ⭐⭐⭐⭐⭐
   - Configurar PostgreSQL (15 min)
   - Probar login (5 min)
   - Tarea 3.2: Lista de Leads (2-3 horas)
   - Tarea 3.3: Crear Lead (2-3 horas)

2. **ALTA PRIORIDAD** ⭐⭐⭐⭐
   - Resto del Módulo CRM
   - Dashboard ERP
   - Ventas básicas

3. **MEDIA PRIORIDAD** ⭐⭐⭐
   - Facturación
   - Módulo Admin
   - Configuración

4. **BAJA PRIORIDAD** ⭐⭐
   - Optimizaciones
   - Testing

### Buenas Prácticas:

- ✅ Commitear después de cada tarea completada
- ✅ Usar branches feature/
- ✅ Documentar código complejo
- ✅ Probar en móvil regularmente
- ✅ Mantener componentes pequeños y reutilizables

---

## 🎯 META FINAL

**Al completar este plan, TRIANGLAIS tendrá:**

✅ Sistema completo de gestión
✅ Módulo CRM funcional con leads, chat y email
✅ Módulo ERP con ventas, compras, gastos y facturación
✅ Módulo Admin con usuarios, roles y cursos
✅ Sistema de configuración flexible
✅ Diseño responsive y moderno
✅ Performance optimizado
✅ Listo para producción

---

**Versión del Plan:** 1.0  
**Última actualización:** Octubre 24, 2025  
**Estado:** En progreso - Fase 2
