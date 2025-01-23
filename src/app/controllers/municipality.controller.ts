import type { Request, Response } from 'express';
import z from 'zod';

import models from '@/app/models';
import handdleErrorsController from '@/helpers/handdleErrorsController';

const MunicipalitySchema = z.object({
    name: z.string().min(3),
    stateId: z.string(),
});

class Municipality {
    static async getAll(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);
            const offset = (pageNumber - 1) * limitNumber;
            const { count, rows } = await models.Municipality.findAndCountAll({ limit: limitNumber, offset: offset });
            const totalPages = Math.ceil(count / limitNumber);

            res.status(200).json({
                data: {
                    municipality: rows,
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
        const { id } = req.params;
        try {
            const municipality = await models.Municipality.findByPk(id);
            if (!municipality) {
                res.status(404).json({ message: 'municipio no encontrado' });
                return;
            }
            res.status(200).json({ data: { municipality } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { body } = req;
            const parsed = MunicipalitySchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const municipality = await models.Municipality.create(body);
            res.status(201).json({ data: { municipality } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const ifMunicipality = await models.Municipality.findByPk(id);
            if (!ifMunicipality) {
                res.status(404).json({ message: 'municipio no encontrado' });
                return;
            }
            const { body } = req;
            const parsed = MunicipalitySchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const municipality = await models.Municipality.update({ ...body }, { where: { id } });
            res.status(200).json({ data: municipality });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const municipality = await models.Municipality.findByPk(id);
            if (!municipality) {
                res.status(404).json({ message: 'Estado no encontrado' });
                return;
            }
            await models.Municipality.destroy({ where: { id } });
            res.status(200).json({ message: 'Estado eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}
export default Municipality;
