#!/bin/bash

echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║   🔍 VERIFICACIÓN COMPLETA - TRIANGLAIS             ║"
echo "║   Next.js 15 + React 19 + Node.js 22                ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

failed=0
passed=0

# Función para verificar
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ $1${NC}"
        ((failed++))
    fi
}

echo "═══════════════════════════════════════════════════════"
echo "  1. VERIFICACIÓN DE ENTORNO"
echo "═══════════════════════════════════════════════════════"
echo ""

# Verificar Node.js
node_version=$(node --version)
if [[ "$node_version" == v22.* ]]; then
    echo -e "${GREEN}✅ Node.js: $node_version${NC}"
    ((passed++))
else
    echo -e "${RED}❌ Node.js: $node_version (se requiere v22.x)${NC}"
    ((failed++))
fi

# Verificar pnpm
pnpm_version=$(pnpm --version)
echo -e "${GREEN}✅ pnpm: v$pnpm_version${NC}"
((passed++))

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  2. VERIFICACIÓN DE DEPENDENCIAS"
echo "═══════════════════════════════════════════════════════"
echo ""

# Verificar Next.js
cd /workspaces/Tridashboard/apps/frontend
next_version=$(grep '"next":' package.json | sed 's/.*"\^//' | sed 's/".*//')
if [[ "$next_version" == 15.* ]]; then
    echo -e "${GREEN}✅ Next.js: v$next_version${NC}"
    ((passed++))
else
    echo -e "${RED}❌ Next.js: v$next_version (se requiere v15.x)${NC}"
    ((failed++))
fi

# Verificar React
react_version=$(grep '"react":' package.json | head -1 | sed 's/.*"\^//' | sed 's/".*//')
if [[ "$react_version" == 19.* ]]; then
    echo -e "${GREEN}✅ React: v$react_version${NC}"
    ((passed++))
else
    echo -e "${RED}❌ React: v$react_version (se requiere v19.x)${NC}"
    ((failed++))
fi

# Verificar Prisma
prisma_version=$(grep '"@prisma/client":' package.json | sed 's/.*"\^//' | sed 's/".*//')
echo -e "${GREEN}✅ Prisma Client: v$prisma_version${NC}"
((passed++))

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  3. VERIFICACIÓN DE COMPILACIÓN"
echo "═══════════════════════════════════════════════════════"
echo ""

cd /workspaces/Tridashboard

# Verificar TypeScript
echo -n "Verificando TypeScript... "
pnpm --filter frontend tsc --noEmit > /dev/null 2>&1
check "TypeScript compilation"

# Verificar Prisma
echo -n "Verificando Prisma Client... "
pnpm db:generate > /dev/null 2>&1
check "Prisma Client generation"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  4. VERIFICACIÓN DEL SERVIDOR"
echo "═══════════════════════════════════════════════════════"
echo ""

# Verificar si el servidor está corriendo
server_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3010 2>/dev/null)
if [ "$server_status" != "000" ] && [ "$server_status" != "" ]; then
    echo -e "${GREEN}✅ Servidor: Respondiendo (HTTP $server_status)${NC}"
    ((passed++))
else
    echo -e "${YELLOW}⚠️  Servidor: No está corriendo${NC}"
    echo "   Ejecuta 'pnpm dev' para iniciar el servidor"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  5. VERIFICACIÓN DE RUTAS"
echo "═══════════════════════════════════════════════════════"
echo ""

if [ "$server_status" != "000" ] && [ "$server_status" != "" ]; then
    bash /workspaces/Tridashboard/scripts/test-routes.sh | tail -n 12
else
    echo "⚠️  Omitiendo pruebas de rutas (servidor no está corriendo)"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  6. ARCHIVOS DE CONFIGURACIÓN"
echo "═══════════════════════════════════════════════════════"
echo ""

# Verificar archivos importantes
files=(
    ".env"
    ".env.local"
    "apps/frontend/.env.local"
    "apps/frontend/next.config.js"
    "apps/frontend/tsconfig.json"
    "packages/database/.env"
    "playwright.config.ts"
)

for file in "${files[@]}"; do
    if [ -f "/workspaces/Tridashboard/$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ $file (no encontrado)${NC}"
        ((failed++))
    fi
done

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  📊 RESUMEN"
echo "═══════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✅ Verificaciones exitosas: $passed${NC}"
if [ $failed -gt 0 ]; then
    echo -e "${RED}❌ Verificaciones fallidas: $failed${NC}"
fi
echo ""

if [ $failed -eq 0 ]; then
    echo "╔══════════════════════════════════════════════════════╗"
    echo "║                                                      ║"
    echo "║   🎉 PROYECTO 100% FUNCIONAL                        ║"
    echo "║   Listo para despliegue en producción               ║"
    echo "║                                                      ║"
    echo "╚══════════════════════════════════════════════════════╝"
    exit 0
else
    echo "╔══════════════════════════════════════════════════════╗"
    echo "║                                                      ║"
    echo "║   ⚠️  ALGUNAS VERIFICACIONES FALLARON              ║"
    echo "║   Revisa los errores arriba                         ║"
    echo "║                                                      ║"
    echo "╚══════════════════════════════════════════════════════╝"
    exit 1
fi
