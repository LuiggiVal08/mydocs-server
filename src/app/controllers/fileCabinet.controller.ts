import type { Request, Response } from 'express';
import z from 'zod';
import models from '@/app/models';
import handdleErrorsController from '@/helpers/handdleErrorsController';

const FileCabinetSchema = z.object({
    name: z.string().min(3),
    status: z.string().min(3),
    location: z.string().min(3),
});

class FileCabinet {
    static async getAll(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);
            const offset = (pageNumber - 1) * limitNumber;
            const { count, rows } = await models.FileCabinet.findAndCountAll({ limit: limitNumber, offset: offset });

            const totalPages = Math.ceil(count / limitNumber);

            res.status(200).json({
                status: 'success',
                data: {
                    fileCabinets: rows,
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
            const fileCabinet = await models.FileCabinet.findByPk(id);
            if (!fileCabinet) {
                res.status(404).json({ message: 'Archivero no encontrado' });
                return;
            }
            res.status(200).json({ data: { fileCabinet } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { body } = req;
            const parsed = FileCabinetSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const fileCabinet = await models.FileCabinet.create(parsed.data);
            res.status(201).json({ data: { fileCabinet } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req;
            const fileCabinet = await models.FileCabinet.findByPk(id);
            if (!fileCabinet) {
                res.status(404).json({ message: 'Archivero no encontrado' });
                return;
            }
            const parsed = FileCabinetSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: 'Datos invalidos', error: parsed.error });
                return;
            }

            await fileCabinet.update(parsed.data);
            res.status(200).json({ data: { fileCabinet } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const document = await models.FileCabinet.findByPk(id);
            if (!document) {
                res.status(404).json({ message: 'Archivero no encontrado' });
                return;
            }
            await document.destroy();
            res.status(200).json({ message: 'Archivero eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}
export default FileCabinet;
