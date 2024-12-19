import { loadEnvFile, env } from 'node:process';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient as ProductionClient } from '@prisma-client/production/client';
import { PrismaClient as DevelopmentClient } from '@prisma-client/development/client';
import { PrismaClient as TestClient } from '@prisma-client/test/client';
const { NODE_ENV } = env;
console.log(NODE_ENV);

loadEnvFile();

export const productionPrisma = new ProductionClient();
export const developmentPrisma = new DevelopmentClient();
export const testPrisma = new TestClient();

const prisma = testPrisma;

// prisma: ProductionClient | DevelopmentClient | TestClient;
prisma.$connect();
prisma.$extends(withAccelerate());

export default prisma;
