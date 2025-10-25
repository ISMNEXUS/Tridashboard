# 🚀 GUÍA DE DESPLIEGUE EN PRODUCCIÓN - TRIANGLAIS

## 📋 REQUISITOS DEL SERVIDOR

### Software Requerido
- **Node.js**: v22.x o superior
- **pnpm**: v8.x o superior
- **PostgreSQL**: v16 (ya configurado en 72.60.30.253:5432)
- **Sistema Operativo**: Ubuntu 24.04 LTS o compatible

### Recursos Mínimos Recomendados
- **CPU**: 2 cores
- **RAM**: 2 GB
- **Disco**: 10 GB libres
- **Ancho de banda**: 100 Mbps

---

## 🔧 PASOS DE INSTALACIÓN

### 1. Preparar el Servidor

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Verificar versiones
node --version  # Debe ser v22.x
pnpm --version  # Debe ser v8.x o superior
```

### 2. Clonar el Repositorio

```bash
# Navegar al directorio de aplicaciones
cd /var/www

# Clonar el repositorio
git clone https://github.com/ISMNEXUS/Tridashboard.git
cd Tridashboard

# O si ya tienes el código, copiarlo al servidor
# scp -r /local/path/Tridashboard usuario@servidor:/var/www/
```

### 3. Configurar Variables de Entorno

```bash
# Crear archivo .env en la raíz
cat > .env << EOF
# DATABASE_URL para PostgreSQL externo
DATABASE_URL="postgresql://postgres:9y0Avpn2pEh4gmUMGZWN5sbpF9D7LNex@72.60.30.253:5432/dashtrian?schema=public"

# NextAuth
NEXTAUTH_URL="http://tu-dominio.com"
NEXTAUTH_SECRET="trianglais-secret-key-2025-change-in-production"
EOF

# Copiar también a las otras ubicaciones
cp .env .env.local
cp .env apps/frontend/.env.local
cp .env packages/database/.env

# IMPORTANTE: Cambiar NEXTAUTH_SECRET por un valor aleatorio en producción
# Puedes generar uno con:
openssl rand -base64 32
```

### 4. Instalar Dependencias

```bash
# Instalar todas las dependencias
pnpm install

# Generar Prisma Client
pnpm db:generate
```

### 5. Verificar Conexión a Base de Datos

```bash
# Probar conexión a la base de datos
pnpm db:push

# Si hay datos que migrar
pnpm db:migrate

# Poblar datos iniciales (si es necesario)
pnpm db:seed
```

### 6. Compilar para Producción

```bash
# Build del frontend
pnpm build:frontend

# Esto debería mostrar:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages
# ✓ Finalizing page optimization
```

---

## 🌐 CONFIGURACIÓN DE NGINX (Recomendado)

### Instalar Nginx

```bash
sudo apt install nginx -y
```

### Configurar Sitio

```bash
sudo nano /etc/nginx/sites-available/trianglais
```

Contenido del archivo:

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    # Logs
    access_log /var/log/nginx/trianglais-access.log;
    error_log /var/log/nginx/trianglais-error.log;

    # Proxy al servidor Next.js
    location / {
        proxy_pass http://localhost:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Archivos estáticos
    location /_next/static {
        proxy_cache STATIC;
        proxy_pass http://localhost:3010;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Imágenes
    location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
        proxy_pass http://localhost:3010;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Habilitar Sitio

```bash
# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/trianglais /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## 🔐 CONFIGURAR SSL CON CERTBOT (HTTPS)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Certbot configurará automáticamente HTTPS y renovación automática
```

---

## 🔄 CONFIGURAR PM2 PARA PROCESO CONTINUO

### Instalar PM2

```bash
npm install -g pm2
```

### Crear Archivo de Configuración PM2

```bash
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'trianglais',
    script: 'pnpm',
    args: 'start',
    cwd: '/var/www/Tridashboard/apps/frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3010
    }
  }]
}
EOF
```

### Iniciar con PM2

```bash
# Iniciar aplicación
pm2 start ecosystem.config.js

# Guardar configuración
pm2 save

# Configurar inicio automático
pm2 startup

# Monitorear
pm2 status
pm2 logs trianglais
pm2 monit
```

---

## 📊 COMANDOS ÚTILES DE PM2

```bash
# Ver logs en tiempo real
pm2 logs trianglais

# Reiniciar aplicación
pm2 restart trianglais

# Detener aplicación
pm2 stop trianglais

# Ver estado
pm2 status

# Monitor de recursos
pm2 monit

# Eliminar de PM2
pm2 delete trianglais
```

---

## 🔍 VERIFICACIÓN POST-DESPLIEGUE

### 1. Verificar Servidor

```bash
# Verificar que el servidor está corriendo
curl -I http://localhost:3010

# Debería retornar HTTP 307 o 200
```

### 2. Ejecutar Script de Verificación

```bash
cd /var/www/Tridashboard
bash scripts/verify-all.sh
```

### 3. Probar desde el Navegador

```
http://tu-dominio.com
https://tu-dominio.com (si configuraste SSL)
```

---

## 🔒 SEGURIDAD

### 1. Firewall (UFW)

```bash
# Habilitar firewall
sudo ufw enable

# Permitir SSH
sudo ufw allow 22/tcp

# Permitir HTTP y HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Ver estado
sudo ufw status
```

### 2. Actualizar NEXTAUTH_SECRET

```bash
# Generar nuevo secret
openssl rand -base64 32

# Actualizar en todos los archivos .env
# NUNCA usar el valor de desarrollo en producción
```

### 3. Configurar Variables de Entorno Sensibles

```bash
# Usar variables de entorno del sistema en lugar de archivos .env
# Agregar a /etc/environment o configurar en PM2
```

---

## 📈 MONITOREO Y LOGS

### Ver Logs de Nginx

```bash
sudo tail -f /var/log/nginx/trianglais-access.log
sudo tail -f /var/log/nginx/trianglais-error.log
```

### Ver Logs de PM2

```bash
pm2 logs trianglais --lines 100
```

### Ver Logs de Sistema

```bash
sudo journalctl -u nginx -f
```

---

## 🔄 ACTUALIZAR LA APLICACIÓN

```bash
cd /var/www/Tridashboard

# 1. Detener aplicación
pm2 stop trianglais

# 2. Actualizar código
git pull origin main

# 3. Instalar nuevas dependencias
pnpm install

# 4. Regenerar Prisma (si es necesario)
pnpm db:generate

# 5. Ejecutar migraciones (si es necesario)
pnpm db:migrate

# 6. Compilar nueva versión
pnpm build:frontend

# 7. Reiniciar aplicación
pm2 restart trianglais

# 8. Verificar
pm2 status
```

---

## 🆘 TROUBLESHOOTING

### Problema: Servidor no inicia

```bash
# Verificar logs
pm2 logs trianglais

# Verificar puerto
sudo lsof -i :3010

# Reiniciar PM2
pm2 restart trianglais
```

### Problema: Error de base de datos

```bash
# Verificar conexión
pnpm db:generate

# Ver logs de Prisma
pm2 logs trianglais | grep -i prisma
```

### Problema: Nginx no sirve la aplicación

```bash
# Verificar configuración
sudo nginx -t

# Ver logs
sudo tail -f /var/log/nginx/error.log

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 📞 COMANDOS DE EMERGENCIA

```bash
# Reiniciar todo
pm2 restart all
sudo systemctl restart nginx

# Limpiar y reconstruir
cd /var/www/Tridashboard
pnpm clean
pnpm install
pnpm build:frontend
pm2 restart trianglais

# Verificar salud del sistema
pm2 status
sudo systemctl status nginx
curl -I http://localhost:3010
```

---

## ✅ CHECKLIST DE DESPLIEGUE

- [ ] Node.js 22 instalado
- [ ] pnpm instalado
- [ ] Código clonado/copiado al servidor
- [ ] Variables de entorno configuradas
- [ ] NEXTAUTH_SECRET cambiado (no usar el de desarrollo)
- [ ] Dependencias instaladas (`pnpm install`)
- [ ] Prisma Client generado
- [ ] Aplicación compilada (`pnpm build:frontend`)
- [ ] PM2 configurado e iniciado
- [ ] Nginx configurado
- [ ] SSL configurado (Certbot)
- [ ] Firewall configurado
- [ ] Pruebas de verificación pasadas
- [ ] Aplicación accesible desde el dominio
- [ ] Logs verificados sin errores críticos

---

## 📝 NOTAS IMPORTANTES

1. **NEXTAUTH_SECRET**: SIEMPRE usar un valor diferente en producción
2. **BASE DE DATOS**: Ya está configurada en servidor remoto (72.60.30.253)
3. **PUERTO**: Aplicación corre en 3010, Nginx en 80/443
4. **SSL**: Recomendado para producción (HTTPS)
5. **PM2**: Mantiene la aplicación corriendo y la reinicia si falla
6. **BACKUPS**: Configurar backups regulares de la base de datos

---

**Última actualización**: 24 de Octubre, 2025  
**Versión de Next.js**: 15.5.6  
**Versión de Node.js**: 22.17.0  
**Estado**: ✅ Listo para Producción
