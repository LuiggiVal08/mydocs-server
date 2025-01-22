import type { Request, Response } from 'express';
import z from 'zod';
import models from '@/app/models';
import handdleErrorsController from '@/helpers/handdleErrorsController';

const DocumentSchema = z.object({
    name: z.string().min(3),
    description: z.string(),
});

class Document {
    static async getAll(req: Request, res: Response) {
        try {
            const documents = await models.Document.findAll();
            res.status(200).json({ data: { documents } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const document = await models.Document.findByPk(id);
            if (!document) {
                res.status(404).json({ message: 'Documento no encontrado' });
                return;
            }
            res.status(200).json({ data: { document } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { body } = req;
            const parsed = DocumentSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const document = await models.Document.create(parsed.data);
            res.status(201).json({ data: { document } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req;
            const document = await models.Document.findByPk(id);
            if (!document) {
                res.status(404).json({ message: 'Documento no encontrado' });
                return;
            }
            const parsed = DocumentSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: 'Datos invalidos', error: parsed.error });
                return;
            }

            await document.update(parsed.data);
            res.status(200).json({ data: { document } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const document = await models.Document.findByPk(id);
            if (!document) {
                res.status(404).json({ message: 'Documento no encontrado' });
                return;
            }
            await document.destroy();
            res.status(200).json({ message: 'Documento eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}
export default Document;
