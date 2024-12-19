import logger from '@/config/logger';
import prisma from '@/config/prisma';
import { Request, Response } from 'express';
import { z } from 'zod';

const AdminSchema = z.object({
    usuarioId: z.string(),
    rolId: z.string(),
});

class Admin {
    static async getAll(_req: Request, res: Response) {
        try {
            const admins = await prisma.administrator.findMany({
                include: {
                    user: {
                        include: {
                            municipality: {
                                include: {
                                    state: true,
                                },
                            },
                        },
                    },
                    role: true,
                },
            });
            res.status(200).json({ data: { admins } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }
    static async getAllTeachers(_req: Request, res: Response) {
        try {
            const admins = await prisma.administrator.findMany({
                where: {
                    role: {
                        name: 'teacher',
                    },
                },
                include: {
                    user: {
                        include: {
                            municipality: {
                                include: {
                                    state: true,
                                },
                            },
                        },
                    },
                },
            });
            res.status(200).json({ data: { admins } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const admin = await prisma.administrator.findUnique({
                where: { id },
                include: {
                    user: {
                        include: {
                            municipality: {
                                include: {
                                    state: true,
                                },
                            },
                        },
                    },
                    role: true,
                },
            });
            if (!admin) {
                res.status(404).json({ message: 'administrador no encontrado' });
                return;
            }
            res.status(200).json({ data: { admin } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }
    static async create(req: Request, res: Response) {
        try {
            const { body } = req;
            const parsed = AdminSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const usuarioId = parsed.data.usuarioId;
            const usuario = await prisma.user.findUnique({ where: { id: usuarioId } });
            if (!usuario) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }
            const rolId = parsed.data.rolId;
            const rol = await prisma.role.findUnique({ where: { id: rolId } });
            if (!rol) {
                res.status(404).json({ message: 'Rol no encontrado' });
                return;
            }
            const admin = await prisma.administrator.create({ data: body });
            res.status(201).json({ data: { admin } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }
}

export default Admin;
