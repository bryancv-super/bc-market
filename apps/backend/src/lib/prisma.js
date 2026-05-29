const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

let prisma;

function getPrisma() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required for database access');
  }

  if (!prisma) {
    const adapter = new PrismaPg(process.env.DATABASE_URL);
    prisma = new PrismaClient({ adapter });
  }

  return prisma;
}

module.exports = { getPrisma };
