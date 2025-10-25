#!/bin/bash

# Script Maestro de Desarrollo para TRIANGLAIS
# Maneja el ciclo completo: limpiar -> generar -> iniciar

set -e

PROJECT_DIR="/workspaces/Tridashboard"
PORT=3010

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

clear

echo -e "${CYAN}"
cat << "EOF"
╔══════════════════════════════════════════════════════╗
║                                                      ║
║   ████████╗██████╗ ██╗ █████╗ ███╗   ██╗ ██████╗   ║
║   ╚══██╔══╝██╔══██╗██║██╔══██╗████╗  ██║██╔════╝   ║
║      ██║   ██████╔╝██║███████║██╔██╗ ██║██║  ███╗  ║
║      ██║   ██╔══██╗██║██╔══██║██║╚██╗██║██║   ██║  ║
║      ██║   ██║  ██║██║██║  ██║██║ ╚████║╚██████╔╝  ║
║      ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝   ║
║                                                      ║
║        Sistema de Gestión para Academia             ║
║              Modo: Desarrollo                        ║
╚══════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"
echo ""

cd "$PROJECT_DIR"

# PASO 1: Limpiar puertos
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  PASO 1/4: Limpieza de Puertos       ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

bash ./scripts/clean-ports.sh || {
    echo -e "${RED}❌ Error en limpieza de puertos${NC}"
    exit 1
}

echo ""

# PASO 2: Generar Prisma Client
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  PASO 2/4: Generando Prisma Client   ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

pnpm db:generate || {
    echo -e "${RED}❌ Error generando Prisma Client${NC}"
    exit 1
}

echo -e "${GREEN}✅ Prisma Client generado${NC}"
echo ""

# PASO 3: Verificar variables de entorno
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  PASO 3/4: Verificando Entorno       ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Archivo .env no encontrado${NC}"
    echo -e "${YELLOW}   Creando desde .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Archivo .env creado${NC}"
else
    echo -e "${GREEN}✅ Archivo .env existe${NC}"
fi

if [ ! -f "apps/frontend/.env.local" ]; then
    echo -e "${YELLOW}⚠️  Archivo apps/frontend/.env.local no encontrado${NC}"
    echo -e "${YELLOW}   Creando...${NC}"
    cp .env apps/frontend/.env.local
    echo -e "${GREEN}✅ Archivo .env.local creado${NC}"
else
    echo -e "${GREEN}✅ Archivo .env.local existe${NC}"
fi

# Verificar NEXTAUTH_SECRET
if grep -q "NEXTAUTH_SECRET=\"\"" .env 2>/dev/null || ! grep -q "NEXTAUTH_SECRET" .env 2>/dev/null; then
    echo -e "${YELLOW}⚠️  NEXTAUTH_SECRET vacío o no existe${NC}"
    SECRET=$(openssl rand -base64 32)
    echo "NEXTAUTH_SECRET=\"$SECRET\"" >> .env
    echo -e "${GREEN}✅ NEXTAUTH_SECRET generado${NC}"
fi

echo ""

# PASO 4: Iniciar servidor
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  PASO 4/4: Iniciando Servidor        ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

echo -e "${GREEN}🚀 Iniciando TRIANGLAIS en puerto ${PORT}...${NC}"
echo -e "${CYAN}📍 URL: http://localhost:${PORT}${NC}"
echo -e "${YELLOW}⚡ Hot Reload: Activado${NC}"
echo ""
echo -e "${BLUE}──────────────────────────────────────${NC}"
echo -e "${YELLOW}Presiona Ctrl+C para detener el servidor${NC}"
echo -e "${BLUE}──────────────────────────────────────${NC}"
echo ""

# Iniciar con el puerto forzado
PORT=$PORT pnpm dev:frontend

# Este punto se alcanza cuando se detiene el servidor
echo ""
echo -e "${YELLOW}🛑 Servidor detenido${NC}"
echo -e "${BLUE}Hasta luego! 👋${NC}"
