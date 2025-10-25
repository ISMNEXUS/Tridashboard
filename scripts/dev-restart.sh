#!/bin/bash

# Script para reiniciar el servidor de desarrollo en el puerto 3010
# Asegura que no haya conflictos de puerto

PORT=3010
PROJECT_DIR="/workspaces/Tridashboard"

echo "🔄 TRIANGLAIS - Reiniciando servidor de desarrollo..."
echo "=================================================="

# 1. Detener todos los procesos en los puertos 3010, 3000 y 3001
echo "📛 Deteniendo procesos existentes..."
lsof -ti:3010,3000,3001 2>/dev/null | xargs kill -9 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

# Esperar un momento para que los procesos se detengan
sleep 2

# 2. Verificar que los puertos estén libres
echo "🔍 Verificando disponibilidad del puerto $PORT..."
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Puerto $PORT aún en uso. Forzando liberación..."
    lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
    sleep 1
fi

# 3. Navegar al directorio del proyecto
cd "$PROJECT_DIR" || exit 1

# 4. Iniciar el servidor de desarrollo
echo "🚀 Iniciando servidor en puerto $PORT..."
echo "=================================================="
PORT=$PORT pnpm dev:frontend

# El script terminará cuando se detenga el servidor con Ctrl+C
