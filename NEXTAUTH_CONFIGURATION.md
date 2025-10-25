# NextAuth v5 Beta - Configuración Completa

## 🔒 Análisis Profundo y Solución del Error HTTP 401

### Problema Original
El error **HTTP 401 Unauthorized** persistía incluso después de implementar middleware y directivas no-cache. El análisis profundo reveló incompatibilidades con NextAuth v5 beta.

---

## ✅ Configuraciones Críticas Aplicadas

### 1. **Middleware Compatible con NextAuth v5 Beta**
📁 `apps/frontend/middleware.ts`

```typescript
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*']
};
```

**🔑 Cambio Clave:** NextAuth v5 beta requiere que el middleware sea un **wrapper function** que recibe `auth((req) => {...})`, no un simple `export { auth as middleware }`.

---

### 2. **Configuración de Autenticación Completa**
📁 `apps/frontend/src/lib/auth.ts`

```typescript
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 15 * 60, // 15 minutos
  },
  pages: {
    signIn: '/login',
    error: '/login', // ← Redirigir errores al login
  },
  secret: process.env.NEXTAUTH_SECRET, // ← Requerido explícitamente
  trustHost: true, // ← Necesario para localhost
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
    // ← Callback de autorización para middleware
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl?.pathname.startsWith('/dashboard');

      if (isOnDashboard && !isLoggedIn) {
        return false; // Trigger redirect
      }

      return true;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
```

**🔑 Cambios Clave:**
- `maxAge: 15 * 60` → Sesión de 15 minutos
- `secret: process.env.NEXTAUTH_SECRET` → Explícito
- `trustHost: true` → Permite localhost:3010
- `error: '/login'` → Redirige errores de auth
- `authorized()` callback → Protección adicional en middleware

---

### 3. **API Route Hardening**
📁 `apps/frontend/src/app/api/auth/[...nextauth]/route.ts`

```typescript
import { handlers } from '@/lib/auth';

// Forzar Node.js runtime (no edge)
export const runtime = 'nodejs';

// Forzar generación dinámica (no static)
export const dynamic = 'force-dynamic';

export const { GET, POST } = handlers;
```

**🔑 Cambios Clave:**
- `runtime: 'nodejs'` → Evita edge runtime issues
- `dynamic: 'force-dynamic'` → No caching en API route

---

### 4. **No-Cache en Páginas de Auth**
📁 `apps/frontend/src/app/page.tsx`, `login/page.tsx`, `dashboard/page.tsx`

```typescript
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
```

Estas directivas evitan que Next.js cachee las páginas durante navegación.

---

### 5. **Idle Logout (15 minutos)**
📁 `apps/frontend/src/components/providers/idle-logout.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

const IDLE_LIMIT_MS = 15 * 60 * 1000; // 15 minutos
const CHECK_INTERVAL = 5000; // Revisar cada 5 segundos

export function IdleLogout() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;

    let lastActivity = Date.now();

    const updateActivity = () => {
      lastActivity = Date.now();
      localStorage.setItem('lastActivity', lastActivity.toString());
    };

    const checkIdleTime = () => {
      const storedActivity = localStorage.getItem('lastActivity');
      const lastTime = storedActivity ? parseInt(storedActivity, 10) : lastActivity;
      const idleTime = Date.now() - lastTime;

      if (idleTime > IDLE_LIMIT_MS) {
        signOut({ callbackUrl: '/login' });
      }
    };

    // Eventos que resetean el contador
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, updateActivity));

    // Sincronizar entre tabs
    window.addEventListener('visibilitychange', checkIdleTime);

    const interval = setInterval(checkIdleTime, CHECK_INTERVAL);

    return () => {
      events.forEach(event => window.removeEventListener(event, updateActivity));
      window.removeEventListener('visibilitychange', checkIdleTime);
      clearInterval(interval);
    };
  }, [session]);

  return null;
}
```

**Integrado en:** `apps/frontend/src/app/dashboard/layout.tsx`

---

### 6. **Variables de Entorno**
📁 `.env.local`

```env
DATABASE_URL="postgresql://dashtrian:HO1AXDAS@72.60.30.253:5432/dashtrian?schema=public"
NEXTAUTH_URL="http://localhost:3010"
NEXTAUTH_SECRET="trianglais-secret-key-2025-change-in-production"
```

**⚠️ Importante:** 
- `NEXTAUTH_URL` debe coincidir con el puerto del servidor
- `NEXTAUTH_SECRET` debe ser una cadena segura en producción

---

## 🛡️ Protecciones Implementadas

### Capas de Seguridad
1. **Middleware** → Bloquea acceso a `/dashboard/*` sin sesión
2. **Callbacks.authorized** → Segunda capa de validación
3. **Session maxAge** → Sesiones expiran en 15 minutos
4. **IdleLogout** → Cierra sesión tras 15 min de inactividad
5. **No-cache directives** → Evita estados obsoletos en cache

---

## 🧪 Flujo de Autenticación Correcto

```mermaid
graph TD
    A[Usuario visita /] --> B{¿Tiene sesión?}
    B -->|No| C[Redirect a /login]
    B -->|Sí| D[Redirect a /dashboard]
    C --> E[Usuario ingresa credenciales]
    E --> F[POST /api/auth/callback/credentials]
    F --> G{¿Credenciales válidas?}
    G -->|No| H[Error: Redirect /login]
    G -->|Sí| I[Crear JWT token]
    I --> J[Set cookie: next-auth.session-token]
    J --> K[Redirect a /dashboard]
    K --> L[Middleware verifica req.auth]
    L --> M{¿Auth válido?}
    M -->|No| C
    M -->|Sí| N[Renderizar Dashboard]
    N --> O[IdleLogout monitorea actividad]
    O --> P{¿15 min inactivo?}
    P -->|Sí| Q[signOut → /login]
    P -->|No| N
```

---

## 🔧 Troubleshooting

### Si el Error 401 Persiste

1. **Verificar logs del servidor:**
```bash
cd /workspaces/Tridashboard
pnpm dev
# Observar errores en consola
```

2. **Verificar en DevTools (F12):**
- **Network tab** → Buscar `/api/auth/session` (debe retornar 200 con JSON)
- **Application tab** → Cookies → Verificar `next-auth.session-token`
- **Console** → Errores de JavaScript

3. **Verificar variables de entorno:**
```bash
echo $NEXTAUTH_URL
echo $NEXTAUTH_SECRET
```

4. **Verificar base de datos:**
```bash
npx prisma studio
# Ver si existe el usuario: admin@trianglais.com
```

5. **Habilitar debug de NextAuth:**
```typescript
// En apps/frontend/src/lib/auth.ts
const authOptions = {
  debug: true, // ← Agregar esta línea
  // ...resto de config
};
```

---

## 📝 Credenciales de Prueba

```
Email: admin@trianglais.com
Password: admin123
```

**Nota:** Estas credenciales deben existir en la base de datos PostgreSQL con la contraseña hasheada con bcrypt.

---

## 🚀 Producción

### Watchdog para PM2 (Reinicio Automático)
📁 `apps/frontend/scripts/watchdog.js`

```javascript
const MAX_FAILS = 60; // 60 intentos × 10s = 10 minutos
```

El watchdog reinicia automáticamente el servidor si cae por más de **10 minutos**.

### Iniciar en Producción
```bash
cd /workspaces/Tridashboard/apps/frontend
pm2 start ecosystem.config.js
pm2 save
```

---

## ✅ Checklist de Validación

- [x] Middleware usa wrapper function `auth((req) => {...})`
- [x] auth.ts tiene `secret`, `trustHost`, `maxAge`, `error` page
- [x] API route tiene `runtime: 'nodejs'` y `dynamic: 'force-dynamic'`
- [x] Páginas tienen directivas no-cache
- [x] IdleLogout integrado en dashboard layout
- [x] Variables de entorno configuradas
- [x] Watchdog configurado para 10 min
- [x] Puerto 3010 en todos los archivos de configuración

---

## 📚 Referencias

- [NextAuth.js v5 Documentation](https://next-auth.js.org/getting-started/introduction)
- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [Prisma Adapter](https://authjs.dev/reference/adapter/prisma)

---

**Última actualización:** $(date)  
**Versión NextAuth:** v5.0.0-beta.29  
**Versión Next.js:** 15.5.6  
**Estado:** ✅ Configuración completa aplicada
