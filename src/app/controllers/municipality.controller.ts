import { Request, Response } from 'express';
import z from 'zod';
import logger from '@/config/logger';

import models from '@/app/models';

const MunicipalitySchema = z.object({
    name: z.string().min(3),
    stateId: z.string(),
});

class Municipality {
    static async getAll(_req: Request, res: Response) {
        try {
            const municipality = await models.Municipality.findAll();
            res.status(200).json({ data: { municipality } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const municipality = await models.Municipality.findByPk(id);
            if (!municipality) {
                res.status(404).json({ message: 'municipio no encontrado' });
                return;
            }
            res.status(200).json({ data: { municipality } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
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
            logger.error(error);
            res.status(400).end();
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
            logger.error(error);
            res.status(400).end();
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
            logger.error(error);
            res.status(400).end();
        }
    }
}
export default Municipality;
