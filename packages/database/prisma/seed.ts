import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de base de datos...');

  // Crear roles
  console.log('📋 Creando roles...');
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'SUPER_ADMIN' },
      update: {},
      create: {
        name: 'SUPER_ADMIN',
        description: 'Acceso total al sistema',
      },
    }),
    prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: {
        name: 'ADMIN',
        description: 'Administrador del sistema',
      },
    }),
    prisma.role.upsert({
      where: { name: 'MANAGER' },
      update: {},
      create: {
        name: 'MANAGER',
        description: 'Gerente de operaciones',
      },
    }),
    prisma.role.upsert({
      where: { name: 'SALES' },
      update: {},
      create: {
        name: 'SALES',
        description: 'Equipo de ventas',
      },
    }),
    prisma.role.upsert({
      where: { name: 'TEACHER' },
      update: {},
      create: {
        name: 'TEACHER',
        description: 'Profesor de la academia',
      },
    }),
    prisma.role.upsert({
      where: { name: 'STUDENT' },
      update: {},
      create: {
        name: 'STUDENT',
        description: 'Estudiante',
      },
    }),
  ]);

  console.log('✅ Roles creados');

  // Crear usuario administrador
  console.log('👤 Creando usuario administrador...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@trianglais.com' },
    update: {},
    create: {
      email: 'admin@trianglais.com',
      name: 'Administrador',
      password: hashedPassword,
      isActive: true,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: roles[0].id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: roles[0].id,
    },
  });

  console.log('✅ Usuario administrador creado: admin@trianglais.com / admin123');

  // Crear permisos básicos
  console.log('🔐 Creando permisos...');
  const permissions = await Promise.all([
    // CRM Permissions
    prisma.permission.upsert({
      where: { name: 'crm.leads.view' },
      update: {},
      create: { name: 'crm.leads.view', description: 'Ver leads', module: 'CRM' },
    }),
    prisma.permission.upsert({
      where: { name: 'crm.leads.create' },
      update: {},
      create: { name: 'crm.leads.create', description: 'Crear leads', module: 'CRM' },
    }),
    prisma.permission.upsert({
      where: { name: 'crm.leads.edit' },
      update: {},
      create: { name: 'crm.leads.edit', description: 'Editar leads', module: 'CRM' },
    }),
    prisma.permission.upsert({
      where: { name: 'crm.leads.delete' },
      update: {},
      create: { name: 'crm.leads.delete', description: 'Eliminar leads', module: 'CRM' },
    }),
    // ERP Permissions
    prisma.permission.upsert({
      where: { name: 'erp.sales.view' },
      update: {},
      create: { name: 'erp.sales.view', description: 'Ver ventas', module: 'ERP' },
    }),
    prisma.permission.upsert({
      where: { name: 'erp.invoices.view' },
      update: {},
      create: { name: 'erp.invoices.view', description: 'Ver facturas', module: 'ERP' },
    }),
    // Admin Permissions
    prisma.permission.upsert({
      where: { name: 'admin.users.view' },
      update: {},
      create: { name: 'admin.users.view', description: 'Ver usuarios', module: 'ADMIN' },
    }),
    prisma.permission.upsert({
      where: { name: 'admin.users.create' },
      update: {},
      create: { name: 'admin.users.create', description: 'Crear usuarios', module: 'ADMIN' },
    }),
  ]);

  console.log('✅ Permisos creados');

  // Asignar todos los permisos al rol SUPER_ADMIN
  console.log('🔗 Asignando permisos a roles...');
  for (const permission of permissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: roles[0].id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: roles[0].id,
        permissionId: permission.id,
      },
    });
  }

  console.log('✅ Permisos asignados');

  // Crear configuraciones del sistema
  console.log('⚙️ Creando configuraciones del sistema...');
  await Promise.all([
    prisma.systemConfig.upsert({
      where: { key: 'app.name' },
      update: {},
      create: {
        key: 'app.name',
        value: 'TRIANGLAIS',
        category: 'GENERAL',
        isPublic: true,
      },
    }),
    prisma.systemConfig.upsert({
      where: { key: 'app.timezone' },
      update: {},
      create: {
        key: 'app.timezone',
        value: 'America/Mexico_City',
        category: 'GENERAL',
        isPublic: false,
      },
    }),
    prisma.systemConfig.upsert({
      where: { key: 'crm.lead.auto_assign' },
      update: {},
      create: {
        key: 'crm.lead.auto_assign',
        value: 'true',
        category: 'CRM',
        dataType: 'boolean',
        isPublic: false,
      },
    }),
  ]);

  console.log('✅ Configuraciones creadas');

  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch(e => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
