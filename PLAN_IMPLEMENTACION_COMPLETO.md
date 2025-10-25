# 🚀 PLAN DE IMPLEMENTACIÓN COMPLETO - TRIANGLAIS

## 📋 RESUMEN EJECUTIVO

Este documento detalla todas las mejoras solicitadas para el proyecto TRIANGLAIS. Debido a la magnitud del trabajo (se estiman más de 50 archivos nuevos/modificados), se proporciona una guía estructurada de implementación.

---

## ✅ REQUISITOS COMPLETADOS

### 1. ✅ Sistema de Temas (Oscuro/Claro)
**Archivo creado**: `apps/frontend/src/components/providers/theme-provider.tsx`

**Características**:
- ✅ Detección automática del tema del sistema
- ✅ Persistencia en localStorage
- ✅ Context API para acceso global
- ✅ Transiciones suaves entre temas

---

## 📦 DEPENDENCIAS NECESARIAS

### Instalar las siguientes dependencias:

```bash
# Drag and Drop para Kanban
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Internacionalización
pnpm add next-intl

# Geolocalización (países, estados, ciudades)
pnpm add country-state-city

# Optimización de rendimiento
pnpm add next-themes
pnpm add react-intersection-observer

# Validación de formularios avanzados
pnpm add react-select
```

---

## 🎨 1. RESPONSIVE DESIGN

### Archivos a Modificar:

#### 1.1 Layout Principal
**Archivo**: `apps/frontend/src/app/dashboard/layout.tsx`

**Cambios necesarios**:
```tsx
// Agregar breakpoints responsive
- Sidebar colapsable en móvil
- Hamburger menu para navegación
- Stack vertical en tablet
- Grid adaptativo en desktop
```

#### 1.2 Dashboard Navigation
**Archivo**: `apps/frontend/src/components/dashboard/dashboard-nav.tsx`

**Cambios necesarios**:
```tsx
// Menú desplegable en móvil
- useMediaQuery hook
- Drawer para navegación móvil
- Icons only en tablet
- Full sidebar en desktop
```

### CSS Global para Responsive
**Archivo**: `apps/frontend/src/app/globals.css`

Agregar:
```css
/* Breakpoints */
@layer utilities {
  .container-responsive {
    @apply px-4 sm:px-6 md:px-8 lg:px-12;
  }
  
  .grid-responsive {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4;
  }
  
  .text-responsive {
    @apply text-sm sm:text-base md:text-lg;
  }
}
```

---

## ⚡ 2. OPTIMIZACIÓN DE RENDIMIENTO

### 2.1 Loading States

**Crear**: `apps/frontend/src/components/ui/loading.tsx`
```tsx
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );
}
```

### 2.2 Lazy Loading

**Modificar rutas** para usar dynamic imports:
```tsx
import dynamic from 'next/dynamic';

const CRMDashboard = dynamic(() => import('./crm-dashboard'), {
  loading: () => <LoadingSpinner />,
});
```

### 2.3 Image Optimization

Usar Next.js Image en todos los lugares:
```tsx
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
  priority
/>
```

---

## 🌐 3. INTERNACIONALIZACIÓN (i18n)

### 3.1 Configuración de next-intl

**Crear**: `apps/frontend/src/i18n.ts`
```typescript
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`../messages/${locale}.json`)).default
}));
```

### 3.2 Mensajes en Español

**Crear**: `apps/frontend/messages/es.json`
```json
{
  "common": {
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "edit": "Editar",
    "search": "Buscar"
  },
  "crm": {
    "leads": "Prospectos",
    "newLead": "Nuevo Prospecto",
    "initialContact": "Contacto Inicial",
    "discussions": "Discusiones",
    "decision": "Decisión",
    "contract": "Contrato y Facturación"
  }
}
```

### 3.3 Mensajes en Inglés

**Crear**: `apps/frontend/messages/en.json`
```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "search": "Search"
  },
  "crm": {
    "leads": "Leads",
    "newLead": "New Lead",
    "initialContact": "Initial Contact",
    "discussions": "Discussions",
    "decision": "Decision",
    "contract": "Contract & Billing"
  }
}
```

### 3.4 Selector de Idioma

**Crear**: `apps/frontend/src/components/dashboard/language-selector.tsx`
```tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();

  const changeLanguage = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('es')}>
          🇪🇸 Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## 🎛️ 4. SELECTOR DE TEMA

**Crear**: `apps/frontend/src/components/dashboard/theme-toggle.tsx`
```tsx
'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## 📊 5. DASHBOARDS CON WIDGETS

Este es un ejemplo para CRM, replicar para ERP, Admin y Config.

**Crear**: `apps/frontend/src/app/dashboard/crm/page.tsx`

```tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { 
  Users, 
  MessageSquare, 
  Mail, 
  TrendingUp, 
  UserCircle,
  Activity 
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading';

const crmModules = [
  {
    title: 'Dashboard CRM',
    href: '/dashboard/crm',
    icon: TrendingUp,
    description: 'Métricas y análisis general',
    color: 'bg-blue-500',
  },
  {
    title: 'Leads',
    href: '/dashboard/crm/leads',
    icon: UserCircle,
    description: 'Gestión de prospectos',
    color: 'bg-green-500',
  },
  {
    title: 'Chat',
    href: '/dashboard/crm/chat',
    icon: MessageSquare,
    description: 'Mensajería en tiempo real',
    color: 'bg-purple-500',
  },
  {
    title: 'Email',
    href: '/dashboard/crm/email',
    icon: Mail,
    description: 'Correo electrónico',
    color: 'bg-orange-500',
  },
  {
    title: 'Actividades',
    href: '/dashboard/crm/activities',
    icon: Activity,
    description: 'Registro de actividades',
    color: 'bg-pink-500',
  },
];

export default function CRMDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">CRM Dashboard</h1>
        <p className="text-muted-foreground">
          Gestión de Relaciones con Clientes
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crmModules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className={`${module.color} p-3 rounded-lg text-white`}>
                  <module.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
```

---

## 🎯 6. MÓDULO KANBAN CRM - LEADS

Este es el módulo más complejo. Requiere múltiples archivos.

### 6.1 Schema de Prisma para Leads

**Modificar**: `packages/database/prisma/schema.prisma`

```prisma
model Lead {
  id                 String      @id @default(cuid())
  firstName          String
  lastName           String
  phone              String
  email              String      @unique
  address            String?
  country            String
  state              String
  city               String
  organization       String?
  organizationAddress String?
  status             LeadStatus  @default(INITIAL_CONTACT)
  stage              String      @default("Initial Contact")
  isActive           Boolean     @default(true)
  isArchived         Boolean     @default(false)
  contractActive     Boolean     @default(false)
  contractStartDate  DateTime?
  contractEndDate    DateTime?
  lastActivity       DateTime    @default(now())
  createdAt          DateTime    @default(now())
  updatedAt          DateTime    @updatedAt
  createdBy          String?
  user               User?       @relation(fields: [createdBy], references: [id])
  activities         LeadActivity[]
  @@index([email])
  @@index([status])
  @@index([isActive])
}

enum LeadStatus {
  INITIAL_CONTACT
  DISCUSSIONS
  DECISION
  CONTRACT
  ARCHIVED
  DISCARDED
}

model LeadActivity {
  id          String   @id @default(cuid())
  leadId      String
  lead        Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  type        String   // "call", "email", "meeting", "note"
  description String
  createdAt   DateTime @default(now())
  createdBy   String?
  user        User?    @relation(fields: [createdBy], references: [id])
}

model Organization {
  id      String @id @default(cuid())
  name    String @unique
  address String?
}

model Country {
  id     String  @id @default(cuid())
  name   String  @unique
  code   String  @unique
  states State[]
}

model State {
  id        String @id @default(cuid())
  name      String
  countryId String
  country   Country @relation(fields: [countryId], references: [id])
  cities    City[]
  @@unique([name, countryId])
}

model City {
  id      String @id @default(cuid())
  name    String
  stateId String
  state   State  @relation(fields: [stateId], references: [id])
  @@unique([name, stateId])
}
```

### 6.2 Componente Kanban Board

**Crear**: `apps/frontend/src/components/crm/kanban-board.tsx`

```tsx
'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { KanbanColumn } from './kanban-column';
import { LeadCard } from './lead-card';
import { NewLeadForm } from './new-lead-form';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization?: string;
  stage: string;
}

const STAGES = [
  'Initial Contact',
  'Discussions',
  'Decision',
  'Contract',
];

export function KanbanBoard({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeLead = leads.find((l) => l.id === activeId);
    const overStage = STAGES.find((s) => s === overId) || overId;

    if (activeLead && activeLead.stage !== overStage) {
      setLeads((leads) =>
        leads.map((lead) =>
          lead.id === activeId ? { ...lead, stage: overStage } : lead
        )
      );

      // TODO: Actualizar en la base de datos
      updateLeadStage(activeId, overStage);
    }

    setActiveId(null);
  };

  const updateLeadStage = async (leadId: string, newStage: string) => {
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const getLeadsByStage = (stage: string) =>
    leads.filter((lead) => lead.stage === stage);

  const activeLead = leads.find((l) => l.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => (
          <KanbanColumn
            key={stage}
            id={stage}
            title={stage}
            leads={getLeadsByStage(stage)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeLead ? (
          <LeadCard lead={activeLead} isDragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
```

---

## 📝 RESUMEN DE ARCHIVOS A CREAR

### Componentes UI:
1. ✅ `theme-provider.tsx`
2. `theme-toggle.tsx`
3. `language-selector.tsx`
4. `loading.tsx`
5. `kanban-board.tsx`
6. `kanban-column.tsx`
7. `lead-card.tsx`
8. `new-lead-form.tsx`
9. `lead-stats.tsx`
10. `country-select.tsx`
11. `state-select.tsx`
12. `city-select.tsx`
13. `organization-autocomplete.tsx`

### Páginas:
14. Dashboard CRM con widgets
15. Dashboard ERP con widgets
16. Dashboard Admin con widgets
17. Dashboard Config con widgets
18. Página Kanban Leads

### APIs:
19. `/api/leads` (GET, POST)
20. `/api/leads/[id]` (GET, PATCH, DELETE)
21. `/api/countries`
22. `/api/states`
23. `/api/cities`
24. `/api/organizations`

### Configuración:
25. Mensajes i18n (es.json, en.json)
26. Modificar layout para temas
27. Modificar globals.css
28. Actualizar Prisma schema
29. Migrations

---

## 🚀 SIGUIENTE PASO RECOMENDADO

Dada la magnitud del proyecto, te recomiendo:

1. **Instalar dependencias** primero
2. **Implementar temas** (ya iniciado)
3. **Hacer responsive** el layout actual
4. **Crear módulo Kanban** paso a paso
5. **Agregar i18n** al final

¿Deseas que continúe implementando alguna sección específica en detalle?
