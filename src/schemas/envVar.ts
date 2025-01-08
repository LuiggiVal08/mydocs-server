import z from 'zod';

export default z.object({
    PORT: z.string().optional(),
    JWT_SECRET: z.string(),
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
});
