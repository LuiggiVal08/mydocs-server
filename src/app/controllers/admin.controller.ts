import logger from '@/config/logger';
import models from '@/app/models';
import { AuthenticatedRequest } from '@/types/auth';
import { Request, Response } from 'express';
import { z } from 'zod';

const AdminSchema = z.object({
    usuarioId: z.string(),
    rolId: z.string(),
});

class Admin {
    static async getAll(_req: AuthenticatedRequest, res: Response) {
        try {
            const admins = await models.Administrator.findAll({ include: [{ all: true }] });

            res.status(200).json({ data: { admins } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        }
    }
    static async getAllTeachers(_req: Request, res: Response) {
        try {
            const teachers = await models.Administrator.findAll({
                where: { role: { name: 'teacher' } },
                include: [{ all: true }],
            });
            res.status(200).json({ data: { teachers } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        }
    }
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const admin = await models.Administrator.findByPk(id, {
                include: [{ all: true }],
            });
            if (!admin) {
                res.status(404).json({ message: 'administrador no encontrado' });
                return;
            }
            res.status(200).json({ data: { admin } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
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
            const usuario = await models.User.findByPk(usuarioId);
            if (!usuario) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }
            const rolId = parsed.data.rolId;
            const rol = await models.Role.findByPk(rolId);
            if (!rol) {
                res.status(404).json({ message: 'Rol no encontrado' });
                return;
            }
            const admin = await models.Administrator.create({
                roleId: rolId,
                userId: usuarioId,
            });
            res.status(201).json({ data: { admin } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        }
    }
}

export default Admin;
