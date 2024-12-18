import { loadEnvFile, env } from 'node:process';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient as ProductionClient } from '@prisma-client/production/client';
import { PrismaClient as DevelopmentClient } from '@prisma-client/development/client';
import { PrismaClient as TestClient } from '@prisma-client/test/client';
const { NODE_ENV } = env;

loadEnvFile();

export const productionPrisma = new ProductionClient().$extends(withAccelerate());
export const developmentPrisma = new DevelopmentClient().$extends(withAccelerate());
export const testPrisma = new TestClient().$extends(withAccelerate());

const prisma = NODE_ENV === 'production' ? productionPrisma : NODE_ENV === 'test' ? testPrisma : developmentPrisma;

export default prisma;
