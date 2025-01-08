import logger from '@/config/logger';

import { Request, Response } from 'express';
import z from 'zod';
import models from '@/app/models';

const StateSchema = z.object({
    name: z.string().min(3),
});

class State {
    static async getAll(_req: Request, res: Response) {
        try {
            const states = await models.State.findAll();
            res.status(200).json({ data: { states } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
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
            logger.error(error);
            res.status(400).end();
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
            logger.error(error);
            res.status(400).end();
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req;
            const parsed = StateSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const state = await models.State.update(body, { where: { id } });
            res.status(200).json({ data: state });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const state = await models.State.findByPk(id);
            if (!state) {
                res.status(404).json({ message: 'Estado no encontrado' });
                return;
            }
            await models.State.destroy({ where: { id } });
            res.status(200).json({ message: 'Estado eliminado' });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        }
    }
}
export default State;
