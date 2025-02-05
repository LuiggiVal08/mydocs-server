import models from '@/app/models';
// import logger from '@/config/logger';
import handdleErrorsController from '@/helpers/handdleErrorsController';
import type { AuthenticatedRequest } from '@/types/auth';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { UserCreationAttributes } from '../models/User';

const AdminSchema = z.object({
    userId: z.string(),
    roleId: z.string(),
    status: z.enum(['Activo', 'Inactivo']).optional(),
});

class Admin {
    static async getAll(req: AuthenticatedRequest, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);
            const offset = (pageNumber - 1) * limitNumber;
            const { count, rows } = await models.Administrator.findAndCountAll({
                include: [models.User, models.Role],
                limit: limitNumber,
                offset: offset,
            });
            const totalPages = Math.ceil(count / limitNumber);

            res.status(200).json({
                data: {
                    admins: rows,
                    pagination: {
                        currentPage: pageNumber,
                        totalPages: totalPages,
                        totalItems: count,
                        itemsPerPage: limitNumber,
                    },
                },
            });
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
    static async setup(req: Request, res: Response): Promise<void> {
        try {
            const [role, create] = await models.Role.findOrCreate({
                where: { name: 'dev' },
                defaults: { name: 'dev' },
            });
            if (!create) {
                res.status(400).json({ message: 'Rol desarrollador ya esta registrado' });
            }
            const optionUser: UserCreationAttributes = {
                name: 'Develop',
                lastName: 'Default',
                username: 'admin_default',
                password: 'Admin.123',
                dni: '99999999',
                phone: '123456789',
                address: '123 Main St',
                gender: 'Masculino',
                email: 'luisangelvalenciavalera@gmail.com',
                municipalityId: null,
                dateOfBirth: new Date(),
            };

            const user = await models.User.create(optionUser);
            const admin = await models.Administrator.create({ userId: user.id, status: 'Activo', roleId: role.id });

            res.status(201).json({ message: 'Administrador por defecto creado', data: { admin } });
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
