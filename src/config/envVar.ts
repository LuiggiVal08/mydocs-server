import z from 'zod';

process.loadEnvFile();

export default z.object({
    PORT: z.string().optional(),
    JWT_SECRET: z.string(),
    NODE_ENV: z.string(),
    BASE: z.string(),
    DB_NAME: z.string(),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASS: z.string(),
});
