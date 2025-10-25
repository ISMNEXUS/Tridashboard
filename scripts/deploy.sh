#!/bin/bash

echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║   🚀 DESPLIEGUE RÁPIDO - TRIANGLAIS                 ║"
echo "║   Next.js 15 + React 19 + Node.js 22                ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar Node.js
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  1. VERIFICANDO REQUISITOS${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

node_version=$(node --version 2>/dev/null)
if [[ "$node_version" == v22.* ]]; then
    echo -e "${GREEN}✅ Node.js: $node_version${NC}"
else
    echo -e "${RED}❌ Node.js v22.x requerido. Actual: $node_version${NC}"
    echo "   Instala Node.js 22 primero"
    exit 1
fi

pnpm_version=$(pnpm --version 2>/dev/null)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ pnpm: v$pnpm_version${NC}"
else
    echo -e "${RED}❌ pnpm no está instalado${NC}"
    echo "   Instala pnpm con: npm install -g pnpm"
    exit 1
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  2. INSTALANDO DEPENDENCIAS${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

pnpm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencias instaladas${NC}"
else
    echo -e "${RED}❌ Error instalando dependencias${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  3. GENERANDO PRISMA CLIENT${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

pnpm db:generate > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Prisma Client generado${NC}"
else
    echo -e "${RED}❌ Error generando Prisma Client${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  4. COMPILANDO PARA PRODUCCIÓN${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

pnpm build:frontend
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build completado exitosamente${NC}"
else
    echo -e "${RED}❌ Error en el build${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  5. VERIFICANDO CONFIGURACIÓN${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

# Verificar archivos de configuración
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env encontrado${NC}"
else
    echo -e "${YELLOW}⚠️  .env no encontrado${NC}"
    echo "   Crea el archivo .env con las variables necesarias"
fi

if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ .env.local encontrado${NC}"
else
    echo -e "${YELLOW}⚠️  .env.local no encontrado${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  6. EJECUTANDO VERIFICACIONES${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

bash scripts/verify-all.sh

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║   ✅ DESPLIEGUE COMPLETADO                          ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}🚀 Para iniciar el servidor en producción:${NC}"
echo ""
echo "   Opción 1 - Con PM2 (recomendado):"
echo "   $ pm2 start ecosystem.config.js"
echo ""
echo "   Opción 2 - Directamente:"
echo "   $ pnpm start"
echo ""
echo "   Opción 3 - Desarrollo:"
echo "   $ pnpm dev"
echo ""
echo -e "${BLUE}📚 Para más información, consulta:${NC}"
echo "   - DESPLIEGUE_PRODUCCION.md"
echo "   - RESUMEN_EJECUTIVO.md"
echo "   - ACTUALIZACION_NEXTJS15.md"
echo ""
