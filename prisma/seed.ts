import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10);

  const tenant1 = await prisma.tenant.create({
    data: {
      name: 'Tech Solutions',
    },
  });

  const tenant2 = await prisma.tenant.create({
    data: {
      name: 'Marketing Pro',
    },
  });

  const tenant3 = await prisma.tenant.create({
    data: {
      name: 'Consulting Experts',
    },
  });

  await prisma.user.createMany({
    data: [
      {
        email: 'admin@techsolutions.com',
        name: 'Administrador',
        password: passwordHash,
        telephone: '88888888',
        role: Role.ADMIN,
        tenantId: tenant1.id,
      },
      {
        email: 'usuario@techsolutions.com',
        name: 'Usuario Tech',
        password: passwordHash,
        telephone: '87777777',
        role: Role.USER,
        tenantId: tenant1.id,
      },
      {
        email: 'usuario@marketingpro.com',
        name: 'Usuario Marketing',
        password: passwordHash,
        telephone: '86666666',
        role: Role.USER,
        tenantId: tenant2.id,
      },
      {
        email: 'usuario@consultingexperts.com',
        name: 'Usuario Consulting',
        password: passwordHash,
        telephone: '85555555',
        role: Role.USER,
        tenantId: tenant3.id,
      },
    ],
  });

  console.log('Seed ejecutado correctamente');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });