#!/bin/bash

echo "🧪 PRUEBAS AUTOMÁTICAS - TRIANGLAIS"
echo "=================================="
echo ""

# Verificar que el servidor está corriendo
echo "📡 Verificando servidor en http://localhost:3010..."
status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3010)
if [ "$status" != "000" ]; then
    echo "✅ Servidor respondiendo correctamente (status: $status)"
else
    echo "❌ Servidor no está respondiendo"
    echo "⚠️  Ejecuta 'pnpm dev' en otra terminal primero"
    exit 1
fi

echo ""
echo "🔍 Probando rutas principales..."
echo ""

routes=("/" "/login" "/dashboard" "/dashboard/crm" "/dashboard/erp" "/dashboard/admin" "/dashboard/config")
failed_count=0
passed_count=0

for route in "${routes[@]}"; do
    echo -n "Testing $route ... "
    status=$(curl -s -o /dev/null -w "%{http_code}" -L http://localhost:3010$route)
    if [ "$status" = "404" ]; then
        echo "❌ FALLO (404)"
        ((failed_count++))
    elif [ "$status" = "200" ] || [ "$status" = "307" ] || [ "$status" = "302" ]; then
        echo "✅ OK ($status)"
        ((passed_count++))
    else
        echo "⚠️  INESPERADO ($status)"
        ((failed_count++))
    fi
done

echo ""
echo "=================================="
echo "📊 Resultados:"
echo "   ✅ Pasadas: $passed_count"
echo "   ❌ Falladas: $failed_count"
echo "=================================="
echo ""

if [ $failed_count -eq 0 ]; then
    echo "🎉 Todas las pruebas pasaron exitosamente!"
    exit 0
else
    echo "⚠️  Algunas pruebas fallaron"
    exit 1
fi
