import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../utilities/hash-password.utils';
import { Roles } from '../constants/roles.constants';

const prisma = new PrismaClient();

const main = async () => {
  const users = await prisma.user.findMany();

  if (users.length > 0) {
    console.log('No se insertan registros, ya existen registros en la tabla');
    return;
  }
  await prisma.role.createMany({
    data: [
      {
        name: Roles.Admin,
      },
    ],
  });

  const roleAdmin = await prisma.role.findFirst({
    where: {
      name: Roles.Admin,
    },
  });

  await prisma.user.createMany({
    data: [
      {
        email: 'andres.jaramillo@qcode.co',
        password: await hashPassword('123456'),
        firstName: 'Andres',
        lastName: 'Jaramillo',
        roleId: roleAdmin.id,
      },
    ],
  });
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
