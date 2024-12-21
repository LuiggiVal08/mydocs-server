import { loadEnvFile, env } from 'node:process';
import { PrismaClient as ProductionClient } from '../../client/production/client';
import { PrismaClient as DevelopmentClient } from '../../client/development/client';
import { PrismaClient as TestClient } from '../../client/test/client';
import { withAccelerate } from '@prisma/extension-accelerate';
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
