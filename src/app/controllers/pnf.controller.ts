import { Request, Response } from 'express';
import models from '@/app/models';
import { z } from 'zod';
import handdleErrorsController from '@/helpers/handdleErrorsController';

const schemaPnf = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    periodicity: z.string(),
    coreId: z.string(),
});

const schemaPnfCreate = schemaPnf.omit({ id: true });
const schemaPnfGetId = schemaPnf.pick({ id: true });

class Pnf {
    static async getAll(req: Request, res: Response) {
        try {
            const pnfs = await models.Pnf.findAll();
            res.status(200).json({ data: { pnfs } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const pnf = await models.Pnf.findByPk(id);
            if (!pnf) {
                return void res.status(404).json({ message: 'PNF no encontrado' });
            }
            return void res.status(200).json({ data: { pnf } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { body } = req;
            const validation = schemaPnfCreate.safeParse(body);
            if (!validation.success) {
                return void res.status(400).json({ message: validation.error.message });
            }
            const core = await models.Core.findByPk(validation.data.coreId);
            if (!core) {
                return void res.status(400).json({ message: 'El nucleo no se encuentra' });
            }
            const pnf = await models.Pnf.create(validation.data);
            return void res.status(201).json({ data: { pnf } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;

        try {
            const pnf = await models.Pnf.findByPk(id);
            if (!pnf) {
                return void res.status(404).json({ message: 'PNF no encontrado' });
            }
            const validation = schemaPnfCreate.safeParse(body);
            if (!validation.success) {
                return void res.status(400).json({ message: validation.error.message });
            }
            const core = await models.Core.findByPk(validation.data.coreId);
            if (!core) {
                return void res.status(400).json({ message: 'El nucleo no se encuentra' });
            }
            // Buscar el registro por ID

            const updatedFields = {
                ...pnf.dataValues,
                ...validation.data,
            };

            await pnf.update(updatedFields);
            await pnf.reload();

            return void res.status(200).json({ data: pnf });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validation = schemaPnfGetId.safeParse({ id });
            if (!validation.success) {
                return void res.status(400).json({ message: validation.error.message });
            }
            const pnf = await models.Pnf.findByPk(validation.data?.id);
            if (!pnf) {
                return void res.status(404).json({ message: 'PNF no encontrado' });
            }
            await pnf.destroy();
            return void res.status(200).json({ message: 'PNF eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}
export default Pnf;
