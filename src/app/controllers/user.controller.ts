import logger from '@/config/logger';
import prisma from '@/config/prisma';
import { Request, Response } from 'express';

class User {
    static async getAll(_req: Request, res: Response) {
        try {
            const users = await prisma.usuario.findMany();
            res.json({ users });
            return;
        } catch (error) {
            logger.error(`Error retrieving users: ${error}`);
            res.status(500).json({ error: 'Failed to retrieve users' });
        } finally {
            await prisma.$disconnect();
        }
    }
}
export default User;
