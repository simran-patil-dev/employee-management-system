require('dotenv').config();

const prisma = require('../src/shared/lib/prisma');
const { hashPassword } = require('../src/shared/helpers/hashPassword');

async function main() {
  const admins = [
    {
      name: 'Jaadya Patil',
      email: 'jaadya.patil@gmail.com',
      password: 'admin123',
    },
    {
      name: 'Laxmi Patil',
      email: 'laxmi.patil@gmail.com',
      password: 'admin123',
    },
  ];

  for (const admin of admins) {
    const existing = await prisma.user.findUnique({
      where: { email: admin.email },
    });

    if (existing) {
      console.log(`${admin.email} already exists`);
      continue;
    }

    const hashedPassword = await hashPassword(admin.password);

    await prisma.user.create({
      data: {
        name: admin.name,
        email: admin.email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log(`${admin.email} created`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());