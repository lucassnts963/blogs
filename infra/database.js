import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function query(objectQuery) {
  try {
    const result = await prisma.$executeRaw`${objectQuery}`;
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}

export default {
  query,
  prisma,
};
