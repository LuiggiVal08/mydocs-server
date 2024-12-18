import { loadEnvFile, env } from 'node:process';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient as ProductionClient } from '@prisma-client/production/client';
import { PrismaClient as DevelopmentClient } from '@prisma-client/development/client';
import { PrismaClient as TestClient } from '@prisma-client/test/client';
const { NODE_ENV } = env;
console.log(NODE_ENV);

loadEnvFile();

export const productionPrisma = new ProductionClient().$extends(withAccelerate());
export const developmentPrisma = new DevelopmentClient().$extends(withAccelerate());
export const testPrisma = new TestClient().$extends(withAccelerate());

const prisma = testPrisma;

export default prisma;
