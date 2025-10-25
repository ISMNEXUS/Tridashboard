#!/bin/bash

# Script de Gestión de Puertos para TRIANGLAIS
# Asegura que el servidor siempre corra en el puerto 3010

set -e

PORT=3010
PROJECT_DIR="/workspaces/Tridashboard"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   TRIANGLAIS - Port Manager v1.1      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Función para verificar si un puerto está en uso
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Puerto en uso
    else
        return 1  # Puerto libre
    fi
}

# Función para liberar un puerto
free_port() {
    local port=$1
    echo -e "${YELLOW}🔍 Verificando puerto $port...${NC}"
    
    if check_port $port; then
        echo -e "${RED}⚠️  Puerto $port está en uso${NC}"
        
        # Obtener información del proceso
        local pid=$(lsof -ti:$port)
        local process_info=$(ps -p $pid -o comm= 2>/dev/null || echo "desconocido")
        
        echo -e "${YELLOW}   PID: $pid | Proceso: $process_info${NC}"
        echo -e "${YELLOW}   Deteniendo proceso...${NC}"
        
        # Intentar detener gracefully primero
        kill $pid 2>/dev/null || true
        sleep 1
        
        # Si aún está corriendo, forzar
        if check_port $port; then
            echo -e "${RED}   Forzando cierre...${NC}"
            kill -9 $pid 2>/dev/null || true
            sleep 1
        fi
        
        # Verificar si se liberó
        if check_port $port; then
            echo -e "${RED}❌ No se pudo liberar el puerto $port${NC}"
            return 1
        else
            echo -e "${GREEN}✅ Puerto $port liberado${NC}"
            return 0
        fi
    else
        echo -e "${GREEN}✅ Puerto $port está libre${NC}"
        return 0
    fi
}

# Función para matar todos los procesos de Next.js
kill_next_processes() {
    echo -e "${YELLOW}🔍 Buscando procesos de Next.js...${NC}"
    
    local pids=$(pgrep -f "next dev" || true)
    
    if [ -z "$pids" ]; then
        echo -e "${GREEN}✅ No hay procesos de Next.js corriendo${NC}"
    else
        echo -e "${YELLOW}   Deteniendo procesos: $pids${NC}"
        pkill -f "next dev" 2>/dev/null || true
        sleep 2
        echo -e "${GREEN}✅ Procesos de Next.js detenidos${NC}"
    fi
}

# Función principal
main() {
    echo -e "${BLUE}📋 PASO 1: Limpieza de procesos${NC}"
    kill_next_processes
    echo ""
    
    echo -e "${BLUE}📋 PASO 2: Liberación de puertos${NC}"
    # Liberar puertos relevantes (principal 3010 y posibles previos 3000/3001)
    free_port 3010
    free_port 3000
    free_port 3001
    echo ""
    
    echo -e "${BLUE}📋 PASO 3: Verificación final${NC}"
    if check_port 3010 || check_port 3000 || check_port 3001; then
        echo -e "${RED}❌ Algunos puertos siguen en uso${NC}"
        echo -e "${YELLOW}   Ejecute: lsof -i:3010,3000,3001 para más información${NC}"
        exit 1
    else
        echo -e "${GREEN}✅ Todos los puertos están libres${NC}"
    fi
    echo ""
    
    echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║   ✅ Puertos listos para usar         ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}💡 Para iniciar el servidor, ejecute:${NC}"
    echo -e "${BLUE}   pnpm dev:frontend${NC}"
    echo ""
}

# Ejecutar función principal
main
