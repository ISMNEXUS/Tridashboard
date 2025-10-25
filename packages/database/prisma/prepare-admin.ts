import { PrismaClient, RoleType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔌 Verificando conexión a la base de datos...');
  // Si falla aquí, se lanzará excepción
  await prisma.$queryRaw`SELECT 1`;
  console.log('✅ Conexión OK (72.60.30.253:5432, db dashtrian)');

  console.log('🧹 Eliminando datos de prueba (si existen)...');
  // Orden cuidadoso por dependencias
  await prisma.chatMessage.deleteMany();
  await prisma.chatParticipant.deleteMany();
  await prisma.chatRoom.deleteMany();

  await prisma.leadTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.email.deleteMany();

  await prisma.invoice.deleteMany();
  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();

  await prisma.purchaseItem.deleteMany();
  await prisma.purchase.deleteMany();

  await prisma.expense.deleteMany();

  await prisma.enrollment.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.course.deleteMany();

  await prisma.lead.deleteMany();

  await prisma.moodleConnection.deleteMany();

  // No eliminamos roles, permisos ni system configs
  console.log('✅ Datos de prueba limpiados');

  console.log('🛡️ Asegurando roles base...');
  const superAdminRole = await prisma.role.upsert({
    where: { name: RoleType.SUPER_ADMIN },
    update: {},
    create: {
      name: RoleType.SUPER_ADMIN,
      description: 'Acceso total al sistema',
    },
  });
  console.log('✅ Rol SUPER_ADMIN listo');

  console.log('👤 Preparando superusuario ismnexus...');
  // Eliminar usuario admin de seed si existiera
  await prisma.user.deleteMany({ where: { email: 'admin@trianglais.com' } });

  const email = 'ismnexus@trianglais.com';
  const name = 'ISMNEXUS';
  const plainPassword = '15Mc3nt3r2030/*-+';
  const hashedPassword = await bcrypt.hash(plainPassword, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      password: hashedPassword,
      isActive: true,
    },
    create: {
      email,
      name,
      password: hashedPassword,
      isActive: true,
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: superAdminRole.id } },
    update: {},
    create: { userId: user.id, roleId: superAdminRole.id },
  });

  console.log('✅ Superusuario creado/asignado:');
  console.log(`   Email: ${email}`);
  console.log('   Rol: SUPER_ADMIN');
  console.log('   (La contraseña fue encriptada y no se muestra)');

  console.log('🎉 Preparación completada.');
}

main()
  .catch((e) => {
    console.error('❌ Error en la preparación:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
