import models from '@/app/models';
import handdleErrorsController from '@/helpers/handdleErrorsController';
import type { AuthenticatedRequest } from '@/types/auth';
import type { Request, Response } from 'express';
import { z } from 'zod';

const AdminSchema = z.object({
    userId: z.string(),
    roleId: z.string(),
    status: z.enum(['Activo', 'Inactivo']).optional(),
});

class Admin {
    static async getAll(req: AuthenticatedRequest, res: Response) {
        try {
            const admins = await models.Administrator.findAll({ include: [{ all: true }] });
            res.status(200).json({ data: { admins } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async getAllTeachers(req: Request, res: Response) {
        try {
            const teachers = await models.Administrator.findAll({
                include: [{ model: models.Role, where: { name: 'teacher' } }],
            });
            res.status(200).json({ data: { teachers } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
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
            return handdleErrorsController(error, res, req);
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
            const { userId } = parsed.data;
            const user = await models.User.findByPk(userId);
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }
            const { roleId } = parsed.data;
            const role = await models.Role.findByPk(roleId);
            if (!role) {
                res.status(404).json({ message: 'Rol no encontrado' });
                return;
            }
            const admin = await models.Administrator.create({
                roleId: roleId,
                userId: userId,
            });

            res.status(201).json({ data: { admin } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async update(req: Request, res: Response) {
        try {
            const { body } = req;
            const { id } = req.params;
            const admin = await models.Administrator.findByPk(id);
            if (!admin) {
                res.status(404).json({ message: 'Administrator no encontrado' });
                return;
            }
            const parsed = AdminSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message, error: parsed.error.format() });
                return;
            }
            const updateAdministrator = {
                ...admin.dataValues,
                ...parsed.data,
            };
            await admin.update(updateAdministrator);
            res.status(200).json({ data: { admin } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const admin = await models.Administrator.findByPk(id);
            if (!admin) {
                return void res.status(404).json({ message: 'Administrator no encontrado' });
            }
            await admin.destroy();
            res.status(200).json({ message: 'Administrador eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}

export default Admin;
