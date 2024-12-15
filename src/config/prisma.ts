import { loadEnvFile } from 'node:process';
loadEnvFile();
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
const { NODE_ENV, DATABASE_URL_DEV, DATABASE_URL_TEST, DATABASE_URL_PROD } = process.env;
let urlClient: string;

if (NODE_ENV === 'production') {
    urlClient = DATABASE_URL_PROD;
} else if (NODE_ENV === 'development') {
    urlClient = DATABASE_URL_DEV;
} else if (NODE_ENV === 'test') {
    urlClient = DATABASE_URL_TEST;
}

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: urlClient,
        },
    },
}).$extends(withAccelerate());

export default prisma;
