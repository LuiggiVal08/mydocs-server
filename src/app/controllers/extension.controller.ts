import type { Request, Response } from 'express';
import z from 'zod';
import models from '@/app/models';

import handdleErrorsController from '@/helpers/handdleErrorsController';

const ExtensionSchema = z.object({
    name: z.string().min(3),
});

class Extension {
    static async getAll(req: Request, res: Response) {
        try {
            const extensions = await models.Extension.findAll();
            res.status(200).json({ data: { extensions } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const extension = await models.Extension.findByPk(id);
            if (!extension) {
                res.status(404).json({ message: 'Extensión no encontrada' });
                return;
            }
            res.status(200).json({ data: { extension } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { body } = req;
            const parsed = ExtensionSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const extension = await models.Extension.create(parsed.data);
            res.status(201).json({ data: { extension } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req;
            const extension = await models.Extension.findByPk(id);
            if (!extension) {
                res.status(404).json({ message: 'Extensión no encontrada' });
                return;
            }
            const parsed = ExtensionSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: 'Datos invalidos', error: parsed.error });
                return;
            }

            await extension.update(parsed.data);
            res.status(200).json({ data: { extension } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const extension = await models.Extension.findByPk(id);
            if (!extension) {
                res.status(404).json({ message: 'Extensión no encontrada' });
                return;
            }
            await extension.destroy();
            res.status(200).json({ message: 'Extensión eliminada' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}
export default Extension;
