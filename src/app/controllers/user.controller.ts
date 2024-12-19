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
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await prisma.usuario.findUnique({ where: { id } });
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }
            res.status(200).json({ data: { student: user } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }
}
export default User;
