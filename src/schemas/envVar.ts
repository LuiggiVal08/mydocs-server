import z from 'zod';

export default z.object({
    PORT: z.string().optional(),
    APP_SECRET: z.string(),
    JWT_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
    NAME_APP: z.string(),
    MAIL_FROM_EMAIL: z.string().email(),
    MAIL_PASSWORD: z.string(),
});
