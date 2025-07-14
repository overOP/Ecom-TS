import { PrismaClient, AccountType } from '../generated/prisma';

const prisma = new PrismaClient();

async function connectToDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('✅ Successfully connected to the database.');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

connectToDatabase();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🔌 Disconnected from database.');
  process.exit(0);
});

export { prisma, AccountType };
