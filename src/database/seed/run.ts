import { PrismaClient } from '@prisma/client';
import { seedProfile } from './seed';

async function main() {
  const prisma = new PrismaClient();
  try {
    await seedProfile(prisma);
    console.log('Database seeded');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
