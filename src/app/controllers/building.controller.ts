import { Request, Response } from 'express';
import models from '@/app/models';
import { z } from 'zod';
import handdleErrorsController from '@/helpers/handdleErrorsController';

const schemaBuilding = z.object({
    id: z.string().optional(),
    name: z.string(),
    location: z.string(),
    coreId: z.string(),
});

const schemaBuildingCreate = schemaBuilding.omit({ id: true });
const schemaBuildingGetId = schemaBuilding.pick({ id: true });

class Building {
    static async getAll(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);
            const offset = (pageNumber - 1) * limitNumber;
            const { count, rows } = await models.Building.findAndCountAll({ limit: limitNumber, offset: offset });
            const totalPages = Math.ceil(count / limitNumber);
            res.status(200).json({
                data: {
                    buildings: rows,
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
            const building = await models.Building.findByPk(id);
            if (!building) {
                return void res.status(404).json({ message: 'Edificio' });
            }
            return void res.status(200).json({ data: { building } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { body } = req;
            const validation = schemaBuildingCreate.safeParse(body);
            if (!validation.success) {
                return void res.status(400).json({ message: validation.error.message });
            }
            const core = await models.Core.findByPk(validation.data.coreId);
            if (!core) {
                return void res.status(400).json({ message: 'El nucleo no se encuentra' });
            }
            const building = await models.Building.create(validation.data);
            return void res.status(201).json({ data: { building } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;

        // Validar datos con Zod
        try {
            const building = await models.Building.findByPk(id);
            if (!building) {
                return void res.status(404).json({ message: 'Edificio no encontrado' });
            }
            const validation = schemaBuildingCreate.safeParse(body);
            if (!validation.success) {
                return void res.status(400).json({ message: validation.error.message });
            }
            const core = await models.Core.findByPk(validation.data.coreId);
            if (!core) {
                return void res.status(400).json({ message: 'El nucleo no se encuentra' });
            }
            // Buscar el registro por ID

            const updatedFields = {
                ...building.dataValues, // Mantener valores actuales
                ...validation.data, // Reemplazar con nuevos valores si existen
            };

            await building.update(updatedFields); // Actualizar campos
            await building.reload(); // Recargar para asegurarnos de obtener los cambios actualizados

            return void res.status(200).json({ data: building });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validation = schemaBuildingGetId.safeParse({ id });
            if (!validation.success) {
                return void res.status(400).json({ message: validation.error.message });
            }
            const building = await models.Building.findByPk(validation.data?.id);
            if (!building) {
                return void res.status(404).json({ message: 'Edificio no encontrado' });
            }
            await building.destroy();
            return void res.status(200).json({ message: 'Edificio eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}
export default Building;
