import type { Request, Response } from 'express';
import z from 'zod';
import models from '@/app/models';
import handdleErrorsController from '@/helpers/handdleErrorsController';

const FileCabinetSchema = z.object({
    name: z.string().min(3),
    fileCabinetId: z.string(),
    status: z.boolean(),
    capacity: z.number(),
});

class Level {
    static async getAll(req: Request, res: Response) {
        try {
            // Obtener los parámetros de la consulta (limit y page)
            const { page = 1, limit = 10 } = req.query;

            // Convertir a números (asegurarnos de que sea un valor válido)
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);

            // Calcular el offset (el punto de inicio para la consulta)
            const offset = (pageNumber - 1) * limitNumber;

            // Obtener los niveles con paginación
            const { count, rows } = await models.Level.findAndCountAll({
                include: [
                    {
                        model: models.FileCabinet,
                        as: 'fileCabinet',
                    },
                ],
                limit: limitNumber, // Número máximo de elementos por página
                offset: offset, // Número de elementos a omitir (para el paginado)
            });

            // Calcular el número total de páginas
            const totalPages = Math.ceil(count / limitNumber);

            res.status(200).json({
                status: 'success',
                data: {
                    levels: rows, // Los niveles obtenidos
                },
                pagination: {
                    currentPage: pageNumber, // Página actual
                    totalPages: totalPages, // Total de páginas
                    totalItems: count, // Total de elementos
                    itemsPerPage: limitNumber, // Elementos por página
                },
            });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const level = await models.Level.findByPk(id, {
                include: [
                    {
                        model: models.FileCabinet,
                        as: 'fileCabinet',
                    },
                ],
            });
            if (!level) {
                res.status(404).json({ message: 'Nivel no encontrado' });
                return;
            }
            res.status(200).json({ data: { level } });
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
            const fileCabinet = await models.FileCabinet.findByPk(parsed.data.fileCabinetId);
            if (!fileCabinet) {
                res.status(404).json({ message: 'Archivo no encontrado' });
                return;
            }
            const level = await models.Level.create(parsed.data);
            res.status(201).json({ data: { level } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req;
            const level = await models.Level.findByPk(id);
            if (!level) {
                res.status(404).json({ message: 'Nivel no encontrado' });
                return;
            }
            const parsed = FileCabinetSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: 'Datos invalidos', error: parsed.error });
                return;
            }
            const fileCabinet = await models.FileCabinet.findByPk(parsed.data.fileCabinetId);
            if (!fileCabinet) {
                res.status(404).json({ message: 'Archivo no encontrado' });
                return;
            }

            await level.update(parsed.data);
            res.status(200).json({ data: { level } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const level = await models.Level.findByPk(id);
            if (!level) {
                res.status(404).json({ message: 'Nivel no encontrado' });
                return;
            }
            await level.destroy();
            res.status(200).json({ message: 'Nivel eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}
export default Level;
