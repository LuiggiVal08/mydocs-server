import { Request, Response } from 'express';
import models from '@/app/models';
import { z } from 'zod';
import handdleErrorsController from '@/helpers/handdleErrorsController';

const schemaCore = z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
});

const schemaCoreCreate = schemaCore.omit({ id: true });
const schemaCoreGetId = schemaCore.pick({ id: true });

class Core {
    static async getAll(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);
            const offset = (pageNumber - 1) * limitNumber;
            const { count, rows } = await models.Core.findAndCountAll({ limit: limitNumber, offset: offset });

            const totalPages = Math.ceil(count / limitNumber);

            res.status(200).json({
                data: {
                    cores: rows,
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
    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validation = schemaCoreGetId.safeParse({ id });
            if (!validation.success) {
                return void res.status(400).json({ message: validation.error.message });
            }
            const core = await models.Core.findByPk(validation.data.id);
            if (!core) {
                return void res.status(404).json({ message: 'Nucleo no encontrado' });
            }
            return void res.status(200).json({ data: { core } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { body } = req;
            const validation = schemaCoreCreate.safeParse(body);
            if (!validation.success) {
                return void res.status(400).json({ message: validation.error.message });
            }
            const core = await models.Core.create(validation.data);
            return void res.status(201).json({ data: { core } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;

        // Validar datos con Zod
        const validation = schemaCoreCreate.safeParse(body);
        if (!validation.success) {
            return void res.status(400).json({ message: validation.error.message });
        }

        try {
            // Buscar el registro por ID
            const core = await models.Core.findByPk(id);
            if (!core) {
                return void res.status(404).json({ message: 'Nucleo no encontrado' });
            }

            const updatedFields = {
                ...core.dataValues, // Mantener valores actuales
                ...validation.data, // Reemplazar con nuevos valores si existen
            };

            await core.update(updatedFields); // Actualizar campos
            await core.reload(); // Recargar para asegurarnos de obtener los cambios actualizados

            return void res.status(200).json({ data: core });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validation = schemaCoreGetId.safeParse({ id });
            if (!validation.success) {
                return void res.status(400).json({ message: validation.error.message });
            }
            const core = await models.Core.findByPk(validation.data?.id);
            if (!core) {
                return void res.status(404).json({ message: 'Nucleo no encontrado' });
            }
            await core.destroy();
            return void res.status(200).json({ message: 'Nucleo eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}
export default Core;
