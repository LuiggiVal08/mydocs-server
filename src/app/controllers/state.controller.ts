import type { Request, Response } from 'express';
import z from 'zod';
import models from '@/app/models';
import handdleErrorsController from '@/helpers/handdleErrorsController';

const StateSchema = z.object({
    name: z.string().min(3),
});

class State {
    static async getAll(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);
            const offset = (pageNumber - 1) * limitNumber;
            const { count, rows } = await models.State.findAndCountAll({ limit: limitNumber, offset: offset });

            const totalPages = Math.ceil(count / limitNumber);
            res.status(200).json({
                data: {
                    states: rows,
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
            const state = await models.State.findByPk(id);
            if (!state) {
                res.status(404).json({ message: 'estado no encontrado' });
                return;
            }
            res.status(200).json({ data: { state } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { body } = req;
            const parsed = StateSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const state = await models.State.create(body);
            res.status(201).json({ data: { state } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req;
            const parsed = StateSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: 'Datos invalidos', error: parsed.error });
                return;
            }
            const state = await models.State.update(body, { where: { id } });
            res.status(200).json({ data: state });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const state = await models.State.findByPk(id);
            if (!state) {
                res.status(404).json({ message: 'Estado no encontrado' });
                return;
            }
            await models.State.destroy({ where: { id } });
            res.status(200).json({ message: 'Estado eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}
export default State;
